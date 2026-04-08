import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <ThemeProvider>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 1500,
            className: "custom-toast",
            style: {
              borderRadius: "8px",
              fontWeight: "500",
            },
          }}
        />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
