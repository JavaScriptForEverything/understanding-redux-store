const { legacy_createStore: createStore, combineReducers } = require('redux');
const cakeSlice = require('./slice/cake')

const reducer = combineReducers({
	cake: cakeSlice
})

const store = createStore(reducer)
module.exports = store