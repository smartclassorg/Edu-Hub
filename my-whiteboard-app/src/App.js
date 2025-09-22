import React, { useEffect } from 'react';
import WhiteboardPage from './components/WhiteboardPage';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  useEffect(() => {
    // Dark mode functionality
    const initializeDarkMode = () => {
      const darkModeToggle = document.getElementById('darkModeToggle');
      const body = document.body;
      
      if (!darkModeToggle) {
        console.error('Dark mode toggle not found');
        return;
      }
      
      // Set initial state from localStorage
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
      }
      
      // Add event listener
      darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
          body.classList.add('dark-mode');
          localStorage.setItem('darkMode', 'enabled');
        } else {
          body.classList.remove('dark-mode');
          localStorage.setItem('darkMode', 'disabled');
        }
      });
    };

    // Initialize dark mode after component mounts
    const timer = setTimeout(initializeDarkMode, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <header className="header">
          <div className="logo">
            <span style={{fontSize: '2rem', verticalAlign: 'middle', marginRight: '0.5rem'}}>🎓</span>
            <span>EduHub</span>
          </div>
        </header>
        <main>
          <WhiteboardPage />
        </main>
        
        <label className="dark-mode-switch">
          <input type="checkbox" id="darkModeToggle" />
          <span className="slider"></span>
          <i className="fas fa-moon"></i>
        </label>
      </div>
    </ErrorBoundary>
  );
}

export default App;
