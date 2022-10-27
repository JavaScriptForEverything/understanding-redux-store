// Note: This middleware is known as `redux-logger middleware` which is a seperate package.

const logger = store => next => action => {
	console.log(store.getState())

	next(action)
}

module.exports = logger