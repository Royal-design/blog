import "./form.style.scss";

export const Form = ({ search, setsearch, NavLink }) => {
  return (
    <form className="header-form" onSubmit={(e) => e.preventDefault}>
      <input
        className="header-input"
        type="text"
        value={search}
        placeholder="Search Posts"
        onChange={(e) => setsearch(e.target.value)}
      />
      <div className="navlink">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/post">Post</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </form>
  );
};
