import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AuthorContext from "../utils/assets/AuthorContext";
import Dropdown from "../components/Dropdown";
import PriviewArticle from "../components/PriviewArticle";
import Loader from "/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmPopup from "../components/ConfirmPopup";

const Create = () => {
  let { authTokens, backendUrl } = useContext(AuthorContext);
  let [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let [title, setTitle] = useState("");
  let [sub_title, setSub_title] = useState("");
  let [content, setContent] = useState("");
  let [image, setImage] = useState(null);
  let [status, setStatus] = useState("Draft");
  let [category, setCategory] = useState("General");
  let [priviewState, setPriviewState] = useState(false);

  const showPreview = () => {
    setPriviewState(!priviewState);
  };

  const createArticle = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (title === "" || content === "") {
      setLoading(false);
      setIsModalOpen(false)
      title === "" ? toast.error("Title cannot be empty") : toast.error("Article cannot be empty")
      return
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
    console.log(category);
    try {
      let response = await fetch(`${backendUrl}api/author/create-article/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: formData,
      });
      const data = await response.json()
      console.log(data)
      if (response.status === 200) {
        toast.success("Article Created Successfully!");
      } else {
        toast.error("Article Creation failed, please try again");
      }
      setIsModalOpen(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsModalOpen(false);
      toast.error("An error occured, please try again");
    }
  };

  return (
    <div>
      {loading && <Loader />}
      
      <ConfirmPopup
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={createArticle}
        message="Are you sure you want to create the article?"
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
      <form className="flex flex-col w-[95%] lg:w-[90%] mx-auto" onSubmit={createArticle}>
        <div className="flex">
        <h1 className="text-3xl my-5 flex-1">Create an Article</h1>
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
            setCategory={setCategory}
          />
          
        </div>
        <label htmlFor="title" className="font-extrabold">
          Title
        </label>
        <input
          className="rounded border p-2 my-2 bg-black bg-opacity-30 font-extrabold"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          id="title"
          required
        />

        <label htmlFor="subtitle" className="font-bold">
          Sub-title
        </label>
        <input
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
          required
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
    </div>
  );
};

export default Create;
