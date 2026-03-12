import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"

export function AdminProductTile({product,setCurrentEditedId, setopenCreateProuductDialog,setFormData,handleDelete}) {
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
                        <span className={`${product?.salesPrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>₹{product?.price}</span>

                        {
                            product.salesPrice > 0 ? <span className="text-lg font-bold">₹{product?.salesPrice}</span> : null
                        }

                    </div>
                </CardContent>
                <CardFooter className="felx justify-between items-center">
                    <Button onClick={()=>{
                            setopenCreateProuductDialog(true)
                            setCurrentEditedId(product?._id)
                            setFormData(product)
                    }}>Edit</Button>
                    <Button onClick={()=>{handleDelete(product?._id)}}>Delete</Button>
                </CardFooter>
            </div>
        </Card>
    )
}


