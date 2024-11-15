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
	},
});

export default boardsSlice.reducer;
export const currentBoardSelector = (state) => state.boards.boards[state.boards.currentBoardIndex];
export const { setCurrentBoard } = boardsSlice.actions;
