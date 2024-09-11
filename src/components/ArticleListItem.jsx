import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthorContext from "../utils/assets/AuthorContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmPopup from "../components/ConfirmPopup";

const ArticleListItem = ({ myArticle, getArticles }) => {
  let { authTokens, backendUrl, isSmallScreen } = useContext(AuthorContext);
  let [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteArticle = async () => {
    setLoading(true);
    try {
      let response = await fetch(
        `${backendUrl}api/author/delete-article/${myArticle.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      let data = await response.json();
      console.log(data);
      setLoading(false);
      if (response.status === 200) {
        toast.success("Deleted successfully");
        getArticles();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred");
    }
    setIsModalOpen(false);
  };
  return (
    <div
      className=" my-2 bg-black bg-opacity-30 hover:translate-x-10 transition-all
    rounded lg:flex md:flex p-3 lg:w-[95%] shadow-xl "
    >
      <ConfirmPopup
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={deleteArticle}
        message="Are you sure you want to delete the article?"
      />
      <Link to={`/article/${myArticle.id}`}>
        <div className="flex">
          <div>
            {isSmallScreen && myArticle.image && (
              <img
                src={myArticle.image.url}
                alt="..."
                className="shadow-xl block rounded mx-auto max-h-[250px] object-cover my-auto"
              />
            )}
            <p className="font-extrabold text-4xl">
              {!isSmallScreen
                ? myArticle.title
                : myArticle.title.substring(0, 40) + "..."}
            </p>
            <p className="font-bold text-2xl">
              {!isSmallScreen
                ? myArticle.sub_title
                : myArticle.sub_title.substring(0, 30) + "..."}
            </p>
            <p
              className="text-xl"
              dangerouslySetInnerHTML={{
                __html: myArticle.content.substring(0, 60),
              }}
            ></p>
          </div>
          {!isSmallScreen && myArticle.image && (
            <img
              src={myArticle.image.url}
              alt="..."
              className="shadow-xl block rounded lg:w-[30%] md:w-[30%] h-auto lg:max-h-[200px] object-cover mx-2 my-auto"
            />
          )}
        </div>
        <div className="flex items-center">
          <p className="border rounded text-center p-1 border-black">
            {myArticle.category?.name}
          </p>
          <p className="border rounded text-center p-1 border-black mx-2">
            {myArticle.status}
          </p>
          <p>
            {new Date(myArticle.publish_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </Link>
      <div className="flex flex-col ml-auto">
        <Link
          to={`/edit/${myArticle.id}`}
          className="p-2 text-center rounded my-2 bg-black text-white"
        >
          Edit
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 rounded my-2 bg-black text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ArticleListItem;
