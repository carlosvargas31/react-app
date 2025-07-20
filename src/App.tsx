import { useSpells } from './hooks/useSpells';
import { SpellsHeader } from './components/SpellsHeader';
import { SpellFilters } from './components/SpellFilters';
import { SpellGrid } from './components/SpellGrid';
import { SpellStats } from './components/SpellStats';
import { ScrollToTop } from './components/ScrollToTop';
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
