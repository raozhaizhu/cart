import React, { useState, useContext, useEffect } from 'react';
import styles from './ProductPage.module.css';
import { CartContext } from '../contexts/CartContext';

function ProductCard({ product }) {
    const { cartItems, addToCart } = useContext(CartContext);
    const [isAdded, setIsAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // 获取购物车中商品的数量
    useEffect(() => {
        const existingItem = cartItems.find((item) => item.name === product.name || product.quantity > 0);
        if (existingItem) {
            setQuantity(existingItem.quantity);
            setIsAdded(true); // 如果商品已在购物车中，显示已添加
        } else {
            setQuantity(1);
            setIsAdded(false);
        }
    }, [cartItems, product.name]);

    const handleAddClick = () => {
        addToCart(product, quantity);
        setIsAdded(true);
    };

    const handleQuantityChange = (delta) => {
        setQuantity((prevQuantity) => {
            const newQuantity = Math.max(0, prevQuantity + delta);
            addToCart(product, delta); // 更新购物车的数量
            return newQuantity;
        });
    };

    return (
        <div className={styles.productItem}>
            <picture className={styles.productPicture}>
                <source media='(max-width:768px)' srcSet={product.image.mobile} />
                <source media='(max-width:1024px)' srcSet={product.image.tablet} />
                <img className={styles.productImg} src={product.image.desktop} alt={product.name} />
                <div className={styles.addBtn}>
                    {!isAdded ? (
                        <div className={`${styles.addBtnInner} ${styles.addBtnInner1}`} onClick={handleAddClick}>
                            <img className={styles.icon} src='./assets/images/icon-add-to-cart.svg' alt='add to cart' />
                            <p className={styles.addText}>Add to Cart</p>
                        </div>
                    ) : (
                        <div className={`${styles.addBtnInner} ${styles.addBtnInner2}`}>
                            <div className={styles.decreaseBtn} onClick={() => handleQuantityChange(-1)}>
                                <i className='fas fa-minus'></i>
                            </div>
                            <p className={styles.quantity}>{quantity}</p>
                            <div className={styles.increaseBtn} onClick={() => handleQuantityChange(1)}>
                                <i className='fas fa-plus'></i>
                            </div>
                        </div>
                    )}
                </div>
            </picture>

            <p className={styles.category}>{product.category}</p>
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.price}>${product.price}</p>
        </div>
    );
}

export default ProductCard;

