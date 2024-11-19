import React from 'react';
import PropTypes from "prop-types";
import { deleteTask } from "../features/boards/boardsSlice";
import { useDispatch } from "react-redux";


const DeleteTaskModal = ({ closeDeleteTaskModal, card }) => {

  const dispatch = useDispatch()

  const handleDeleteTask = (cardId) => {
    dispatch(deleteTask({cardId}))
    closeDeleteTaskModal()
  }

  return (
		<div
			onClick={closeDeleteTaskModal}
			className="fixed inset-0 bg-black bg-opacity-50 flex-center p-4 z-[60]"
		>
			<div className="dark:bg-secondary-black bg-white p-5 flex flex-col gap-4 rounded-lg">
				<h2 className="large-heading text-red">
					Delete this task?
				</h2>
				<p className="body-large text-tertiary-gray ">
					Are you sure you want to delete the ‘
					{card.title}’ task and its subtasks?
					This action cannot be reversed.
				</p>
				<div className="flex flex-col gap-4">
					<button
						className="font-bold bg-red text-white rounded-full p-2"
						onClick={() =>
							handleDeleteTask(
								card.id
							)
						}
						aria-label={`Delete task ${card.title}`}
					>
						Delete
					</button>
					<button
						aria-label="Cancel deletion"
						onClick={closeDeleteTaskModal}
						className="font-bold dark:bg-white bg-secondary-light-gray text-primary-blue rounded-full p-2"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
  );
}

DeleteTaskModal.propTypes = {
	card: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		status: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		subtasks: PropTypes.arrayOf(
			PropTypes.shape({
				title: PropTypes.string.isRequired,
				isCompleted: PropTypes.bool.isRequired,
			}).isRequired
		).isRequired,
	}).isRequired,
	closeDeleteTaskModal: PropTypes.func.isRequired,
};


export default DeleteTaskModal
