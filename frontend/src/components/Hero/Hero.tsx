import styles from './Hero.module.scss';

export function Hero() {
    return (
        <div className={styles.hero}>
            <h1 className={styles.title}>
                Op<span>ulen</span>ce
            </h1>
            <img src="/hero.png" alt="" />
        </div>
    );
}
