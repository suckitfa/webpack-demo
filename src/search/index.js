import React from "react";
import ReactDOM from 'react-dom'
import './search.css'
import logo from './images/Logo.png'
class Search extends React.Component {
    constructor(props) {
        this.state = {Text:null}
        this.loadComponent = this.loadComponent.bind(this);
    };

    loadComponent() {
        // 动态
        import('./text.js').then((Text)=>{
            this.setState({
                Text:Text.default
            });
        });
    }

    render() {
        const {Text} = this.state;
        return(
        <div className="search-text">
            {
                Text ? <Text /> : null
            }
            <p>Hello I am Searching Page. hello.
            Testing!</p>
            <img src={logo} />
            <button onClick={this.loadComponent}>显示Text组件</button>
        </div>);
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)