import { useState } from "react";
import API_URL from "../utils/constants";

export const CreatePostForm = ({ onPostCreated, setShowForm }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Please enter a Title and Content!");
    const postToCreate = {
      title,
      content,
    };
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postToCreate),
    };
    try {
      const res = await fetch(`${API_URL}/posts`, init);
      const data = await res.json();
      if (data) onPostCreated(postToCreate);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onPostCreated(null);
    setShowForm(false);
  };

  return (
    <>
      {/* prettier-ignore */}
      <form className="w-100 px-5">
        <h1 className="mt-5">Create New Post</h1>
        <div className="mt-2">
          <label className="h3 form-label" htmlFor="title">Post title</label>
          <input className="form-control" type="text" id="title" value={title} onChange={handleTitle} />
        </div>
        <div className="mt-2">
          <label className="h3 form-label" htmlFor="content">Post content</label>
          <input className="form-control" type="text" id="content" value={content} onChange={handleContent} />
        </div>

        <button className="btn btn-dark btn-lg w-100 mt-3" onClick={handleSubmit}>Submit</button>
        <button className="btn btn-secondary btn-lg w-100 mt-3" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
};
