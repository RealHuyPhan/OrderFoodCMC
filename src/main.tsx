import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Roouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Roouter>
      <App />
    </Roouter>
  </QueryClientProvider>
);
