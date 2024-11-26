import React from 'react';
import PropTypes from "prop-types";
import { deleteBoard } from "../features/boards/boardsSlice";
import { useDispatch } from "react-redux";


const DeleteTaskModal = ({ board, closeDeleteModal }) => {

  const dispatch = useDispatch()

  const handleDeleteBoard = (board) => {
    dispatch(deleteBoard({boardId: board.id}))
    closeDeleteModal()
  }

  return (
		<div
			onClick={closeDeleteModal}
			className="fixed inset-0 bg-black bg-opacity-50 flex-center p-4 z-[60]"
		>
			<div className="dark:bg-secondary-black bg-white p-5 flex flex-col gap-4 rounded-lg w-full max-w-[480px] md:p-8" onClick={(e) => e.stopPropagation()}>
				<h2 className="large-heading text-red">
					Delete this board?
				</h2>
				<p className="body-large text-tertiary-gray ">
					Are you sure you want to delete the ‘
					{board.name}’ board? This action will remove all columns and tasks and cannot be reversed.
				</p>
				<div className="flex flex-col gap-4 md:flex-row md:w-full">
					<button
						className="font-bold bg-red text-white rounded-full p-2 md:w-full hover:bg-secondary-red"
						onClick={() =>
							handleDeleteBoard(
								board
							)
						}
						aria-label={`Delete task ${board.name}`}
					>
						Delete
					</button>
					<button
						aria-label="Cancel deletion"
						onClick={closeDeleteModal}
						className="font-bold dark:bg-white bg-secondary-light-gray text-primary-blue rounded-full p-2 md:w-full"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
  );
}

DeleteTaskModal.propTypes = {
  board: PropTypes.object.isRequired,  // Ensure board prop is passed as an object
  closeDeleteModal: PropTypes.func.isRequired,  // Ensure function for closing the modal is passed
};


export default DeleteTaskModal
