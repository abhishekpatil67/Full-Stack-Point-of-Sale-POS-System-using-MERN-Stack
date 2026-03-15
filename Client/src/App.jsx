import { Routes, Route } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import VerifyEmail from './pages/auth/VerifyEmail'
import AdminDashboard from './pages/admin-view/Dashboard'
import AdminLayout from './components/admin-view/AdminLayout'
import AdminProducts from './pages/admin-view/Products'
import AdminOrders from './pages/admin-view/Orders'
import CheckAuth from './components/common/check-auth'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoggedIn } from './store/authSlice'
import { useEffect } from 'react'
import { getCartItems } from './store/admin/cartSlice'
import ForgotPassword from './pages/auth/forgot-password'
import ResetPassword from './pages/auth/reset-password'
import HomePage from './pages/admin-view/Home/Home'


function App() {

  const dispatch = useDispatch()
  const { user, isAuthenticated} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(checkLoggedIn())
    dispatch(getCartItems(user?._id))
  }, [dispatch, user?._id])
  
  return (
    <>
      <Routes>

        <Route path='/' element={<HomePage/>}></Route>

        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='login' element={<Login />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
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

      </Routes >

    </>
  )
}

export default App
