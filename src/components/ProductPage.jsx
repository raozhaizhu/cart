// src/components/ProductPage.jsx

import React from 'react';
import useProducts from '../hooks/useProducts';
import ProductCard from './ProductCard';
import styles from './ProductPage.module.css';

function ProductPage() {
    const products = useProducts();
    return (
        <div className={styles.productPage}>
            <h1>Products</h1>
            <div className={styles.productList}>
                {products.map((product) => (
                    <ProductCard key={product.name} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductPage;

