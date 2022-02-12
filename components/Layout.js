import Nav from '../components/Large/Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
    return (
        <div>
            <Nav />
            {children}
            <Footer />
        </div>
    )
}

export default Layout