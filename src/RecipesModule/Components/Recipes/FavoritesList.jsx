import { useContext, useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header.jsx";
import { AuthContext } from "../../../Context/AuthContext.jsx";
import axios from "axios";
import imgNoData from '../../../assets/images/noData.png'
import noData from "../../../assets/images/noData.png"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "react-bootstrap";
import NoData from "../../../SharedModule/Components/NoData/NoData.jsx";


export default function FavoritesList() {

    const [faviourtList , setFaviourtList] = useState([]);
    const {baseUrl , requstHeaders} = useContext(AuthContext);
    const [isLoding , setIsLoding] =useState(false);
    const [modelState , setModelState] = useState("close");
    const [itemId , setItemId] = useState(0);

    const handleClose = () => setModelState("colse");


    // *************** to show delete model ***************
    const showDeleteModel = (id)=> {
        setItemId(id)
        setModelState("delete-model")
    }

    // ******************** to display all favorite list ************************
    const getAllFaviourtList = ()=> {
        setIsLoding(true)

        axios.get(`${baseUrl}/userRecipe/` , 
        {
            headers: requstHeaders,
        })
        .then((response)=>{
            // console.log(response.data);
            setFaviourtList(response?.data?.data)
            setIsLoding(false)
        
        }).catch((error)=>{
            // console.log(error);
            error(error?.response?.data?.data)
            setIsLoding(false)
        })
    }

    // ******************** to delete favorite recipe ************************
    const deleteFaviourt = ()=> {
        // alert(itemId)
        setIsLoding(true);
        axios.delete(`${baseUrl}/userRecipe/${itemId}` , 
        {
            headers : requstHeaders,
        })
        .then((response)=>{
            getAllFaviourtList()
            handleClose()
            setIsLoding(false);
            toast.success("Faviourt Deleted Successfuly")
        
        }).catch((error)=>{
          // console.log(error.response.data.message);
            toast.error(error?.response?.data?.message || "Recipe Not Deleted")
            setIsLoding(false);
        })
        }
    
    useEffect( ()=> {
        getAllFaviourtList()
    } , [])
    
    return (
        
        <>

            <Header 
                Title={"Favorite Items"} 
                Paragraph= {`You can now add your items that any user can order it from the Application and you can edit`} 
            />  

            {/* ************* this model to delete faviourt recipe *********** */}
            <Modal show={modelState == "delete-model"} onHide={handleClose}>
                <Modal.Body>
                    <div className="text-center noData mt-3">
                        <img className='w-50' src= {imgNoData} alt="" />
                        <h5 className='mt-3'>Delete This Faviourt ?</h5>
                        <p>are you sure you want to delete this item ? if you are sure just <br/> click on delete it</p>

                        <div className='text-end mt-5'>
                            <button onClick={deleteFaviourt} className='btn text-end border border-danger text-danger'>
                                {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Delete this item"}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


            {/* ************* to display all faviourt recipe *********** */}
            {!isLoding ? <div className="container  pb-5">

                {faviourtList.length > 0 ? <div className="row mt-5 g-4">

                    {faviourtList.map((fav , index)=> (

                        <div key={index} className="col-md-4 ">
                            <div className=" shadow p-3  bg-white rounded rounded-4">
                                {fav?.recipe?.imagePath ? 
                                    <div className="favImg">
                                        <img className='w-100 h-100 rounded-4' src={`https://upskilling-egypt.com:443/`+fav?.recipe?.imagePath} alt="" />
                                    </div> 
                                :   <div className="favImg"> 
                                        <img className='w-100 h-100' src= {noData}/> 
                                    </div> }

                                <h6 className="mt-3"> <span className="text-success fs-6"> Name :</span> {fav.recipe.name} </h6>
                                <h6> <span className="text-success fs-6"> Description :</span> {fav.recipe.description} </h6>
                                
                                <div className="text-end ">
                                    <button onClick={()=> showDeleteModel(fav.id)} className="btn m-2 btn-outline-danger">
                                        Delete
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    ))}

                </div> : <NoData/>  }

            </div> : <div className='text-center loading mt-5 '> 
                        <i className="fa-solid text-success fa-spin fa-spinner"></i> 
                    </div>}

        </>
    )
}
