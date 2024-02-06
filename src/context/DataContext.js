import { createContext, useEffect, useState } from "react";

import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setposts] = useState([]);

  const [search, setsearch] = useState("");
  const [searchresult, setsearchresult] = useState([]);

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

  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setsearch,
        searchresult,
        isLoading,
        fetchError,
        setposts,
        posts
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
