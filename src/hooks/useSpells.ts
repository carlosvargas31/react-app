import { useState, useMemo, useEffect } from 'react';
import type { Spell, FilterState } from '../types/spell';
import { apiService } from '../services/api';

export const useSpells = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [spellsByClass, setSpellsByClass] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedClass: 'all',
    selectedLevel: 'all'
  });

  useEffect(() => {
    const fetchAllSpells = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get all classes first
        const classes = await apiService.getClasses();
        
        // Get spells for each class in parallel and store the mapping
        const classSpellsPromises = classes.map(async (className) => {
          try {
            const spells = await apiService.getSpellsByClass(className);
            return { className, spells };
          } catch (error) {
            console.error(`Error fetching spells for class ${className}:`, error);
            return { className, spells: [] };
          }
        });
        
        const classSpellsResults = await Promise.all(classSpellsPromises);
        
        // Process results
        const allSpellIds = new Set<string>();
        const classSpellsMap: Record<string, string[]> = {};
        
        classSpellsResults.forEach(({ className, spells }) => {
          classSpellsMap[className] = spells;
          spells.forEach(spellId => allSpellIds.add(spellId));
        });
        
        setSpellsByClass(classSpellsMap);
        
        // Get detailed information for each spell in parallel
        const spellPromises = Array.from(allSpellIds).map(async (spellId) => {
          try {
            const spell = await apiService.getSpell(spellId);
            spell.icon = apiService.getSpellImageUrl(spellId);
            return spell;
          } catch (error) {
            console.error(`Error fetching spell ${spellId}:`, error);
            return null;
          }
        });
        
        const spellsResults = await Promise.all(spellPromises);
        
        // Filter out null results and set spells
        const spellsData = spellsResults.filter((spell): spell is Spell => spell !== null);
        setSpells(spellsData);
      } catch (error) {
        console.error('Error fetching spells:', error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllSpells();
  }, []);

  // Get unique levels
  const levels = useMemo(() => {
    const levelsSet = new Set(spells.map(spell => spell.level));
    return Array.from(levelsSet).sort((a, b) => a - b);
  }, [spells]);

  // Filter spells based on current filters
  const filteredSpells = useMemo(() => {
    let filtered = spells;

    // Filter by search term
    if (filters.searchTerm) {
      filtered = filtered.filter(spell =>
        spell.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Filter by class
    if (filters.selectedClass !== 'all') {
      const classSpellIds = spellsByClass[filters.selectedClass] || [];
      filtered = filtered.filter(spell => classSpellIds.includes(spell.id));
    }

    // Filter by level
    if (filters.selectedLevel !== 'all') {
      filtered = filtered.filter(spell => spell.level === filters.selectedLevel);
    }

    return filtered;
  }, [spells, spellsByClass, filters]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      selectedClass: 'all',
      selectedLevel: 'all'
    });
  };

  return {
    spells: filteredSpells,
    filters,
    updateFilter,
    resetFilters,
    levels,
    totalSpells: spells.length,
    filteredCount: filteredSpells.length,
    isLoading,
    error
  };
};
