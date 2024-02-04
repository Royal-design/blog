export const Feed = ({ post, NavLink }) => {
  return (
    <div className="post">
      <NavLink to={`/post/${post.id}`}>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-date">{post.datetime}</p>
      </NavLink>
      <article className="post-body">{post.body}</article>
    </div>
  );
};
