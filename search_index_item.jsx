import React from 'react';

const SearchIndexItem = ({ result }) => (
  <section className="result">
    <h1>{result.name}</h1>
    <p>{result.location}</p>
  </section>
);

export default SearchIndexItem;
