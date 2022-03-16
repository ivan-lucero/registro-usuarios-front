import React from 'react'
import { Link } from 'react-router-dom'
import {Navbar, Container, Nav} from 'react-bootstrap'
const Header = () => {
    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/prueba">Prueba</Link>
                        <Link to="/login">Ingresar</Link>
                        <Link to="/register">Registrarse</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;