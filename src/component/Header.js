import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { logout } from "./Constant";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const logoutUser = () => {
    logout();
    navigate("/login");
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      className="user-name"
      href="javascript:void(0)"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
      className="px-3 header"
    >
      <Navbar.Brand href="#home">Brand name</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">

        </Nav>

        <Nav>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              <div className="d-flex">
                <div>Pratiksha Mhatre</div>
                <div className="avatar">
                  <div className="avatar-text center">PM</div>
                </div>
                <div className="mx-2">&#x25bc;</div>{" "}
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href="/edit-profile"
                // onClick={() => router.push("edit-profile")}
              >
                Edit Profile
              </Dropdown.Item>
              <Dropdown.Item
                href="change-password"
                // onClick={() => router.push("change-password")}
              >
                Change Password
              </Dropdown.Item>
              <Dropdown.Item href="" onClick={() => logoutUser()}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
