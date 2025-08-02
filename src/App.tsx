import { useSpells } from './hooks/useSpells';
import { SpellsHeader } from './components/header/SpellsHeader';
import { SpellFilters } from './components/filters/SpellFilters';
import { SpellGrid } from './components/grid/SpellGrid';
import { SpellStats } from './components/stats/SpellStats';
import './App.css';

function App() {
  const {
    spells,
    filters,
    updateFilter,
    resetFilters,
    levels,
    totalSpells,
    filteredCount,
    isLoading,
    error
  } = useSpells();

  if (isLoading) {
    return (
      <div className="app">
        <SpellsHeader />
        <main className="main-content">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Cargando hechizos...</h2>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <SpellsHeader />
        <main className="main-content">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Error al cargar hechizos</h2>
            <p>{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <SpellsHeader />
      
      <main className="main-content">
        <SpellFilters
          filters={filters}
          onUpdateFilter={updateFilter}
          onResetFilters={resetFilters}
          levels={levels}
          totalSpells={totalSpells}
          filteredCount={filteredCount}
        />
        
        <SpellStats spells={spells} />
        
        <SpellGrid spells={spells} />
      </main>
      
    </div>
  );
}

export default App;
