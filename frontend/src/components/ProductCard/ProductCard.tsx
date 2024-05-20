import { FC } from 'react';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../../redux/features/favorites/favoritesSlice';
import { AppDispatch } from '../../redux/store';
import classNames from 'classnames';

export type ProductType = 'Кольца' | 'Браслеты' | 'Колье' | 'Серьги' | 'Цепи' | 'Подвески';

export interface IProductCard {
    _id: string;
    name: string;
    type: ProductType;
    material: string;
    price: number;
    imageURL?: string;
}

export const ProductCard: FC<IProductCard> = ({ _id, name, imageURL, price }): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();

    const handleAddToFavorites = () => {
        dispatch(addFavorite({ favoriteId: _id }));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.productCard}>
                <div className={styles.buttons}>
                    <button className={styles.favorites} onClick={handleAddToFavorites}>
                        <img className={classNames({})} src="/favoritesBlack.svg" alt="" />
                    </button>
                    <button>
                        <img src="/cartBlack.svg" alt="" />
                    </button>
                </div>
                <div>
                    <div className={styles.imgWrapper}>
                        <img className={styles.img} src={imageURL} alt={name} />
                    </div>
                    <Link className={styles.title} to={`/products/${_id}`}>
                        {name}
                    </Link>
                    <span className={styles.price}>{price} BYN</span>
                </div>
            </div>
        </div>
    );
};
