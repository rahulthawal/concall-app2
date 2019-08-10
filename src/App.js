import React, { Component } from 'react';
import './App.css';
const imgStyle = {
  width: '150px',
  margin: '10px',
  borderRadius: '50%'
};
const listStyle = {
  border: '1px solid black',
  margin: '5px'
};
const divStyle = {
  marginTop: '23px',
  marginLeft: '150px'
};
const inputStyle = {
  height: '36px',
  width: '40%',
  marginLeft: '4px',
  marginTop: '23px'
};

function searchingFor(term) {
  return function(x) {
    return x.author.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      githublist: [],
      term: ''
    };

    this.searchHandler = this.searchHandler.bind(this);
  }
  searchHandler(event) {
    this.setState({ term: event.target.value });
  }
  render() {
    return (
      <div>
        <form>
          <input
            style={inputStyle}
            placeholder="Search ..."
            className="input imgStyle"
            onChange={this.searchHandler}
            value={this.state.term}
          />
        </form>
        {this.state.githublist.filter(searchingFor(this.state.term)).map(item => (
          <div key={item.stars} style={listStyle} className="row">
            <div className="col-3">
              <img style={imgStyle} src={item.avatar} alt={item.name} />
            </div>
            <div className="col">
              <div style={divStyle}>
                <h5>Author Name : {item.author}</h5>
                <h5>Repository Name: {item.name}</h5>
                <h5>Stars : {item.stars}</h5>
                <h5>Fork: {item.forks}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  componentDidMount() {
    fetch('https://github-trending-api.now.sh/repositories?language=javascript&since=weekly')
      .then(res => res.json())
      .then(data => {
        this.setState({ githublist: data });
      });
  }
}

export default App;
