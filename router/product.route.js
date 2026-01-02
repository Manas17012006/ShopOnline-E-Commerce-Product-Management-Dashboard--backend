const express = require("express");
const router = express.Router();
const { userauth } = require("../middleware/auth.mw");
const {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,addtocart,getcartdata,delItem,changeQty
} = require("../controllers/product.controller");
const upload = require("../middleware/multer");

router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

router.get("/list", listProduct);
router.post("/remove", removeProduct);
router.post("/single", singleProduct);
router.post("/addtocart",userauth,addtocart);
router.get("/getcartdata",userauth,getcartdata);
router.post("/delete",userauth,delItem);
router.post("/change",userauth,changeQty);
module.exports = router;
