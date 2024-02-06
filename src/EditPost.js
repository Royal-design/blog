import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import DataContext from "./context/DataContext";

import api from "./api/posts";
export const EditPost = () => {
  const [titleedit, settitleedit] = useState("");
  const [newpostedit, setnewpostedit] = useState("");

  const { setposts, posts } = useContext(DataContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);

  useEffect(() => {
    if (post) {
      settitleedit(post.title);
      setnewpostedit(post.body);
    }
  }, [post, settitleedit, setnewpostedit]);

  const handleEdit = async (id) => {
    const titleEditTransform = titleedit.length
      ? titleedit
          .split(" ")
          .map((titleedit) => titleedit[0].toUpperCase() + titleedit.slice(1))
          .join(" ")
      : titleedit;
    const bodyEditTransform = newpostedit.length
      ? newpostedit[0].toUpperCase() + newpostedit.slice(1)
      : newpostedit;

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
      id,
      title: titleEditTransform,
      datetime: formatDay,
      body: bodyEditTransform
    };
    try {
      const response = await api.put(`/posts/${id}`, postObj);

      setposts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      settitleedit("");
      setnewpostedit("");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
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
