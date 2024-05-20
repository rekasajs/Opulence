import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { closeBurgerMenu } from '../../redux/features/navigation/navigationSlice';

export function Menu() {
    const isMenuActive = useSelector((state: RootState) => state.nav.isMenuActive);

    const dispatch = useDispatch();

    const closeMenuHanler = () => {
        dispatch(closeBurgerMenu());
    };

    return (
        <div className={`${styles.menu} ${!isMenuActive ? '' : styles.active}`} onClick={closeMenuHanler}>
            <div className={styles.blur} />
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>Opulence</h2>
                <button className={styles.button} onClick={closeMenuHanler}>
                    <img src="/closeMenu.svg" alt="" />
                </button>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Главная</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/">Магазин</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/">Профиль</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/">Корзина</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
