import { createSlice } from "@reduxjs/toolkit";
import data from '../../../data.json'
import { v4 as uuidv4 } from 'uuid';

const savedBoardIndex = window.localStorage.getItem("currentBoardIndex");
const initialState = {
	boards: data.boards,
	currentBoardIndex: savedBoardIndex ? parseInt(savedBoardIndex, 10) : 0,
}

const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		setCurrentBoard: (state, action) => {
			state.currentBoardIndex = action.payload;
			window.localStorage.setItem("currentBoardIndex", action.payload);
		},
		updateCardStatus: (state, action) => {
			const { cardId, newStatus } = action.payload;

			const sourceColumn = state.boards[state.currentBoardIndex].columns.find(column =>
				column.tasks.some(task => task.id === cardId)
			)

			if (sourceColumn) {
				const taskIndex = sourceColumn.tasks.findIndex(task => task.id === cardId);
				const [task] = sourceColumn.tasks.splice(taskIndex, 1);

				task.status = newStatus;

				const targetColumn = state.boards[state.currentBoardIndex].columns.find(column =>
					column.name === newStatus
				);

				// Add the task to the new column
				targetColumn.tasks.push(task);
			}
		},

		updateSubtask: (state, action) => {
			const { subtaskId, isCompleted } = action.payload;

			const task = state.boards[state.currentBoardIndex].columns
				.flatMap(column => column.tasks) // Get all tasks from all columns
				.find(task => task.subtasks.some(sub => sub.id === subtaskId));  // Find the task containing the subtask

			if (task) {
				const subtask = task.subtasks.find(sub => sub.id === subtaskId);
				if (subtask) {
					subtask.isCompleted = isCompleted;
				}

			}
		},

		deleteTask: (state, action) => {
			const { cardId } = action.payload;

			const currentBoard = state.boards[state.currentBoardIndex];
			for (const column of currentBoard.columns) {
				const taskIndex = column.tasks.findIndex(task => task.id === cardId);
				if (taskIndex !== -1) {
					column.tasks.splice(taskIndex, 1);
					break;
				}
			}
		},

		editTask: (state, action) => {
			const { taskId, updatedData } = action.payload;

			// Find the column containing the task
			const sourceColumn = state.boards[state.currentBoardIndex].columns.find(
				column => column.tasks.some(task => task.id === taskId)
			);

			if (sourceColumn) {
				// Find the specific task to edit
				const taskIndex = sourceColumn.tasks.findIndex(task => task.id === taskId);
				if (taskIndex !== -1) {
					// Update the task's details
					const task = sourceColumn.tasks[taskIndex];
					task.title = updatedData.title || task.title;
					task.description = updatedData.description || task.description;

					// Update the task's status
					if (task.status !== updatedData.status) {
						// Remove the task from the current column
						sourceColumn.tasks.splice(taskIndex, 1);

						// Find the target column and add the task to it
						const targetColumn = state.boards[state.currentBoardIndex].columns.find(
							column => column.name === updatedData.status
						);

						if (targetColumn) {
							targetColumn.tasks.push({
								...task,
								status: updatedData.status,
							});
						}
					}

					// Update the subtasks
					if (updatedData.subtasks) {

						updatedData.subtasks.forEach(subtask => {
							if(!subtask.id) {
								subtask.id = uuidv4();
							}
						});

						task.subtasks = updatedData.subtasks;
					}
				}
			}
		},

		addNewTask: (state, action) => {
    			const { newTask } = action.payload;
    			const currentBoard = state.boards[state.currentBoardIndex];

    			// Push the new task to the current board's tasks
    			currentBoard.columns.forEach(column => {
        		if (column.name === newTask.status) {
            			column.tasks.push({
                		...newTask,
                		id: uuidv4(), // Generate a unique task ID
            		});
        }
    });
}

	},
});

export default boardsSlice.reducer;
export const currentBoardSelector = (state) => state.boards.boards[state.boards.currentBoardIndex];
export const { setCurrentBoard, updateCardStatus, updateSubtask, deleteTask, editTask, addNewTask } = boardsSlice.actions;
