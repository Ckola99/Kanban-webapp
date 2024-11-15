import React from "react";
import Done from "./Done";
import DoingColumn from "./DoingColumn";
import TodoColumn from "./TodoColumn";
import { currentBoardSelector } from "../features/boards/boardsSlice";
import { useSelector } from "react-redux";

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
					<div
						className="flex flex-col gap-4 min-w-[280px]"
						key={index}
					>
						<div className="flex gap-3">
							<div
								className={`w-4 h-4 rounded-full`}
								style={{
									backgroundColor:
										circleColor,
								}}
							></div>
							<h1 className="small-heading text-tertiary-gray uppercase tracking-[1.25px]">
								{column.name} (
								{
									column
										.tasks
										.length
								}
								)
							</h1>
						</div>

						{column.tasks.map(
							(task, index) => {
								const completedSubtasks =
									task.subtasks.filter(
										(
											subtask
										) =>
											subtask.isCompleted
									).length;

								return (
									<div
										className=" bg-white dark:bg-secondary-black dark:text-white w-[280px] h-auto rounded-lg p-4 shadow-md "
										key={
											index
										}
									>
										<h2 className="med-heading mb-2">
											{
												task.title
											}
										</h2>
										<p className="text-tertiary-gray body-med">
											{
												completedSubtasks
											}{" "}
											of{" "}
											{
												task
													.subtasks
													.length
											}{" "}
											subtasks
										</p>
									</div>
								);
							}
						)}
					</div>
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
