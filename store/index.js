import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from  'next-redux-wrapper'

import cakeSlice from './slice/cake'
import icecreamSlice from './slice/icecream'


const makeStore = () => configureStore({
	reducer: {
		cake: cakeSlice,
		icecream: icecreamSlice
	},
	middleware: (getMiddlewares) => [...getMiddlewares()]
})
export const wrapper = createWrapper(makeStore, { debug: false })
