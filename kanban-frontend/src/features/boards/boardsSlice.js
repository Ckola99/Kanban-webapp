import { createSlice } from "@reduxjs/toolkit";
import data from '../../../data.json'


const initialState = {
	boards: data.boards
}

const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {

	}
})

export default boardsSlice.reducer;
