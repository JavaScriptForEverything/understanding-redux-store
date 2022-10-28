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
