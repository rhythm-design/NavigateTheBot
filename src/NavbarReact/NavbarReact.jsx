import React, {useState} from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import "./NavbarReact.css"
import Logo from "../images/bot.png";
import LogoText from "../images/logo-text.png";
import NavigateBot from "../NavigateBot/NavigateBot";

function NavbarReact(props){
  const [algorithm,setAlgorithm]=useState("");
  const [speed,setSpeed]=useState("medium");
  const handleSelect = (eventKey) =>{
    console.log(eventKey);
    if(eventKey==="dijkstra"){
      document.getElementById("navigateUsingAlgo").innerHTML="Visualize Dijkstra";
      document.getElementById("navigateUsingAlgo").className="navigate-button visualizeColor";
      setAlgorithm("dijkstra");
    }else if(eventKey==="astar"){
      document.getElementById("navigateUsingAlgo").innerHTML="Visualize A-star";
      document.getElementById("navigateUsingAlgo").className="navigate-button visualizeColor";
      setAlgorithm("astar");
    }
    // else if(eventKey==="low"){
    //   setSpeed("low");
    // }else if(eventKey==="medium"){
    //   setSpeed("medium");
    // }else if(eventKey==="high"){
    //   // // setSpeed("high");
    //   // props.animateSpeed=50;
    //   props.animateSpeed();
    // }
  } 
    return(
      <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet"></link>   
      <Navbar variant="dark" className="navbar-custom-color navbar-text navbar-padding-corrected" expand="lg">
        <Container>
          <Navbar.Brand className="text-white" href="#home">
                <img
              src={Logo}
              width="40"
              height="40"
              className="logo-photo"
              alt="logo"
            />
            <img
              src={LogoText}
              width="200"
              height="30"
              className="logo-text"
              alt="logo"
            />
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" onSelect={handleSelect}>
                
            <NavDropdown  title={<span className="text-white">Algorithms</span>} className="basic-nav-dropdown nav-items-style">
                <NavDropdown.Item  eventKey="dijkstra" >Dijkstra's Algorithm</NavDropdown.Item>
                <NavDropdown.Item  eventKey="astar" >Astar algo</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown  title={<span className="text-white">Speed</span>} className="basic-nav-dropdown nav-items-style">
                <NavDropdown.Item  eventKey="low" >Low</NavDropdown.Item>
                <NavDropdown.Item  eventKey="medium" >Medium</NavDropdown.Item>
                <NavDropdown.Item  eventKey="high" >High</NavDropdown.Item>
              </NavDropdown>
              {/* <Nav.Link href="#speed" className="text-white nav-items-style">Speed</Nav.Link> */}
              <script type="text/javascript" src="../NavigateBot/NavigateBot.jsx"></script>
              <button id="navigateUsingAlgo"  className="navigate-button" onClick={ ()=>
               algorithm==="dijkstra" ?
                `${props.visualizeDijkstra()}`:
                algorithm==="astar" ?
                 `${props.visualizeAstar()}`:
                 null} >Select Algorithm</button>
              <Nav.Link onClick={props.clearBoard} className="text-white nav-items-style">CLEAR BOARD</Nav.Link>
              <Nav.Link onClick={props.clearPath} className="text-white nav-items-style">CLEAR PATH</Nav.Link>
              <Nav.Link onClick={props.clearWall} className="text-white nav-items-style">CLEAR WALLS</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <link
        rel="stylesheet"
        href="NavbarReact.css"
        />
      </Navbar>
    </>
    );

}

export default NavbarReact;


// https://www.linkpicture.com/q/Navigate-Bot-_1.svg"