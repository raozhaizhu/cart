// src/components/Cart.jsx
import React, { useContext } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../contexts/CartContext';

function Cart() {
    const { cartItems, setCartItems } = useContext(CartContext);
    const { isModalVisible, setModalVisible } = useContext(CartContext);

    // 清除商品的函数，将商品的数量设为 0
    const clearItem = (productName) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => (item.name === productName ? { ...item, quantity: 0 } : item))
        );
    };

    const handleConfirmOrder = () => {
        setModalVisible(true); // 显示 Modal
    };

    // 🔴 过滤掉数量为 0 的商品
    const visibleItems = cartItems.filter((item) => item.quantity > 0);

    return (
        <div className={styles.cart}>
            <h2 className={styles.title}>Your Cart ({visibleItems.length})</h2>
            {visibleItems.length === 0 ? (
                <div className={styles.emptyCart}>
                    <img src='./assets/images/illustration-empty-cart.svg' alt='empty cart' />
                    <p className={styles.emptyMessage}>Your added items will appear here</p>
                </div>
            ) : (
                <div className={styles.filledCart}>
                    {visibleItems.map((item, index) => (
                        <div key={index} className={styles.cartItem}>
                            <div>
                                <p className={styles.name}>{item.name}</p>
                                <div className={styles.priceCaculation}>
                                    <p className={styles.quantity}>{item.quantity}</p>
                                    <p className={styles.unitPrice}>${item.price}</p>
                                    <p className={styles.totalPrice}>${item.price * item.quantity}</p>
                                </div>
                            </div>
                            <div className={styles.clearBtn} onClick={() => clearItem(item.name)}>
                                <i className='fa fa-times-circle'></i>
                            </div>
                        </div>
                    ))}
                    <div className={styles.orderTotal}>
                        <p>Order Total</p>
                        <h3>${visibleItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
                    </div>
                    <div className={styles.orderBtn} onClick={handleConfirmOrder}>
                        Confirm Order
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
