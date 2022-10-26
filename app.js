const store = require('./store')

console.log(store.getState())
const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'ordered', payload: 1 })

unsubscribe()