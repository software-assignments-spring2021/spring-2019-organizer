import React from 'react';
import { Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Tag from './Tag.js'
import '../css/sidebar.css';

class SideBar extends React.Component {
  constructor() {
    super();

    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      user: "",
      rotate: false,
      rotatetags: false,
      subjects: ['Agile Software Development', 'Machine Learning', 'SSPC'],
      tags: [{_id: "", user:"m", name:'homework', color: 'pink'}, {_id: "", user:"m", name:'else', color: 'purple'}, {_id: "", user:"m", name:'quiz', color: 'blue'}]
    }
  }

  componentDidMount() {
    // data format: [{"user": "", "task": [], "name": "", "deviation": 0}]
    fetch('/class')
    .then(res => res.json())
    .then(data => {
      const subjects = [];
      for (const obj of data) {
        subjects.push(obj.name);
      }
      this.setState({
        subjects: subjects
      });
    })
    .catch(err => {
      console.log(err);
    });

    // data format: [{_id: "", "user": "", "task": [], "name": "", "color": ""}]
    fetch('/tag')
    .then(res => res.json())
    .then(data => {
      this.setState({
        tags: data,
        user: 'tz904'
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

  handleDelete(tagName) {
    let tags = this.state.tags;
    tags = tags.filter(tag => {
      return tag.name !== tagName;
    });
    this.setState({ tags: tags });
  }

  render() {
    const { user, rotate, subjects, rotatetags, tags } = this.state;
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
              <Tag
              user={user}
              handleSave={this.handleSave}
              handleDelete={this.handleDelete}/>
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