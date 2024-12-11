import React from 'react'
import { useDispatch } from "react-redux";
import { workBoardClose } from "../features/pomodoro/pomodoroSlice";



const PomodoroBoard = () => {
	const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white dark:bg-secondary-black p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={() => dispatch(workBoardClose())}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
      </div>
    </div>
  )
}

export default PomodoroBoard
