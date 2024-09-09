import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmPopup from "./ConfirmPopup";
import AuthorContext from "../utils/assets/AuthorContext";
const Dropdown = ({
  name,
  setName
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState("")
  let {authTokens} = useContext(AuthorContext)


  const fetchCategories = async () => {
    try {
      let response = await fetch(`${backendUrl}api/author/categories/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authTokens.access}`,
        },
      });

      if (response.status === 200) {
        let data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = async () => {
    try {
      const response = await fetch(`${backendUrl}api/author/categories/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify({
          name: newCategory,
        }),
      });

      if (response.status === 201) {
        console.log("Success")       
        fetchCategories();
        toast.success(`New category ${newCategory} created!`);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsModalOpen(false);
      setNewCategory("");
    }
  };

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="flex lg:items-center flex-col lg:flex-row my-3 mx-auto lg:mx-0">
      <ConfirmPopup
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={createCategory}
        message="Are you sure you want to create the Category?"
      />

      <div className="flex flex-col">
        <label htmlFor="cars" className="">Choose a Category:</label>
        <select
          name="cars"
          id="cars"
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-black text-white lg:my-2 my-1"
        >
          {categories !== null && categories.length > 0 ? (
            categories.map((category, index) => (
              <option value={category.id} key={index}>
                {category.name}
              </option>
            ))
          ) : (
            <option value={null} disabled>
              No Categories yet
            </option>
          )}
        </select>
      </div>
            <p className="font-bold text-lg my-3 lg:mx-4 text-center">OR</p>
        <div className="flex lg:block">
          <input
            placeholder="Create a category..."
            className="bg-black text-white p-2 rounded"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button type="button"
          className="bg-gray-700 text-white p-2 mx-1 rounded"
           onClick={() => setIsModalOpen(true)}>
            Create
          </button>
        </div>
    </div>
  );
};

export default Dropdown;
