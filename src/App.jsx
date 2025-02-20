import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { CartProvider } from './contexts/CartContext'; 

const router = createRouter({ routeTree });


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
    },
  },
});

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <CartProvider> 
          <RouterProvider router={router} />
        </CartProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
