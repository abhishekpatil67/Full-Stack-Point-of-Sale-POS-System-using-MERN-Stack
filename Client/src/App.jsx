import { Routes, Route } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import VerifyEmail from './pages/auth/VerifyEmail'
import AdminDashboard from './pages/admin-view/Dashboard'
import AdminLayout from './components/admin-view/AdminLayout'
import AdminProducts from './pages/admin-view/Products'
import AdminOrders from './pages/admin-view/Orders'
import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import Home from './pages/shopping-view/Home'
import CheckAuth from './components/common/check-auth'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoggedIn } from './store/authSlice'
import { useEffect } from 'react'
import Listing from './pages/shopping-view/Listing'
import { getCartItems } from './store/admin/cartSlice'


function App() {

  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(checkLoggedIn())
    dispatch(getCartItems(user?._id))
  }, [dispatch, user?._id])
  
  if (isLoading) {
    return <div>Loading</div>
  }



  return (
    <>
      <Routes>

        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='verify-email' element={<VerifyEmail />} />
        </Route>

        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<Home />} />
          <Route path='listing' element={<Listing />} />
        </Route>


      </Routes >

    </>
  )
}

export default App
