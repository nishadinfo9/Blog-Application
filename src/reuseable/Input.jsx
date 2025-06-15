import React, { forwardRef } from "react";

const Input = ({ label, type, className = "", ...props }, ref) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-white">{label}</span>
      </label>
      <input
      ref={ref}
      {...props}
        type={type}
        accept="image/*"
        className={`input input-bordered w-full bg-gray-700 text-white${className}`}
      />
    </div>
  );
};

export default forwardRef(Input);
