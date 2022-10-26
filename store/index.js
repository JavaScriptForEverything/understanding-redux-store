const { legacy_createStore: createStore } = require('redux');

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

const store = createStore(reducer)

console.log(store.getState())
const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'ordered', payload: 1 })

unsubscribe()