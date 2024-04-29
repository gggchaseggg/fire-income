import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "../constants";
import { Layout } from "../../ui";
import { Login, Organizations } from "../../pages";
import { useUser } from "../../contexts";

export const Router = () => {
  const user = useUser();

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.LOGIN} element={<Login />} />
          <Route path="*" element={<Navigate to={PATHS.LOGIN} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.MAIN} element={<Layout />}>
          <Route index element={<div>Выберите вкладку</div>} />
          <Route path={PATHS.ORGANIZATIONS} element={<Organizations />} />
          <Route path={PATHS.STAFF} element={<div>STAFF</div>} />
          <Route path={PATHS.CATEGORIES} element={<div>CATEGORIES</div>} />
          <Route path={PATHS.BRANCHES} element={<div>BRANCHES</div>} />
        </Route>
        <Route path="*" element={<Navigate to={PATHS.MAIN} />} />
      </Routes>
    </BrowserRouter>
  );
};
