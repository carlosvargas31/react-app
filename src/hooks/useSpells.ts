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
        
        // Get spells for each class and store the mapping
        const allSpellIds = new Set<string>();
        const classSpellsMap: Record<string, string[]> = {};
        
        for (const className of classes) {
          try {
            const classSpells = await apiService.getSpellsByClass(className);
            classSpellsMap[className] = classSpells;
            classSpells.forEach(spellId => allSpellIds.add(spellId));
          } catch (error) {
            console.error(`Error fetching spells for class ${className}:`, error);
          }
        }
        
        setSpellsByClass(classSpellsMap);
        
        // Get detailed information for each spell
        const spellsData: Spell[] = [];
        for (const spellId of allSpellIds) {
          try {
            const spell = await apiService.getSpell(spellId);
            spell.icon = apiService.getSpellImageUrl(spellId);
            spellsData.push(spell);
          } catch (error) {
            console.error(`Error fetching spell ${spellId}:`, error);
          }
        }
        
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

  // Get unique damage types
  const damageTypes = useMemo(() => {
    const types = new Set<string>();
    spells.forEach(spell => {
      if (spell.damage && Array.isArray(spell.damage)) {
        spell.damage.forEach(damage => {
          types.add(damage.damageType);
        });
      }
    });
    return Array.from(types).sort();
  }, [spells]);

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
    damageTypes,
    levels,
    totalSpells: spells.length,
    filteredCount: filteredSpells.length,
    isLoading,
    error
  };
};
