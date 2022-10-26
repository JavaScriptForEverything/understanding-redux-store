
const initialState = {
	numberOfCake: 10
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'ordered': return {
			...state,
			numberOfCake: state.numberOfCake - action.payload
		}

		default: return state
	}
}
module.exports = reducer