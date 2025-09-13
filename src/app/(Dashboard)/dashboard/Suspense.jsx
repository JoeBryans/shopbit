"use client";
import React, { Suspense } from "react";

const Suspensed = ({ children }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default Suspensed;
