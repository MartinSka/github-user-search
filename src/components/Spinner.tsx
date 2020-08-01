import React from "react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center flex-grow">
      <div className="spinner">
        <span className="invisible">Loading...</span>
      </div>
    </div>
  );
}
