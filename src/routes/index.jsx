import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./defaultLayout/defaultLayout";
import Home from "../components/home";
import Signup from "../components/form/signup";
import Footwear from "../components/footwaer";
import Men from "../components/men/men";
import Sport from "../components/sport";
import Women from "../components/women";
import Cart from "../common/cart";
import ProductPage from "../components/ProductInformation";



const router = createBrowserRouter([
    
    {
        path: "/Signup",
        element: <Signup/>,
    },
    
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/MEN",
                element: <Men/>
            },
            {
                path: "/WOMEN",
                element: <Women/>
            },
            {
                path: "/FOOTWEAR",
                element: <Footwear/>
            },
            {
                path: "/SPORT",
                element: <Sport/>
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/product",
                element: <ProductPage/>
            },
            {
                path: "*",
                element: <h1>Error: Page Not Found</h1> 
            }
        ],
    }
]);

export default router;
