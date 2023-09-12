import React, { Component } from 'react';
import SearchBox from './Searchbox';
import './App.css';
import { chineseCharacters } from './chineseCharacters';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchfield1: '',  // Chinese text to be analyzed
      searchfield2: '',  // List of Chinese characters
      characterLimit: null,
      selectedValues: {},
      useTextbox: true,
      chineseCharacters: chineseCharacters
    };
  }

  handleRadioButtonChange = (value) => {
    this.setState(prevState => {
      const newUseTextboxState = value === "Use Textbox" ? !prevState.selectedValues["Use Textbox"] : prevState.selectedValues["Use Textbox"];
      
      let newState = {
        selectedValues: {
          ...prevState.selectedValues,
          [value]: value !== "Use Textbox" ? !prevState.selectedValues[value] : newUseTextboxState,
          "Use Textbox": value === "Use Textbox" ? newUseTextboxState : prevState.selectedValues["Use Textbox"]
        },
        searchfield2: newUseTextboxState || value !== "Use Textbox" ? prevState.searchfield2 : ''
      };
  
      // Clear the second textbox when "Use Textbox" is unchecked
      if (value === "Use Textbox" && !newUseTextboxState) {
        newState.searchfield2 = '';
      }
      
      return newState;
    });
  };
  

  onSearchChange = (id, event) => {
    if (id === '1') {
      this.setState({ searchfield1: event.target.value });
    } else {
      this.setState({ searchfield2: event.target.value });
    }
  };

  handleCheckmarkChange = (newLimit) => {
    this.setState({ characterLimit: newLimit, useTextbox: false });
  };

  handleTextboxToggle = () => {
    this.setState({ useTextbox: true, characterLimit: null });
  };

  highlightCharacters = () => {
    const { searchfield1, searchfield2, selectedValues, chineseCharacters } = this.state;
  
    let charactersToHighlight = new Set();
  
    // If the "Use Textbox" checkbox is selected, use characters from searchfield2.
    if (selectedValues["Use Textbox"]) {
      charactersToHighlight = new Set(Array.from(searchfield2));
    } else {
      // Otherwise, use characters from selected frequency lists.
      if (selectedValues[1000]) {
        for (const char of chineseCharacters.find(c => c.id === 1000).characters) {
          charactersToHighlight.add(char);
        }
      }
      if (selectedValues[2000]) {
        for (const char of chineseCharacters.find(c => c.id === 2000).characters) {
          charactersToHighlight.add(char);
        }
      }
      if (selectedValues[3000]) {
        for (const char of chineseCharacters.find(c => c.id === 3000).characters) {
          charactersToHighlight.add(char);
        }
      }
    }
  
    return Array.from(searchfield1).map((char, index) => (
      charactersToHighlight.has(char) ? <span key={index} className="highlight">{char}</span> : char
    ));
  };
  

  checkValue = (value) => {
    if (isNaN(value)) {
      return null;
    } else {
      return value;
    }
  };

  render() {
    const isTextboxCheckboxChecked = !!this.state.selectedValues["Use Textbox"];
    const isTextbox2Empty = this.state.searchfield2 === '';

    return (
      <div className='tc'>
        <h1 className='f1'>Chinese Character Comparison Chart</h1>

        <div className="search-wrapper">
          <SearchBox
            id='first'
            searchChange={(event) => this.onSearchChange('1', event)}
          />
          <SearchBox
            id='second'
            searchChange={(event) => this.onSearchChange('2', event)}
            disabled={!isTextboxCheckboxChecked}
          />
          <div className="checkbox-group">
            {[1000, 2000, 3000, "Use Textbox"].map((value) => (
              <div className="checkbox-wrapper" key={value}>
                <input
                  type="checkbox"
                  id={`checkbox-${value}`}
                  className="custom-checkbox"
                  value={value === "Use Textbox" ? null : this.checkValue(value)}
                  checked={this.state.selectedValues[value]}
                  disabled={(value !== "Use Textbox" && this.state.selectedValues["Use Textbox"]) || (value === "Use Textbox" && !isTextbox2Empty)}
                  onChange={() => this.handleRadioButtonChange(value)}
                />
                <label htmlFor={`checkbox-${value}`}>{value}</label>
              </div>
            ))}
          </div>
        </div>
        <h2>Compared Text</h2>
        <div className='comparedText'>
          {this.highlightCharacters()}
        </div>
      </div>
    );
  }
}

export default App;
