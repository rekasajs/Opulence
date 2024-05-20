import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import '../../global.scss';
import { useDispatch, useSelector } from 'react-redux';
// import { openBurgerMenu } from '../../redux/features/navigation/navigationSlice';
import { checkIsAuth } from '../../redux/features/auth/authSlice';
import { openModal } from '../../redux/features/modal/modalSlice';
import { RootState } from '../../redux/store';

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth);
    const favoritesCount = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal());
    };

    return (
        <header className={styles.navbar}>
            <div className={`container ${styles.container}`}>
                <Link to="/">
                    <img className="logo" src="/logo.svg" alt="" />
                </Link>

                <ul className={styles.menu}>
                    <li className={styles.item}>
                        <Link to="/">Главная</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/products">Украшения</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/about">О проекте</Link>
                    </li>
                </ul>

                <ul className={styles.menu}>
                    <li className={styles.item}>
                        <button>
                            <img src="/search.svg" alt="" />
                        </button>
                    </li>
                    {isAuth ? (
                        <>
                            <li className={styles.item}>
                                <button>
                                    <img src="/profile.svg" alt="" />
                                </button>
                            </li>
                            <li className={styles.item}>
                                <button>
                                    <img src="/cart.svg" alt="" />
                                </button>
                            </li>
                            <li className={styles.item}>
                                <button>
                                    <img src="/favorites.svg" alt="" />
                                    <span className={styles.favoritesCount}>{favoritesCount?.length}</span>
                                </button>
                            </li>
                            <li className={styles.item}>
                                <button
                                    onClick={() => {
                                        handleOpenModal();
                                    }}
                                >
                                    Выйти
                                </button>
                            </li>
                        </>
                    ) : (
                        <li className={styles.item}>
                            <Link to="/login">Войти</Link>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
};
