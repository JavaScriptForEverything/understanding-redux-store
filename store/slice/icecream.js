const ICECREAM_REQUSTED = 'icecream/requested'
const ICECREAM_ORDRED = 'icecream/ordered'
const ICECREAM_RESTORED = 'icecream/restored'
const ICECREAM_FAILED = 'icecream/failed'

const initialState = {
	loading: false,
	error: '',
	numberOfIcecream: 20
}

const reducer = (state = initialState, action) => {
	switch(action.type) {

		case ICECREAM_REQUSTED: return {
			...state,
			loading: true,
			error: '',
		}
		case ICECREAM_ORDRED: return {
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream - action.payload
		}
		case ICECREAM_RESTORED: return {
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream + action.payload
		}
		case ICECREAM_FAILED: return {
			...state,
			loading: false,
			error: action.payload
		}

		default: return state
	}
}

module.exports = reducer



module.exports.orderIcecream = (qty = 1) => (dispatch) => {
	dispatch({
		type: ICECREAM_ORDRED,
		payload: qty
	})
}

module.exports.restoreIcecream = (qty = 1) => (dispatch) => {
	dispatch({
		type: ICECREAM_RESTORED,
		payload: qty
	})
}