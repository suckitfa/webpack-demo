import React from "react";
import ReactDOM from 'react-dom'
import './search.less'
import logo from './images/Logo.png'
class Search extends React.Component {
    render() {
        return(<div className="search-text">
            <p>Hello I am Searching Page. hello.
            Testing!</p>
            <img src={logo} />
        </div>);
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)