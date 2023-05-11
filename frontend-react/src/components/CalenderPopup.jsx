import { useSelector } from "react-redux";
import { dispatch } from "../store";
import { appActions } from "../services/appReducer";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function CalenderPopup() {
  const calenderPopup = useSelector((state) => state.app.calenderPopup);
  const data = useSelector((state) => state.app.data);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const editInput = useRef(null);
  //   return <div>CalenderPopup {calenderPopup}</div>;
  console.log({ calenderPopup });
  const closePopup = () => {
    dispatch(appActions.setCalenderPopup(""));
  };
  const hSubmit = (e) => {
    closeEdit()
    e.preventDefault();
    // console.log(e, e.target.todo.value);
    if (text) {
      dispatch(appActions.updateTodos({ text }));
      setText("");
    }
  };
  const hDelete = (index) => {
    closeEdit()
    dispatch(appActions.deleteTodo({ index }));
  };
  const hEditChange = (e) => {
    setEditText(e.target.value);
  };
  const hEditSubmit = (e) => {
    if (e.code == "Enter") {
      dispatch(appActions.editTodo({ editIndex, editText }));
      closeEdit();
    }
  };
  const closeEdit = () => {
    setEditIndex(null);
    setEditText("");
  };
  const setEditInput = (i, text) => {
    setEditIndex(i);
    setEditText(text);
    setTimeout(()=>editInput.current.focus(), 10);
  };
  return (
    <motion.div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal={!!calenderPopup}
    >
      {!!calenderPopup && (
        <>
          <motion.div
            class="fixed inset-0 bg-black bg-opacity-75 transition-opacity "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.05 }}
                exit={{ opacity: 0 }}
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="flex items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      ✏️
                    </div>
                    <div class="mt-3 text-center ml-4 mt-0 text-left flex-1">
                      <h3
                        class="text-base font-semibold leading-6 text-gray-900 flex justify-between items-center "
                        id="modal-title"
                      >
                        Todo's for {calenderPopup}{" "}
                        <button
                          onClick={closePopup}
                          type="button"
                          class="mt-3 inline-flex justify-center  rounded-full bg-white px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </h3>

                      <div class="mt-2">
                        <ul className="list-disc pl-5 pt-3">
                          {data[calenderPopup]?.map((text, i) => (
                            <li key={i} className="text-md text-gray-700 pb-1">
                              <div className="flex justify-between pr-3">
                                {editIndex == i ? (
                                  <input
                                    ref={editInput}
                                    defaultValue={text}
                                    value={editText}
                                    onChange={hEditChange}
                                    onKeyDown={hEditSubmit}
                                    className="w-full text-left bg-transparent text-gray-700 outline-none border-b "
                                  ></input>
                                ) : (
                                  <span
                                    className="w-full text-left outline-none border-b border-transparent"
                                    onClick={() => setEditInput(i, text)}
                                  >
                                    {text}
                                  </span>
                                )}
                                <button
                                  className="hover:text-red-500 transition-all duration-75 p-1"
                                  onClick={() => hDelete(i)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 "
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <form
                  class="bg-gray-50 px-4 pt-1 pb-5 flex flex-row sm:px-6 sm:ml-14"
                  onSubmit={hSubmit}
                >
                  <input
                    name="todo"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 px-3 w-full rounded-l-md bg-transparent border-orange-500 border border-r-0 outline-none text-gray-700"
                  ></input>
                  <button
                    type="submit"
                    class="tracking-wider inline-flex justify-center rounded-r-md bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 "
                  >
                    ADD
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
