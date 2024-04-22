import React, { useState } from "react";
import PopupContent from "./PopupContent";

interface QueueItem {
  id: number;
  name: string;
}

const LineContent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [queues, setQueues] = useState<QueueItem[][]>([[], [], []]);
  const [emptyWarning, setEmptyWarning] = useState<boolean>(false);
  const [duplicateWarning, setDuplicateWarning] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [deletedCashierIndex, setDeletedCashierIndex] = useState<number | null>(
    null
);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
  setEmptyWarning(false);
  setDuplicateWarning(false);
};

const isDuplicateName = (name: string) => {
  return queues.some((queue) => queue.some((item) => item.name === name));
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const newName = inputValue.trim();
  if (newName === "") {
    setEmptyWarning(true);
    setInputValue("");
    return;
  }
  setEmptyWarning(false);

if (!isDuplicateName(newName)) {
  const randomCashierIndex = Math.floor(Math.random() * 3);
  const newItem: QueueItem = { id: Date.now(), name: newName };
  setQueues((prevQueues) => {
  const updatedQueues = [...prevQueues];
  const cashierQueue = updatedQueues[randomCashierIndex] || [];
  updatedQueues[randomCashierIndex] = [...cashierQueue, newItem];
  return updatedQueues;
});
  setInputValue("");
  } else {
  setDuplicateWarning(true);
  }
};

const handleDeleteCashier = (cashierIndex: number) => {
  const isQueueEmpty = queues[cashierIndex]?.length === 0;
  if (isQueueEmpty) {
    setDeletedCashierIndex(cashierIndex);
    setShowPopup(true);
  } else {
    setQueues((prevQueues) => {
    const newQueues = [...prevQueues];
    if (newQueues[cashierIndex] !== undefined) {
      const updatedQueue = newQueues[cashierIndex]?.slice(1);
        if (updatedQueue !== undefined) {
          newQueues[cashierIndex] = updatedQueue;
        }
      }
      return newQueues;
    });
  }
};

    return (
      <div className="text-center mt-5 mx-auto">
        <div className="flex flex-wrap justify-evenly mt-5">
          {queues.map((queue, index) => (
            <div
              className="basis-[34%)] mt-5 mr-1 flex flex-col items-center"
              key={index}
            >
              <div className="bg-blue-500 p-8 rounded-md hover:animate-pulse">
                <p className="text-white font-bold">Cashier {index + 1}</p>
              </div>
              <div className=" flex flex-col gap-4 mt-4">
                {queue.slice(0, index === 3 ? 2 : 3).map((item) => (
                  <div
                    key={item.id}
                    className="w-24 h-24 rounded-full bg-purple-400 flex items-center justify-center"
                  >
                    <p className="text-white font-bold">{item.name}</p>
                  </div>
                ))}
                {queue.length > (index === 3 ? 2 : 3) && (
                  <div className="w-24 h-24 rounded-full bg-purple-800 flex items-center justify-center">
                    <p className="text-white font-bold">
                      {queue.length - (index === 3 ? 2 : 3)} more person
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#F7EEDD] fixed left-0 w-full bottom-0 p-4">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center gap-44 items-center"
          >
            <div className="flex flex-col">
              <div>
                <input
                  className="bg-white shadow-md rounded px-4 pt-1 pb-1 mb-1"
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  placeholder="Name"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                  type="submit"
                >
                  Submit
                </button>
              </div>
              {emptyWarning && (
                <p className="text-red-500 text-l italic text-left">
                  Name cannot be empty.
                </p>
              )}
              {duplicateWarning && (
                <p className="text-red-500 text-l italic text-left">
                  Names may not be duplicated.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-1/5">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline ml-2 transition duration-300 ease-in-out transform hover:scale-110"
                onClick={() => handleDeleteCashier(0)}
              >
                Delete Cashier 1
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline ml-2 transition duration-300 ease-in-out transform hover:scale-110"
                onClick={() => handleDeleteCashier(1)}
              >
                Delete Cashier 2
              </button>
              <button
                className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline ml-2 transition-transform duration-300 transform hover:scale-110"
                onClick={() => handleDeleteCashier(2)}
              >
                Delete Cashier 3
              </button>
            </div>
          </form>
        </div>
        <PopupContent
          show={showPopup}
          message={
            deletedCashierIndex !== null
              ? `No data is deleted for Cashier ${deletedCashierIndex + 1}.`
              : undefined
          }
          onClose={() => {
            setShowPopup(false);
            setDeletedCashierIndex(null);
          }}
        />
      </div>
    );
  };

  export default LineContent;
