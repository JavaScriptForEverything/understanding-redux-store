const { legacy_createStore: createStore, combineReducers, applyMiddleware } = require('redux')
const logger = require('./middleware/logger')

const cakeSlice = require('./slice/cake')
const icecreamSlice = require('./slice/icecream')

const reducer = combineReducers({
	cake: cakeSlice,
	icecream: icecreamSlice
})

const store = createStore(reducer, applyMiddleware(logger))
module.exports = store