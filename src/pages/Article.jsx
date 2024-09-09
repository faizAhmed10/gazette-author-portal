import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorContext from "../utils/assets/AuthorContext";
import Loader from "/Loader";

const Article = () => {
 
  const { id } = useParams();
  let { getArticle, backendUrl } = useContext(AuthorContext);
  let [loading, setLoading] = useState(false);
  let [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      let data = await getArticle(id);
      if (data) {
        setArticle(data);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id]);
  return (
    <div className="lg:w-[90%] mx-auto p-4 bg-black bg-opacity-30">
      {loading && <Loader/>}
      {article != null && (
        <div>
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg">{article.author?.name}</p>
            <p className="font-semibold border rounded p-2">
              {article.category?.name}
            </p>
          </div>
          <h2 className="font-extrabold text-4xl lg:text-6xl my-2">{article.title}</h2>
          <p className="font-bold text-2xl lg:text-3xl my-2">{article.sub_title}</p>
          {article.image && (
            <img
            className="block rounded w-full h-auto max-h-[700px] object-cover"
              src={`${backendUrl}${article.image}`}
              alt="loading..."
            />
          )}
          <p
            className="text-xl font-semibold my-3"
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          ></p>
          <p className="text-right my-2">
            {new Date(article.publish_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default Article;
