import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from  'next-redux-wrapper'

const cakeSlice = require('./slice/cake')
const icecreamSlice = require('./slice/icecream')

const makeStore = () => configureStore({
	reducer: {
		cake: cakeSlice,
		icecream: icecreamSlice
	},
	middleware: (getMiddlewares) => [...getMiddlewares()]
})
export const wrapper = createWrapper(makeStore, { debug: false })
