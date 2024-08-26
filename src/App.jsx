import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from './components/Homepage';
import MyForm from './components/MyForm';
import Viewpage from './components/Viewpage'
import './App.css'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/Myform",
      element: <MyForm />,
    },
    {
      path: "/Myform/:id",
      element: <MyForm />,
    },
    {
      path: "/viewpage",
      element: <Viewpage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
