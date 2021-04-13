const express = require("express");
// Controllers
const {
  requireSignIn,
  isAdmin,
  isAuth,
} = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
} = require("../controllers/product");
const router = express.Router();

// Routes
router.post("/product/create/:userId", requireSignIn, isAuth, isAdmin, create);
router.get("/product/:productId", requireSignIn, read);
router.get("/products", list);
router.get("/products/:productId/related", listRelated);
router.get("/products/categories", listCategories);
router.get("/products/:productId/photo", photo);
router.delete(
  "/product/:productId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  update
);
router.param("userId", userById);
router.param("productId", productById);
router.post("/products/by/search", listBySearch);

module.exports = router;
