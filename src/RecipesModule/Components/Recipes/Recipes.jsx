import { useContext, useEffect, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header.jsx'
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import NoData from '../../../SharedModule/Components/NoData/NoData.jsx';
import { AuthContext } from '../../../Context/AuthContext.jsx';
import noData from "../../../assets/images/noData.png"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Recipes() {


  const {requstHeaders , baseUrl} = useContext(AuthContext);
  const [recipesList , setRecipesList] = useState([]);
  const [modelState , setModelState] = useState("close");
  const [itemId , setItemId] = useState(0);
  const [categoryIds , setCategoryIds] = useState([]);
  const [isLoding , setIsLoding] =useState(false);
  const [tagIds , setTagIds] = useState([]);
  const [pagesArray , setPagesArray] = useState([]);
  const [searchString , setSearchString] = useState("");
  const [selectedTagId , setSelectedTagId] = useState(0);
  const [recipeDetails , setRecipeDetails] = useState({});
  const [selectedCategoryId , setSelectedCategoryId] = useState(0);

  const handleClose = () => setModelState("colse");


  const showViewModel = (id)=>{
    setItemId(id)
    setModelState("view-model")
    getRecipesDetails(id)
  }

  // *************** to get all category ids ***************
  const getCategoryIds = ()=>{
    axios.get(`${baseUrl}/Category/?pageSize=100&pageNumber=1` , 
    {
      headers: requstHeaders,
    })
    .then((response)=>{
      // console.log(response);
      setCategoryIds(response.data.data);
    
    }).catch((error)=>{
      // console.log(error?.response?.data?.message);
      error(error?.response?.data?.message || "Not Found category Ids")
    })
  }

  // *************** to get all tag ids *****************
  const getTagIds = ()=>{

    axios.get( `${baseUrl}/tag/` , 
    {
      headers: requstHeaders,
    })
    .then((response)=>{
      setTagIds(response.data);
    
    }).catch((error)=>{
      // console.log(error.response.data.message);
      error(error?.response?.data?.message || "Not Found Tag Ids")
    })
  }

  // *************** to view detail of recipe *****************
  const getRecipesDetails = (id)=>{

    axios.get( `${baseUrl}/Recipe/${id}` , 
    {
      headers: requstHeaders,
    })
    .then((response)=>{
      // console.log(response?.data);
      setRecipeDetails(response?.data);
    
    }).catch((error)=>{
      // console.log(error.response.data.message);
      error(error?.response?.data?.message || "Not Found Tag Ids")
    })
  }

  // *************** to add favorite *****************
  const addToFavorite = ()=> {
    setIsLoding(true)

    axios.post( `${baseUrl}/userRecipe/` , {
      "recipeId": itemId
    } ,
    {
      headers: requstHeaders,
    })
    .then((response)=>{
      console.log(response);
      // setRecipeDetails(response?.data);
      handleClose();
      setIsLoding(false)
      toast.success("Added To Faviourt")
      
    }).catch((error)=>{
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Not Found Tag Ids")
      setIsLoding(false)
    })
  }

  // *************** to get all recipes *****************
  const getAllRecipes = (pageNo , name , tagId , categortId)=>{
    setIsLoding(true)

    axios.get(`${baseUrl}/Recipe/` , 
    {
      headers: requstHeaders,
      params : {
        pageSize : 5,
        pageNumber : pageNo,
        name : name,
        tagId : tagId ,
        categoryId : categortId
      }
    })
    .then((response)=>{
      // console.log(response);
      setPagesArray( Array(response.data.totalNumberOfPages).fill().map((_ , i)=> i+1));
      setRecipesList(response?.data?.data);
      setIsLoding(false)
    
    }).catch((error)=>{
      // console.log(error);
      error(error.response.data.message);
      setIsLoding(false)
    })
  }

  // *************** to search by name *****************
  const getRecipeValue = (input)=> {
    setSearchString(input.target.value)
    getAllRecipes( 1 , input.target.value);
  }

  // *************** to search by tagId *****************
  const getTagValue = (select)=> {
    // console.log(select.target.value);
    setSelectedTagId(select.target.value)
    getAllRecipes( 1 , null , select.target.value , selectedCategoryId);
  }

  // *************** to search by categoryId *****************
  const getcategoryValue = (select)=> {
    setSelectedCategoryId(select.target.value)
    getAllRecipes( 1 , null , selectedTagId , select.target.value);
  }

  useEffect( ()=> {
    getCategoryIds();
    getTagIds();
    getAllRecipes();
  } , [])

  return (
    
    <>
      <Header 
      Title={"Recipes Items"} 
      Paragraph= {`You can now add your items that any user can order it from the Application and you can edit`} 
      />

      {/* ************* this model to update recipe *********** */}
      <Modal show={modelState == "view-model"} onHide={handleClose}>
        <Modal.Body>
          <h4 className="">Recipe Details</h4> 
          <div className='w-50 m-auto mt-4'>
            {recipeDetails?.imagePath ?            
              <img className='w-100 rounded-4' src={`https://upskilling-egypt.com:443/`+recipeDetails?.imagePath} alt="" />
            : <img className='w-100' src= {noData}/> }
          </div>

          <div className='mt-4'>
            <h6> <span className='text-success'>Description : </span> {recipeDetails?.description} </h6>
            <h6> <span className='text-success'>Category : </span> {recipeDetails?.category?.name} </h6>
            <h6> <span className='text-success'>Tag : </span> {recipeDetails?.tag?.name} </h6>
          </div>

          <div className='text-end my-3'>
            <button onClick={addToFavorite} className='btn btn-outline-success'>
              {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add to favorite"}
            </button>
          </div>

        </Modal.Body>
      </Modal>

      {/* **************** to content above table ****************** */}
      <div className='caption-category  mt-3 mb-5 '>

        <div className=''>
          <h5>Recipes Table Details</h5>
          <span>You can check all details</span>
        </div>

      </div>

      {/* **************** to view search inputs ****************** */}
      <div className='d-flex'>

        <input onChange={getRecipeValue} className='form-control w-50' placeholder='Search By Name.....' type="text" />
        
        <select onChange={getTagValue} className='form-select w-25 ms-2'>
          <option value="" className='text-muted'>Select tag</option>
            {tagIds.map((getId , index)=> (
              <option key={index} value={getId.id}>
                {getId.name}
              </option>
            ))} 
        </select>

        <select onChange={getcategoryValue} className='form-select w-25 ms-2'>
          <option value="" className='text-muted'>Select category</option>
            {categoryIds.map((getId , index)=> (
              <option key={index} value={getId.id}>
                {getId.name}
              </option>
            ))} 
        </select>

      </div>

      {/* **************** to display the table ****************** */}
      
      {!isLoding ? <div>

        {recipesList.length > 0 ? 

        <div className='table-responsive'>

        <table className="table table table-striped mt-4">
        
          <thead className='table-secondary'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Tag</th>
              <th className='text-center ' scope="col text-end">Actions</th>
            </tr>
          </thead>
        
          <tbody>
            {recipesList.map((recipe , index )=> (
                <tr key={recipe.id}>
                  <td scope="row"> {index + 1} </td>
                  <td> {recipe.name} </td>
                  <td>
                    <div className='img-container'>
                      <img className='w-100' src={`https://upskilling-egypt.com:443/`+recipe.imagePath} alt="" />
                    </div>
                  </td>
                  <td> {recipe.price} </td>
                  <td> {recipe.description} </td>
                  <td>{recipe?.category[0]?.name}</td>
                  <td> {recipe.tag.name} </td>
            
                  <td className='text-center'>
                    <i onClick={()=> showViewModel(recipe.id)} className='fa fs-6 text-success fa-eye'></i>
                  </td>
                </tr>

            ))}
          </tbody>
        </table> </div> : <NoData/> }
            
        </div> : <div className='text-center loading mb-5 mt-4 fs-1'> <i className="fa-solid text-success fa-spin fa-spinner"></i> </div>}

      {/* ********************* to pagination and filteration ******************** */}
        <nav className='pagination-btn d-flex justify-content-center' aria-label="...">
            <ul className="pagination pagination-sm">
              {pagesArray.map((pageNo)=> (
                <>
                  <li key={pageNo} onClick={()=> getAllRecipes(pageNo , searchString )} className="page-item ">
                    <a className="page-link bg-success text-white" > {pageNo} </a>
                  </li>
                </>
              ))}
            </ul>
        </nav>

    </>
  )
}
