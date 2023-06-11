"use client";

import React, { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  useEffect(() => {
    async () => {
      const liff = (await import("@line/liff")).default;
      try {
        await liff.init({ liffId: "1660806822-nwa8VvQj" });
      } catch (error) {
        console.error("liff init error", error);
      }
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    };
  }, []);
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
