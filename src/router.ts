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

router.post("/signup", User.createUser);
router.get("/login", User.logIn);

router.post("/categories", Category.createCategory);

router.post("/asm/products", upload.array('images'), ProductAdmin.createProduct);
router.put("/asm/products", ProductAdmin.updateProduct);
router.delete("/asm/products/:id_product", ProductAdmin.deleteProduct);

router.get("/products/getAllProductsOrderEmphasis", ProductSearch.getAllProductsOrderEmphasis);
router.get("/products/getProductsForPage", ProductSearch.getProductsForPage);
router.get("/products/getProductByLikeName", ProductSearch.getProductByLikeName);
router.get("/products/getProductBySpecificName", ProductSearch.getProductBySpecificName);

router.post("/sales", Sale.createSale);
router.get("/sales/:idHashUser", Sale.getSaleByUser);

router.post("/product-cart", ProductCart.insertProductCart);
router.delete("/product-cart", ProductCart.removeProductCart);
router.get("/product-cart/:hash_host", ProductCart.getAllProductsCart);

router.post("/product-favorite", ProductFavorite.insertProductFavorite);
router.delete("/product-favorite", ProductFavorite.removeProductFavorite);
router.get("/product-favorite/:hash_host", ProductFavorite.getAllProductFavorite);

export { router };
