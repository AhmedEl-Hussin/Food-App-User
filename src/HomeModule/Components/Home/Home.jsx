import { Link } from "react-router-dom";
import Header from "../../../SharedModule/Components/Header/Header.jsx";

export default function Home() {
  return (
    <>
        <Header 
        Title={"Welcome to Home"} Paragraph= 
        {"This is a welcoming screen for the entry of the application , you can now see the options"} 
        />

        <div className="d-flex outlet mt-4 justify-content-between align-items-center">

          <div className="me-5">
            <h4>Fill the <span> Recipes </span>  !</h4>
            <p>you can now fill the meals easily using the table and form , 
              click here and sill it with the table !
            </p>
          </div>

          <div className='text-end'>
            <button className='btn btn-success px-4'>
              <Link className='text-white text-decoration-none' to= "/dashboard/recipes"> 
                Fill Recipes <i className="fa-solid fa-arrow-right"></i> 
              </Link>
            </button>
          </div>

        </div>


    </>
  )
}
