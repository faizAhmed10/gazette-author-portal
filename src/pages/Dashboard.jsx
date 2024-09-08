import React, { useContext, useEffect, useState } from "react";
import AuthorContext from "../utils/assets/AuthorContext";
import ArticleListItem from "../components/ArticleListItem";
import Loader from "../utils/assets/Loader";

const Dashboard = () => {
  let { authTokens } = useContext(AuthorContext);
  let [myArticles, setMyArticles] = useState(null);
  let [myProfile, setMyProfile] = useState(null);
  let [loading, setLoading] = useState(false);

  const getMyArticles = async () => {
    setLoading(true);
    try {
      let response = await fetch("/api/author/get-my-articles/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      let data = await response.json();
      if (response.status === 200) {
        setMyArticles(data);
      } else {
        alert("Something bad occured, please try again");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getMyProfile = async () => {
    try {
      setLoading(true);
      let response = await fetch("/api/author/get-my-profile/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        setMyProfile(data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMyArticles();
    getMyProfile();
  }, []);

  return (
    <div className="lg:w-[90%] lg:mx-auto ">
      {loading && <Loader />}
      {myProfile != null && (
        <div className="my-3 flex justify-between w-[95%] mx-auto items-center">
          <div>
            <p className="lg:text-2xl text-xl">
              Name: <span className="font-bold">{myProfile.name}</span>
            </p>
            <p className="lg:text-2xl text-xl">
              Username:{" "}
              <span className="font-bold">{myProfile.user?.username}</span>
            </p> 
          </div>
          <p className="font-bold">Articles written: {myArticles?.length}</p>
        </div>
      )}
      <div className="h-[2px] bg-opacity-30 rounded w-[90%] bg-black mx-auto my-3"></div>
      {myArticles !== null && myArticles.length > 0 ? (
        myArticles.map((article, index) => (
          <ArticleListItem myArticle={article} getArticles={getMyArticles} key={index} />
        ))
      ) : (
        <h2>No articles created yet.</h2>
      )}
    </div>
  );
};

export default Dashboard;
