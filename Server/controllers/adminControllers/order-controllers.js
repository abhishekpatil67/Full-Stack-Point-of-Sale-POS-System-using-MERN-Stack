import { Cart } from "../../models/Cart.js";
import { Product } from "../../models/Product.model.js";
import { Order } from "../../models/Order.model.js";


export const checkoutController = async (req, res) => {

  //   const session = await mongoose.startSession();
  //   session.startTransaction();

  try {

    const { userId } = req.body;

    console.log(userId, "from the order controller")

    // 1. Get user's active cart

    const cart = await Cart.findOne({
      userId,
      isCompleted: false
    })

    // .session(session);

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    let orderItems = [];
    let totalAmount = 0;

    // 2. Loop cart items

    for (const cartItem of cart.items) {

      const product = await Product.findById(cartItem.productId)

      // .session(session);

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.totalStock < cartItem.quantity) {
        throw new Error(`Not enough stock for ${product.title}`);
      }

      const price = Number(product.salesPrice);

      const subtotal = price * cartItem.quantity;

      orderItems.push({
        productId: product._id,
        title: product.title,
        price: price,
        quantity: cartItem.quantity,
        subtotal
      });

      totalAmount += subtotal;

      // 3. Reduce stock
      product.totalStock -= cartItem.quantity;
      await product.save();

      //   { session }

    }

    // 4. Create order
    const order = new Order({
      userId,
      orderNumber: "ORD-" + Date.now(),
      items: orderItems,
      totalAmount
    });

    await order.save();

    // { session }

    // 5. Mark cart completed

    cart.isCompleted = true;
    await cart.save();

    // { session }

    // await session.commitTransaction();

    console.log(order)

    return (res.status(200).json({
      success: true,
      orderId: order._id
    }));

  } catch (err) {

    // await session.abortTransaction();

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
  //   finally {
  //     session.endSession();
  //   }

};

export const getOrdersController = async (req, res) => {
  try {

    const { userId } = req.params
    console.log("request received on orderlist")

    const orderList = await Order.find({userId}).sort({ createdAt: -1 });

    console.log(orderList)

    return ( res.json({
      success: true,
      data : orderList
    }))

  } catch (error) {

    console.log(error)
    
    return (res.status(500).json({
      success: false,
      message: err.message
    }))

  }






}