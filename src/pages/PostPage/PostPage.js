import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import "./postpage.style.scss";
import { useState } from "react";
import api from "../../api/posts";

export const PostPage = () => {
  const [title, settitle] = useState("");
  const [newpost, setnewpost] = useState("");
  const { posts, setposts } = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const titleTransform = title.length
      ? title
          .split(" ")
          .map((title) => title[0].toUpperCase() + title.slice(1))
          .join(" ")
      : title;
    const bodyTransform = newpost.length
      ? newpost[0].toUpperCase() + newpost.slice(1)
      : newpost;
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const day = new Date();

    const formatDay = Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(day);

    const postObj = {
      id: id,
      title: titleTransform,
      datetime: formatDay,
      body: bodyTransform
    };
    try {
      const response = await api.post("/posts", postObj);
      const updatePost = [...posts, response.data];
      setposts(updatePost);
      settitle("");
      setnewpost("");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <form className="form-post">
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
