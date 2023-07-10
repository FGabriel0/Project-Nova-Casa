import { createContext,useState } from "react";

export const NavBarContext = createContext()

export const NavBarProvider = ({children}) => {
    const[showNavbar, setShowNavbar] = useState(true)
    const [isDashboard, setIsDashboard] = useState(false);
    return(
        <NavBarContext.Provider value={{ showNavbar,setShowNavbar,isDashboard,setIsDashboard }}>
            {children}
        </NavBarContext.Provider>
    )
}