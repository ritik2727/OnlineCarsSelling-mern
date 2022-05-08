import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import "./index.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductListScreen from "./screens/ProductListScreen"
import UserEditScreen from './screens/UserEditScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen';
import OTPScreen from "./screens/OTPScreen";
import Wishlist from "./screens/Wishlist";
import CategoryWiseProduct from "./screens/CategoryWiseProduct";
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/styled-engine';
import theme from "./components/Theme";
import "./StylesUI.css"
import CouponScreen from "./screens/CouponScreen";
import NewHeader from "./components/ui/NewHeader";
import { useState } from "react";
import Colors from "./components/ui/Color";
import NewFooter from "./components/ui/NewFooter";
import AccScreen from "./screens/AccScreen";
import ScrollToTop from "./components/ui/ScrollToTop";
import ScrollTop from "./components/ui/ScrollTop";



function App(props) {
  const [value,setValue] = useState(0);
  const [selectedIndex,setSelectedIndex] = useState(0)
  return (
    <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme} >
    <Router>
      <div style={{backgroundColor:Colors.DarkBlue ,height:'100%',width:'100%',}}>
      <ScrollTop  showBelow={120} />
        <NewHeader   {...props}
      value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}/>
        {/* <Header /> */}
        <ScrollToTop />
        
        <main className="py-3">
          <Container  fluid style={{paddingRight:'5%',paddingLeft:'5%'}}>
            <Routes>
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/admin/userlist" element={<UserListScreen />} />

              <Route path='/admin/productlist' exact element={<ProductListScreen />} />
              <Route path='/admin/productlist/:pageNumber' exact element={<ProductListScreen />} />

              <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
              <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/accessories" element={<AccScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/reset-password" element={<OTPScreen/>} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart/:id" element={<CartScreen />} />
              <Route path="/cart/" element={<CartScreen />} />
              <Route path='/admin/orderlist' element={<OrderListScreen  />}  />
              <Route path='/admin/coupon' element={<CouponScreen/>} />


              <Route path='/search/:keyword' element={<HomeScreen />} />
              <Route path='/page/:pageNumber' element={<HomeScreen />} />
              <Route path='/search/:keyword/page/:pageNumber' exact element={<HomeScreen />} />

              <Route path='/category/:category/:brand' element={<CategoryWiseProduct />}  />
             
            </Routes>
          </Container>
        </main>
        <NewFooter/>
        {/* <Footer /> */}
      </div>
    </Router>
    </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
