import { NavLink } from "react-router-dom";
import "./homepage.style.scss";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import { Feed } from "../../Feed";
export const HomePage = () => {
  const { searchresult, isLoading, fetchError } = useContext(DataContext);
  return (
    <div>
      {isLoading && <p className="loading">Data is loading...</p>}
      {!isLoading && fetchError && <p className="error">{fetchError}</p>}
      {!isLoading &&
        !fetchError &&
        (searchresult.length ? (
          searchresult.map((post) => (
            <Feed key={post.id} post={post} NavLink={NavLink} />
          ))
        ) : (
          <p className="no-post">No posts to display</p>
        ))}
    </div>
  );
};
