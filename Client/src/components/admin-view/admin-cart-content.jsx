import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'


const AdminCartContent = ({ cartItem,handleUpdateCartItem,handleDeleteCartItem}) => {


    return (
        <div className='flex items-center space-x-4'>
            <img src={cartItem.image} alt={cartItem.title} className='w-20 h-20 rounded-md object-cover' />

            <div className='flex-1'>
                <h3 className='font-extrabold'>{cartItem.title}</h3>
                <div className='flex items-center gap-2 mt-1'>
                    <Button onClick={() => handleUpdateCartItem(cartItem, "minus")} variant='outline' className="h-8 w-8 rounded-full" size='icon'>
                        <Minus className='w-4 h-4' />
                        <span className='sr-only'>Decrease</span>
                    </Button>
                    <span>{cartItem.quantity}</span>
                    <Button onClick={() => handleUpdateCartItem(cartItem, "plus")} variant='outline' className="h-8 w-8 rounded-full" size='icon'>
                        <Plus className='w-4 h-4' />
                        <span className='sr-only'>Increase</span>
                    </Button>
                </div>
            </div>

            <div className='flex flex-col items-end'>
                <p className='font-semibold'>₹{(cartItem?.salesPrice * cartItem.quantity).toFixed(2)}</p>
                <Trash onClick={()=>handleDeleteCartItem(cartItem)} className='cursor-pointer mt-1' size={20} />
            </div>
        </div>
    )
}

export default AdminCartContent