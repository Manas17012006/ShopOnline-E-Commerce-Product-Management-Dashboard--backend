const express = require("express");
const router = express.Router();
const {
  setOrder,
  changeOrderStatus,
  getAllOrders,
} = require("../controllers/order.controller");

router.get("/orders",getAllOrders);
router.post("/setOrder",setOrder);
router.post("/changeOrderStatus",changeOrderStatus);
module.exports = router;
