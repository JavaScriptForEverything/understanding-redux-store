// Note: This middleware is known as `thunk middleware` which is already build in redux toolkit:

const dispatchFunction = ({ dispatch, getState }) => next => action => {
	// 1. check the type of action
	if(typeof action === 'function') {
		/* 2. if action is function instead of plain object, call that function by passing 2 args
		** 		this 2 args will be available to that function: like: 
		** 
		** 			store.dispatch((dispatch, getState) => {
		**  			// do some ajex called then finally call this dispatch
		** 				dispatch({ type, payload })
		**			})
		** 
		*/
		return action(dispatch, getState)
	}

	next(action)
}

module.exports = dispatchFunction