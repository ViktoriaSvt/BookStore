import { Route, Routes, BrowserRouter } from "react-router-dom"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Cart from "./components/cart/Cart"
import ProfileInfo from "./components/profile/Profile"
import Search from "./components/search/bookList"
import Details from "./components/details/Details"
import Register from "./components/register/Register"
import { useEffect, useState } from "react"
import { AuthContext } from "./contexts/AuthContext"
import { getSession } from "./api/auth-api"
import FAQ from "./components/questions/FAQ-container"
import AdminFAQ from "./components/questions/adminFaq"



function App() {

  const [authState, setAuthState] = useState({});

  const changeAuthState = (state) => {
    setAuthState(state)
  }

  const contextData = {
    userId: authState._id,
    email: authState.email,
    isAdmin: authState.isAdmin,
    isAuthenticated: !!authState.email,
    changeAuthState
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
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
