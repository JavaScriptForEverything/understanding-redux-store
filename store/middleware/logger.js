const logger = store => next => action => {


	console.log(store.getState())

	next(action)
}

module.exports = logger