import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

// Hide splash screen once app is mounted
if (typeof window.__hideSplash === "function") {
  window.__hideSplash();
}
