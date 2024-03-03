import React, { useState } from 'react';
// import productsData from './products.json';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

  // console.log(props)
  const handleChange = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
    searchProducts(event.target.value);
  };

  const searchProducts = (term) => {
    console.log(props.displayData)
    const results = props.displayData?.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    console.log(results)
    props.setDisplayData(results);
  };

  return (
    <div style={{display : 'flex', justifyContent : 'center'}}>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleChange}
        style={{ margin : "20px", height : "25px" , padding : "20px"}}
      />
    </div>
  );
};

export default Search;
