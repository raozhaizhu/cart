// src/contexts/CartContext.jsx

import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);

    const addToCart = (product, delta) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.name === product.name);
            if (existingItem) {
                const updatedQuantity = existingItem.quantity + delta;
                if (updatedQuantity <= 0) return prevItems.filter((item) => item.name !== product.name); // 移除商品
                return prevItems.map((item) =>
                    item.name === product.name ? { ...item, quantity: updatedQuantity } : item
                );
            } else {
                if (delta > 0) {
                    return [...prevItems, { ...product, quantity: delta }];
                }
                return prevItems;
            }
        });
    };

    // ✅ 确保 `setCartItems` 被包含在 `value` 中
    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, isModalVisible, setModalVisible }}>
            {children}
        </CartContext.Provider>
    );
}

