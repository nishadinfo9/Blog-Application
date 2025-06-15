import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../reuseable/Input";
import Button from "../../reuseable/Button";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submited = async (data) => {
    if (!data) return;

    try {
      await authService.createAccount(data);
      console.log("✅ Account created");

      const user = await authService.getCurrentUser();
      if (!user) throw new Error("Unable to fetch user data");

      dispatch(login(user))
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral text-neutral-content p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">🖊️ Register</h2>

        <form onSubmit={handleSubmit(submited)} className="space-y-4">
          <Input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />

          <Button type="submit" className="btn btn-primary w-full">
            Submit
          </Button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
