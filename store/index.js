const { legacy_createStore: createStore, combineReducers, applyMiddleware } = require('redux')
const logger = require('./middleware/logger')
const dispatchFunc = require('./middleware/dispatchFunc')

const cakeSlice = require('./slice/cake')
const icecreamSlice = require('./slice/icecream')

const reducer = combineReducers({
	cake: cakeSlice,
	icecream: icecreamSlice
})

const store = createStore(reducer, applyMiddleware(dispatchFunc, logger))
module.exports = store