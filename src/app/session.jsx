"use client";
import { SessionProvider } from "next-auth/react";

import React from "react";

export const Session = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
