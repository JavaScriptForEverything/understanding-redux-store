const store = require('./store')
const cakeSlice = require('./store/slice/cake')
const icecreamSlice = require('./store/slice/icecream')

// 1. dispatch plain object: default Style
store.dispatch({ type: 'cake/ordered', payload: 1 })


// 2. dispatch action instead of plain object: possible by the middleware
store.dispatch((dispatch) => {
	dispatch({ type: 'cake/ordered', payload: 1 })
})

// 3. do all the logics into particular dispatch, and in UI just call it.
store.dispatch(cakeSlice.orderCake())
store.dispatch(cakeSlice.orderCake(2))
store.dispatch(cakeSlice.orderCake(1))
store.dispatch(cakeSlice.restoreCake(5))

store.dispatch(icecreamSlice.orderIcecream(2))
store.dispatch(icecreamSlice.orderIcecream())
store.dispatch(icecreamSlice.orderIcecream(3))
store.dispatch(icecreamSlice.restoreIcecream(4))





/* Why we need to dispatch function instead object ?
		- for 2 reason:

		1. Suppose we need other module to dispatch, how do we do that ?
				. we can't create `const store = configureStore(...)`
				
					because it create new instance of store object which is completely different.
						- so how do we do that we have to pass `store` as argument to that module 

		2. in plain object we can't call api or any async task, but by function we can do that
*/