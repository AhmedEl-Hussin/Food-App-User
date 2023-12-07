import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MasterLayout from './SharedModule/Components/MasterLayout/MasterLayout.jsx'
import NotFound from './SharedModule/Components/NotFound/NotFound.jsx'
import Home from './HomeModule/Components/Home/Home.jsx'
import Recipes from './RecipesModule/Components/Recipes/Recipes.jsx'
import AuthLayout from './SharedModule/Components/AuthLayout/AuthLayout.jsx'
import Login from './AuthModule/Components/Login/Login.jsx'
import ForgetPassword from './AuthModule/Components/ForgetPassword/ForgetPassword.jsx'
import ProtectedRouter from './SharedModule/Components/ProtectedRouter/ProtectedRouter.jsx'
import UpdatePassword from './AuthModule/Components/UpdatePassword/UpdatePassword.jsx'
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword.jsx'
import { useContext } from 'react'
import { AuthContext } from './Context/AuthContext.jsx'
import FavoritesList from './RecipesModule/Components/Recipes/FavoritesList.jsx'
import Rigesteration from './AuthModule/Components/Rigesteration/Rigesteration.jsx'
import VerfiyEmail from './AuthModule/Components/VerfiyEmail/VerfiyEmail.jsx'
import { ToastContainer } from 'react-toastify'


function App() {

  let {userData , saveUserData} = useContext(AuthContext)

  const routes = createBrowserRouter([

    {
      path : "dashboard",
      element : (<ProtectedRouter userData = {userData}> 
                  <MasterLayout userData = {userData} /> 
                  </ProtectedRouter>),
      errorElement : <NotFound/>,
      children : [
        {index : true , element : <Home/>},
        {path : "recipes" , element : <Recipes/>},
        {path : "favorites" , element : <FavoritesList/>},
      ]
    },

    {
      path : "/",
      element : <AuthLayout/>,
      errorElement : <NotFound/>,
      children : [
        {index : true , element : <Login saveUserData= {saveUserData} />},
        {path : "login" , element : <Login saveUserData= {saveUserData} />},
        {path : "forgetPassword" , element : <ForgetPassword/>},
        {path : "updatePassword" , element : <UpdatePassword/>},
        {path : "resetPassword" , element : <ResetPassword/>},
        {path : "forgetPassword" , element : <ForgetPassword/>},
        {path : "rigesteration" , element : <Rigesteration/>},
        {path : "verfiyEmail" , element : <VerfiyEmail/>}
      ]
    }

  ])

  return (
    <>

      <ToastContainer
        theme='colored'
        autoClose={2000}
        position='top-left'
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />

      <RouterProvider router={routes}/>
    </>
  )
}

export default App
