import axios from 'axios';
import Header from '../../../SharedModule/Components/Header/Header.jsx';
import { useContext, useEffect, useState } from 'react';
import NoData from '../../../SharedModule/Components/NoData/NoData.jsx';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import imgNoData from '../../../assets/images/noData.png';
import { AuthContext } from '../../../Context/AuthContext.jsx';
import { TostContext } from '../../../Context/TostContext.jsx';

export default function Category() {

  const {
    register,
    handleSubmit,
    setValue,
    formState : { errors },
  } = useForm();

  const [isLoding , setIsLoding] =useState(false);
  const [categoryList , setCategoryList] = useState([]);
  const [modelState, setModelState] = useState("colse");
  const [itemId , setItemId] = useState(0);
  const [pagesArray , setPagesArray]= useState([])
  const [searchString , setSearchString] = useState("")
  const {requstHeaders , baseUrl } = useContext(AuthContext);
  const {getTostValue} = useContext(TostContext);
  const handleClose = () => setModelState("colse");

  
  // *************** to show add model ***************
  const showAddModel = ()=>{
    setValue("name" , null)
    setModelState("add-model");
  }

  // *************** to show delete model ***************
  const showDeleteModel = (id)=>{
    setItemId(id)
    setModelState("delete-model");
  }

  // *************** to show update model ***************
  const showUpdateeModel = (category)=>{
    setItemId(category.id);
    setValue("name" , category.name);
    setModelState("update-model");
  }

  const getNameValue = (input)=>{
    setSearchString(input.target.value)
    getCategoryList(1 , input.target.value);
  }


  // *************** to add new Category *****************
  const onSubmit = (data)=>{
    setIsLoding(true);
    
    axios.post( `${baseUrl}/Category` , data ,
    {
      headers : requstHeaders
    })
    .then((response)=> {
      // console.log(response);
      handleClose();
      getCategoryList();
      setIsLoding(false);
    })
    .catch((error)=> {
      console.log(error.response.data.message)
      error(error?.response?.data?.message || "Category Not Added");
      setIsLoding(false)
    })
  }

  // *************** to delete Category *****************
  const deleteCategory = ()=>{
    setIsLoding(true);
    axios.delete(`${baseUrl}/Category/${itemId}` , 
    {
      headers : requstHeaders
    })
    .then((response)=>{
      // console.log(response);
      getTostValue("success" , "Deleted Successfully")
      handleClose()
      getCategoryList()
      setIsLoding(false)
    
    }).catch((error)=>{
      // console.log(error.response.data.message);
      error(error?.response?.data?.message || "Category Not Deleted");
      setIsLoding(false)
    })
    
  }

  // *************** to update Category *****************
  const updateCategory = (data)=>{
    setIsLoding(true);
    axios.put(`${baseUrl}/Category/${itemId}`, data , 
    {
      headers : requstHeaders
    })
    .then((response)=>{
      console.log(response);
      handleClose()
      getCategoryList()
      setIsLoding(false)
    
    }).catch((error)=>{
      // console.log(error?.response?.data?.message);
      error(error?.response?.data?.message || "'Category Not Updated'")
      setIsLoding(false)
    })
    
  }

  // *************** to get all Categorys *****************
  const getCategoryList = (pageNo , name)=>{
    setIsLoding(true);
    
    axios.get(`${baseUrl}/Category/` , 
    {
      headers: requstHeaders ,
      params : {
        pageSize : 5,
        pageNumber : pageNo,
        name : name
      }
    })
    .then((response)=>{
      // console.log(response.data.totalNumberOfPages);
      setIsLoding(false)
      setPagesArray( Array(response.data.totalNumberOfPages).fill().map((_ , i)=> i+1) );
      setCategoryList(response.data.data);
    
    }).catch((error)=>{
      error(error?.response?.data?.message || "Not Found Categorys")
      setIsLoding(false)
      // console.log(error.response.data.message);
    })
  }

  useEffect( ()=> {
    getCategoryList(1)
  } , [])

  return (
    
    <>

      <Header 
      Title={"Categories Item"} 
      Paragraph= {"You can now add your items that any user can order it from the Application and you can edit"} 
      />

      {/* ************* this model to add Category *********** */}
      <Modal show={modelState == "add-model"} onHide={handleClose}>
        
        <Modal.Body>
          <h3 className='ms-3 mt-3 fw-bold'>Add Category</h3>

          <form className='form w-100 m-auto mt-5' onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group mt-4 position-relative'>
                  <input className='form-control' 
                          placeholder='Category Name' 
                          type="string" 
                          {...register("name" , {
                            required : true
                          })}
                  />

                  {errors.name && errors.name.type === "required" && (
                  <span className='text-danger '>Name is required</span>
                  )}

                </div>

                <div className='form-group mt-3 text-'>
                  <button className='btn w-100 text-white'>
                    {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Save"}
                  </button>
                </div>

              </form>
        </Modal.Body>
      </Modal>

      {/* ************* this model to delete Category *********** */}
      <Modal show={modelState == "delete-model"} onHide={handleClose}>
        <Modal.Body>
            <div className="text-center noData mt-3">
              <img className='w-50' src= {imgNoData} alt="" />
              <h5 className='mt-3'>Delete This Category ?</h5>
              <p>are you sure you want to delete this item ? if you are sure just <br/> click on delete it</p>

              <div className='text-end mt-5'>
                <button onClick={deleteCategory} className='btn text-end border border-danger text-danger'>
                  {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Delete this item"}
                </button>
              </div>
            </div>
        </Modal.Body>
      </Modal>

      {/* ************* this model to update Category *********** */}
      <Modal show={modelState == "update-model"} onHide={handleClose}>
        <Modal.Body>
          <h3 className='ms-3 mt-3 fw-bold'>Update Category</h3>

          <form className='form w-100 m-auto mt-5' onSubmit={handleSubmit(updateCategory)}>
                <div className='form-group mt-4 position-relative'>
                  <input className='form-control' 
                          placeholder='Category Name' 
                          type="string" 
                          {...register("name" , {
                            required : true
                          })}
                  />

                  {errors.name && errors.name.type === "required" && (
                  <span className='text-danger '>Name is required</span>
                  )}

                </div>

                <div className='form-group mt-3 text-'>
                  <button className='btn w-100 text-white'>  
                    {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "update category"}
                  </button>
                </div>

              </form>
        </Modal.Body>
      </Modal>

      {/* **************** to content above table ****************** */}
      <div className='caption-category  mt-3 mb-4 d-flex justify-content-between align-items-center'>

        <div className=''>
          <h5>Categories Table Details</h5>
          <span>You can check all details</span>
        </div>

        <div>
          <button onClick={showAddModel} className='btn btn-success px-4'>Add New Category</button>
        </div>

      </div>

      {/* **************** to display the table ****************** */}

      <input onChange={getNameValue} className='form-control mb-4 w-100' placeholder='Search By Name....' type="text" />
      
      <div>
        {categoryList.length > 0 ? 
          <table className="table table-striped">

          <thead className='table-secondary'>
            <tr className='test3'>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th></th>
              <th></th>
              <th className='text-center ' scope="col text-end">Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {categoryList.map((category , index)=> (
                <tr key={category.id}>
                  <th scope="row"> {index + 1} </th>
                  <td>{category.name}</td>
                  <td></td>
                  <td></td>
                  <td className='text-center'>
                    <i onClick={()=> showUpdateeModel(category)} className='fa fs-5 text-success fa-edit'></i>
                    <i onClick={()=> showDeleteModel(category.id)} className='fa ms-3 fs-5 text-danger fa-trash'></i>
                  </td>
                </tr>
              
            ))}
          </tbody>
        </table> : <NoData/>}

        <nav className='pagination-btn d-flex justify-content-center' aria-label="...">
          <ul className="pagination pagination-sm">
            {pagesArray.map((pageNo)=> (
              <>
                <li key={pageNo} onClick={()=> getCategoryList(pageNo , searchString)} className="page-item ">
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
