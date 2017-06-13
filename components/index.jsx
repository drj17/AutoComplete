import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './autocomplete';

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	ReactDOM.render(<AutoComplete/>, root);
});
