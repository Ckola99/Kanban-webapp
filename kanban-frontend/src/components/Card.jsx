import React, { useState } from "react";
import PropTypes from "prop-types";
import CardDetailsModal from "./CardDetailsModal";
import { useSelector } from "react-redux";
import { currentBoardSelector } from "../features/boards/boardsSlice";
import DeleteTaskModal from "./DeleteTaskModal";
import EditTaskModal from "./EditTaskModal";
import { useDraggable } from "@dnd-kit/core";

const Card = ({ taskId }) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [isDeleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);
	const [isEditTaskModalOpen, setEditTaskModalOpen] = useState(false);
	const currentBoard = useSelector(currentBoardSelector);

	const task = currentBoard.columns
		.flatMap((column) => column.tasks)
		.find((task) => task.id === taskId);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		active,
	} = useDraggable({
		id: taskId,
	});

	const style = transform
		? {
				transform: `translate(${transform.x}px, ${transform.y}px)`,
				transition,
				cursor: active ? "grabbing" : "grab",
		  }
		: undefined;

	const handleClick = (e) => {
		if (e.type === "touchstart") {
			e.stopPropagation(); // Prevent touchstart interference
		}
		setModalOpen(true);
	};

	if (!task) return null;

	return (
		<>
			<div
				className="bg-white dark:bg-secondary-black dark:text-white w-[280px] h-auto rounded-lg p-4 shadow-md dark:shadow-md hover:text-primary-blue hover:cursor-grab active:cursor-grabbing dark:hover:text-primary-blue"
				ref={setNodeRef}
				{...listeners}
				{...attributes}
				style={style}
				onClick={handleClick}
			>
				<div style={{ touchAction: "none" }}>
					<h2 className="med-heading mb-2">
						{task.title}
					</h2>
					<p className="text-tertiary-gray body-med">
						{
							task.subtasks.filter(
								(sub) =>
									sub.isCompleted
							).length
						}{" "}
						of {task.subtasks.length}{" "}
						subtasks
					</p>
				</div>
			</div>

			{isModalOpen && (
				<CardDetailsModal
					card={task}
					onClose={() => setModalOpen(false)}
					openDeleteTaskModal={() =>
						setDeleteTaskModalOpen(true)
					}
					openEditTaskModal={() =>
						setEditTaskModalOpen(true)
					}
				/>
			)}
			{isDeleteTaskModalOpen && (
				<DeleteTaskModal
					card={task}
					closeDeleteTaskModal={() =>
						setDeleteTaskModalOpen(false)
					}
				/>
			)}
			{isEditTaskModalOpen && (
				<EditTaskModal
					taskCard={task}
					closeEditTaskModal={() =>
						setEditTaskModalOpen(false)
					}
				/>
			)}
		</>
	);
};

Card.propTypes = {
	taskId: PropTypes.string.isRequired, // Pass taskId instead of task prop
};

export default Card;
