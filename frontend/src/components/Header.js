import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import UserService from '../services/UserService'
import Clock from './Clock'


function Header() {
    const userService = new UserService()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispatch(userService.logout())
    }

    return (
        <header>
            <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>Auction</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to='/items'>
                        <Nav.Link>Items</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/lots'>
                        <Nav.Link>Lots</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/auctions'>
                        <Nav.Link>Auctions</Nav.Link>
                    </LinkContainer>
                    {userInfo ? (
                        <NavDropdown title={userInfo.username} id='username'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>
                                    Profile
                                </NavDropdown.Item>
                            </LinkContainer>

                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>

                        </NavDropdown>
                    ) : (
                        <LinkContainer to="/login">
                            <Nav.Link><i className="fa fa-user"></i>Login</Nav.Link>
                        </LinkContainer> 
                    )}
                </Nav>
                <Nav>
                    <Nav.Item>
                        <Clock />
                    </Nav.Item>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}

export default Header
