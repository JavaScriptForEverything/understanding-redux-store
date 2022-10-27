const { createSlice } = require('@reduxjs/toolkit')

const { reducer, actions } = createSlice({
	name: 'cake',
	initialState: {
		loading: false,
		error: '',
		numberOfCake: 10
	},
	reducers: {
		requested: (state) => ({
			...state,
			loading: true,
			error: ''
		}),
		ordered: (state, action) => ({
			...state,
			loading: false,
			numberOfCake: state.numberOfCake - action.payload
		}),
		restored: (state, action) => ({
			...state,
			loading: false,
			numberOfCake: state.numberOfCake + action.payload
		}),
		failed: (state, action) => ({
			...state,
			loading: false,
			error: action.payload
		})
	}
})
module.exports = reducer


module.exports.orderCake = (qty = 1) => (dispatch) => {
	try {
		dispatch(actions.requested())
		dispatch(actions.ordered(qty))
	} catch (err) {
		dispatch(actions.failed(req.message))
	}
}

module.exports.restoreCake = (qty = 1) => (dispatch) => {
	try {
		dispatch(actions.requested())
		dispatch(actions.restored(qty))
	} catch (err) {
		dispatch(actions.failed(err.message))
	}
}