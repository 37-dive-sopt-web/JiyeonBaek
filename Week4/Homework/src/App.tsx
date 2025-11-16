import { themeClass } from "./styles/theme.css";
import "./styles/global.css.ts";
import "./styles/reset.css.ts";
import { AppRoutes } from "./routes";

const App = () => {
  return (
    <div className={themeClass}>
      <AppRoutes />
    </div>
  );
};

export default App;
