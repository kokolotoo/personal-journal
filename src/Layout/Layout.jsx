import { Outlet } from 'react-router';
import NavBar from '../Pages/Navbar/NavBar';
import Footer from '../Pages/Footer/Footer';


function Layout() {
    return (
        <>
            <NavBar />
            <Outlet /> {/* Тук ще се зареждат различните страници */}
            <Footer />
        </>
    );
}

export default Layout;
