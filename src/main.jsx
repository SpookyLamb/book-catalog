// Must Have (DONE)
  // User creation (DONE)
  // User login (DONE)
  // Endpoints protected (only available to authenticated user) (DONE)
  // CRUD operations - Create, Read, Update, and Delete books (DONE)
// Should Have (DONE)
  // Controls to change the sort order (DONE)
  // Options to sort by Genre and Author (DONE)
// Could Have
  // Book ratings (DONE)
  // Favorites (DONE)
  // Deploy Frontend to Vercel and Backend to Fly

import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'

// project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import About from './About'
import App from './App'
import ErrorPage from './ErrorPage'
import Header from './Header'
import Footer from './Footer'

import { AuthContext } from './authContext'
import { useState } from 'react'

function Layout() {
  return (
      <>
        <Header />
        <div id='page-content'>
          <Outlet />
        </div>
        <Footer />
      </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />
      },
      {
        path: '/about',
        element: <About />
      },
    ]
  }
])

const AuthContextProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState([])
  
  const auth = {
    accessToken: accessToken,
    setAccessToken: setAccessToken,
  }

  return (
    <AuthContext.Provider value={{ auth: auth }}>
      {children}
    </AuthContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
)