import { createSlice } from "@reduxjs/toolkit";
import data from '../../../data.json'

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

			const sourceColumn = state.boards[state.currentBoardIndex].columns.find( column =>
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
		}
	},
});

export default boardsSlice.reducer;
export const currentBoardSelector = (state) => state.boards.boards[state.boards.currentBoardIndex];
export const { setCurrentBoard, updateCardStatus, updateSubtask, deleteTask } = boardsSlice.actions;
