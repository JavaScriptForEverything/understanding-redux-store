import { useDispatch, useSelector } from 'react-redux'
import * as cakeSlice from '../store/slice/cake'
import * as icecreamSlice from '../store/slice/icecream'

const HomePage = () => {
	const { numberOfCake }  = useSelector(state => state.cake)
	const { numberOfIcecream }  = useSelector(state => state.icecream)

	const dispatch = useDispatch()
	const handleCakeOrder = () => dispatch(cakeSlice.orderCake(2))
	const handleIcecreamOrder = () => dispatch(icecreamSlice.orderIcecream(2))
		

	return (
		<>
			<h2>Cake remains: {numberOfCake}</h2>
			<h2>Icecream remains: {numberOfIcecream}</h2>

			<button onClick={handleCakeOrder}>Order Cake</button>
			<button onClick={handleIcecreamOrder}>Order Icecream</button>
		</>
	)
}
export default HomePage
