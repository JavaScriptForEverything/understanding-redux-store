const CAKE_REQUESTED = 'cake/requested'
const CAKE_ORDRED = 'cake/ordered'
const CAKE_RESTORED = 'cake/restored'
const CAKE_FAILED = 'cake/failed'

const initialState = {
	loading: false,
	error: '',
	numberOfCake: 10
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case CAKE_REQUESTED: return {
			...state,
			loading: true,
			error: ''
		}
		case CAKE_ORDRED: return {
			...state,
			loading: false,
			numberOfCake: state.numberOfCake - action.payload
		}
		case CAKE_RESTORED: return {
			...state,
			loading: false,
			numberOfCake: state.numberOfCake + action.payload
		}
		case CAKE_FAILED: return {
			...state,
			loading: false,
			error: action.payload
		}

		default: return state
	}
}
module.exports = reducer


module.exports.orderCake = (qty = 1) => (dispatch) => {
	try {
		dispatch({ type: CAKE_REQUESTED })
		dispatch({ 
			type: CAKE_ORDRED,
			payload: qty
		})
	} catch (err) {
		dispatch({ 
			type: CAKE_FAILED,
			payload: err.message
		})
	}
}

module.exports.restoreCake = (qty = 1) => (dispatch) => {
	try {
		dispatch({ type: CAKE_REQUESTED })
		dispatch({ 
			type: CAKE_RESTORED,
			payload: qty
		})
	} catch (err) {
		dispatch({ 
			type: CAKE_FAILED,
			payload: err.message
		})
	}
}