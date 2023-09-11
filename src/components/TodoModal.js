import { addToDo } from "@/redux/feauters/todoSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { BsFillCalendarDateFill } from "react-icons/bs";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

export const TodoModal = ({ showModal, setShowModal }) => {
  const [title, setTitle] = useState("");
  const [showCalender, setShowCalender] = useState(false);
  const [priority, setPriority] = useState("");
  const [value, onChange] = useState(null);

  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addToDo({
        id: uuid(),
        title: title,
        status: "inComplete",
        createdAt: new Date().toLocaleString(),
        dueDate: value.toLocaleDateString(),
        priority: priority,
        userId: user.uid,
      })
    );
    setShowModal(false);
    setTitle("");
  };

  return (
    <>
      <dialog className={`modal ${showModal ? "modal-open" : ""}`}>
        <div className="modal-box rounded-md">
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-sm border-none outline-none absolute right-2 top-2 "
          >
            ✕
          </button>
          <h3 className="text-md">What do you want to record today?</h3>

          <div className="pt-3">
            <form method="dialog" onSubmit={(e) => handleSubmit(e)}>
              <div className="w-full form-control">
                <input
                  value={title}
                  type="text"
                  placeholder="Whats up?"
                  className="w-full rounded-md outline-none"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div
                onClick={() => setShowCalender(true)}
                className="w-full mt-4 px-2.5 py-2 cursor-pointer flex justify-between items-center border border-slate-500 rounded-md"
              >
                <div>
                  <p className="text-slate-800">
                    {value ? value.toLocaleDateString() : "Select Due Date"}
                  </p>
                </div>
                <div>
                  <BsFillCalendarDateFill />
                </div>
              </div>

              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text">Priority</span>
                </label>
                <select
                  onChange={(e) => setPriority(e.target.value)}
                  className="select select-bordered focus:outline-none"
                >
                  <option disabled defaultValue={"Low"}>Select Priority</option>
                  <option>High</option>
                  <option>Low</option>
                </select>
              </div>

              <button
                className="btn mt-2 text-blue-800 hover:bg-blue-100 flex justify-end modal-backdrop"
                disabled={title.length > 0 ? false : true}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog className={`modal ${showCalender ? "modal-open" : ""}`}>
        <div className="modal-box rounded-md flex flex-col items-center justify-center">
        <button
            onClick={() => setShowCalender(false)}
            className="btn btn-sm border-none outline-none absolute right-2 top-2 "
          >
            ✕
          </button>
          <Calendar onChange={onChange} value={value} />
          <button
            onClick={() => {
              setShowCalender(false);
            }}
            className="btn mt-2 text-blue-800 hover:bg-blue-100"
          >
            Save
          </button>
        </div>
      </dialog>
    </>
  );
};
