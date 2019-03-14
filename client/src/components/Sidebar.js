import React from 'react';
import { Nav } from 'react-bootstrap';
import '../css/sidebar.css';

class SideBar extends React.Component {
    render() {
        return (
            <Nav id="sidebar" variant="pills" className="flex-column" >
                <Nav.Item id="user" bsPrefix="sidebaritem">
                    <Nav.Link bsPrefix="sidebarlink" href="/home">User</Nav.Link>
                </Nav.Item>
                <Nav.Item bsPrefix="sidebaritem">
                    <Nav.Link bsPrefix="sidebarlink" href="/home">Schedules</Nav.Link>
                </Nav.Item>
                <Nav.Item bsPrefix="sidebaritem">
                    <Nav.Link bsPrefix="sidebarlink" href="/add">Tags</Nav.Link>
                </Nav.Item>
                <Nav.Item bsPrefix="sidebaritem">
                    <Nav.Link bsPrefix="sidebarlink" href="/add">Analysis</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}

export default SideBar;