import { UserContextProvider } from "./contexts";
import { Router } from "./routers";

function App() {
  return (
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  );
}

export default App;
