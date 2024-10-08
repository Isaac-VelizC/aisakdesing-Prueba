import "./styles/App.css";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { Router } from "./routes/sections";
import { ThemeProvider } from "./theme/theme-provider";
import "./firebase"; // Asegúrate de importar esto pr
import { AuthProvider } from "./context/AuthContext";

function App() {
  useScrollToTop();

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
