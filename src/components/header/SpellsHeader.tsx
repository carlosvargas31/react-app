import React from 'react';
import './SpellsHeader.css';

export const SpellsHeader: React.FC = () => {
  return (
    <header className="spells-header">
      <div className="header-content">
        <div className="header-text">
          <h1 className="header-title">
            <span className="title-icon">⚡</span>
            Grimorio de Hechizos
          </h1>
          <p className="header-subtitle">
            Explora la colección completa de hechizos de Baldur's Gate 3
          </p>
        </div>
        <div className="header-decoration">
          <div className="magic-circle">
            <div className="inner-circle"></div>
            <div className="outer-circle"></div>
          </div>
        </div>
      </div>
    </header>
  );
};
