import React from 'react';
import type { Spell } from '../types/spell';
import { SpellCard } from './SpellCard';
import './SpellGrid.css';

interface SpellGridProps {
  spells: Spell[];
  isLoading?: boolean;
}

export const SpellGrid: React.FC<SpellGridProps> = ({ spells, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="spell-grid-loading">
        <div className="loading-spinner"></div>
        <p>Cargando hechizos...</p>
      </div>
    );
  }

  if (spells.length === 0) {
    return (
      <div className="spell-grid-empty">
        <div className="empty-icon">🔮</div>
        <h3>No se encontraron hechizos</h3>
        <p>Intenta ajustar los filtros para ver más resultados</p>
      </div>
    );
  }

  return (
    <div className="spell-grid-container">
      <div className="spell-grid">
        {spells.map((spell) => (
          <SpellCard key={spell.id} spell={spell} />
        ))}
      </div>
    </div>
  );
};
