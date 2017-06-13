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

  //Allow users to select results using their keyboard
  handleKeyPress(event) {
    if(event.key === "ArrowDown"){
      event.preventDefault(); //prevent key from moving the cursor in the input box
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
  //Clear the search bar when user clicks away, preventing both searches from being open at the same time
  handleBlur(){
    this.setState({inputVal: '', results: []});
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }
  handleInput(event){
    this.setState({inputVal: event.currentTarget.value, loading: true, currentSelection: 0}); //Start loading, displays a loader to the user
    let matches = [];
    let searchUrl = `http://niche-recruiting-autocomplete.appspot.com/search/?query=${event.currentTarget.value}` + "&?sid=" + Math.random();
    window.JSONPUtil.LoadJSONP(searchUrl, (response) => {
      response.results.forEach(result => matches.push(result));
      matches = matches.slice(0, 11); //truncate results
      this.setState({results: matches, loading: false}); //Finish loading and add search results to state, triggering a re-render
    });
  }

  render() {
    let results = "";
    if(this.state.loading){
      results = <div className="loader"></div>;
    } else{
      results = this.state.results.map((result, i) => { //Create a new search_index_item component for each result
        let selected = "unselected";
        if(i === this.state.currentSelection){
          selected = "selected"; //dynamically change className depending on selection for unique styling
        }
        return (
          <a key={i}
             onMouseDown={() => {window.location = this.state.results[i].url;}}>
             <SearchIndexItem result={result} selected={selected}/>
          </a>
        );
      });
    }
    return(
      <div className="search-container">
        <div className='auto'>
          <input
            onBlur={this.handleBlur}
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
