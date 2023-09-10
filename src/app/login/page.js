"use client";
import { login } from "@/redux/feauters/authSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword, auth } from "../../firebase/config";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const dispatch = useDispatch();

  const onSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        dispatch(
          login({
            uid: user.uid,
            email: user.email,
          })
        );

        router.push("/dashboard");
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsLoading(false);
        setErrorMessage(errorMessage);
      });
  };

  const onSignIn = (data) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((result) => {
        dispatch(
          login({
            uid: result.user.uid,
            email: result.user.email,
          })
        );

        router.push("/dashboard");
        setIsLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        setIsLoading(false);
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
              <p>Welcome back!</p>
            </div>
            <div className="md:w-8/12 lg:w-11/12 mt-5">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full hidden lg:block"
                alt="Phone image"
              />
            </div>
          </div>

          <div className="w-full my-2 lg:12 lg:mt-12">
            <div className="bg-zinc-100 p-8 rounded-md flex flex-col items-center lg:shadow-md">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-blue-800">Sign In</h1>
              </div>

              <h1 className="text-lg mb-5">Enter your details to sign in.</h1>
              <form onSubmit={handleSubmit(onSignIn)}>
                <div className="w-full">
                  <input
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
                    type="password"
                    placeholder="password"
                    className={`w-full rounded mt-4 ${
                      isLoading ? "opacity-25" : "opacity-100"
                    }`}
                    {...register("password", { required: true })}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full p-2 mt-8 bg-blue-800 text-white rounded uppercase ${
                    isLoading ? "opacity-25" : "opacity-100"
                  } transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                >
                  Sign In
                </button>
              </form>

              <div className="mt-4 flex flex-wrap items-center justify-center">
                <p> Don't have an account?</p>

                <a href="/register" className="ml-2 text-blue-800">
                  Sign Up
                </a>
              </div>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>

              <a
                onClick={() => onSignInWithGoogle()}
                className="w-60 p-3 mt-4 bg-zinc-100 cursor-pointer rounded-md flex items-center justify-center shadow-[0_4px_9px_-4px_#3b71ca] transition duration 300ms ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                <FcGoogle style={{ marginRight: "1rem" }} />
                Sign in with Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
