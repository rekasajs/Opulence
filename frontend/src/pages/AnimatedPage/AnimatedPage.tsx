import { MotionValue, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import styles from './AnimatedPage.module.scss';

export interface IAnimatedPage {
    children: ReactNode | MotionValue<number> | MotionValue<string>;
}

export const AnimatedPage: FC<IAnimatedPage> = ({ children }): JSX.Element => {
    const blackBox = {
        initial: {
            height: '100vh',
            bottom: 0,
        },
        animate: {
            height: 0,
            transition: {
                when: 'afterChildren',
                duration: 1,
                ease: [0.87, 0, 0.13, 1],
            },
        },
    };

    const textContainer = {
        initial: {
            opacity: 1,
        },
        animate: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.25,
                when: 'afterChildren',
            },
        },
    };

    const text = {
        initial: {
            y: 20,
        },
        animate: {
            y: 90,
            transition: {
                duration: 1.5,
                ease: [0.87, 0, 0.13, 1],
            },
        },
    };

    return (
        <>
            {children}
            <motion.div
                className={styles.slideIn}
                initial="initial"
                animate="animate"
                variants={blackBox}
                transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
            >
                <motion.svg className={styles.svg} variants={textContainer}>
                    <pattern id="pattern" patternUnits="userSpaceOnUse" width={750} height={800} className={styles.pattern}>
                        <rect className={styles.rect} />
                        <motion.rect className={styles.motionRect} variants={text} />
                    </pattern>
                    <text className={styles.text} textAnchor="middle" x="50%" y="50%" style={{ fill: 'url(#pattern)' }}>
                        Opulence
                    </text>
                </motion.svg>
            </motion.div>
        </>
    );
};
