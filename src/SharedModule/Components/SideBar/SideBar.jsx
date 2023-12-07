import { Modal } from "react-bootstrap";
import UpdatePassword from "../../../AuthModule/Components/UpdatePassword/UpdatePassword.jsx";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/images/3.png'
import { useState } from "react";



export default function SideBar() {

  let [isCollapsed , setIsCollapsed] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let handelToggle = ()=>{
    setIsCollapsed(!isCollapsed);
  }

  let navigate = useNavigate()

  let logout = ()=>{
    localStorage.removeItem("userToken");
    navigate("/login")
  }

  return (
    
    <>
    <div className="sideBar-container">

      <Modal show={show} onHide={handleClose}>

        <Modal.Body>
          <UpdatePassword handleClose = {handleClose} />
        </Modal.Body>
      </Modal>


      <Sidebar  collapsed={isCollapsed}>
        <Menu >
          <MenuItem onClick={handelToggle} icon={ <img className="" src= {logo} ></img> }> </MenuItem>
          
          <MenuItem 
            className="icons" icon={<i className="fa fa-home"></i>} 
            component={<Link to="/dashboard" />}> 
            Home
          </MenuItem>

          <MenuItem 
            icon={<i className="fa-solid fa-table"></i>} 
            component={<Link to="/dashboard/recipes" />}>
            Recipes
          </MenuItem>

          <MenuItem 
            icon={<i className="fa-regular fa-heart"></i>} 
            component={<Link to="/dashboard/favorites" />}>
            Favorites
          </MenuItem>

          <MenuItem 
            onClick={handleShow} 
            icon={<i className="fa-solid fa-unlock"></i>}> 
            Change Password
          </MenuItem>

          <MenuItem 
            onClick={logout} 
            icon={<i className="fa-solid fa-right-from-bracket"></i>}> 
            Logout
          </MenuItem>

        </Menu>
      </Sidebar>
      {/* <button onClick={logout} className="btn btn-success">Logout</button> */}

    </div>
    </>
  )
}
