const { configureStore } = require('@reduxjs/toolkit')
const logger = require('./middleware/logger')

// dispatchFunc => redux-thunk => already installed and configured with redux-toolkit
// const dispatchFunc = require('./middleware/dispatchFunc')

const cakeSlice = require('./slice/cake')
const icecreamSlice = require('./slice/icecream')


const store = configureStore({
	reducer: {
		cake: cakeSlice,
		icecream: icecreamSlice
	},
	middleware: (getMiddlewares) => [...getMiddlewares(), logger]
})
module.exports = store