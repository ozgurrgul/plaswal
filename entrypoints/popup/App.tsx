import "./App.css";
import { Providers } from "@/Providers";
import { ConsoleOutput } from "@/src/dev/ConsoleOutput";

function App() {
  return (
    <>
      <Providers>
        <div style={{ color: "red" }}>hello!</div>
        <ConsoleOutput />
      </Providers>
    </>
  );
}

export default App;
