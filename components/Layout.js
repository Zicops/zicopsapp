import Nav from '../components/Navbar'
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