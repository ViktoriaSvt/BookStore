import { Route, Routes, BrowserRouter } from "react-router-dom"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Cart from "./components/cart/Cart"
import ProfileInfo from "./components/profile/Profile"
import Details from "./components/details/Details"
import Register from "./components/register/Register"
import { useEffect, useState } from "react"
import { AuthContext } from "./contexts/AuthContext"
import { getSession } from "./api/auth-api"

import AdminFAQ from "./components/questions/adminFaq"
import AdminDashboard from "./components/adminDashboard/AdminDashboard"
import Search from "./components/search/BookList"
import FAQ from "./components/questions/faq-container"



function App() {

  const [authState, setAuthState] = useState({});
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  const changeAuthState = (state) => {
    setAuthState(state)
  }

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const contextData = {
    userId: authState._id,
    email: authState.email,
    isAdmin: authState.isAdmin,
    isAuthenticated: !!authState.email,
    language,
    changeAuthState,
    changeLanguage
  }

  useEffect(() => {
    const initializeAuthState = async () => {
        const response = await getSession();
        
        if (response) {
          changeAuthState({
            _id: response._id,
            email: response.email,
            isAdmin: response.role == 'admin'
          });
        }


    }

    initializeAuthState();
    
  }, []);


  


  return (
    <AuthContext.Provider value={contextData}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId" element={contextData.isAuthenticated ? <ProfileInfo /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={contextData.isAdmin ? <AdminFAQ/> : <FAQ/>} />
          <Route path="/search" element={<Search />} />
          <Route path="/details/:bookId" element={<Details />} />
          <Route path="/cart" element={ <Cart /> } />
          <Route path="/tracker" element={ <AdminDashboard /> } />
        </Routes>

      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
