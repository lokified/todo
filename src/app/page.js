"use client";
import { login, logOut } from "@/redux/feauters/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth, onAuthStateChanged } from "../firebase/config";
import Login from "./login/page";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
          })
        );
        router.push("/dashboard");
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } else {
        dispatch(logOut());
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {isLoading ? (
        <div>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <Login />
      )}
    </main>
  );
}
