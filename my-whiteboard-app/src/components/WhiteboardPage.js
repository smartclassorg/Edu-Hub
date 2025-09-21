import React, { useState, useEffect } from 'react';
import ExcalidrawWrapper from './ExcalidrawWrapper';

const WhiteboardPage = () => {
  const [sessionInfo, setSessionInfo] = useState({
    sessionId: `session-${Date.now()}`,
    startTime: new Date().toLocaleString()
  });

  useEffect(() => {
    // Initialize session
    
    return () => {
      // Cleanup on component unmount
    };
  }, [sessionInfo.sessionId]);

  const newSession = () => {
    setSessionInfo({
      sessionId: `session-${Date.now()}`,
      startTime: new Date().toLocaleString()
    });
  };

  const shareSession = async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      console.log('Session URL copied to clipboard!');
    } catch (error) {
      console.log('Failed to copy URL. Please copy manually: ' + shareUrl);
    }
  };

  return (
    <div className="whiteboard-page">
      <div className="page-header">
        <div className="whiteboard-controls">
          <h3>Interactive Whiteboard</h3>
          <div className="control-buttons">
            <button className="control-btn clear-btn" onClick={() => window.location.reload()}>
              Clear All
            </button>
            <button className="control-btn" onClick={() => window.print()}>
              Export
            </button>
          </div>
        </div>
        <div className="session-controls">
          <button 
            onClick={newSession} 
            className="new-session-btn"
            aria-label="Start a new whiteboard session"
          >
            New Session
          </button>
          <button 
            onClick={shareSession} 
            className="share-btn"
            aria-label="Save current session to Whiteboard sessions"
          >
            Save Session
          </button>
        </div>
      </div>

      <div className="whiteboard-content">
        <div className="whiteboard-main" style={{ height: '100%' }} role="main">
          <ExcalidrawWrapper />
        </div>

        <div className="sidebar" role="complementary">
          <div className="session-details">
            <h3>Session Details</h3>
            <div className="session-info">
              <p><strong>Session ID:</strong> {sessionInfo.sessionId}</p>
              <p><strong>Started:</strong> {sessionInfo.startTime}</p>
              <p><strong>Status:</strong> Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardPage;