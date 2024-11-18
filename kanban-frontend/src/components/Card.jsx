import React, { useState } from "react";
import PropTypes from "prop-types";
import CardDetailsModal from "./CardDetailsModal";
import { useSelector } from "react-redux";
import { currentBoardSelector } from "../features/boards/boardsSlice";

const Card = ({ taskId }) => {
	const [isModalOpen, setModalOpen] = useState(false);
  const currentBoard = useSelector(currentBoardSelector);

  const task = currentBoard.columns.flatMap((column) => column.tasks).find((task) => task.id === taskId);

  if (!task) return null;
  
	return (
		<>
			<div
				className="bg-white dark:bg-secondary-black dark:text-white w-[280px] h-auto rounded-lg p-4 shadow-md"
				onClick={() => setModalOpen(true)}
			>
				<h2 className="med-heading mb-2">
					{task.title}
				</h2>
				<p className="text-tertiary-gray body-med">
					{
						task.subtasks.filter(
							(sub) => sub.isCompleted
						).length
					}{" "}
					of {task.subtasks.length} subtasks
				</p>
			</div>
			{isModalOpen && (
				<CardDetailsModal
					card={task}
					onClose={() => setModalOpen(false)}
				/>
			)}
		</>
	);
};


Card.propTypes = {
	taskId: PropTypes.string.isRequired, // Pass taskId instead of task prop
};

export default Card;
