import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react" ;

export let AuthContext = createContext(null)

export default function AuthContextProvider(props){


    let requstHeaders = { 
        Authorization : `Bearer ${localStorage.getItem("userToken")}`
    }

    let baseUrl = `https://upskilling-egypt.com:443/api/v1`;


    const [userData , setUserData] = useState(()=> localStorage.getItem("userToken"));

    let saveUserData = ()=> {
        let encodedToken = localStorage.getItem("userToken");
        try{
            let decodedToken = jwtDecode(encodedToken);
            setUserData(decodedToken)
        }catch (error){
            setUserData(null)
        }
    }
    
    useEffect( ()=> {
        if (localStorage.getItem("userToken")) {
            saveUserData()
        }
    } , [])

    return ( <AuthContext.Provider value= {{userData , saveUserData , requstHeaders , baseUrl }} >

        {props.children}

    </AuthContext.Provider>)

}