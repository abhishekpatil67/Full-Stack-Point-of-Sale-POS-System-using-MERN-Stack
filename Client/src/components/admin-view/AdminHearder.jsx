import React, { Fragment, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut, ShoppingCart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/store/authSlice'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import AdminCartContent from './admin-cart-content'
import { checkout, deleteCartItems, getCartItems, updateCartItems } from '@/store/admin/cartSlice'


const AdminHearder = ({ setOpen }) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.adminCartSlice)
    const [openAddToCartSheet, setOpenAddToCartSheet] = useState(false)


    const totalAmount = cartItems && cartItems.length > 0 ? cartItems.reduce((sum, currentItem) => {
        return sum + (currentItem?.price * currentItem?.quantity)

    }, 0) : 0

    function handleLogout() {
        dispatch(logoutUser())
    }


    const handleUpdateCartItem = (getCartItems, actionType) => {

        console.log(getCartItems, actionType)
        if (actionType === "plus") {
            dispatch(updateCartItems({
                productId: getCartItems.productId,
                userId: user._id,
                quantity: getCartItems.quantity + 1

            })).then((res) => {
                console.log(res)
            })
        }
        if (actionType === "minus") {
            dispatch(updateCartItems({
                productId: getCartItems.productId
                , userId: user._id, quantity: getCartItems.quantity - 1
            })).then((res) => {
                console.log(res)
            })
        }
    }

    const handleDeleteCartItem = (getCartItems) => {

        console.log(getCartItems.productId,"item to be deleted")
        console.log(user._id,"item to be deleted")
        dispatch(deleteCartItems({
            productId: getCartItems.productId,
            userId: user._id
        })).then(data => {
            console.log(data)
        })
    }

    const handleCheckout = () => {
        dispatch(checkout({ userId: user._id })).then((data) => {
            console.log(data, "checoutres")
            if (data.payload.success) {
                window.open(
                    `http://localhost:5000/admin/api/bill/${data.payload.orderId}`,
                    "_blank"
                );
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(() => {

        console.log(user._id, "usestate")
        dispatch(getCartItems({userId : user._id})).then(data => console.log(data,"cart items response"))

    }, [dispatch, user._id])




    return (

        <Fragment>

            <Sheet open={openAddToCartSheet} onOpenChange={() => setOpenAddToCartSheet(false)} asChild>


                <SheetContent className="sm:max-w-md p-4 overflow-auto">
                    <SheetHeader>
                        <SheetTitle>Your Cart</SheetTitle>
                    </SheetHeader>

                    <div className='mt-8 space-y-4 min-h-[65vh]'>
                        {
                            cartItems && cartItems.length > 0 ?
                                cartItems.map(item => <AdminCartContent cartItem={item} handleUpdateCartItem={handleUpdateCartItem} handleDeleteCartItem={handleDeleteCartItem} key={item.productId} />)
                                : <span>No Items Added To Cart</span>
                        }
                    </div>

                    <div className='mt-8 space-y-4'>
                        <div className='flex justify-between'>
                            <span className='font-bold'>Total</span>
                            <span className='font-bold'>${totalAmount}</span>
                        </div>
                    </div>
                    <Button onClick={handleCheckout} className="w-full">Checkout</Button>
                </SheetContent>
            </Sheet>
            <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
                <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
                    <AlignJustify />
                    <span className='sr-only'>Toggle Menu</span>
                </Button>
                <div className='flex flex-1 justify-end gap-2'>
                    <Button variant="outline" size="icon" className="cursor-pointer" onClick={() => setOpenAddToCartSheet(true)}>
                        <span className='sr-only'>user cart</span>
                        <ShoppingCart className='h-6 w-6' />
                    </Button>
                    <Button onClick={handleLogout} className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow cursor-pointer">
                        <LogOut />Logout
                    </Button>
                </div>

            </header>
        </Fragment>
    )
}

export default AdminHearder