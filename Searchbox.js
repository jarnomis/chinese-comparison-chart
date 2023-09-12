import React from 'react';

const SearchBox = ({ id, searchChange, disabled }) => {
  const placeholderText = id === 'mainText' ? 'Chunk text' : 'List items';

  return (
    <div className='pa2'>
      <input 
        className={`pa3 ba ${disabled ? 'disabled-input' : ''}`}
        type='text'
        placeholder={placeholderText}
        onChange={searchChange}
        disabled={disabled}
      />
    </div>
  );
}

export default SearchBox;
