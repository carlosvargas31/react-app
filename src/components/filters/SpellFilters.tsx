import React from 'react';
import type { FilterState, ClassType } from '../../types/spell';
import { useSpellClasses } from '../../hooks/useSpellClasses';
import './SpellFilters.css';

interface SpellFiltersProps {
  filters: FilterState;
  onUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onResetFilters: () => void;
  levels: number[];
  totalSpells: number;
  filteredCount: number;
}

export const SpellFilters: React.FC<SpellFiltersProps> = ({
  filters,
  onUpdateFilter,
  onResetFilters,
  levels,
  totalSpells,
  filteredCount
}) => {
  const { classNames, isLoading, error } = useSpellClasses();

  if (isLoading) {
    return (
      <div className="spell-filters">
        <div className="filters-header">
          <h2>Cargando filtros...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="spell-filters">
        <div className="filters-header">
          <h2>Error al cargar filtros</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="spell-filters">
      <div className="filters-header">
        <h2>Filtros de Hechizos</h2>
        <div className="spell-count">
          Mostrando {filteredCount} de {totalSpells} hechizos
        </div>
      </div>

      <div className="filters-grid">
        {/* Search */}
        <div className="filter-group">
          <label htmlFor="search">Buscar hechizo:</label>
          <input
            id="search"
            type="text"
            placeholder="Buscar por nombre..."
            value={filters.searchTerm}
            onChange={(e) => onUpdateFilter('searchTerm', e.target.value)}
            className="search-input"
          />
        </div>

        {/* Class Filter */}
        <div className="filter-group">
          <label htmlFor="class">Clase:</label>
          <div className="class-filter-container">
            {filters.selectedClass !== 'all' && (
              <img
                src={classNames[filters.selectedClass].image}
                alt={classNames[filters.selectedClass].name}
                className="class-icon"
              />
            )}
            <select
              id="class"
              value={filters.selectedClass}
              onChange={(e) => onUpdateFilter('selectedClass', e.target.value as ClassType | 'all')}
              className="filter-select"
            >
              <option value="all">Todas las clases</option>
              {Object.entries(classNames).map(([key, classData]) => (
                <option key={key} value={key}>
                  {classData.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Level Filter */}
        <div className="filter-group">
          <label htmlFor="level">Nivel:</label>
          <select
            id="level"
            value={filters.selectedLevel}
            onChange={(e) => onUpdateFilter('selectedLevel', e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="filter-select"
          >
            <option value="all">Todos los niveles</option>
            {levels.map(level => (
              <option key={level} value={level}>
                {level === 0 ? 'Truco' : `Nivel ${level}`}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button */}
        <div className="filter-group">
          <button onClick={onResetFilters} className="reset-button">
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};
