import Nav from '../components/Navbar'

const Layout = ({children}) => {
    return (
        <div>
            <Nav />
            {children}
        </div>
    )
}

export default Layout