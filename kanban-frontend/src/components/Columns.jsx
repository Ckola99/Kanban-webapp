import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "./Column";
import {
	currentBoardSelector,
	editBoardModalOpen,
	selectSidebarState,
	updateColumnTasks,
} from "../features/boards/boardsSlice";
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	PointerSensor,
} from "@dnd-kit/core";

// Predefined colors for the first three columns
const predefinedColors = ["#49C4E5", "#635FC7", "#67E2AE"];

// Function to generate a random pastel color
const generateRandomColor = () => {
	const hue = Math.floor(Math.random() * 360); // Random hue
	return `hsl(${hue}, 70%, 80%)`; // Pastel color
};

const Columns = () => {
	const currentBoard = useSelector(currentBoardSelector);
	const sidebarIsOpen = useSelector(selectSidebarState);
	const dispatch = useDispatch();

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (!over) return; // If there's no target (hovered area), exit

		const taskId = active.id;

		// Get the dragged task based on its ID
		let draggedTask;
		currentBoard.columns.forEach((column) => {
			const task = column.tasks.find(
				(task) => task.id === taskId
			);
			if (task) draggedTask = task;
		});

		// Get the target column based on the over element (hovered column)
		const targetColumnId = over.id;

		dispatch(
			updateColumnTasks({
				taskId,
				sourceColumn: draggedTask.status,
				destinationColumn: targetColumnId,
			})
		);
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		})
	);

	return (
		<div
			className={`relative mt-16 flex overflow-x-scroll p-6 gap-6 ${
				sidebarIsOpen && "md:ml-[261px]"
			} min-h-[100vh]`}
		>
			<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
				{currentBoard.columns.map((column, index) => {
					const circleColor =
						index < predefinedColors.length
							? predefinedColors[
									index
							  ]
							: generateRandomColor();

					return (
						<Column
							key={index}
							name={column.name}
							tasks={column.tasks}
							circleColor={
								circleColor
							}
						/>
					);
				})}
			</DndContext>

			<div className="min-w-[280px] dark:bg-secondary-black bg-secondary-light-gray flex-center rounded-lg max-h-[1024px]">
				<button
					onClick={() =>
						dispatch(editBoardModalOpen())
					}
					className="hover:bg-secondary-blue bg-primary-blue h-12 w-44 rounded-3xl med-heading text-white"
				>
					+ Add New Column
				</button>
			</div>
		</div>
	);
};

export default Columns;
