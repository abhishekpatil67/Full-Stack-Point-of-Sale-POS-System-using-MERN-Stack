import React, { Fragment } from 'react'
import { Separator } from '../ui/separator'
import { useNavigate } from 'react-router-dom'
import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'


const adminSidebaMenuItems = [

    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard />

    },
    {
        id: "products",
        label: "Products",
        path: "/admin/products",
        icon: <ShoppingBasket />

    },
    {
        id: "orders",
        label: "Orders",
        path: "/admin/orders",
        icon: <BadgeCheck />

    },
]


function MenuItems({ setOpen }) {

    const navigate = useNavigate()

    return (
        <nav className='mt-8 flex-col flex gap-2'>

            {
                adminSidebaMenuItems.map(menuItem => <div key={menuItem.id} onClick={() => {
                    navigate(menuItem.path)
                    setOpen ? setOpen(false) : null
                }} className='text-xl cursor-pointer flex gap-2 items-center rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground'>
                    {menuItem.icon}
                    <span>{menuItem.label}</span>

                </div>

                )}

        </nav>
    )
}

const AdminSideBar = ({ open, setOpen }) => {

    const navigate = useNavigate()

    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen} asChild>
                <SheetContent side='left' className="w-64">
                    <div className='flex flex-col h-full'>
                        <SheetHeader className="border-b">
                            <SheetTitle className="flex gap-2 mt-5 mb-4">
                                <ChartNoAxesCombined size={30} />
                                <span className='font-extrabold text-2xl'>Admin Panel</span>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>

            <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>

                <div
                    onClick={() => navigate("/admin/dashboard")}
                    className='flex cursor-pointer items-center gap-2 '>
                    <ChartNoAxesCombined size={30} />
                    <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    )
}

export default AdminSideBar