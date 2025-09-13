"use client";
import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Loader = ({ isLoading }) => {
  return (
    <div className="flex items-center justify-center gap-1 hover:text-blue-600 ">
      Loading
      <BeatLoader
        color={"#fff"}
        loading={isLoading}
        size={8}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
