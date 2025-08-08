import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </AuthProvider>
    </>
  );
};

export default App;
