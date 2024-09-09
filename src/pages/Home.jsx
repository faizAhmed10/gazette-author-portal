import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthorContext from "../utils/assets/AuthorContext"
const Home = () => { 
  let {authTokens} = useContext(AuthorContext)
  return (
    <div className=" mx-auto min-h-[100dvh]
     background flex overflow-hidden
    "> 
      <div className="lg:w-1/2 lg:ml-10 p-7 rounded reveal shadow-2xl bg-white bg-none my-auto">
        <h1 className="lg:text-6xl text-4xl font-bold title text-wrap">
          Welcome to HKBK Gazette: Author's Portal
        </h1>
        <h2 className="lg:text-2xl text-xl text-wrap font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam reiciendis, placeat optio deleniti asperiores </h2>
        <div className="flex gap-2">
        <Link to={authTokens ? "/dashboard" : "/login"} className="p-2 border ml-auto bg-black text-white rounded">Start Writing</Link>
        </div>
    </div> 

    </div>
  );
};

export default Home;
