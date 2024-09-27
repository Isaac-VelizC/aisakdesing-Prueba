import "./styles/App.css";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { Router } from "./routes/sections";
import { ThemeProvider } from "./theme/theme-provider";

function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router/>
    </ThemeProvider>
  );
}

export default App;
