import React, { useState } from "react";

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
      setDuplicateWarning(false);
      return;
    }

    setEmptyWarning(false);

    if (!isDuplicateName(newName)) {
      const randomCashierIndex = Math.floor(Math.random() * 3);
      const newItem: QueueItem = { id: Date.now(), name: newName };
      setQueues((prevQueues) => {
        const updatedQueues = [...prevQueues];
        const cashierQueue = updatedQueues[randomCashierIndex] || [];
        updatedQueues[randomCashierIndex] = [
          ...cashierQueue,
          newItem,
        ];
        return updatedQueues;
      });
      setInputValue("");
      setDuplicateWarning(false);
    } else {
      setDuplicateWarning(true);
    }
  };

  const handleDeleteCashier = (cashierIndex: number) => {
    if (queues[cashierIndex]?.length === 0) {
      setShowPopup(true);
    } else {
      setQueues((prevQueues) => {
        const newQueues = [...prevQueues];
        newQueues[cashierIndex] = newQueues[cashierIndex].slice(1);
        return newQueues;
      });
    }
    setEmptyWarning(false);
    setDuplicateWarning(false);
  };

  return (
    <div className="text-center mt-5 mx-auto">
      <div className="flex flex-wrap justify-evenly mt-5">
        {queues.map((queue, index) => (
          <div
            className="basis-[34%)] mt-5 mr-1 flex flex-col items-center"
            key={index}
          >
            <div className="bg-blue-500 p-8 rounded-md">
              <p className="text-white font-bold">Cashier {index + 1}</p>
            </div>
            <div className=" flex flex-col gap-4 mt-4">
              {queue.slice(0, index === 3 ? 2 : 3).map((item) => (
                <div
                  key={item.id}
                  className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center"
                >
                  <p className="text-white font-bold">{item.name}</p>
                </div>
              ))}
              {queue.length > (index === 3 ? 2 : 3) && (
                <div className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center">
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
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              onClick={() => handleDeleteCashier(0)}
            >
              Delete Cashier 1
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              onClick={() => handleDeleteCashier(1)}
            >
              Delete Cashier 2
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              onClick={() => handleDeleteCashier(2)}
            >
              Delete Cashier 3
            </button>
          </div>
        </form>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg z-10">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-red-600">Warning alert!</h2>
              <p className="text-lg my-2 font-semibold">No data is Deleted.</p>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LineContent;
