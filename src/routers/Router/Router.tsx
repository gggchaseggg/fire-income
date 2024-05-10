import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "../constants";
import { Layout } from "../../ui";
import {
  Branches,
  Categories,
  Login,
  Organizations,
  Supervisors,
  Metrics,
} from "../../pages";
import { useUser } from "../../contexts";
import { Role } from "../../types";

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
        {user && (
          <Route path={PATHS.MAIN} element={<Layout />}>
            <Route index element={<div>Выберите вкладку</div>} />
            {user.role === Role.ADMIN && (
              <Route path={PATHS.ORGANIZATIONS} element={<Organizations />} />
            )}
            {user.role === Role.CHIEF && (
              <Route path={PATHS.SUPERVISORS} element={<Supervisors />} />
            )}
            {[Role.CHIEF, Role.SUPERVISOR].includes(user.role) && (
              <>
                <Route path={PATHS.CATEGORIES} element={<Categories />} />
                <Route path={PATHS.BRANCHES} element={<Branches />} />
              </>
            )}
            <Route path={PATHS.METRICS} element={<Metrics />} />
          </Route>
        )}
        {!user && <Route path={PATHS.LOGIN} element={<Login />} />}
        <Route path="*" element={<Navigate to={PATHS.MAIN} />} />
      </Routes>
    </BrowserRouter>
  );
};
