import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainLayout from "./layout/MainLayout";
import "../src/assets/css/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainLayout />
  </StrictMode>,
);
