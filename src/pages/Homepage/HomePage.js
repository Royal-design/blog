import { NavLink } from "react-router-dom";
import "./homepage.style.scss";
import { Feed } from "../../Feed";
export const HomePage = ({ posts, isLoading, fetchError }) => {
  return (
    <div>
      {isLoading && <p className="loading">Data is loading...</p>}
      {!isLoading && fetchError && <p className="error">{fetchError}</p>}
      {!isLoading &&
        !fetchError &&
        (posts.length ? (
          posts.map((post) => (
            <Feed key={post.id} post={post} NavLink={NavLink} />
          ))
        ) : (
          <p className="no-post">No posts to display</p>
        ))}
    </div>
  );
};
