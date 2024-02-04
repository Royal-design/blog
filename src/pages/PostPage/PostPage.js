import { useNavigate } from "react-router-dom";
import "./postpage.style.scss";
export const PostPage = ({
  newpost,
  setnewpost,
  handleSubmit,
  title,
  settitle
}) => {
  const navigate = useNavigate();
  return (
    <form className="form-post" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="title">Title:</label>
      <input
        autoFocus
        id="title"
        type="text"
        placeholder="title"
        required
        value={title}
        onChange={(e) => settitle(e.target.value)}
      />
      <label htmlFor="post">Post:</label>
      <textarea
        name="post"
        id="post"
        cols="30"
        rows="10"
        required
        value={newpost}
        onChange={(e) => setnewpost(e.target.value)}
      ></textarea>

      <button
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
          navigate("/");
        }}
      >
        Submit
      </button>
    </form>
  );
};
