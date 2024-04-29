import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { Nullable, User } from "../types";

const UserContext = createContext<Nullable<User>>(null);

const UserSetterContext = createContext<null | React.Dispatch<
  React.SetStateAction<Nullable<User>>
>>(null);

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<Nullable<User>>(null);

  return (
    <UserSetterContext.Provider value={setUser}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </UserSetterContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export const useUserSetter = () => useContext(UserSetterContext);
