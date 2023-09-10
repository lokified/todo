import { deleteTodo, updateTodo } from "@/redux/feauters/todoSlice";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { TodoModal } from "./TodoModal";
import { BsFlagFill } from "react-icons/bs";

export const ToDoItem = ({ todo }) => {
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (todo.status == "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const onDeleteItem = () => {
    dispatch(deleteTodo(todo.id));
  };

  const onCompleteItem = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? "complete" : "inComplete",
      })
    );
  };

  const calculateTimeRemaining = (createdAt, dueDate) => {
    const timeDifference = dueDate - createdAt;

    if (timeDifference < 0) {
      return "The due date has passed.";
    }

    if (timeDifference == 0) {
      return "Due Today.";
    }

    // Get the number of milliseconds in a day.
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const days = Math.floor(timeDifference / millisecondsPerDay);

    let remainingTime = "";

    if (days > 0) {
      remainingTime += `Due in ${days} day${days == 1 ? "" : "s"}.`;
    }

    return remainingTime;
  };

  return (
    <>
      <TodoModal />

      <div className="w-full p-2 my-4 rounded-md shadow-inner bg-blue-100 flex justify-between items-center">
        <div className="flex">
          <div className="form-control">
            <input
              type="checkbox"
              className="checkbox border-none"
              onClick={onCompleteItem}
              checked={checked ? "checked" : ""}
            />
          </div>

          <div className="pl-2">
            <p className="text-xl">{todo.title}</p>

            <div className="mt-4 flex justify-center items-center">
              {todo.priority == "High" && (
                <div>
                  <BsFlagFill style={{ color: "red" }} />
                </div>
              )}

              <div>
                <p className="text-[0.8rem] text-zinc-500 ml-2">
                  {calculateTimeRemaining(
                    new Date(todo.createdAt),
                    new Date(todo.dueDate)
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={onDeleteItem}
          className="btn bg-zinc-100 rounded-md px-2 ml-2"
        >
          <AiFillDelete style={{ color: "dark-gray" }} />
        </div>
      </div>
    </>
  );
};
