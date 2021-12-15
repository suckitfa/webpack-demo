// commojs不支持
const React  = require('react');
const ReactDOM  = rquire('react-dom');
require('./search.css');
const logo = require('./images/Logo.png')
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

module.exports = <Search />;