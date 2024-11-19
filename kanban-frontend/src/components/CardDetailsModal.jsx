import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import hamburger from "../assets/icon-vertical-ellipsis.svg";
import {
	currentBoardSelector,
	updateCardStatus,
	updateSubtask,
} from "../features/boards/boardsSlice";
import { useSelector, useDispatch } from "react-redux";
import MiniModal from "./MiniModal";
import Subtasks from "./Subtasks"


const CardDetailsModal = ({ card, onClose, openDeleteTaskModal, openEditTaskModal }) => {
	console.log("Card in modal", card);

	const currentBoard = useSelector(currentBoardSelector);
	const dispatch = useDispatch();

	// Local state to temporarily hold the status
	const [selectedStatus, setSelectedStatus] = useState(card.status);

	// mini modal state
	const [ miniModalOpen, setMiniModalOpen ] = useState(false)


	const handleStatusChange = (event) => {
		setSelectedStatus(event.target.value); // Update local state only
	};

	const handleModalClose = () => {
		if (selectedStatus !== card.status) {
			// Dispatch the action only if the status has changed
			dispatch(
				updateCardStatus({
					cardId: card.id,
					newStatus: selectedStatus,
				})
			);
		}
		onClose(); // Close the modal
	};

	const handleSubtaskToggle = (subtaskId, isCompleted) => {
		dispatch(
			updateSubtask({
				cardId: card.id,
				subtaskId,
				isCompleted: isCompleted,
			})
		);
	};

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-[60]"
			onClick={handleModalClose}
		>
			<div
				className="bg-white dark:bg-secondary-black  p-6 rounded-lg w-full flex flex-col gap-5"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={handleModalClose}
					className="text-red h-5 w-5 font-bold"
				>
					Close
				</button>
				<div className="flex justify-between relative">
					<h1 className="large-heading dark:text-white">
						{card.title}
					</h1>
					<button aria-label="Menu">
						<img
							src={hamburger}
							alt="Open menu"
							className="min-h-5 min-w-[4.62px]"
							onClick={() =>
								setMiniModalOpen(
									!miniModalOpen
								)
							}
						/>
					</button>
					{miniModalOpen && <MiniModal closeCard = {handleModalClose} openDeleteTaskModal={openDeleteTaskModal} openEditTaskModal={openEditTaskModal}/>}
				</div>
				<p className="body-large text-tertiary-gray">
					{card.description}
				</p>
				<form>
					<h2 className="font-bold text-tertiary-gray text-[12px] mb-3">
						Subtasks (
						{
							card.subtasks.filter(
								(sub) =>
									sub.isCompleted
							).length
						}{" "}
						of {card.subtasks.length})
					</h2>
					<Subtasks
						handleSubtaskToggle={
							handleSubtaskToggle
						}
						card={card}
					/>
					<div className="flex flex-col mt-5 gap-2">
						<label
							htmlFor="columns"
							className="font-bold text-xs text-tertiary-gray dark:text-white"
						>
							Current Status
						</label>
						<select
							onChange={
								handleStatusChange
							}
							value={selectedStatus}
							id="columns"
							name="columns"
							className=" font-bold dark:text-white text-xs border px-3 py-2 rounded appearance-none bg-[url('./assets/icon-chevron-down.svg')] bg-no-repeat bg-[center_right_12px] dark:bg-inherit"
						>
							{currentBoard.columns.map(
								(
									column,
									index
								) => (
									<option
										className="dark:bg-secondary-black"
										key={
											index
										}
										value={
											column.name
										}
									>
										{
											column.name
										}
									</option>
								)
							)}
						</select>
					</div>
				</form>
			</div>
		</div>
	);
};

CardDetailsModal.propTypes = {
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
	onClose: PropTypes.func.isRequired,
	openDeleteTaskModal: PropTypes.func.isRequired,
	openEditTaskModal: PropTypes.func.isRequired,
};

export default CardDetailsModal;
