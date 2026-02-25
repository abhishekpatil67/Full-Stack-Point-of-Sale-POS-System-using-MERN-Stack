import React from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { OrderProductTile } from '@/components/admin-view/cart-order-tile'

const AdminOrders = () => {

  const { productList } = useSelector(state => state.adminProducts)
  
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