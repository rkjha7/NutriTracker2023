import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import foodService from "./foodService";
//error message util for DRY
import { extractErrorMessage } from "../../utils";

const initialState = {
	foodItem: {},
	foodList: [],
	foodSearchResults: [],
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

//Update a food's data via the gram value
export const updateFood = createAsyncThunk(
	"food/updateFood",
	async (foodData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await foodService.updateFood(
				foodData.updatedFoodId,
				foodData.updatedFood,
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

//Delete a food from the user's list
export const deleteFood = createAsyncThunk(
	"food/deleteFood",
	async (foodId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await foodService.deleteFood(foodId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

//Lookup a food (API call to FDC), used on the FoodDetails page
export const lookupFood = createAsyncThunk(
	"food/lookupFood",
	async (fdcId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await foodService.lookupFood(fdcId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

//Search the Fdc for foods given a search query, used on Search page
export const searchFoods = createAsyncThunk(
	"food/searchFoods",
	async (query, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await foodService.searchFoods(query, token);
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
			state.foodSearchResults = [];
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
			})
			.addCase(updateFood.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateFood.fulfilled, (state, action) => {
				state.isLoading = false;
				state.foodItem = action.payload;
			})
			.addCase(lookupFood.fulfilled, (state, action) => {
				state.foodItem = action.payload;
			})
			.addCase(searchFoods.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(searchFoods.fulfilled, (state, action) => {
				state.isLoading = false;
				state.foodSearchResults = action.payload;
			});
	},
});

export const { resetFood } = foodSlice.actions;
export default foodSlice.reducer;
