import "@app/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RoomsContextProvider from "@app/contexts/RoomsContextProvider";
import RootPageLayout from "@app/components/RootPageLayout";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RoomsContextProvider>
        <RootPageLayout>
          <Component {...pageProps} />
        </RootPageLayout>
      </RoomsContextProvider>
    </QueryClientProvider>
  );
}
