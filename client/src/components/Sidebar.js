import React from 'react';
import { Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route} from "react-router-dom";
import '../css/sidebar.css';

class SideBar extends React.Component {
   render() {
    return (
      <Router>
        <Nav id="sidebar" variant="pills" className="flex-column" >
          <SidebarLink activeOnlyWhenExact={true} to="/" label="User"/>
          <SidebarLink to="/schedules" label="Schedules"/>
          <SidebarLink to="/tags" label="Tags"/>
          <SidebarLink to="/analysis" label="Analysis"/>
        </Nav>
      </Router>
    );
  }
}

function SidebarLink({ label, to, activeOnlyWhenExact }) {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <Nav.Item bsPrefix="sidebaritem" id={label === "User" ? "user" : ""} className={match ? "active" : ""}>
          <Nav.Link bsPrefix="sidebarlink" href={to} eventKey={match ? "disabled" : ""}>
          { label }
          </Nav.Link>
        </Nav.Item>
      )}
    />
  );
}

export default SideBar;