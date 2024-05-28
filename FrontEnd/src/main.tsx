import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import StoreApp from "./pages/StoreApp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StoreApp />,
    errorElement: <StoreApp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
