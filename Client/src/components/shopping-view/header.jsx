import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { shoppingViewHeaderMenuItems } from '@/config/config'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/authSlice'




function MenuItems() {
    return (<nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
        {
            shoppingViewHeaderMenuItems.map((menuItem) => <Link className='text-sm font-medium' to={menuItem.path} key={menuItem.id}>{menuItem.label}</Link>)
        }

    </nav>)
}


function HeaderRightContent() {

    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(logoutUser()).then((data) => {
            console.log(data)
        })
    }

    return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
        <Button variant="outline" size="icon">
            <span className='sr-only'>user cart</span>
            <ShoppingCart className='h-6 w-6' />
        </Button>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="bg-black">
                    <AvatarFallback className="bg-blue-700 text-white font-extrabold">{user.email[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56 mt-8">
                <DropdownMenuLabel>Logged in as {user.email} </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                    <UserCog className='mr-2 h-6 w-6' />
                    Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className='mr-2 h-6 w-6' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    </div>
}

const ShoppingHeader = () => {


    return (
        <header className='sticky top-0 z-40 w-full border-b bg-background'>

            <div className='flex h-16 items-center justify-between px-4 md:px-6'>
                <Link to="/shop/home" className="flex items-center gap-2">
                    <HousePlug className='h-6 w-6' />
                    <span className="font-bold">E-Commerce</span>
                </Link>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu className='h-6 w-6' />
                            <span className='sr-only'>Toggle Header Menu</span>
                        </Button>
                    </SheetTrigger>

                    <SheetContent side='right' className="w-full max-w-xs">
                        <HeaderRightContent />
                        <MenuItems />
                    </SheetContent>
                </Sheet>

                <div className='hidden lg:block'>
                    <MenuItems />
                </div>

                <div className='hidden lg:block'>
                    <HeaderRightContent />
                </div>



            </div>

        </header>
    )
}

export default ShoppingHeader