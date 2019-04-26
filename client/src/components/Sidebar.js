import React from 'react';
import { Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route} from "react-router-dom";
import '../css/sidebar.css';

class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      rotate: false,
      rotatetags: false,
      subjects: ['Agile Software Development', 'Machine Learning', 'SSPC'],
      tags: ['homework', 'Quizzes', 'Labs', 'Tests']
    }
  }

  componentDidMount() {
    fetch('/classes')
    .then(res => res.json())
    .then(data => {
      this.setState({
        subjects: data.classes

      });
    })
    .catch(err => {
        console.log(err);
    });
  }
  

  render() {
    const { rotate, subjects } = this.state;
    const { rotatetags, tags } = this.state;
    return (
      <Router>
        <Nav id="sidebar" variant="pills" className="flex-column" >
          <SidebarLink activeOnlyWhenExact={true} to="/" label="User"/>
          <SidebarLink to="/schedules" label="Schedules"/>
          
          <Nav.Item bsPrefix="sidebartag">
            <Nav.Link 
              bsPrefix="sidebartaglink" 
              onClick={() => this.setState({ rotatetags: !rotatetags })}
            > 
              Tags &nbsp;
              <span className={rotatetags ? "in" : "out"}>
                &#9650;
              </span>
            </Nav.Link>
          </Nav.Item>

          <div className={rotatetags ? "show" : "hidden"}>
            {tags.map((tag, i) => 
            <Nav.Item 
                bsPrefix="tagmenu"
                key={i}
              >
                <Nav.Link 
                  bsPrefix="sidebartaglink tagmenu" 
                  href={`/tag/${tag}`}
                  label="Tag"
                >
                  {tag}
                </Nav.Link>
              </Nav.Item>
            )}
          </div>

          {/* angela's code */}
          <Nav.Item bsPrefix="sidebaritem">
            <Nav.Link 
              bsPrefix="sidebarlink" 
              onClick={() => this.setState({ rotate: !rotate })}
            > 
              Subjects &nbsp;
              <span className={rotate ? "in" : "out"}>
                &#9650;
              </span>
            </Nav.Link>
          </Nav.Item>

          <div className={rotate ? "show" : "hidden"}>
            {subjects.map((subject, i) => 
            <Nav.Item 
                bsPrefix="submenu"
                key={i}
              >
                <Nav.Link 
                  bsPrefix="sidebarlink submenu"
                  href={`/subject/${subject}`}
                  label="Subject"
                >
                  {subject}
                </Nav.Link>
              </Nav.Item>
            )}
          </div>

          <SidebarLink to="/analysis" label="Analysis"/>
          <SidebarLink to="/setting" label="Setting"/>
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
        <Nav.Item 
          bsPrefix="sidebaritem" 
          id={label === "User" ? "user" : ""} 
          className={match ? "active" : ""}
        >
        
          <Nav.Link bsPrefix="sidebarlink" href={to} eventKey={match ? "disabled" : ""}>
          { label }
          </Nav.Link>
        </Nav.Item>
      )}
    />
  );
}


export default SideBar;