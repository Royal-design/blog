import "./App.css";

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RootLayout } from "./RootLayout/RootLayout";
import { HomePage } from "./pages/Homepage/HomePage";
import { AboutPage } from "./pages/Aboutpage/AboutPage";
import { PostPage } from "./pages/PostPage/PostPage";
import { ErrorPage } from "./ErrorPage";
import { Post } from "./post/Post";
import api from "./api/posts";
import { EditPost } from "./EditPost";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  const [posts, setposts] = useState([]);
  const [title, settitle] = useState("");
  const [newpost, setnewpost] = useState("");
  const [search, setsearch] = useState("");
  const [searchresult, setsearchresult] = useState([]);
  const [titleedit, settitleedit] = useState("");
  const [newpostedit, setnewpostedit] = useState("");

  const { width } = useWindowSize();

  const { isLoading, fetchError, data } = useAxiosFetch(
    "http://localhost:3500/posts"
  );
  useEffect(() => {
    setposts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setsearchresult(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async () => {
    if (title !== "" && newpost !== "") {
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
    }
  };

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
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter((post) => post.id !== id);
      setposts(postList);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
  return (
    <BrowserRouter basename="/blog">
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout search={search} setsearch={setsearch} width={width} />
          }
        >
          <Route
            index
            element={
              <HomePage
                posts={searchresult}
                isLoading={isLoading}
                fetchError={fetchError}
              />
            }
          ></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route
            path="/edit/:id"
            element=<EditPost
              newpostedit={newpostedit}
              settitleedit={settitleedit}
              setnewpostedit={setnewpostedit}
              titleedit={titleedit}
              handleEdit={handleEdit}
              posts={posts}
            />
          />
          <Route path="/post">
            <Route
              path="/post"
              element={
                <PostPage
                  newpost={newpost}
                  setnewpost={setnewpost}
                  handleSubmit={handleSubmit}
                  title={title}
                  settitle={settitle}
                />
              }
            />
            <Route
              path="/post/:id"
              element={<Post posts={posts} handleDelete={handleDelete} />}
            />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
