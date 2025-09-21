import React, { useCallback } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';

export default function ExcalidrawWrapper({ onDataChange }) {
  const handleChange = useCallback((elements, appState, files) => {
    if (typeof onDataChange === 'function') {
      const textContent = elements
        .filter(e => e.type === 'text')
        .map(e => e.text)
        .join(' ');
      onDataChange({ elements, textContent, appState, files });
    }
  }, [onDataChange]);

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <Excalidraw
        onChange={handleChange}
      />
    </div>
  );
}
