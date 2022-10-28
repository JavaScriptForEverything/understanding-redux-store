const { configureStore } = require('@reduxjs/toolkit')
const { createWrapper } = require('next-redux-wrapper')
const logger = require('./middleware/logger')

// dispatchFunc => redux-thunk => already installed and configured with redux-toolkit
// const dispatchFunc = require('./middleware/dispatchFunc')

const cakeSlice = require('./slice/cake')
const icecreamSlice = require('./slice/icecream')


// const store = configureStore({
const makeStore = () => configureStore({
	reducer: {
		cake: cakeSlice,
		icecream: icecreamSlice
	},
	middleware: (getMiddlewares) => [...getMiddlewares(), logger]
})
// module.exports = store
const wrapper = createWrapper(makeStore, { debug: false })
module.exports = wrapper
