import "./App.css";

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RootLayout } from "./RootLayout/RootLayout";
import { HomePage } from "./pages/Homepage/HomePage";
import { AboutPage } from "./pages/Aboutpage/AboutPage";
import { PostPage } from "./pages/PostPage/PostPage";
import { ErrorPage } from "./ErrorPage";
import { Post } from "./post/Post";

function App() {
  const [posts, setposts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "February 2, 2024 11:12:34 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsam, facilis ex similique commodi quam exercitationem pariatur dignissimos aperiam autem qui tempora error aliquid aspernatur sint sequi quis amet aliquam."
    },
    {
      id: 2,
      title: "My Second Post",
      datetime: "February 1, 2024 10:12:34 AM",
      body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis optio aliquam impedit deserunt? Expedita error quasi tenetur nam ducimus sequi non veritatis suscipit corrupti obcaecati quibusdam beatae reiciendis, esse nesciunt."
    },
    {
      id: 3,
      title: "My Third Post",
      datetime: "February 3, 2024 9:12:34 AM",
      body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem repellendus cupiditate fuga consequatur eaque temporibus, dolor iusto consequuntur minima ullam, porro facilis ratione unde culpa obcaecati deserunt vero quidem. Totam."
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "February 3, 2024 2:12:30 pM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia exercitationem optio aliquam, itaque placeat, quae dolore explicabo, laboriosam consequuntur veritatis obcaecati tempora fuga nam pariatur incidunt ipsum? Adipisci, illo aliquam."
    }
  ]);
  const [title, settitle] = useState("");
  const [newpost, setnewpost] = useState("");
  const [search, setsearch] = useState("");
  const [searchresult, setsearchresult] = useState([]);
  useEffect(() => {
    const saveNewpost = JSON.parse(localStorage.getItem("newpost"));

    if (saveNewpost) setposts(saveNewpost);

    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setsearchresult(filteredResults.reverse());
  }, [posts, search]);

  const handleDelete = (id) => {
    const newPost = posts.filter((post) => post.id !== id);
    setposts(newPost);
    localStorage.setItem("newpost", JSON.stringify(newPost));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
      const updatePost = [...posts, postObj];
      setposts(updatePost);
      settitle("");
      setnewpost("");
      localStorage.setItem("newpost", JSON.stringify(updatePost));
    }
  };
  return (
    <BrowserRouter basename="/blog">
      <Routes>
        <Route
          path="/"
          element={<RootLayout search={search} setsearch={setsearch} />}
        >
          <Route index element={<HomePage posts={searchresult} />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
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
