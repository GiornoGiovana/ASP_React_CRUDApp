import { useState } from "react";
import { CreatePostForm } from "./components/CreatePostForm";
import { UpdatePostForm } from "./components/UpdatePostForm";
import { Table } from "./Table";
import API_URL from "./utils/constants";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState(null);

  const getPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onPostCreated = (createdPost) => {
    setShowForm(false);
    if (!createdPost) return;
    alert(`Post successfully created.`);
    getPosts();
  };

  const onPostUpdated = (updatedPost) => {
    setPostToUpdate(null);
    if (!updatedPost) return;
    let postsTemp = [...posts];
    const index = postsTemp.findIndex((p) => p.postId === updatedPost.postId);
    if (index < 0) return;
    postsTemp[index] = updatedPost;
    setPosts(postsTemp);
    alert("Post Successfully updated.");
  };

  const onPostDeleted = (postId) => {
    let postsTemp = [...posts];
    const index = postsTemp.findIndex((p) => p.postId === postId);
    if (index < 0) return;
    setPosts(postsTemp.filter((p) => p.postId !== postId));
    alert("Post Successfully Deleted.");
  };

  const showPostForm = () => setShowForm(true);

  return (
    <div className="container">
      {/* prettier-ignore */}
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(showForm === false && postToUpdate === null) && (
            <div className="mb-4">
              <h1>ASP.NET Core with React</h1>
              <div className="mt-5">
                <button onClick={getPosts} className="btn btn-dark btn-lg w-100">
                  Get Posts from server
                </button>
                <button onClick={showPostForm} className="btn btn-secondary btn-lg w-100 mt-4">
                  Create new Post
                </button>
              </div>
            </div>
          )}
          {(posts.length > 0 && showForm === false && postToUpdate === null) && (
            <Table posts={posts} setPosts={setPosts} setPostToUpdate={setPostToUpdate} onPostDeleted={onPostDeleted} />
          )}

          {showForm && <CreatePostForm onPostCreated={onPostCreated} setShowForm={setShowForm} />}
          {postToUpdate !== null && <UpdatePostForm post={postToUpdate} onPostUpdated={onPostUpdated} setShowForm={setShowForm} />}
        </div>
      </div>
    </div>
  );
}
