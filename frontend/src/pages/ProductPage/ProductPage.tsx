import { FC } from 'react';
import styles from './ProductPage.module.scss';
import { useParams } from 'react-router-dom';

export type ProductType = 'Кольца' | 'Браслеты' | 'Колье' | 'Серьги' | 'Цепи' | 'Подвески';

export interface IProduct {
    _id: string;
    name: string;
    type: ProductType;
    material: string;
    grade?: string;
    price: number;
    isAvailable: boolean;
    insertion?: string;
    for: 'для Женщин' | 'для Мужчин';
    description: string;
    imageURL?: string;
}

export interface IProductPageProps {
    products: IProduct[];
}

export const ProductPage: FC<IProductPageProps> = ({ products }) => {
    const { id } = useParams();

    const product: IProduct | undefined = products.find((product) => product._id.toString() === id);
    return <div className={styles.page}>{product?.name}</div>;
};
