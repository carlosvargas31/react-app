import React from 'react';
import type { ClassType, FilterState } from '../types/spell';
import './SpellFilters.css';

interface SpellFiltersProps {
  filters: FilterState;
  onUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onResetFilters: () => void;
  damageTypes: string[];
  levels: number[];
  totalSpells: number;
  filteredCount: number;
}

const classNames: Record<ClassType, string> = {
  bard: 'Bardo',
  cleric: 'Clérigo',
  druid: 'Druida',
  sorcerer: 'Hechicero',
  warlock: 'Brujo',
  wizard: 'Mago'
};

export const SpellFilters: React.FC<SpellFiltersProps> = ({
  filters,
  onUpdateFilter,
  onResetFilters,
  damageTypes,
  levels,
  totalSpells,
  filteredCount
}) => {
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
          <select
            id="class"
            value={filters.selectedClass}
            onChange={(e) => onUpdateFilter('selectedClass', e.target.value as ClassType | 'all')}
            className="filter-select"
          >
            <option value="all">Todas las clases</option>
            {Object.entries(classNames).map(([key, name]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
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

        {/* Damage Type Filter */}
        <div className="filter-group">
          <label htmlFor="damageType">Tipo de daño:</label>
          <select
            id="damageType"
            value={filters.selectedDamageType}
            onChange={(e) => onUpdateFilter('selectedDamageType', e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos los tipos</option>
            {damageTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="filter-group">
          <label htmlFor="sortBy">Ordenar por:</label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => onUpdateFilter('sortBy', e.target.value as 'name' | 'level' | 'damage')}
            className="filter-select"
          >
            <option value="name">Nombre</option>
            <option value="level">Nivel</option>
            <option value="damage">Cantidad de Daño</option>
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
