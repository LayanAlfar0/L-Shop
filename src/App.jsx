import React from 'react'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories'
import Cart from './pages/Cart/Cart';
import Root from './Root';
import Products from './pages/Products/Products';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import ProductCategory from './pages/Products/ProductCategory';
import ProtectedRoutes from './Components/ProtectedRoutes';
import UserContextProvider from './Components/Contex/User';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from './pages/Products/Product';
import ForgetPass from './pages/ForgetPassword/ForgetPass';
import SendCode from './pages/ForgetPassword/SendCode';

export default function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "Categories",
					element: <Categories />,
				},
				{
					path: "Cart",
					element:
						<ProtectedRoutes>
							<Cart />
						</ProtectedRoutes>,
				},
				{
					path: "Products",
					element: <Products />
				},
				{
					path: "signin",
					element: <SignIn />,
				},
				{
					path: "signup",
					element: <SignUp />,
				},
				{
					path: `products/category/:_id`,
					element: <ProductCategory />,
				},
				{
					path: '/product/:id',
					element: <Product/>,
				},
				{
					path: "forgetPassword",
					element: <ForgetPass />,
				},
				{
					path: "sendCode",
					element: <SendCode />,
				},
			],
		},
	]);
	return (
		<>
			<UserContextProvider>
				<RouterProvider router={router} />
			</UserContextProvider>
			<ToastContainer />

		</>
	)
}
