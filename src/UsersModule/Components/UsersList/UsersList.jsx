import { Modal } from "react-bootstrap";
import Header from "../../../SharedModule/Components/Header/Header.jsx";
import { useContext, useEffect, useState } from "react";
import imgNoData from '../../../assets/images/noData.png'
import axios from "axios";
import NoData from "../../../SharedModule/Components/NoData/NoData.jsx";
import { AuthContext } from "../../../Context/AuthContext.jsx";

export default function UsersList() {

  const [isLoding , setIsLoding] =useState(false);
  const [usersList , setUsersList] = useState([]);
  const [modelState, setModelState] = useState("colse");
  const [itemId , setItemId] = useState(0);
  const [pagesArray , setPagesArray]= useState([]);
  const [searchString , setSearchString] = useState("");
  const {requstHeaders , baseUrl} = useContext(AuthContext);
  const handleClose = () => setModelState("colse");


  // *************** to show add model ***************
  const showDeleteModel = (id)=>{
    setItemId(id)
    setModelState("delete-model");
  }

  // *************** to delete Category *****************
  const deleteUser = ()=>{
    setIsLoding(true);
    axios.delete(`${baseUrl}/Users/${itemId}` , 
    {
      headers : requstHeaders,
    })
    .then((response)=>{
      handleClose()
      getAllUsers();
      setIsLoding(false)
    
    }).catch((error)=>{
      error(error?.response?.data?.message || "Category Not Deleted");
      setIsLoding(false)
    })
    
  }

  // *************** to get name value *****************
  const getNameValue = (input)=> {
    // console.log(input?.target?.value);
    setSearchString(input.target.value);
    getAllUsers(1 , input.target.value);

  }

  // *************** to get all Users *****************
  const getAllUsers = (pageNo , name)=>{
    axios.get(`${baseUrl}/Users/` , 
    {
      headers: requstHeaders,
      params : {
        pageSize : 10,
        pageNumber : pageNo,
        userName : name
      }
    })
    .then((response)=>{
      // console.log(response?.data?.totalNumberOfPages);
      setPagesArray( Array(response?.data?.totalNumberOfPages).fill().map((_ , i)=> i+1));
      setUsersList(response?.data?.data)
    
    }).catch((error)=>{
      error(error?.response?.data?.message || "Not Found Categorys")
      // console.log(error.response.data.message);
    })
  }

  useEffect(()=> {
    getAllUsers(1);
  } , [])

  return (

    <>

      <Header 
        Title={"Users List"} 
        Paragraph= {"You can now add your items that any user can order it from the Application and you can edit"} 
      />

      {/* ************* this model to delete User *********** */}
      <Modal show={modelState == "delete-model"} onHide={handleClose}>
        <Modal.Body>
            <div className="text-center noData mt-3">

              <img className='w-50' src= {imgNoData} alt="" />
              <h5 className='mt-3'>Delete This User ?</h5>
              <p>are you sure you want to delete this item ? if you are sure just <br/> click on delete it</p>

              <div className='text-end mt-5'>
                <button onClick={deleteUser} className='btn text-end border border-danger text-danger'>
                  {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Delete this item"}
                </button>
              </div>

            </div>
        </Modal.Body>
      </Modal>

      {/* **************** to content above table ****************** */}
      <div className='caption-category  mt-4 '>

      <div className=''>
        <h5>Users Table Details</h5>
        <span>You can check all details</span>
      </div>

      </div>

      {/* **************** to display table ****************** */}
      <input onChange={getNameValue} className='form-control my-4 w-100' placeholder='Search By Name....' type="text" />

      <div>
      
        {usersList?.length > 0 ? 
          <div className='table-responsive'>

          <table className="table table-striped mt-5">

          <thead className='table-secondary'>
            <tr className='test3'>
              <th scope="col">#</th>
              <th scope="col"> User Name</th>
              <th scope="col">Image</th>
              <th scope="col">PhoneNumber</th>
              <th className='text-center ' scope="col text-end">Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {usersList?.map((user , index)=> (
                <tr key={user.id}>
                  <th scope="row"> {index + 1} </th>
                  <td>{user.userName}</td>
                  <td>
                    <div className='img-container'>
                      <img className='w-100' src={`https://upskilling-egypt.com:443/`+user.imagePath} alt="" />
                    </div>
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td className='text-center'>
                    <i onClick={()=> showDeleteModel(user.id)} className='fa ms-3 fs-5 text-danger fa-trash'></i>
                  </td>
                </tr>
              
            ))}
          </tbody>
        </table> </div> : <NoData/>}


        <nav className='pagination-btn d-flex justify-content-center' aria-label="...">
          <ul className="pagination pagination-sm">
            {pagesArray.map((pageNo)=> (
              <>
                <li key={pageNo} onClick={()=> getAllUsers(pageNo , searchString)} className="page-item ">
                  <a className="page-link bg-success text-white" > {pageNo} </a>
                </li> 
              </>
            ))}
          </ul>
        </nav>

      </div>


    </>
  )
}
