import { Link } from "react-router-dom";
import Squares from "./components/Squares";
import { Home } from "./screen/home";
import { AppRoutes } from "./routes/approutes";


function App() {
  return <div>
    <AppRoutes>
    <Home/>
    </AppRoutes>
  </div>
}

export default App;
