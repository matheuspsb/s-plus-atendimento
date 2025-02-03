"use client";

import { store } from "@/store";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import ThemeCustomization from "./themes";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeCustomization>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </ThemeCustomization>
  );
}