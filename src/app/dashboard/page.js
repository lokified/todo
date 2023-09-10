"use client";

import { auth } from "@/firebase/config";
import { logOut } from "@/redux/feauters/authSlice";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcAddRow } from "react-icons/fc";
import { TodoModal } from "@/components/TodoModal";
import { ToDoItem } from "@/components/ToDoItem";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.authReducer.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const todosArrString = useSelector((state) => state.todoReducer.todoList);
  const sortedTodoList = [...todosArrString];
  sortedTodoList
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((todo) => todo.userId === user.uid);

  const onLogout = () => {
    signOut(auth);
    dispatch(logOut());
    router.push("/");
  };

  return (
    <>
      <TodoModal showModal={showModal} setShowModal={setShowModal} />

      <div className="container py-6">
        <div className="container flex justify-around items-center">
          <h1 className="text-blue-400 text-xl">Welcome {user.email}</h1>
          <button
            onClick={() => onLogout()}
            className="btn bg-red-800 text-white hover:bg-red-500 "
          >
            Logout
          </button>
        </div>

        <div className="container px-4 lg:px-64 lg:py-12">
          <div className="flex justify-between items-center">
            <a
              onClick={() => setShowModal(true)}
              className="btn mb-4 bg-blue-800 text-white hover:bg-blue-500"
            >
              <span>
                <FcAddRow />
              </span>
              <p>New Todo</p>
            </a>
          </div>

          <div className="p-8 rounded-md bg-zinc-100">
            {sortedTodoList.map((todo) => {
              return <ToDoItem todo={todo} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}