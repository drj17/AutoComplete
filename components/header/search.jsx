import React from 'react';
import SearchIndexItem from './search_index_item';

export default class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputVal: '',
      results: [],
      loading: false,
      currentSelection: 0
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleKeyPress(event) {
    if(event.key === "ArrowDown"){
      event.preventDefault();
      if(this.state.currentSelection !== this.state.results.length - 1){
        this.setState({currentSelection: this.state.currentSelection + 1});
      }
    }
    if(event.key === "ArrowUp"){
      event.preventDefault();
      if(this.state.currentSelection !== 0){
        this.setState({currentSelection: this.state.currentSelection - 1});
      }
    }
    if(event.key === "Enter"){
      window.location.href = this.state.results[this.state.currentSelection].url;
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  handleBlur(){
    this.setState({inputVal: '', results: []});
  }

  handleInput(event){
    this.setState({inputVal: event.currentTarget.value, loading: true, currentSelection: 0});
    let matches = [];
    let searchUrl = `http://niche-recruiting-autocomplete.appspot.com/search/?query=${event.currentTarget.value}` + "&?sid=" + Math.random();
    window.JSONPUtil.LoadJSONP(searchUrl, (response) => {
      response.results.forEach(result => matches.push(result));
      matches = matches.slice(0, 11); //truncate results
      this.setState({results: matches, loading: false});
    });
  }

  render() {
    let results = "";
    if(this.state.loading){
      results = <li className="loading">Loading...</li>;
    } else{
      results = this.state.results.map((result, i) => {
        let selected = "unselected";
        if(i === this.state.currentSelection){
          selected = "selected-header";
        }
        return (
          <a key={i} onMouseDown={() => {window.location = this.state.results[i].url;}}><SearchIndexItem result={result} selected={selected}/></a>
        );
      });
    }
    return(
      <div className="search-container-header">
          <input
            onBlur={this.handleBlur}
            className="search-bar-header"
            onChange={this.handleInput}
            value={this.state.inputVal}
            placeholder='Search...'/>
          <ul className="results-list-header">
            {results}
          </ul>
      </div>
    );
  }
}
