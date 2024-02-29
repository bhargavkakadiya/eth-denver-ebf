"use client";

import { useFormContext } from "react-hook-form";

const TextInput = ({ label, name, ...rest }: { label: string; name: string; [key: string]: any }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        className={`appearance-none border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        id={name}
        {...register(name, { required: "This field is required" })}
        {...rest}
      />
      {errors[name] && <p className="text-red-500 text-xs italic">{String(errors[name]?.message) || "Error"}</p>}
    </div>
  );
};

export default TextInput;
