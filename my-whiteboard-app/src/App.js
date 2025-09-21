import React from 'react';
import WhiteboardPage from './components/WhiteboardPage';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <h1>Interactive Whiteboard Platform</h1>
        </header>
        <main>
          <WhiteboardPage />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
