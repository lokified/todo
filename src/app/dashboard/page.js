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
  const todosArrString = useSelector((state) => state.todoReducer.todoList);

  const router = useRouter();
  const dispatch = useDispatch();

  const filteredTodoList = todosArrString.filter(
    (todo) => todo.userId === user.uid
  );
  const sortedTodoList = [...filteredTodoList].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

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
          <h1 className="text-slate-900 text-3xl italic font-bold">ToDo</h1>
          <button
            onClick={() => onLogout()}
            className="btn bg-slate-800 text-white hover:bg-red-500 "
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
            {sortedTodoList.length  > 0? (
              sortedTodoList.map((todo) => {
                return <ToDoItem key={todo.id} todo={todo} />;
              })
            ) : (
              <p className="text-center text-zinc-500">Todo list is empty</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
