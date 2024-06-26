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
  UploadedSales,
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
            {user.role === Role.ADMIN && (
              <>
                <Route index element={<Navigate to={PATHS.ORGANIZATIONS} />} />
                <Route path={PATHS.ORGANIZATIONS} element={<Organizations />} />
              </>
            )}
            {user.role === Role.CHIEF && (
              <>
                <Route index element={<Navigate to={PATHS.SUPERVISORS} />} />
                <Route path={PATHS.SUPERVISORS} element={<Supervisors />} />
              </>
            )}
            {[Role.CHIEF, Role.SUPERVISOR].includes(user.role) && (
              <>
                <Route index element={<Navigate to={PATHS.CATEGORIES} />} />
                <Route path={PATHS.CATEGORIES} element={<Categories />} />
                <Route path={PATHS.BRANCHES} element={<Branches />} />
                <Route path={PATHS.SALE_STATISTICS} element={<Metrics />} />
                <Route
                  path={PATHS.UPLOADED_SALES}
                  element={<UploadedSales />}
                />
              </>
            )}
          </Route>
        )}
        {!user && <Route path={PATHS.LOGIN} element={<Login />} />}
        <Route path="*" element={<Navigate to={PATHS.MAIN} />} />
      </Routes>
    </BrowserRouter>
  );
};
