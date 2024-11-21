import React from 'react';
import PropTypes from "prop-types";
import { deleteBoard } from "../features/boards/boardsSlice";
import { useDispatch } from "react-redux";


const DeleteTaskModal = ({ board, closeDeleteModal }) => {

  const dispatch = useDispatch()
  console.log("current board:", board)

  const handleDeleteBoard = (board) => {
    dispatch(deleteBoard(board))
    closeDeleteModal()
  }

  return (
		<div
			onClick={closeDeleteModal}
			className="fixed inset-0 bg-black bg-opacity-50 flex-center p-4 z-[60]"
		>
			<div className="dark:bg-secondary-black bg-white p-5 flex flex-col gap-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
				<h2 className="large-heading text-red">
					Delete this board?
				</h2>
				<p className="body-large text-tertiary-gray ">
					Are you sure you want to delete the ‘
					{board.name}’ board and this action will remove all comns and tasks and cannot be reversed.
				</p>
				<div className="flex flex-col gap-4">
					<button
						className="font-bold bg-red text-white rounded-full p-2"
						onClick={() =>
							handleDeleteBoard(
								board.name
							)
						}
						aria-label={`Delete task ${board.name}`}
					>
						Delete
					</button>
					<button
						aria-label="Cancel deletion"
						onClick={closeDeleteModal}
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
  board: PropTypes.object.isRequired,  // Ensure board prop is passed as an object
  closeDeleteModal: PropTypes.func.isRequired,  // Ensure function for closing the modal is passed
};


export default DeleteTaskModal
