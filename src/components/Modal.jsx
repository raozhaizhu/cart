// src/components/Modal.jsx

import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import styles from './Modal.module.css';

function Modal() {
    const { cartItems, setCartItems } = useContext(CartContext);
    const visibleItems = cartItems.filter((item) => item.quantity > 0);
    const { isModalVisible, setModalVisible } = useContext(CartContext);

    const handleNewOrder = () => {
        setCartItems([]);
        setModalVisible(false);
    };

    if (!isModalVisible) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <img src='/assets/images/icon-order-confirmed.svg' alt='confirmation icon' />
                <h2 className={styles.modalTitle}>Order Confirmed</h2>
                <p className={styles.modalText}>We hope you enjoy your food!</p>
                <div className={styles.purchaseInfo}>
                    {visibleItems.map((item, index) => (
                        <div key={index} className={styles.purchaseItem}>
                            <div className={styles.purchaseItemDetails}>
                                <img src={item.image.thumbnail} />
                                <div className={styles.purchaseItemPrice}>
                                    <p className={styles.name}>{item.name}</p>
                                    <div>
                                        <p className={styles.quantity}>{item.quantity}x</p>
                                        <p className={styles.unitPrice}>@${item.price}</p>
                                    </div>
                                </div>
                            </div>

                            <p className={styles.totalPrice}>${item.price * item.quantity}</p>
                        </div>
                    ))}
                    <div className={styles.orderTotal}>
                        <p>Order Total</p>
                        <h3>${visibleItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
                    </div>
                </div>
                <div className={styles.orderBtn} onClick={handleNewOrder}>
                    Start New Order
                </div>
            </div>
        </div>
    );
}
export default Modal;
