import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { getProducts } from '../../redux/features/products/productsSlice';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './Shop.module.scss';

export function Shop() {
    const products = useSelector((state: RootState) => state.products.products);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    if (!products.length) {
        return (
            <>
                <h2 className={styles.noProducts}>Упс...Товаров нет</h2>
            </>
        );
    }

    return (
        <div className={styles.products}>
            {products.map((product) => {
                return <ProductCard key={product._id} {...product} />;
            })}
        </div>
    );
}
