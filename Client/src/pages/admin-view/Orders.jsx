import React, { useEffect } from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OrderProductTile } from '@/components/admin-view/cart-order-tile'
import { getAllProducts } from '@/store/admin/productSlice'

const AdminOrders = () => {
  const { productList } = useSelector(state => state.adminProducts)
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    
    dispatch(getAllProducts(user._id))
  
  }, [dispatch,user._id])
  
  
  return (
    <Fragment>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {
          productList && productList.length > 0 ?
            productList.map(productItem => <OrderProductTile key={productItem?._id} product={productItem} />) : <div>No Products To Show</div>
        }

      </div>

    </Fragment>

  )
}

export default AdminOrders