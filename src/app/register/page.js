"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, auth } from "../../firebase/config";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSignUp = async (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((result) => {
        router.push("/login");
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsLoading(false);

        setErrorMessage(errorMessage);
      });
  };

  return (
    <>
      {errorMessage && (
        <div class="toast toast-top toast-end">
          <div class="alert bg-red-500 text-white">
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      <div className="container h-full lg:px-24 md:px-16">
        <div className="lg:flex my-12 w-full">
          <div className="flex flex-col justify-center items-center">
            <div className="mb-4 flex flex-col items-center justify-center">
              <h1 className="text-6xl italic font-bold text-blue-800">ToDo</h1>
              <p>We are glad you are here!</p>
            </div>
            <div className="md:w-8/12 lg:w-11/12 mt-5">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full hidden lg:block"
                alt="Phone image"
              />
            </div>
          </div>
          <div className="w-full my-2 lg:12">
            <div className="bg-zinc-100 p-8 rounded-md flex flex-col items-center lg:shadow-md">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-blue-800">
                  Sign Up Here
                </h1>
              </div>

              <h1 className="text-lg mb-5">
                Enter your details to create account
              </h1>
              <form onSubmit={handleSubmit(onSignUp)}>
                <div className="w-full">
                  <input
                    disabled={isLoading}
                    value={email}
                    type="text"
                    placeholder="email"
                    className={`w-full rounded ${
                      isLoading ? "opacity-25" : "opacity-100"
                    }`}
                    {...register("email", {
                      required: "Email Address is required",
                      pattern:
                        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-[.7rem] text-red-500">
                    {errors.email.message}
                  </p>
                )}
                <div className="w-full">
                  <input
                    disabled={isLoading}
                    value={password}
                    type="password"
                    placeholder="password"
                    className={`w-full rounded mt-4 ${
                      isLoading ? "opacity-25" : "opacity-100"
                    }`}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="text-[.7rem] text-red-500">
                    {errors.password.message}
                  </p>
                )}

                <div className="w-full">
                  <input
                    disabled={isLoading}
                    type="password"
                    placeholder="confirm password"
                    className={`w-full rounded mt-4 ${
                      isLoading ? "opacity-25" : "opacity-100"
                    }`}
                    {...register("confirmPassword", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-[.7rem] text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}

                <button
                  disabled={isLoading}
                  type="submit"
                  className={`w-full p-2 mt-8 bg-blue-800 text-white rounded uppercase ${
                    isLoading ? "opacity-25" : "opacity-100"
                  } transition duration 300ms ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                >
                  Sign Up
                </button>
              </form>

              <div className="mt-8 flex flex-wrap items-center justify-center">
                <p> Already have an account?</p>

                <a href="/login" className="ml-2 text-blue-800">
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
