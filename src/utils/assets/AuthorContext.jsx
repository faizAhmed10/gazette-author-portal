import { createContext, useEffect, useState } from "react";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isTokenExpired } from "./auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthorContext = createContext();

export default AuthorContext;

export const ContextProvider = ({ children }) => {
  let navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let [loading, setLoading] = useState(false);

  let [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    if (tokens) {
      const parsedTokens = JSON.parse(tokens);
      if (!isTokenExpired(parsedTokens.access)) {
        return parsedTokens;
      }
    }
    return null;
  });

  let [author, setAuthor] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  let [authorName, setAuthorName] = useState(() => author?.username);

  const isAuthor = async (token) => {
    try {
      const response = await fetch(`${backendUrl}api/author/check-author/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const registerAuthor = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (e.target.password.value.length < 8) {
      toast.error("Password should contain atleast 8 characters");
      setLoading(false);
      return;
    }

    if (e.target.password.value !== e.target.confirmpassword.value) {
      toast.error("Passwords do not match, try again");
      setLoading(false);
      return;
    }

    try {
      let response = await fetch(`${backendUrl}api/author/create-author/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value,
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });

      // let data = await response.json()

      if (response.status === 201) {
        let response2 = await fetch(`${backendUrl}api/token/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
          }),
        });

        let data2 = await response2.json();

        if (response2.status === 200) {
          setAuthTokens(data2);
          setAuthor(jwtDecode(data2.access));
          setAuthorName(jwtDecode(data2.access).username);
          toast.success("You are now a registered Author!");
          localStorage.setItem("authTokens", JSON.stringify(data2));
          navigate("/dashboard");
        } else {
          toast.error("Something went wrong, please try again");
        }
      } else {
        toast.error("Your name is not registered!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response = await fetch(`${backendUrl}api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });

      let data = await response.json();
      if (response.status === 200) {
        const data2 = await isAuthor(data.access);
        if (data2) {
          setAuthTokens(data);
          setAuthor(jwtDecode(data.access));
          setAuthorName(jwtDecode(data.access).username);
          localStorage.setItem("authTokens", JSON.stringify(data));
          navigate("/dashboard");
        } else {
          toast.error("You are not a registered author");
        }
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthTokens(null);
    setAuthor(null);
    setAuthorName(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const updateToken = async () => {
    console.log("Update Token called");
    if (!authTokens?.refresh) {
      logout();
      return false;
    }

    try {
      let response = await fetch(`${backendUrl}api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'refresh': authTokens.refresh,
        })
      });

      let data = await response.json();
      console.log(data)
      if (response.status === 200) {
        setAuthTokens(data);
        setAuthor(jwtDecode(data.access));
        setAuthorName(jwtDecode(data.access).username);
        localStorage.setItem("authTokens", JSON.stringify(data));
        console.log(data);
        return true;
      }
    } catch (error) {
      toast.error("Failed to refresh token. Please log in again.");
      logout();
    }

    return false;
  };

  const getArticle = async (id) => {
    try {
      let response = await fetch(`${backendUrl}api/author/article/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      let data = await response.json();

      if (response.status === 200) {
        return data;
      }
      console.log(data);
      return null;
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  useEffect(() => {
    console.log("useEffect triggered");

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    const initializeAuth = async () => {
      if (authTokens) {
        const tokenValid = !isTokenExpired(authTokens.access);
        if (!tokenValid) {
          const refreshed = await updateToken();
          if (!refreshed) {
            logout();
          }
        }
      }
    };

    initializeAuth()
    const intervalTime = 1000 * 60 * 50;

    const interval = setInterval(() => {
      console.log("Interval running");
      if (authTokens) {
        console.log("Updating token...");
        updateToken();
      }
    }, intervalTime);
 
    return () => clearInterval(interval)

  }, [authTokens]);

  let contextData = {
    author: author,
    authorName: authorName,
    authTokens: authTokens,
    loading: loading,
    backendUrl: backendUrl,
    isSmallScreen: isSmallScreen,
    isAuthor: isAuthor,
    registerAuthor: registerAuthor,
    login: login,
    logout: logout,
    getArticle: getArticle,
  };
 
  return (
    <AuthorContext.Provider value={contextData}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </AuthorContext.Provider>
  );
};
