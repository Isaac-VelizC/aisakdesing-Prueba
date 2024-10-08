import "./styles/App.css";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { Router } from "./routes/sections";
import { ThemeProvider } from "./theme/theme-provider";
import "./firebase"; // Asegúrate de importar esto pr
import { AuthProvider } from "./context/AuthContext";
//import { useEffect } from "react";
//import { initializeFrameworks, initializeLanguajes } from "./services/initializeData";

function App() {
  useScrollToTop();
  /*useEffect(() => {
    const init = async () => {
      await initializeFrameworks();
      await initializeLanguajes();
    };
    init();
  }, []);*/

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
