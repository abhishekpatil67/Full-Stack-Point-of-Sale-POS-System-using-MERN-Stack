const base64Image = data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}

generate pdf router


const express = require("express");
const puppeteer = require("puppeteer");
const Order = require("../models/Order");
const receiptTemplate = require("../utils/receiptTemplate");

const router = express.Router();

router.get("/receipt/:orderId", async (req, res) => {
  try {

    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const browser = await puppeteer.launch({
      headless: "new"
    });

    const page = await browser.newPage();

    await page.setContent(receiptTemplate(order), {
      waitUntil: "networkidle0"
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=receipt-${order._id}.pdf`
    });

    res.send(pdfBuffer);

  } catch (error) {
    res.status(500).json({ message: "Failed to generate receipt" });
  }
});

module.exports = router;



react side

const handleCheckout = async () => {
  try {
    const res = await axios.post("/api/order/checkout", {
      userId,
      paymentMethod: "Cash"
    });

    setOrderId(res.data.orderId);
    setShowReceiptOptions(true);

  } catch (err) {
    console.log(err);
  }
};


final submission of the files....