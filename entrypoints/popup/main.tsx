import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style.css";
import { Providers } from "@/src/providers/Providers.tsx";
import { ConsoleOutput } from "@/src/dev/ConsoleOutput.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
    {/* <ConsoleOutput /> */}
  </Providers>
);
