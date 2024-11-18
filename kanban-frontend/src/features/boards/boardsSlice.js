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
		updatedCardStatus: (state, action) => {
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
		}
	},
});

export default boardsSlice.reducer;
export const currentBoardSelector = (state) => state.boards.boards[state.boards.currentBoardIndex];
export const { setCurrentBoard, updatedCardStatus } = boardsSlice.actions;
