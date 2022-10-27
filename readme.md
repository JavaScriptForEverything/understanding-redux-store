## Understand Redux and Redux-ToolKit the easiest way.

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

