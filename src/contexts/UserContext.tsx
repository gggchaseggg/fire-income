import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

const UserContext = createContext("");

const UserSetterContext = createContext<null | React.Dispatch<
  React.SetStateAction<string>
>>(null);

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState("");

  return (
    <UserSetterContext.Provider value={setUser}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </UserSetterContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export const useUserSetter = () => useContext(UserSetterContext);
