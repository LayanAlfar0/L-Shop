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
          element: <Cart />,
        },
        {
          path: "Products",
          element: <Products />
        },
      ],
    },
  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}
