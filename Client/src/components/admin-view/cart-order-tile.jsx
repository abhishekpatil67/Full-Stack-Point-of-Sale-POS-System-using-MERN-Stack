import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { addToCart, getCartItems } from "@/store/admin/cartSlice";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner";

export function OrderProductTile({ product }) {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)

    const handleAddToCart = (productItem) => {
        dispatch(addToCart({ productId: productItem._id, userId: user._id, quantity: 1 })).then((res) => {
            if (res.payload.success) {
                console.log(res, "rewsp")
                dispatch(getCartItems({ userId: user._id }))
                toast(res?.payload?.message, {
                    action: {
                        label: "Ok",
                    },
                }
            )
            }
        })
    }



    return (
        <Card>
            <div>
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-75 object-cover rounded-t-lg"
                    />
                </div>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`text-lg font-semibold text-primary`}>Price</span>

                        {
                            product.salesPrice > 0 ? <span className="text-lg font-bold">₹{product?.salesPrice}</span> : null
                        }

                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`text-lg font-semibold text-primary`}>Stock</span>

                        {
                            product.salesPrice > 0 ? <span className="text-lg font-bold">{product?.totalStock}</span> : null
                        }

                    </div>
                </CardContent>
                <CardFooter className="felx justify-center items-center">
                    <Button onClick={() => handleAddToCart(product)} className="w-full cursor-pointer">Add To Cart</Button>
                </CardFooter>
            </div>
        </Card>
    )
}


