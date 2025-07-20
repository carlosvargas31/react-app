import React from 'react';
import type { Spell } from '../../types/spell';
import './SpellStats.css';

interface SpellStatsProps {
  spells: Spell[];
}

export const SpellStats: React.FC<SpellStatsProps> = ({ spells }) => {
  const stats = React.useMemo(() => {
    const levelCount: Record<number, number> = {};
    const damageTypeCount: Record<string, number> = {};
    let totalWithDamage = 0;
    let totalUpcast = 0;

    spells.forEach(spell => {
      // Count by level
      levelCount[spell.level] = (levelCount[spell.level] || 0) + 1;
      
      // Count upcast spells
      if (spell.upcast) totalUpcast++;
      
      // Count damage types
      if (spell.damage && spell.damage.length > 0) {
        totalWithDamage++;
        spell.damage.forEach(damage => {
          damageTypeCount[damage.damageType] = (damageTypeCount[damage.damageType] || 0) + 1;
        });
      }
    });

    const topDamageType = Object.entries(damageTypeCount)
      .sort(([,a], [,b]) => b - a)[0];

    return {
      total: spells.length,
      byLevel: levelCount,
      totalWithDamage,
      totalUpcast,
      topDamageType: topDamageType ? topDamageType[0] : 'N/A',
      topDamageTypeCount: topDamageType ? topDamageType[1] : 0
    };
  }, [spells]);

  const getPercentage = (value: number) => {
    return stats.total > 0 ? Math.round((value / stats.total) * 100) : 0;
  };

  return (
    <div className="spell-stats">
      <h3 className="stats-title">📊 Estadísticas</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Hechizos Total</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.totalWithDamage}</div>
          <div className="stat-label">Con Daño</div>
          <div className="stat-percentage">{getPercentage(stats.totalWithDamage)}%</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.totalUpcast}</div>
          <div className="stat-label">Upcast</div>
          <div className="stat-percentage">{getPercentage(stats.totalUpcast)}%</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.topDamageType}</div>
          <div className="stat-label">Tipo Más Común</div>
          <div className="stat-percentage">{stats.topDamageTypeCount} hechizos</div>
        </div>
      </div>
      
      <div className="level-distribution">
        <h4>Distribución por Nivel</h4>
        <div className="level-bars">
          {Object.entries(stats.byLevel)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([level, count]) => (
              <div key={level} className="level-bar-container">
                <div className="level-label">
                  {level === '0' ? 'Trucos' : `Nivel ${level}`}
                </div>
                <div className="level-bar">
                  <div 
                    className="level-bar-fill"
                    style={{ 
                      width: `${(count / Math.max(...Object.values(stats.byLevel))) * 100}%` 
                    }}
                  ></div>
                  <span className="level-count">{count}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
