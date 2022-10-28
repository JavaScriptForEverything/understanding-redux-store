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

	const handleCakeOrder = () => {
		dispatch(cakeSlice.orderCake(cakeInput.current.value))
	}
	const handleIcecreamOrder = () => {
		dispatch(icecreamSlice.orderIcecream(icecreamInput.current.value))
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
				<button onClick={handleCakeOrder}>Order Cake</button>
			</div>

			<div>
				<div>
					<label htmlFor='icecreamInput'> Icecream: </label>
					<input id='icecreamInput' ref={icecreamInput} />
				</div>
				<button onClick={handleIcecreamOrder}>Order Icecream</button>
			</div>

		</>
	)
}
export default HomePage
