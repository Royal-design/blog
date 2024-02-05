import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const EditPost = ({
  titleedit,
  newpostedit,
  handleEdit,
  settitleedit,
  setnewpostedit,
  posts
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);
  useEffect(() => {
    if (post) {
      settitleedit(post.title);
      setnewpostedit(post.body);
    }
  }, [post, settitleedit, setnewpostedit]);

  return (
    <main>
      {titleedit && (
        <form className="form-post" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="title">Title:</label>
          <input
            autoFocus
            id="title"
            type="text"
            placeholder="title"
            required
            value={titleedit}
            onChange={(e) => settitleedit(e.target.value)}
          />
          <label htmlFor="post">Post:</label>
          <textarea
            name="post"
            id="post"
            cols="30"
            rows="10"
            required
            value={newpostedit}
            onChange={(e) => setnewpostedit(e.target.value)}
          ></textarea>

          <button
            type="submit"
            onClick={() => {
              handleEdit(post.id);
              navigate("/");
            }}
          >
            Submit
          </button>
        </form>
      )}
      {!titleedit && (
        <>
          <p>The page cannot be found</p>
          <Link>Back to Home</Link>
        </>
      )}
    </main>
  );
};
