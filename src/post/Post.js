import { Link, useNavigate, useParams } from "react-router-dom";
import "./post.style.scss";

export const Post = ({ posts, handleDelete }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);
  return (
    <main className="post-page">
      <article>
        {post && (
          <div className="post-article">
            <div className="post-header">
              <h2>{post.title}</h2>
              <p>{post.datetime}</p>
            </div>

            <p className="post-body">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="active">Edit</button>
            </Link>
            <button
              onClick={() => {
                handleDelete(post.id);
                navigate("/");
              }}
            >
              Delete
            </button>
          </div>
        )}
        {!post && (
          <>
            <p>The page you are looking for cannot be found</p>

            <Link to="/">Back Home</Link>
          </>
        )}
      </article>
    </main>
  );
};
