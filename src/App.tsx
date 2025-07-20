import { useSpells } from './hooks/useSpells';
import { SpellsHeader } from './components/header/SpellsHeader';
import { SpellFilters } from './components/filters/SpellFilters';
import { SpellGrid } from './components/grid/SpellGrid';
import { SpellStats } from './components/stats/SpellStats';
import { ScrollToTop } from './components/scroll/ScrollToTop';
import './App.css';

function App() {
  const {
    spells,
    filters,
    updateFilter,
    resetFilters,
    damageTypes,
    levels,
    totalSpells,
    filteredCount
  } = useSpells();

  return (
    <div className="app">
      <SpellsHeader />
      
      <main className="main-content">
        <SpellFilters
          filters={filters}
          onUpdateFilter={updateFilter}
          onResetFilters={resetFilters}
          damageTypes={damageTypes}
          levels={levels}
          totalSpells={totalSpells}
          filteredCount={filteredCount}
        />
        
        <SpellStats spells={spells} />
        
        <SpellGrid spells={spells} />
      </main>
      
      <ScrollToTop />
    </div>
  );
}

export default App;
