import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './configuploads/configUpload';
import { UserController }  from './controllers/UserController';
import { CategoryController }  from './controllers/CategoryController';
import { ProductController }  from './controllers/ProductController';
import { SaleController } from './controllers/SalesController';
import { ProductCartController } from './controllers/ProductCartController';
import { ProductFavoriteController } from './controllers/ProductFavoriteController';
import { ProductAdminController } from './controllers/ProductAdminController';

const User            = new UserController();
const Category        = new CategoryController();
const ProductSearch   = new ProductController();
const ProductAdmin    = new ProductAdminController();
const Sale            = new SaleController();
const ProductCart     = new ProductCartController();
const ProductFavorite = new ProductFavoriteController();

const router = Router();
const upload = multer(uploadConfig);

router.post("/user/signup", User.createUser);
router.get("/user/login", User.logIn);

router.post("/categories/create", Category.createCategory);

router.post("/asm/products/create", upload.array('images'), ProductAdmin.createProduct);
router.put("/asm/products/update", ProductAdmin.updateProduct);
router.delete("/asm/products/delete/:id_product", ProductAdmin.deleteProduct);

router.get("/products/getAllProductsOrderEmphasis", ProductSearch.getAllProductsOrderEmphasis);
router.get("/products/getProductsForPage", ProductSearch.getProductsForPage);
router.get("/products/getProductByLikeName", ProductSearch.getProductByLikeName);
router.get("/products/getProductBySpecificName", ProductSearch.getProductBySpecificName);

router.post("/sales/create", Sale.createSale);
router.get("/sales/getSaleByUser/:idHashUser", Sale.getSaleByUser);

router.post("/product-cart/insert", ProductCart.insertProductCart);
router.delete("/product-cart/delete/:idProduct", ProductCart.removeProductCart);
router.get("/product-cart/getProductsCart/:hashHost", ProductCart.getAllProductsCart);

router.post("/product-favorite/insert", ProductFavorite.insertProductFavorite);
router.delete("/product-favorite/delete/:idProduct", ProductFavorite.removeProductFavorite);
router.get("/product-favorite/getProductsFavorite/:hashHost", ProductFavorite.getAllProductFavorite);

export { router };
