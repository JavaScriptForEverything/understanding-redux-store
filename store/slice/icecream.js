const ICECREAM_ORDRED = 'icecream/ordered'

const initialState = {
	numberOfIcecream: 20
}

const reducer = (state = initialState, action) => {
	switch(action.type) {

		case ICECREAM_ORDRED: return {
			...state,
			numberOfIcecream: state.numberOfIcecream - action.payload
		}

		default: return state
	}
}

module.exports = reducer


module.exports.orderIcecream = (qty = 1) => {
	return {
		type: ICECREAM_ORDRED,
		payload: qty
	}
}