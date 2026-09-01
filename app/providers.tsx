"use client";

import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "@/store";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {children}

      <Toaster
        position="top-right"
        richColors
        closeButton
      />
    </Provider>
  );
}