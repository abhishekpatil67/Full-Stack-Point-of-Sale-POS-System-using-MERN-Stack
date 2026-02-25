import { Order } from "../../models/Order.model.js";



export const handleBillGeneration = async (req, res) => {
  try {
    console.log("request received")
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.send("Order not found");
    }

    const itemsHtml = order.items.map(item => `
      <tr>
        <td>${item.title}</td>
        <td>${item.quantity}</td>
        <td>₹${item.price}</td>
        <td>₹${item.subtotal}</td>
      </tr>
    `).join("");

    const html = `
    <html>

    <head>

      <title>Bill</title>

      <style>

        body {
          font-family: Arial;
          padding: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
        }

        h2, h3 {
          text-align: center;
        }

      </style>

    </head>

    <body onload="window.print()">

      <h2>My POS Store</h2>

      <p>
        Order Number: ${order.orderNumber} <br/>
        Date: ${new Date(order.createdAt).toLocaleString()}
      </p>

      <table>

        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>

        ${itemsHtml}

      </table>

      <h3>Total Amount: ₹${order.totalAmount}</h3>

      <p style="text-align:center">
        Thank you for shopping!
      </p>

    </body>

    </html>
    `;

    res.send(html);

  } catch (err) {

    res.status(500).send(err.message);

  }

};