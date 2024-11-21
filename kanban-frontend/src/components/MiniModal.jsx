import React, { useState } from 'react'
import PropTypes from "prop-types";

const MiniModal = ({ closeCard, openDeleteTaskModal, openEditTaskModal }) => {

	const handleDeleteTask = () => {
		closeCard()
		openDeleteTaskModal()
	}

	const handleEditTask = () => {
		closeCard()
		openEditTaskModal()
	}


  return (
		<div className="absolute z-[61] -right-10 top-[68px]">
			<div className=" dark:bg-primary-black bg-white h-24 w-[192px] flex flex-col justify-between p-4 rounded-lg ">
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
