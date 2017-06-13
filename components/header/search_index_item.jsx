import React from 'react';

const SearchIndexItem = ({ result, selected }) => (
  <section className={`result-header ${selected}`}>
    <h2>{result.location}</h2>
    <h1>{result.name}</h1>
  </section>
);

export default SearchIndexItem;
