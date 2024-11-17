import { createSlice } from "@reduxjs/toolkit";
import data from '../../../data.json'

const savedBoardIndex = window.localStorage.getItem("currentBoardIndex");
const initialState = {
	boards: data.boards,
	currentBoardIndex: savedBoardIndex ? parseInt(savedBoardIndex, 10) : 0,
	selectedCard: null,
}

const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		setCurrentBoard: (state, action) => {
			state.currentBoardIndex = action.payload;
			window.localStorage.setItem("currentBoardIndex", action.payload);
		},
		selectCard: (state, action) => {
			state.selectedCard = action.payload; // Set the selected card details
		},
		clearSelectedCard: (state) => {
			state.selectedCard = null; // Clear the selected card when modal is closed
		},
	},
});

export default boardsSlice.reducer;
export const currentBoardSelector = (state) => state.boards.boards[state.boards.currentBoardIndex];
export const { setCurrentBoard, selectCard, clearSelectedCard } = boardsSlice.actions;
export const selectedCardSelector = (state) => state.boards.selectedCard;
