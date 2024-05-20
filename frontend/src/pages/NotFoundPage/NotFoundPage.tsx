import { AnimatedPage } from '../AnimatedPage/AnimatedPage';
import styles from './NotFountPage.module.scss';

export function NotFoundPage() {
    return (
        <AnimatedPage>
            <div className={styles.page}>
                :( 4 <img src="/diamond-ring.svg" alt="diamond-ring" area-hidden="true" />4 - Страница не найдена{' '}
            </div>
        </AnimatedPage>
    );
}
