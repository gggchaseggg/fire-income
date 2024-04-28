import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "../constants";
import { Layout } from "../../ui";
import { Login } from "../../pages";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.MAIN} element={<Layout />}>
          <Route index element={<div>main</div>} />
          <Route
            path={PATHS.ORGANIZATIONS}
            element={<div>ORGANIZATIONS</div>}
          />
          <Route path={PATHS.STAFF} element={<div>STAFF</div>} />
          <Route path={PATHS.CATEGORIES} element={<div>CATEGORIES</div>} />
          <Route path={PATHS.BRANCHES} element={<div>BRANCHES</div>} />
          <Route path="*" element={<div>404</div>} />
        </Route>
        <Route path={PATHS.LOGIN} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
