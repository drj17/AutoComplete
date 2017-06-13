import Search from './search';
import React from 'react';

const Header = () => (
  <section className="header">
    <Search/>
    <h1>Niche</h1>
    <a href="http://github.com/drj17/AutoComplete"><h2>Github</h2></a>
  </section>
);

export default Header;
