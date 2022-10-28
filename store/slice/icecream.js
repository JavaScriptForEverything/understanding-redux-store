import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/* return actionCreator
**					.panding
**					.fulfilled
**					.rejected
*/ 
export const fetchedIcecream = createAsyncThunk('icecream/icecream', async() => 100 )

const { reducer, actions } = createSlice({
	name: 'icecream',
	initialState: {
		loading: false,
		error: '',
		numberOfIcecream: 20
	}, 
	reducers: {
		requested: (state) => ({
			...state,
			loading: true,
			error: '',
		}),
		ordered: (state, action) => ({
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream - action.payload
		}),
		restored: (state, action) => ({
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream + action.payload
		}),
		failed: (state, action) => ({
			...state,
			loading: false,
			error: action.payload
		}),
	},

	// extraReducers: { 									// method-1: Object Style
	// 	['cake/ordered']: (state, action) => ({
	// 		...state,
	// 		numberOfIcecream: state.numberOfIcecream - 10
	// 	}),
	// }

	// extraReducers: (builder) => { 				// method-2: function Style
	// 	// builder.addCase('cake/orderCake', (state, action) => ({ 					// not work
	// 	builder.addCase(cakeSliceActions.ordered, (state, action) => ({ 		// It will work
	// 		...state,
	// 		numberOfIcecream: state.numberOfIcecream - 10
	// 	}))
	// }

	// handle asynchronous task from this slice or from any slice
	extraReducers: (builder) => {
		builder.addCase(fetchedIcecream.pending, (state, action) => ({
			...state,
			error: '',
			loading: true
		})) 
		builder.addCase(fetchedIcecream.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload.message
		}))
		builder.addCase(fetchedIcecream.fulfilled, (state, action) => ({
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream + action.payload
		}))
		
	}

})
export default reducer

export const orderIcecream = (qty = 1) => (dispatch) => {
	try {
		dispatch(actions.requested())
		dispatch(actions.ordered(qty))
	} catch (err) {
		dispatch(actions.failed(err.message))
	}
}
export const restoreIcecream = (qty = 1) => (dispatch) => {
	try {
		dispatch(actions.requested())
		dispatch(actions.restored(qty))
	} catch (err) {
		dispatch(actions.failed(err.message))
	}
}


