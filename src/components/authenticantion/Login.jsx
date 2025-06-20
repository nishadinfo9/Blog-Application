import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../reuseable/Input";
import Button from "../../reuseable/Button";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submited = async (data) => {
    if (!data) return
    try {
      const session = await authService.login(data)
    if (session) {
      const getUser = await authService.getCurrentUser()
      dispatch(login(getUser))
      navigate('/')
      toast.success('login successfully')
    }
    } catch (error) {
      toast.error('login failed')
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral text-neutral-content p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">🔐 Login</h2>

        <form onSubmit={handleSubmit(submited)} className="space-y-4">
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
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
