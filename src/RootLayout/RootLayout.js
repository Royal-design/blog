import { NavLink, Outlet } from "react-router-dom";

import { Header } from "../Header/Header";
import "./rootlayout.style.scss";
import { Form } from "../Form/Form";
import { useContext } from "react";
import DataContext from "../context/DataContext";

export const RootLayout = () => {
  const { width, search, setsearch } = useContext(DataContext);
  return (
    <div className="root-layout">
      <Header width={width} />
      <Form NavLink={NavLink} search={search} setsearch={setsearch} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
