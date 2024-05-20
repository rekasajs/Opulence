import { Hero } from '../../components/Hero/Hero';
import { Menu } from '../../components/Menu/Menu';
import { AnimatedPage } from '../AnimatedPage/AnimatedPage';

export const MainPage = () => {
    return (
        <AnimatedPage>
            <Hero />
            <Menu />
        </AnimatedPage>
    );
};
