import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ShowcasePage from "./components/ShowcasePage";
import SplashScreen from "./components/SplashScreen";
import "./styles.css";

function App() {
  const [ready, setReady] = useState(false);
  return (
    <>
      {!ready && <SplashScreen onComplete={() => setReady(true)} />}
      <div style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <ShowcasePage />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
