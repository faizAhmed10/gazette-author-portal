import React, { useContext } from "react";
import AuthorContext from "../utils/assets/AuthorContext";
import { Link } from "react-router-dom";
import Loader from "/Loader"

const Register = () => {
  let { registerAuthor, loading } = useContext(AuthorContext);

  return (
    <div
      className="flex items-center justify-center min-h-[100dvh]
    background  flex-col  "
    >
      {loading && <Loader/>}
      <form
        onSubmit={registerAuthor}
        className="flex flex-col mx-auto
        items-center p-4 bg-white shadow-xl lg:bg-black lg:bg-opacity-20 text-black rounded
        "
      >
        <h2 className="text-3xl font-bold my-1">Register</h2>

        <div className="flex flex-col my-2">
          <label htmlFor="Name" className="font-bold">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="bg-transparent outline outline-1 outline-black rounded ufdb font-bold"
            id="Name"
            placeholder="Your registered name..."
            required
          />
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="Username" className="font-bold">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="bg-transparent outline outline-1 outline-black  rounded ufdb font-bold"
            id="Username"
            placeholder="user_name"
            required
            minLength={8}
          />
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="Password" className="font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="bg-transparent outline outline-1 outline-black  rounded ufdb font-bold"
            id="Password"
            placeholder="********"
            required
            minLength={8}
          />
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="ConfirmPassword" className="font-bold">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="********"
            name="confirmpassword"
            className="bg-transparent outline outline-1 outline-black  rounded ufdb font-bold"
            id="ConfirmPassword"
            required
            minLength={8}
          />
        </div>
        {!loading && <button type="submit" className="p-2 rounded my-2 bg-black text-white">
          Register
        </button>}
        <p className="font-bold">
          Already an author?{" "}
          <Link to="/login" className="text-blue-900 font-bold underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
