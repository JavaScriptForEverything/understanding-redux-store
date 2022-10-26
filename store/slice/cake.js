const CAKE_ORDRED = 'cake/ordered'

const initialState = {
	numberOfCake: 10
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case CAKE_ORDRED: return {
			...state,
			numberOfCake: state.numberOfCake - action.payload
		}

		default: return state
	}
}
module.exports = reducer


module.exports.orderCake = (qty = 1) => {
	return {
		type: CAKE_ORDRED,
		payload: qty
	}
}