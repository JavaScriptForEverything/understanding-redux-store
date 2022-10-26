const store = require('./store')
const cakeSlice = require('./store/slice/cake')
const icecreamSlice = require('./store/slice/icecream')

store.dispatch(cakeSlice.orderCake())
store.dispatch(cakeSlice.orderCake(2))
store.dispatch(cakeSlice.orderCake(1))
store.dispatch(cakeSlice.restoreCake(5))

store.dispatch(icecreamSlice.orderIcecream(2))
store.dispatch(icecreamSlice.orderIcecream())
store.dispatch(icecreamSlice.orderIcecream(3))
store.dispatch(icecreamSlice.restoreIcecream(4))
