import React, { useState } from 'react'
import PropTypes from "prop-types";
import { workBoardOpen } from '../features/pomodoro/pomodoroSlice';
import { useDispatch } from "react-redux"

const MiniModal = ({ closeCard, openDeleteTaskModal, openEditTaskModal }) => {

	const dispatch = useDispatch();

	const handleDeleteTask = () => {
		closeCard()
		openDeleteTaskModal()
	}

	const handleEditTask = () => {
		closeCard()
		openEditTaskModal()
	}

	const handleWorkOnTask = () => {
		closeCard()
		dispatch(workBoardOpen())
	}


  return (
		<div className="absolute z-[61] -right-10 top-[68px]">
			<div className=" dark:bg-primary-black bg-white w-[192px] flex flex-col justify-between p-4 rounded-lg max-h-[200px] gap-2">
				<button onClick={handleWorkOnTask} className="text-tertiary-gray text-left large-body">Work on Task</button>
				<button onClick={handleEditTask} className="text-tertiary-gray text-left large-body">
					Edit Task
				</button>
				<button onClick={handleDeleteTask} className="text-red text-left large-body items-center">
					Delete Task
				</button>

			</div>
		</div>
  );
}

MiniModal.propTypes = {
	openDeleteTaskModal: PropTypes.func.isRequired,
	closeCard: PropTypes.func.isRequired,
	openEditTaskModal: PropTypes.func.isRequired,
}

export default MiniModal
