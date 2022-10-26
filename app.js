const store = require('./store')
const cakeSlice = require('./store/slice/cake')
const icecreamSlice = require('./store/slice/icecream')

// console.log(store.getState())
// const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'cake/ordered', payload: 1 })
store.dispatch(cakeSlice.orderCake(2))

store.dispatch({ type: 'icecream/ordered', payload: 1 })
store.dispatch(icecreamSlice.orderIcecream(5))

// unsubscribe()