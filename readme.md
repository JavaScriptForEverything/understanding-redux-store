## Understand Redux and Redux-ToolKit the easiest way.

### How to Read A `repository` [ How to go back in Time: When written which codes ]

1. Click The **`19 commits`** link which is bellow the **`Code`** button
	- It will shows all the commits in reverse order

2. Go to last commit in the bottom and click on **`Commit Message`**
- Every commits has 2 line: 
	1. Commit Message: 	: **`creating first redux app`**
	2. Contributor Email: 	: **` JavaScriptForEverything committed N days ago`**

3. After clicking on any **`Commit Message`** you get bellow 3 option:
	- Left Panel	: To nevigating file as we do in IDE/Code editor 
	- Right Panel	: To See the codes on that commit: (as though we go back in Time)
	- Browse Files 	: On Top see a button: To get real files on that particular commit 


- Every commit goes one step of the redux concept.
- Read Step by Step means commits by commits.




#### Start From Here:

Suppose a customer want to buy a cake, 	then there happed 3 steps:

1. Customer:
	. order a cake, by telling how many he want.


2. Shopkeeper:
	. give the amount of quentity customer wanted.
	. take money and give a buing bill

3. Store: 
	. Store manager refill the cake sells after some times.


###### Summary shop vs reduxStore

	. Store 	| ReduxStore 	: is our **`redux store`** which is a immutable object.
	. ShopKeeper 	| Reducer 	: is the **`reducer`** function do the 2 step programmically.
	. Customer 	| dispatch 	: is the **`dispatch`** function which send data with order.



### Create Project

###### commands
```
$ mkdir redux-app && cd redux-app
$ yarn init -y
$ yarn add redux
$ yarn -D nodemon
$ code .
```


###### Project Structure
```
.
├── store
│   └── index.js
│ 
├── readme.md
├── package.json
└── yarn.lock
```


###### /store/index.js
```
const { legacy_createStore: createStore } = require('redux');

const initialState = {
	numberOfCake: 10
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'ordered': return {
			...state,
			numberOfCake: state.numberOfCake - action.payload
		}

		default: return state
	}
}

const store = createStore(reducer)

console.log(store.getState())
const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'ordered', payload: 1 })

unsubscribe()
```



###### /
```
// $ node store/index.js
$ node app.js
$ yarn start
$ yarn dev
```

### Other steps:
	- See the commits will show all the steps line by line



## Final Redux store:
### Keyfeatures
	. Setup Store in isolated directory, easy to place any project
	. Creating cusome 2 importent middleware: redux-thunk, and redux-logger
	. Enableing dispatch function instead of plain object to perform async operation
	. Seperate every logic into related slice.
	. The UI only use that they wanted to and all the business logics is seperate.


### Project Directory:
```
.
├── app.js
├── store
│   ├── index.js
│   │   
│   ├── middleware
│   │   ├── dispatchFunc.js
│   │   └── logger.js
│   │   
│   └── slice
│       ├── cake.js
│       └── icecream.js
│       
├── package.json
├── readme.md
└── yarn.lock
```

#### /store/index.js
```
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
```

#### /store/slice/cake.js
```
const CAKE_REQUESTED = 'cake/requested'
const CAKE_ORDRED = 'cake/ordered'
const CAKE_RESTORED = 'cake/restored'
const CAKE_FAILED = 'cake/failed'

const initialState = {
	loading: false,
	error: '',
	numberOfCake: 10
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case CAKE_REQUESTED: return {
			...state,
			loading: true,
			error: ''
		}
		case CAKE_ORDRED: return {
			...state,
			loading: false,
			numberOfCake: state.numberOfCake - action.payload
		}
		case CAKE_RESTORED: return {
			...state,
			loading: false,
			numberOfCake: state.numberOfCake + action.payload
		}
		case CAKE_FAILED: return {
			...state,
			loading: false,
			error: action.payload
		}

		default: return state
	}
}
module.exports = reducer


module.exports.orderCake = (qty = 1) => (dispatch) => {
	try {
		dispatch({ type: CAKE_REQUESTED })
		dispatch({ 
			type: CAKE_ORDRED,
			payload: qty
		})
	} catch (err) {
		dispatch({ 
			type: CAKE_FAILED,
			payload: err.message
		})
	}
}

module.exports.restoreCake = (qty = 1) => (dispatch) => {
	try {
		dispatch({ type: CAKE_REQUESTED })
		dispatch({ 
			type: CAKE_RESTORED,
			payload: qty
		})
	} catch (err) {
		dispatch({ 
			type: CAKE_FAILED,
			payload: err.message
		})
	}
}
```

#### /store/slice/icecream.js
```
const ICECREAM_REQUSTED = 'icecream/requested'
const ICECREAM_ORDRED = 'icecream/ordered'
const ICECREAM_RESTORED = 'icecream/restored'
const ICECREAM_FAILED = 'icecream/failed'

const initialState = {
	loading: false,
	error: '',
	numberOfIcecream: 20
}

const reducer = (state = initialState, action) => {
	switch(action.type) {

		case ICECREAM_REQUSTED: return {
			...state,
			loading: true,
			error: '',
		}
		case ICECREAM_ORDRED: return {
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream - action.payload
		}
		case ICECREAM_RESTORED: return {
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream + action.payload
		}
		case ICECREAM_FAILED: return {
			...state,
			loading: false,
			error: action.payload
		}

		default: return state
	}
}

module.exports = reducer



// module.exports.orderIcecream = (qty = 1) => (dispatch) => {
// 	dispatch({
// 		type: ICECREAM_ORDRED,
// 		payload: qty
// 	})
// }
module.exports.orderIcecream = (qty = 1) => (dispatch) => {
	try {
		dispatch({ type: ICECREAM_REQUSTED })
		dispatch({ 
			type: ICECREAM_ORDRED,
			payload: qty
		})
	} catch (err) {
		dispatch({ 
			type: ICECREAM_FAILED,
			payload: err.message
		})
	}
}
module.exports.restoreIcecream = (qty = 1) => (dispatch) => {
	try {
		dispatch({ type: ICECREAM_REQUSTED })
		dispatch({ 
			type: ICECREAM_RESTORED,
			payload: qty
		})
	} catch (err) {
		dispatch({ 
			type: ICECREAM_FAILED,
			payload: err.message
		})
	}
}
```


#### /store/middleware/logger.js
```
// Note: This middleware is known as `redux-logger middleware` which is a seperate package.

const logger = store => next => action => {
	console.log(store.getState())

	next(action)
}

module.exports = logger
```


#### /store/middleware/dispatchFunc.js
```
// Note: This middleware is known as `thunk middleware` which is already build in redux toolkit:

const dispatchFunction = ({ dispatch, getState }) => next => action => {
	// 1. check the type of action
	if(typeof action === 'function') {
		return action(dispatch, getState)
	}

	next(action)
}
module.exports = dispatchFunction

/* 2. if action is function instead of plain object, call that function by passing 2 args
** 	this 2 args will be available to that function: like: 
** 
** 	store.dispatch((dispatch, getState) => {
**  		// do some ajex called then finally call this dispatch
** 		dispatch({ type, payload })
**	})
** 
*/
```

#### /app.js
```
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





/* 
Why we need to dispatch function instead object ?
- for 2 reason:

1. Suppose we need other module to dispatch, how do we do that ?
	. we can't create `const store = configureStore(...)`
				
	because it create new instance of store object which is completely different.
	- so how do we do that we have to pass `store` as argument to that module 

2. in plain object we can't call api or any async task, but by function we can do that
*/
```

#### /package.json
```
{
  "name": "redux",
  "version": "1.0.0",
  "main": "app.js",
  "license": "MIT",
	"scripts": {
		"start" : "node .",
		"dev" : "nodemon ."
	},
  "dependencies": {
    "redux": "^4.2.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```



## Replace Redux with Redux-Toolkit
#### To replace `redux` with `@reduxjs/toolkit` only bellow changes will need and other remain same as it was
```
$ yarn add @reduxjs/toolkit
```


#### Old: /store/index.js
```
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
```

#### New: /store/index.js
```
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
```



## Redux-Toolkit Features
#### if `@reduxjs/toolkit` do the same as `redux` then why we need it ?

#### Key features of `@reduxjs/toolkit`
	. redux-toolkit remove boiler plate code we just have to use built-in methods
	. createSlice method do all the boiler place code behind the scene 
	. in redux every slice is isolated that others,
	. To modify one slice's state from other slice we have 2 ways to do that.
		1. By createSlice extra property `extraReducers` which also has 2 way: 
			. dispatch as regular way: used to handle outside Synchronous action
			. dispatch as builder way: used to handle outside Asynchronous action
		2. By middleware: 
			. Either custom middleware or
			. redux-thunk which is already configured with redux-toolkit

	. Why we need to midify one slice from other slice ?
		- There are some reason, if want to update product slice after transition complete (which may user slice)
		- in Next.js app when de-hydrade entire or particular slice then extraReducers do that.


### Replace Boilar plate code by `createSlice`

#### Key features of `@reduxjs/toolkit`

#### Reolace this old: /store/slice/cake.js
```
const CAKE_REQUESTED = 'cake/requested'
const CAKE_ORDRED = 'cake/ordered'
const CAKE_RESTORED = 'cake/restored'
const CAKE_FAILED = 'cake/failed'

const initialState = {
	loading: false,
	error: '',
	numberOfCake: 10
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case CAKE_REQUESTED: return {
			...state,
			loading: true,
			error: ''
		}
		case CAKE_ORDRED: return {
			...state,
			loading: false,
			numberOfCake: state.numberOfCake - action.payload
		}
		case CAKE_RESTORED: return {
			...state,
			loading: false,
			numberOfCake: state.numberOfCake + action.payload
		}
		case CAKE_FAILED: return {
			...state,
			loading: false,
			error: action.payload
		}

		default: return state
	}
}
module.exports = reducer


module.exports.orderCake = (qty = 1) => (dispatch) => {
	try {
		dispatch({ type: CAKE_REQUESTED })
		dispatch({ 
			type: CAKE_ORDRED,
			payload: qty
		})
	} catch (err) {
		dispatch({ 
			type: CAKE_FAILED,
			payload: err.message
		})
	}
}

module.exports.restoreCake = (qty = 1) => (dispatch) => {
	try {
		dispatch({ type: CAKE_REQUESTED })
		dispatch({ 
			type: CAKE_RESTORED,
			payload: qty
		})
	} catch (err) {
		dispatch({ 
			type: CAKE_FAILED,
			payload: err.message
		})
	}
}
```

#### Replace with this new: /store/slice/cake.js
```
const { createSlice } = require('@reduxjs/toolkit')

const { reducer, actions } = createSlice({
	name: 'cake',
	initialState: {
		loading: false,
		error: '',
		numberOfCake: 10
	},
	reducers: {
		requested: (state) => ({
			...state,
			loading: true,
			error: ''
		}),
		ordered: (state, action) => ({
			...state,
			loading: false,
			numberOfCake: state.numberOfCake - action.payload
		}),
		restored: (state, action) => ({
			...state,
			loading: false,
			numberOfCake: state.numberOfCake + action.payload
		}),
		failed: (state, action) => ({
			...state,
			loading: false,
			error: action.payload
		})
	}
})
module.exports = reducer


module.exports.orderCake = (qty = 1) => (dispatch) => {
	try {
		dispatch(actions.requested())
		dispatch(actions.ordered(qty))
	} catch (err) {
		dispatch(actions.failed(req.message))
	}
}

module.exports.restoreCake = (qty = 1) => (dispatch) => {
	try {
		dispatch(actions.requested())
		dispatch(actions.restored(qty))
	} catch (err) {
		dispatch(actions.failed(err.message))
	}
}
```




#### Reolace this old: /store/slice/icecream.js
```
const ICECREAM_REQUSTED = 'icecream/requested'
const ICECREAM_ORDRED = 'icecream/ordered'
const ICECREAM_RESTORED = 'icecream/restored'
const ICECREAM_FAILED = 'icecream/failed'

const initialState = {
	loading: false,
	error: '',
	numberOfIcecream: 20
}

const reducer = (state = initialState, action) => {
	switch(action.type) {

		case ICECREAM_REQUSTED: return {
			...state,
			loading: true,
			error: '',
		}
		case ICECREAM_ORDRED: return {
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream - action.payload
		}
		case ICECREAM_RESTORED: return {
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream + action.payload
		}
		case ICECREAM_FAILED: return {
			...state,
			loading: false,
			error: action.payload
		}

		default: return state
	}
}

module.exports = reducer



// module.exports.orderIcecream = (qty = 1) => (dispatch) => {
// 	dispatch({
// 		type: ICECREAM_ORDRED,
// 		payload: qty
// 	})
// }
module.exports.orderIcecream = (qty = 1) => (dispatch) => {
	try {
		dispatch({ type: ICECREAM_REQUSTED })
		dispatch({ 
			type: ICECREAM_ORDRED,
			payload: qty
		})
	} catch (err) {
		dispatch({ 
			type: ICECREAM_FAILED,
			payload: err.message
		})
	}
}
module.exports.restoreIcecream = (qty = 1) => (dispatch) => {
	try {
		dispatch({ type: ICECREAM_REQUSTED })
		dispatch({ 
			type: ICECREAM_RESTORED,
			payload: qty
		})
	} catch (err) {
		dispatch({ 
			type: ICECREAM_FAILED,
			payload: err.message
		})
	}
}
```

#### Replace with this new /store/slice/icecream.js
```
const { createSlice } = require('@reduxjs/toolkit')

const { reducer, actions } = createSlice({
	name: 'icecream',
	initialState: {
		loading: false,
		error: '',
		numberOfIcecream: 20
	}, 
	reducers: {
		requested: (state) => ({
			...state,
			loading: true,
			error: '',
		}),
		ordered: (state, action) => ({
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream - action.payload
		}),
		restored: (state, action) => ({
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream + action.payload
		}),
		failed: (state, action) => ({
			...state,
			loading: false,
			error: action.payload
		}),
	}
})
module.exports = reducer

module.exports.orderIcecream = (qty = 1) => (dispatch) => {
	try {
		dispatch(actions.requested())
		dispatch(actions.ordered(qty))
	} catch (err) {
		dispatch(actions.failed(err.message))
	}
}
module.exports.restoreIcecream = (qty = 1) => (dispatch) => {
	try {
		dispatch(actions.requested())
		dispatch(actions.restored(qty))
	} catch (err) {
		dispatch(actions.failed(err.message))
	}
}
```





## createSlice and extraReducers

### Why we need extraReducers
	. We need in 2 cases:
		1. if we need to change one slice's state based on other's action
		2. To handle async action no matter from which slice it comes from



### createSlice
```
const {} = createSlice({
	name: 'icecream',
	initialState: { loading: false, error: '', nmberOfIcecream: 10 },
	reducers: {
		ordred: (state, action) => ({
			...state,
			numberOfIcecream: state.numberOfIcecream - action.payload
		})
	},

	// Method-1: modify this slice's state based on other slice's dispatch 'cake/ordered'
	extraReducers: {
		['cake/ordered']: (state, action) => ({
			...state,
			numberOfIcecream: state.numberOfIcecream - action.payload
		})
	}

	// Method-2: modify this slice's state based on other slice's dispatch 'cake/ordered'
	extraReducers: (builder) => {
		builder.addCase(cakeSliceActions.ordred, (state, action) => {
			return {
				...state,
				numberOfIcecream: state.numberOfIcecream - action.payload
			}
		})
	}

	// Method-3: To handle async dispatch: no matter self slice or other slice's action

		// this function must be top of the createReducer
		const asyncFunc = createAsyncThuck('icecream/getIcecream', async() => 100)

	extraReducers: (builder) => {
		builder.addCase(asyncFunc.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(asyncFunc.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})
		builder.addCase(asyncFunc.fulfilled, (state, action) => {
			state.loading = false
			state.numberOfIcecream += 100
		})
	}

})
```

### Example of createSlice.extraReducers
#### /store/slice/icecream.js
```
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')
const { actions: cakeSliceActions } = require('./cake')

/* return actionCreator
**	.panding
**	.fulfilled
**	.rejected
*/ 
const fetchedIcecream = createAsyncThunk('icecream/icecream', async() => 100 )

const { reducer, actions } = createSlice({
	name: 'icecream',
	initialState: {
		loading: false,
		error: '',
		numberOfIcecream: 20
	}, 
	reducers: {
		requested: (state) => ({
			...state,
			loading: true,
			error: '',
		}),
		ordered: (state, action) => ({
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream - action.payload
		}),
		restored: (state, action) => ({
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream + action.payload
		}),
		failed: (state, action) => ({
			...state,
			loading: false,
			error: action.payload
		}),
	},

	// extraReducers: { 				// method-1: Object Style
	// 	['cake/ordered']: (state, action) => ({
	// 		...state,
	// 		numberOfIcecream: state.numberOfIcecream - 10
	// 	}),
	// }

	// extraReducers: (builder) => { 		// method-2: function Style
	// 	// builder.addCase('cake/orderCake', (state, action) => ({ 	// not work
	// 	builder.addCase(cakeSliceActions.ordered, (state, action) => ({ // It will work
	// 		...state,
	// 		numberOfIcecream: state.numberOfIcecream - 10
	// 	}))
	// }

	// handle asynchronous task from this slice or from any slice
	extraReducers: (builder) => {
		builder.addCase(fetchedIcecream.pending, (state, action) => ({
			...state,
			error: '',
			loading: true
		})) 
		builder.addCase(fetchedIcecream.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload.message
		}))
		builder.addCase(fetchedIcecream.fulfilled, (state, action) => ({
			...state,
			loading: false,
			numberOfIcecream: state.numberOfIcecream + action.payload
		}))
		
	}

})
module.exports = reducer

module.exports.orderIcecream = (qty = 1) => (dispatch) => {
	try {
		dispatch(actions.requested())
		dispatch(actions.ordered(qty))
	} catch (err) {
		dispatch(actions.failed(err.message))
	}
}
module.exports.restoreIcecream = (qty = 1) => (dispatch) => {
	try {
		dispatch(actions.requested())
		dispatch(actions.restored(qty))
	} catch (err) {
		dispatch(actions.failed(err.message))
	}
}


module.exports.fetchedIcecream = fetchedIcecream
```



#### /app.js
```
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
store.dispatch(icecreamSlice.fetchedIcecream()) // require to show 1st async output

unsubscribe()
```




## Redux with React
### When we use Redux our store folder remain exactly same as it was 
- When we use redux no matter where we use the above concept and code remains same.
- Just use ES Module syntax instead of CommonJS module syntax
- To use `Redux` in `react` we need another npm package `react-redux` to bind store with `React`


#### Required packages
`$ yarn add @reduxjs/toolkit react-redux`

#### /index.js 	/index.jsx 	
```
import { Provider } from 'react-redux'
import store from './store' 			// /store/index.js 	
....
return (
	<Provider store={store}>
		<App />
	</Provider>
)

```


#### /App.js
```
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
	const { numberOfCake } = useSelector(state => state.cake) 		// read from cake slice
	const { numberOfIcecreame } = useSelector(state => state.icecream) 	// read from icecream slice

	/* Note: `cake` and the `icecream` is the exact text which we given where we combine slice
		reducer: {
			cake: cakeReducer, 		// `cake` 	string
			icecream: icecreamReducer, 	// `icecream` 	string
		}
	*/ 

	const dispatch = useDispatch()
	const handleCakeOrder = () => dispatch(cakeSlice.orderCake()) 		// modify cake slice
	const handleIcecreamOrder = () => dispatch(icecreamSlice.orderIcecream(2)) // modify icecream slice

	return (
		<>
			<h2> Cake remains: {numberOfCake} </h2>
			<h2> Icecream remains: {numberOfIcecream} </h2>

			<button onClick={handleCakeOrder}> Order Cake </button>
			<button onClick={handleIcecreamOrder}> Order Icecream </button>
		</>
	)
}

```



## Redux with Next.js
### Setup `Redux` in `Next.js` same as `React` but little change
- In `Next.js` we have option to dispatch from Client-Side and Server-Side
- To handle dispatch from server-side we require one more package `next-redux-wrapper`

### Required packages
`$ yarn add @reduxjs/toolkit react-redux next-redux-wrapper`


### /store/index.js
```
import { createWrapper } from 'next-redux-wrapper'
...
// const store = configureStore(...)
const makeStore = () => configureStore(...)

export const wrapper = createWrapper(makeStore)
```

### /pages/_app.js
```
import { Provider } from 'react-redux'
const { wrapper } from '../store'

export default function MyApp ({ Component, ...rest }) {
	const { store, props } = wrapper.useWrappedStore(rest)
	const { pageProps } = props

	return (
		<Provider store={store}>
			<Component {...pageProps} >
		</Provider>
	)
}
```





## Let's convert our current redux app into `Next.js` app

### Require Package
```
$ yarn add next react react-dom eslint-config-next

$ yarn add 	next 			: Next Framework
		react 			: Next Framework depends on `react` package
		react-dom 		: And `React` depends on `React-DOM`  		
		eslint-config-next 	: Optional but recommended for linting
```


#### Package.json need to change little bit
```
...
"scripts": {
	"lint" : "next lint", 		// setup basic eslint
	"dev" : "next", 		// instead of "nodemon ."
	"build" : "next build",
	"start" : "next start" 		// instead of "node ."
}
...

```



### Next.js required some folder structures
- public/ 		: To serve public resources
	- favicon.ico 	: Required the favicon for the page (copy or create your own favicon)
- pages/ 		: To handle routing file
	- _app.js 	: Root Component which wrapp all the pages
	- index.js 	: Home Route 


#### Home Page: /pages/index.js
```
const HomePage = () => {

	return (
		<>
			<h2>Home Page</h2>
		</>
	)
}
export default HomePage
```

#### Root Page: /pages/_app.js
```
const App = ({ Component, pageProps }) => {

	return (
		<>
			<Component {...pageProps} />
		</>
	)
}
export default App

```


#### See The App in Browser
```
$ yarn lint
$ yarn dev 		: now go to : http://localhost:3000 
```



### Let's configure `Redux` with `Next.js` by following the steps define above
1. Installed: @reduxjs/toolkit, react-redux and next-redux-wrapper
	- We already have installed `@reduxjs/toolkit`
	- Now let's install next 2 package: $ yarn add react-redux next-redux-wrapper

2. Codify /store/index.js file 	: See just change 2 commended line that's it

```
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
```


3. Apply on `Next.js` /pages/_app.js file 	
```
import { Provider } from 'react-redux'
import wrapper from '../store'

const App = ({ Component, ...rest }) => {
	const { store, props } = wrapper.useWrappedStore(rest)
	const { pageProps } = props

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}
export default App
```

	. That's It our app is running: 
	. if you have 'redux devtool' extention in your browser, you can test it.

	. But as you know we used CommonJS module syntax in our old redux project
		. We can change it to ES Module syntax (Modern Syntax)
		. But Next.js support both syntax, that's the reason our old code still valid



4. Final Step: Convert `CommonJS` module Syntax to `ES` Module Syntax in /store directory 




### Now Read from `store` and write to `store` in UI (Home Page)
#### /pages/index.js 
```
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as cakeSlice from '../store/slice/cake'
import * as icecreamSlice from '../store/slice/icecream'

const HomePage = () => {
	const dispatch = useDispatch()
	const cakeInput = useRef()
	const icecreamInput = useRef()

	const { numberOfCake }  = useSelector(state => state.cake)
	const { numberOfIcecream }  = useSelector(state => state.icecream)

	const handleCakeOrder = (type) => () => {
		if(type === 'order') dispatch(cakeSlice.orderCake(+cakeInput.current.value))
		if(type === 'restore') dispatch(cakeSlice.restoreCake(+cakeInput.current.value))
	}
	const handleIcecreamOrder = (type) => () => {
		if(type === 'order') dispatch(icecreamSlice.orderIcecream(+icecreamInput.current.value))
		if(type === 'restore') dispatch(icecreamSlice.restoreIcecream(+icecreamInput.current.value))
	}
		

	return (
		<>
			<h2>Cake remains: {numberOfCake}</h2>
			<h2>Icecream remains: {numberOfIcecream}</h2>

			<div style={{ marginBottom: 16 }}>
				<div>
					<label htmlFor='cakeInput'> Cake: </label>
					<input id='cakeInput' ref={cakeInput} />
				</div>
				<button onClick={handleCakeOrder('order')}>Order Cake</button>
				<button onClick={handleCakeOrder('restore')}>Restore Cake</button>
			</div>

			<div>
				<div>
					<label htmlFor='icecreamInput'> Icecream: </label>
					<input id='icecreamInput' ref={icecreamInput} />
				</div>
				<button onClick={handleIcecreamOrder('order')}>Order Icecream</button>
				<button onClick={handleIcecreamOrder('restore')}>Restore Icecream</button>
			</div>
		</>
	)
}
export default HomePage
```