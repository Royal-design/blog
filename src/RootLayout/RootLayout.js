import { NavLink, Outlet } from "react-router-dom";

import { Header } from "../Header/Header";
import "./rootlayout.style.scss";
import { Form } from "../Form/Form";

export const RootLayout = ({ search, setsearch }) => {
  return (
    <div className="root-layout">
      <Header />
      <Form NavLink={NavLink} search={search} setsearch={setsearch} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
