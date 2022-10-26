## Understand Redux the easiest way.

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



## Other steps:
	- See the commits will show all the steps line by line
