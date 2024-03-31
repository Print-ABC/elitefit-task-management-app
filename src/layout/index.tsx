import { Outlet } from "react-router"
import Navbar from "../components/Navbar"

const Layout = () => {
    return (
        <div className="w-screen h-screen relative">
            <Navbar />
            <div className="w-full h-full mt-16 px-2 pt-2 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout