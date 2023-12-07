
import { Navigate } from 'react-router-dom'


export default function ProtectedRouter({userData , children}) {
  
      if (userData == null || !localStorage.getItem("userToken")) {
        // console.log(userData);
        return <Navigate to = "/login"/>
      }else{
          return children
      }
}
