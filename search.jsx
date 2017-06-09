import React from 'react';
import SearchIndexItem from './search_index_item';

export default class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputVal: '',
      results: [],
      loading: false
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event){
    this.setState({inputVal: event.currentTarget.value, loading: true});
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
        return (
          <SearchIndexItem key={i} result={result}/>
        );
      });
    }
    return(
      <div>
        <h1>Autocomplete</h1>
        <div className='auto'>
          <input
            onChange={this.handleInput}
            value={this.state.inputVal}
            placeholder='Search...'/>
        </div>
        <ul>
          {results}
        </ul>
      </div>
    );
  }
}
