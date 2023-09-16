import React from "react";
import AppRoutes from "./routes/Routes.jsx";
import { UserProvider } from "./context/UserContext.jsx";

const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
};

export default App;