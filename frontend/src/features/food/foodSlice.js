import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import foodService from "./foodService";
//error message util for DRY
import { extractErrorMessage } from "../../utils";

const initialState = {
	foodItem: {},
	foodList: [],
	isLoading: false,
};

//Add a food to the user's list via foodDetails page
export const addFood = createAsyncThunk(
	"food/addFood",
	async (foodData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await foodService.addFood(foodData, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

//Get the user's foods to display on the dashboard
export const getFoods = createAsyncThunk(
	"food/getFoods",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await foodService.getFoods(token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

//Get the singular food
export const getFood = createAsyncThunk(
	"food/getFood",
	async (foodId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await foodService.getFood(foodId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const foodSlice = createSlice({
	name: "food",
	initialState,
	reducers: {
		resetFood: (state) => {
			state.foodItem = {};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addFood.fulfilled, (state, action) => {
				state.isLoading = false;
				state.foodList.push(action.payload);
			})
			.addCase(getFoods.pending, (state) => {
				state.foodList = null;
			})
			.addCase(getFoods.fulfilled, (state, action) => {
				state.foodList = action.payload;
			})
			.addCase(getFood.fulfilled, (state, action) => {
				state.foodItem = action.payload;
			});
	},
});

export const { resetFood } = foodSlice.actions;
export default foodSlice.reducer;
