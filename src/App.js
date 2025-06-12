import React, { Component } from "react";
import "./App.css";
// Custom components
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import { Modal } from "./components/modal/modal.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: '',
      isLoading: true,
      selectedMonster: null,
      isDarkMode: true,
      sortBy: 'name'
    };
  }

  componentDidMount() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.setState({ isDarkMode: true });
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users, isLoading: false }));
  }

  handleSearch = (e) => {
    this.setState({ searchField: e.target.value });
  }

  toggleTheme = () => {
    this.setState(prevState => {
      const newTheme = !prevState.isDarkMode;
      document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return { isDarkMode: newTheme };
    });
  }

  handleSort = (e) => {
    this.setState({ sortBy: e.target.value });
  }

  sortMonsters = (monsters) => {
    return [...monsters].sort((a, b) => {
      if (this.state.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.email.localeCompare(b.email);
    });
  }

  render() {
    const { monsters, searchField, isLoading, selectedMonster, isDarkMode, sortBy } = this.state;
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    const sortedMonsters = this.sortMonsters(filteredMonsters);

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        
        <div className="controls">
          <button 
            className="theme-toggle" 
            onClick={this.toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>

          <SearchBox
            placeholder="Search monsters"
            handleChange={this.handleSearch}
          />

          <select 
            className="sort-select"
            value={sortBy}
            onChange={this.handleSort}
          >
            <option value="name">Sort by name</option>
            <option value="email">Sort by email</option>
          </select>
        </div>

        {isLoading ? (
          <div className="loading">Loading monsters...</div>
        ) : (
          <CardList 
            monsters={sortedMonsters}
            onMonsterClick={(monster) => this.setState({ selectedMonster: monster })}
          />
        )}

        <Modal 
          monster={selectedMonster}
          onClose={() => this.setState({ selectedMonster: null })}
        />
      </div>
    );
  }
}

export default App;
