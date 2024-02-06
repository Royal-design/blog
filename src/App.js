import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RootLayout } from "./RootLayout/RootLayout";
import { HomePage } from "./pages/Homepage/HomePage";
import { AboutPage } from "./pages/Aboutpage/AboutPage";
import { PostPage } from "./pages/PostPage/PostPage";
import { ErrorPage } from "./ErrorPage";
import { Post } from "./post/Post";
import { EditPost } from "./EditPost";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <BrowserRouter basename="/blog">
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
            <Route path="/edit/:id" element=<EditPost /> />
            <Route path="/post">
              <Route path="/post" element={<PostPage />} />
              <Route path="/post/:id" element={<Post />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
