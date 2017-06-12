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
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(event) {
    if(event.key === "ArrowDown"){
      if(this.state.currentSelection !== this.state.results.length - 1){
        this.setState({currentSelection: this.state.currentSelection + 1});
      }
    }
    if(event.key === "ArrowUp"){
      if(this.state.currentSelection !== 0){
        this.setState({currentSelection: this.state.currentSelection - 1});
      }
    }
    if(event.key === "Enter"){
      window.location.href = this.state.results[this.state.currentSelection].url;
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleSelection);
  }

  handleInput(event){
    this.setState({inputVal: event.currentTarget.value, loading: true, currentSelection: 0});
    const matches = [];
    let that = this;
    let searchUrl = `http://niche-recruiting-autocomplete.appspot.com/search/?query=${event.currentTarget.value}` + "&?sid=" + Math.random();
    window.JSONPUtil.LoadJSONP(searchUrl, function (response) {
      response.results.forEach(result => matches.push(result));
      that.setState({results: matches, loading: false});
    });
  }


  render() {
    let results = "";
    if(this.state.loading){
      results = <div className="loader">Loading...</div>;
    } else{
      results = this.state.results.map((result, i) => {
        let selected = "unselected";
        if(i === this.state.currentSelection){
          selected = "selected";
        }
        return (
          <a key={i} href={`${this.state.results[i].url}`}><SearchIndexItem result={result} selected={selected}/></a>
        );
      });
    }
    return(
      <div className="search-container">
        <h1 className="header">Find Your Niche</h1>
        <div className='auto'>
          <input
            className="search-bar"
            onChange={this.handleInput}
            value={this.state.inputVal}
            placeholder='Search...'/>
          <ul className="results-list">
            {results}
          </ul>
        </div>
      </div>
    );
  }
}
