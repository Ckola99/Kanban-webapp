import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "./Column";
import {
	currentBoardSelector,
	editBoardModalOpen,
	selectSidebarState,
} from "../features/boards/boardsSlice";



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
	const dispatch = useDispatch()

	return (
		<div className={`relative mt-16 flex overflow-x-scroll p-6 gap-6 ${sidebarIsOpen && 'md:ml-[261px]'} min-h-[100vh]`}>
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
			<div className="min-w-[280px] dark:bg-secondary-black bg-secondary-light-gray flex-center rounded-lg">
				<button onClick={() => dispatch(editBoardModalOpen())} className="bg-primary-blue h-12 w-44 rounded-3xl med-heading text-white">
					+ Add New Column
				</button>
			</div>

		</div>
	);
};

export default Columns;
