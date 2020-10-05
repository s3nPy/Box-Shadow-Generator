import React from 'react';
import './App.css';
import Generator from './components/generator/Generator';

// Error boundaries
// Pure Components (shouldComponentUpdate, React.memo)

// add deBounce on change left in scrollbar

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h2>Box Shadow Generator</h2>
      </header>
      
      <section className="app__content">
        <Generator />
      </section>

      <footer className="app__footer">
        <a href="https://github.com/s3nPy/Box-Shadow-Generator">
          <img src="https://gip.su/wp-content/uploads/2020/05/github_png20.png" alt="Github"/>
        </a>
      </footer>
    </div>
  );
}

export default App;
