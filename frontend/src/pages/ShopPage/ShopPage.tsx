import { Shop } from '../../components/Shop/Shop';
import { AnimatedPage } from '../AnimatedPage/AnimatedPage';
import styles from './ShopPage.module.scss';

export const ShopPage = () => {
    return (
        <AnimatedPage>
            <div className={styles.page}>
                <div className="container">
                    <h1 className={styles.title}>Украшения</h1>
                    <Shop />
                </div>
            </div>
        </AnimatedPage>
    );
};
