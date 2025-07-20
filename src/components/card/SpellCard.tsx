import React from 'react';
import type { Spell } from '../../types/spell';
import './SpellCard.css';

interface SpellCardProps {
  spell: Spell;
}

export const SpellCard: React.FC<SpellCardProps> = ({ spell }) => {
  const getSpellImage = (spellId: string) => {
    try {
      // En Vite, las imágenes en src/assets necesitan ser importadas o usar la URL completa
      return new URL(`../../assets/spells/${spellId}.png`, import.meta.url).href;
    } catch {
      // fallback image
      return new URL('../../assets/spells/magic-missile.png', import.meta.url).href;
    }
  };

  const getLevelText = (level: number) => {
    return level === 0 ? 'Truco' : `Nivel ${level}`;
  };

  return (
    <div className="spell-card">
      <div className="spell-image-container">
        <img 
          src={getSpellImage(spell.id)} 
          alt={spell.name}
          className="spell-image"
          loading="lazy"
        />
        <div className="spell-level-badge">
          {getLevelText(spell.level)}
        </div>
      </div>
      
      <div className="spell-content">
        <div className="spell-header">
          <h3 className="spell-name">{spell.name}</h3>
          {spell.upcast && (
            <span className="upcast-badge">Upcast</span>
          )}
        </div>
        
        <div className="spell-details">
          <div className="spell-detail">
            <span className="detail-label">Acción:</span>
            <span className="detail-value">{spell.action}</span>
          </div>
          
          <div className="spell-detail">
            <span className="detail-label">Duración:</span>
            <span className="detail-value">{spell.duration}</span>
          </div>
          
          <div className="spell-detail">
            <span className="detail-label">Rango:</span>
            <span className="detail-value">{spell.range}</span>
          </div>
          
          {spell.type !== '-' && (
            <div className="spell-detail">
              <span className="detail-label">Tipo:</span>
              <span className="detail-value">{spell.type}</span>
            </div>
          )}
        </div>
        
        <div className="spell-footer">
          <a 
            href={spell.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="spell-link"
          >
            Ver más detalles
          </a>
        </div>
      </div>
    </div>
  );
};
