import Nav from './Navbar'
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
	