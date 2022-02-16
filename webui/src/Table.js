import API_URL from "./utils/constants";

export const Table = ({ posts, setPosts, setPostToUpdate, onPostDeleted }) => {
  const handleDelete = (post) => {
    const isConfirm = window.confirm(
      `Are you sure you want to delete post with title ${post.title}`
    );
    if (!isConfirm) return;
    deletePost(post.postId);
  };

  const deletePost = async (postId) => {
    try {
      const res = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data) onPostDeleted(postId);
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="table-responsive mt-5 mb-5">
      <table className="table table-bordered border-dark">
        <thead>
          <tr>
            <th scope="col">PostId (Pk)</th>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">CRUD Operation</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.postId}>
              <th scope="row">{post.postId}</th>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                <div className="d-flex w-100 justify-content-center align-items-center flex-wrap gap-4">
                  <button
                    className="btn btn-dark btn-lg"
                    onClick={() => setPostToUpdate(post)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-secondary btn-lg"
                    onClick={() => handleDelete(post)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-dark btn-lg w-100"
        onClick={() => setPosts([])}
      >
        Clear Posts
      </button>
    </div>
  );
};
