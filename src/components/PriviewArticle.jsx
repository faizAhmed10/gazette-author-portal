import React, { useContext } from "react";
import AuthorContext from "../utils/assets/AuthorContext";
import { FaTimes } from "react-icons/fa";
const PriviewArticle = ({
  category,
  title,
  subtitle,
  image,
  content, 
  setPriviewState,
}) => {
  let {  backendUrl, cloudinaryUrl } = useContext(AuthorContext);

  const imageUrl = image instanceof File ? URL.createObjectURL(image) : `${cloudinaryUrl}${image}`;

  const close = () => {
    setPriviewState(false);
  };

  return (
    <div className="lg:w-[90%] mx-auto p-4 bg-gray-400 z-10 absolute inset-0 overflow-y-scroll">
      <div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-white rounded-full ml-auto p-2 text-center"
            onClick={close}
          >
            <FaTimes size={24}/>
          </button>
        </div>
        <p className="font-semibold border rounded p-2 w-fit">{category}</p>
        <h2 className="font-extrabold text-4xl lg:text-6xl my-2">{title}</h2>
        <p className="font-bold text-2xl lg:text-3xl my-2">{subtitle}</p>
        {image && imageUrl && (
          <img
            className="block rounded w-full h-auto max-h-[700px] object-cover"
            src={imageUrl}
            alt="Preview"
          />
        )}
        <p
          className="text-xl font-semibold my-3"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></p>
        <p className="text-right my-2">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default PriviewArticle;
