import React from "react";
import { useSelector } from "react-redux";
import Column from "./Column";
import { currentBoardSelector } from "../features/boards/boardsSlice";

// Predefined colors for the first three columns
const predefinedColors = ["#49C4E5", "#635FC7", "#67E2AE"];

// Function to generate a random pastel color
const generateRandomColor = () => {
	const hue = Math.floor(Math.random() * 360); // Random hue
	return `hsl(${hue}, 70%, 80%)`; // Pastel color
};

const Columns = () => {
	const currentBoard = useSelector(currentBoardSelector);

	return (
		<div className="mt-16 flex overflow-x-scroll p-4 gap-6 min-h-full">
			{currentBoard.columns.map((column, index) => {
				const circleColor =
					index < predefinedColors.length
						? predefinedColors[index]
						: generateRandomColor();

				return (
					<Column
						key={index}
						name={column.name}
						tasks={column.tasks}
						circleColor={circleColor}
					/>
				);
			})}
			<div className="min-w-[280px] dark:bg-secondary-black bg-secondary-light-gray flex-center rounded-lg min-h-[100vh]">
				<button className="bg-primary-blue h-12 w-44 rounded-3xl med-heading text-white">
					+ Add New Column
				</button>
			</div>
		</div>
	);
};

export default Columns;
