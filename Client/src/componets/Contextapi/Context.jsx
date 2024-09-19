import React, { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInterceptorPage } from "../Interceptor/interceptor"; // Assuming this is your interceptor file
import axios from "axios";
import { useEffect } from "react";


export const ContextApi = createContext();

export const Apiprovider = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate();
  const axiosInstance = axiosInterceptorPage();

  const [otp, setOtp] = useState('');
  const [otpAllow, setOtpAllow] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isSignup, setSignup] = useState(true)
  const [email, setemail] = useState('')
  const [products, setProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [cartlength, setCartlength] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [forgetemail, setforgetsetEmail] = useState('')

  const [userauth, setUserAuth] = useState(false)

  const [allCartData, setAllCartData] = useState([])
  const [totalprice, setTotalPrice] = useState()




  const fetchCart = async () => {

    try {
      console.log("inside cart 1");
      const access = localStorage.getItem('accessToken')
      if (access) {
        const response = await axiosInstance.get('http://localhost:5000/api/user/cart');
        setAllCartData(response.data.cartData.items)
        console.log(response.data.cartData.cartTotal, "total");
        setTotalPrice(response.data.cartData.cartTotal)

        const totalItemsLength = response.data.cartData.items

        console.log(totalItemsLength.length, "data length");

        setCartlength(totalItemsLength.length)

        console.log("inside cart 2");
        console.log("response.data:", response.data.cartData);
      }



    } catch (error) {
      console.log('ividew vannu');
      console.error(error);


    }
  };
  useEffect(() => {
    const access = localStorage.getItem('accessToken')

    if (access) {
      fetchCart()
      setUserAuth(true)
    }
  }, [])






  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://trifolix-hair-transplant-backend.vercel.app/api/user/product-data');
      setProducts(response.data.products);
      console.log(response.data.products)
      fetchCart()
    } catch (error) {
      console.error('Error fetching the products:', error);
    }
  };



  const handleCloseModal = () => {
    setShowOtpModal(false);
    setTimer(60);
    setOtp('');
    setOtpAllow(false);
  };

  const handleResendOtp = async () => {
    setTimer(60);
    setOtp('');
    setOtpAllow(false);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/resend-otp', { email: formData.email || forgetemail });
      console.log('OTP Resent:', response.data);


    } catch (error) {
      console.error('There was an error resending the OTP:', error);
    }
  };










  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      const response = await axiosInstance.post(
        'http://localhost:5000/api/user/addToCart',
        { productId, quantity },
        { withCredentials: true }
      );

      fetchCart()
      setAddedToCart(response.data)

      console.log('Product added to cart:', response.data, "this is id for the current cliked product");


    } catch (error) {
      console.error('Error adding product to cart:', error);

    }
  };




  const handleOtpSubmit = async () => {
    if (otp) {

      handleCloseModal();
    

      try {


        console.log(isSignup, email, "after issignup and email");
        console.log(isSignup, forgetemail, "after issignup and email");

        const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { otp, isSignup,email: formData.email || forgetemail}, { withCredentials: true });
        console.log(isSignup, email, "after issignup and email");
        if (isSignup) {
          const accessToken = response.data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          navigate('/')
        } else {
          navigate('/changepassword')
        }

        setUserAuth(true)
      } catch (error) {
        console.error('There was an error submitting the form:', error);
      }
    }
  };

  return (
    <ContextApi.Provider value={{
      setShowOtpModal,
      otp,
      forgetemail,
      handleOtpSubmit,
      formData,
      setFormData,
      setOtp,
      otpAllow,
      setOtpAllow,
      timer,
      setTimer,
      setforgetsetEmail,
      handleCloseModal,
      showOtpModal,
      handleResendOtp,
      setUserAuth,
      userauth,
      isSignup,
      setSignup,
      fetchProducts,
      products,
      handleAddToCart,
      addedToCart,
      allCartData,
      fetchCart,
      totalprice,
      cartlength
    }}>
      {children}
    </ContextApi.Provider>
  );
};
