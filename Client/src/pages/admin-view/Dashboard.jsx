import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchAllOrders } from '@/store/admin/orderSlice';
import React from 'react'
import { useEffect, useState }from "react";
import { useDispatch, useSelector } from 'react-redux';


export default function Orders() {


    const [selectedOrder, setSelectedOrder] = useState(null);
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.auth)
    const {isLoading,orderList} = useSelector(state=>state.orderSlice)

    useEffect(() => {
       
        dispatch(fetchAllOrders(user?._id))

    }, [dispatch,user?._id]);

    if(isLoading)
    {
        return <div>Loading Orders</div>
    }

    console.log(orderList,"dashboard page")

    
    return (

        <div className="p-6">

            <h2 className="text-2xl font-bold mb-4">
                Orders
            </h2>

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>Order Number</TableHead>

                        <TableHead>Date</TableHead>

                        <TableHead>Total</TableHead>

                        <TableHead>Action</TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {orderList && orderList.length > 0 ?
                    orderList.map((order) => (

                        <TableRow key={order._id}>

                            <TableCell>
                                {order.orderNumber}
                            </TableCell>

                            <TableCell>
                                {new Date(order.createdAt)
                                    .toLocaleString()}
                            </TableCell>

                            <TableCell>
                                ₹{order.totalAmount}
                            </TableCell>

                            <TableCell>

                                <Dialog>

                                    <DialogTrigger asChild>

                                        <Button
                                            onClick={() =>
                                                setSelectedOrder(order)
                                            }
                                        >
                                            Details
                                        </Button>

                                    </DialogTrigger>

                                    <DialogContent>

                                        <DialogHeader>

                                            <DialogTitle>
                                                Order Details
                                            </DialogTitle>

                                        </DialogHeader>

                                        {selectedOrder && (

                                            <div>

                                                <p>
                                                    Order Number:
                                                    {" "}
                                                    {selectedOrder.orderNumber}
                                                </p>

                                                <p>
                                                    Date:
                                                    {" "}
                                                    {new Date(
                                                        selectedOrder.createdAt
                                                    ).toLocaleString()}
                                                </p>

                                                <p className="font-bold mt-2">
                                                    Items:
                                                </p>

                                                <Table>

                                                    <TableHeader>

                                                        <TableRow>

                                                            <TableHead>
                                                                Product
                                                            </TableHead>

                                                            <TableHead>
                                                                Qty
                                                            </TableHead>

                                                            <TableHead>
                                                                Price
                                                            </TableHead>

                                                            <TableHead>
                                                                Total
                                                            </TableHead>

                                                        </TableRow>

                                                    </TableHeader>

                                                    <TableBody>

                                                        {selectedOrder.items.map(
                                                            (item, index) => (

                                                                <TableRow key={index}>

                                                                    <TableCell>
                                                                        {item.title}
                                                                    </TableCell>

                                                                    <TableCell>
                                                                        {item.quantity}
                                                                    </TableCell>

                                                                    <TableCell>
                                                                        ₹{item.price}
                                                                    </TableCell>

                                                                    <TableCell>
                                                                        ₹{item.subtotal}
                                                                    </TableCell>

                                                                </TableRow>

                                                            )
                                                        )}

                                                    </TableBody>

                                                </Table>

                                                <p className="font-bold mt-4">

                                                    Total: ₹
                                                    {selectedOrder.totalAmount}

                                                </p>

                                            </div>

                                        )}

                                    </DialogContent>

                                </Dialog>

                            </TableCell>

                        </TableRow>

                    )) : <div>No Orders To Show</div>
                
                }

                </TableBody>

            </Table>

        </div>

    );

}