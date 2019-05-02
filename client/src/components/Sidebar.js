import React from 'react';
import { Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Tag from './Tag.js'
import '../css/sidebar.css';

class SideBar extends React.Component {
  constructor() {
    super();

    this.handleSave = this.handleSave.bind(this);

    this.state = {
      rotate: false,
      rotatetags: false,
      subjects: ['Agile Software Development', 'Machine Learning', 'SSPC'],
      tags: [{_id:"", name:'homework', color: 'pink'}, {_id:"", name:'else', color: 'purple'}, {_id:"", name:'quiz', color: 'blue'}]
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

    fetch('/tags')
    .then(res => res.json())
    .then(data => {
      this.setState({
        tags: data.tags
      });
    })
    .catch(err => {
        console.log(err);
    });
  }
  
  handleSave(newTag) {
    let tags = this.state.tags;
    tags.push(newTag);
    this.setState({ tags: tags });
  }

  render() {
    const { rotate, subjects, rotatetags, tags } = this.state;
    return (
      <Router>
        <Nav id="sidebar" variant="pills" className="flex-column" >
          <Nav.Item id="user">
            <Nav.Link bsPrefix="sidebarlink userlink" disabled="true"> 
              Organizer
            </Nav.Link>
          </Nav.Item>
          <SidebarLink to="/schedules" label="Schedules"/>
          
          <Nav.Item bsPrefix="sidebaritem">
            <Nav.Link 
              bsPrefix="sidebarlink" 
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
                bsPrefix="submenu"
                key={i}
              >
                <Nav.Link 
                  bsPrefix="sidebarlink submenu" 
                  href={`/tag/${tag.name}`}
                  label="Tag"
                >
                  {tag.name}
                </Nav.Link>
              </Nav.Item>
            )}
            <Nav.Item bsPrefix="submenu">
              <Tag tags={this.state.tags}
              handleSave={this.handleSave}/>
            </Nav.Item>
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
          className={match ? "active" : ""}
        >
          <Nav.Link 
            href={to} 
            bsPrefix="sidebarlink" 
            eventKey={match ? "disabled" : ""}
          >
          { label }
          </Nav.Link>
        </Nav.Item>
      )}
    />
  );
}


export default SideBar;