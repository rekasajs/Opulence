import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Logout } from '../Logout/Logout';

export const Layout = () => {
    return (
        <div>
            <Navbar />
            <Logout />
            <Outlet />
        </div>
    );
};
