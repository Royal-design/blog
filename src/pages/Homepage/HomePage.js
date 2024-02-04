import { NavLink } from "react-router-dom";
import "./homepage.style.scss";
import { Feed } from "../../Feed";
export const HomePage = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Feed key={post.id} post={post} NavLink={NavLink} />
      ))}
    </div>
  );
};
