const { legacy_createStore: createStore, combineReducers } = require('redux');
const cakeSlice = require('./slice/cake')
const icecreamSlice = require('./slice/icecream')

const reducer = combineReducers({
	cake: cakeSlice,
	icecream: icecreamSlice
})

const store = createStore(reducer)
module.exports = store