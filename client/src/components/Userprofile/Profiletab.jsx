import React from 'react';

//tab style
const nameTabStyle = {
    fontSize: '15px',
    fontFamily: 'sans-serif',
    color: '#ffffff'
}

const majorTabStyle = {
    fontSize: '10px',
    fontFamily: 'sans-serif',
    color: '#ffffff'
}

//profiletab style
const spanStyle = {
    display: 'block',
    right: '0px',
    width: '100px',
    height: '20px'
}

//profile tab: name, major...
class Nametab extends React.Component{
    render() {
        return (
            <div className='profiletab' style={spanStyle}>
                <h6 style={nameTabStyle}>
                    {this.props.item}
                </h6>
            </div>
        )
    }
}

class Majortab extends React.Component{
    render() {
        return (
            <div className='profiletab' style={spanStyle}>
                <h6 style={majorTabStyle}>
                    {this.props.item}
                </h6>
            </div>
        )
    }
}

export {Nametab, Majortab};