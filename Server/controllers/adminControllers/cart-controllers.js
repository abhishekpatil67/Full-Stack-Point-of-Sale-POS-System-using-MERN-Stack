import { Cart } from "../../models/Cart.js";



export const AddToCart = async (req, res) => {

    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity < 0) {

        return (res.status(400).json({ success: false, message: "invalid credentials provided" }))

    }


    try {

        let cart = await Cart.findOne({
            userId,
            isCompleted: false
        })

        if (!cart) {

            cart = new Cart({ userId, items: [] })

        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)

        if (findCurrentProductIndex === -1) {

            cart.items.push({ productId, quantity })
        }
        else {
            cart.items[findCurrentProductIndex].quantity += quantity
        }

        await cart.save();

        await cart.populate({
            path: 'items.productId',
            select: "image title price salesPrice quantity"
        })

        console.log(cart,"cart")

        const populatedCartItems = await cart.items.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salesPrice: item.productId.salesPrice,
            quantity: item.quantity
        }))

        console.log(populatedCartItems, "add to cart")


        return (res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populatedCartItems
            }
            ,
            message: "Product Added To Cart"
        }))

    } catch (error) {

        console.log(error)
        return (res.status(500).json({ success: false, message: "Something went wrong" }))

    }

}


export const fetchAllCartItems = async (req, res) => {

    const { userId } = req.params

    console.log(userId, "userId")

    if (!userId) {

        return (res.status(400).json({ success: false, message: "user id is mondatory" }))
    }


    try {


        let cart = await Cart.findOne({
            userId,
            isCompleted: false
        }).populate({
            path: 'items.productId',
            select: "image title price salesPrice"
        })

        console.log(cart)

        if (!cart) {
            return (res.status(404).json({ success: false, message: "cart not found" }))
        }

        const validItems = cart.items.filter(productItem => productItem.productId)

        if (validItems.length < cart.items.length) {
            cart.items = validItems
            await cart.save();
        }

        const populatedCartItems = validItems.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salesPrice: item.productId.salesPrice,
            quantity: item.quantity
        }))

        console.log(populatedCartItems, "populated cart items")

        return (res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populatedCartItems
            }
        }))

    } catch (error) {

        console.log(error)
        return (res.status(500).json({ success: true, message: "Something went wrong" }))

    }

}


export const updateCart = async (req, res) => {


    const { userId, productId, quantity } = req.body;
    console.log(userId, "userid", productId, "productid", quantity, "quantity")

    if (!userId || !productId || quantity < 0) {
        return (res.status(400).json({ success: false, message: "invalid credentials provided" }))
    }

    try {

        let cart = await Cart.findOne({
            userId,
            isCompleted: false
        })

        if (!cart) {
            return (res.status(404).json({ success: false, message: "No Cart Found!" }))
        }

        const findCurrentProductIndex = await cart.items.findIndex(item => {
            console.log(item.productId.toString())
            console.log(productId.toString())
            return item.productId.toString() === productId.toString()
        }
        )
        console.log(findCurrentProductIndex)
        if (findCurrentProductIndex === -1) {
            return (res.status(404).json({ success: false, message: "Cart Item Not Found!" }))
        }



        cart.items[findCurrentProductIndex].quantity = quantity
        await cart.save();

        await cart.populate({
            path: 'items.productId',
            select: "image title price salesPrice quantity"
        })

        const populatedCartItems = await cart.items.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salesPrice: item.productId.salesPrice,
            quantity: item.quantity
        }))

        return (res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populatedCartItems
            }
        }))


    } catch (error) {
        console.log(error)
        return (res.status(500).json({ success: true, message: "Something went wrong" }))

    }



}


export const deleteCartItem = async (req, res) => {

    console.log(req.body ,"body")
    const { userId,productId} = req.body
    if (!userId || !productId) {
        return (res.status(400).json({ success: false, message: "user id is mondatory" }))
    }


    try {

        let cart = await Cart.findOne({
            userId,
            isCompleted: false
        })

        if (!cart) {
            return (res.status(404).json({ success: false, message: "cart not found" }))
        }


        cart.items = cart.items.filter(item => item.productId.toString() !== productId)

        await cart.save();

        await cart.populate({
            path: 'items.productId',
            select: "image title price salesPrice quantity"
        })


        const populatedCartItems = await cart.items.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salesPrice: item.productId.salesPrice,
            quantity: item.quantity
        }))

        return (res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populatedCartItems
            }
        }))



    } catch (error) {
        console.log(error)
        return (res.status(500).json({ success: true, message: "Something went wrong" }))
    }




}


