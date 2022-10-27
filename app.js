const store = require('./store')
const cakeSlice = require('./store/slice/cake')
const icecreamSlice = require('./store/slice/icecream')


const unsubscribe = store.subscribe(() => console.log(store.getState()))

// // 1. dispatch plain object: default Style
// store.dispatch({ type: 'cake/ordered', payload: 1 })


// // 2. dispatch action instead of plain object: possible by the middleware
// store.dispatch((dispatch) => {
// 	dispatch({ type: 'cake/ordered', payload: 1 })
// })


store.dispatch(icecreamSlice.fetchedIcecream())
store.dispatch(icecreamSlice.fetchedIcecream()) 	// require to show 1st async output



unsubscribe()