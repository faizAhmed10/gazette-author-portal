import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorContext from "../utils/assets/AuthorContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropdown from "../components/Dropdown";
import PriviewArticle from "../components/PriviewArticle";
import Loader from "../utils/assets/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmPopup from "../components/ConfirmPopup";

const Edit = () => {
  let { getArticle, authTokens, backendUrl } = useContext(AuthorContext);
  const { id } = useParams();
  let [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let [title, setTitle] = useState("");
  let [sub_title, setSub_title] = useState("");
  let [content, setContent] = useState("");
  let [image, setImage] = useState(null);
  let [status, setStatus] = useState("Draft");
  let [category, setCategory] = useState("");
  let [priviewState, setPriviewState] = useState(false);

  const showPreview = () => {
    setPriviewState(!priviewState);
  };

  let editArticle = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (title === "") {
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("sub_title", sub_title);
    formData.append("content", content);
    formData.append("status", status);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }
    console.log(status);
    try {
      let response = await fetch(`${backendUrl}api/author/update-article/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: formData,
      });
      let data = await response.json();
      console.log(data);
      if (response.status === 200) {
        if (status === "draft") {
          toast.success("Article Drafted!");
        } else {
          toast.success("Article Published!");
        }
      }
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("An error occured, Please try again.");
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const data = await getArticle(id);
      if (data) {
        setTitle(data.title);
        setSub_title(data.sub_title);
        setContent(data.content);
        if (data.image) {
          setImage(data.image);
        }
        setStatus(data.status);
        setCategory(data.category?.name);
      }

      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  return (
    <div>
      {loading && <Loader />}
      <ConfirmPopup
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={editArticle}
        message="Are you sure you want to edit the article?"
      />
      {priviewState && (
        <PriviewArticle
          category={category}
          title={title}
          subtitle={sub_title}
          image={image}
          content={content}
          setPriviewState={setPriviewState}
        />
      )}
      {content != null && (
        <form className="flex flex-col w-[95%] lg:w-[90%] mx-auto" onSubmit={editArticle}>
          <div className="flex">
          <h1 className="text-3xl my-5 flex-1">Edit your Article</h1>
          <button
              type="button"
              onClick={showPreview}
              className="p-2 rounded my-auto bg-black text-white"
            >
              Priview
            </button>
            </div>
          <div className="flex justify-between items-center">
            <Dropdown 
            name={category}
            setName={setCategory}
            />
            
          </div>
          <label htmlFor="title" className="font-extrabold">
            Title
          </label>
          <input
            placeholder="Title..."
            className="rounded border p-2 my-2 bg-black bg-opacity-30 font-extrabold"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            id="title"
          />

          <label htmlFor="subtitle" className="font-bold">
            Sub-title
          </label>
          <input
            placeholder="Sub-Title..."
            className="rounded border p-2 my-2 bg-black bg-opacity-30 font-bold"
            onChange={(e) => setSub_title(e.target.value)}
            value={sub_title}
            id="subtitle"
          />
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="Your Article..."
            className="rounded py-2 my-2 h-[50dvh]"
            theme="snow"
            modules={{
              toolbar: {
                container: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link"],
                  ["clean"],
                ],
              },
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
            ]}
          />

          <div className="lg:mt-10 mt-20 flex flex-col">
            <label htmlFor="file">Select an image for your Article...</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="flex lg:w-[30%] lg:mx-auto">
            <button
              type="button"
              onClick={() => {
                setStatus("draft");
                setIsModalOpen(true);
              }}
              className="p-2 rounded my-2 bg-black text-white mx-auto"
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => {
                setStatus("published");
                setIsModalOpen(true);
              }}
              className="p-2 rounded my-2 bg-black text-white mx-auto"
            >
              Publish
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Edit;
