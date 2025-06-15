import React from "react";

const Button = ({ children, type, className = "" }) => {
  return (
    <button
      type={type}
      className={`btn btn-primary w-full text-white tracking-wide text-base${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
