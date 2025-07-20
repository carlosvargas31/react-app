import { useState, useMemo } from 'react';
import type { Spell, SpellsByClass, FilterState } from '../types/spell';
import spellsData from '../data/spells.json';
import spellsByClassData from '../data/spells-by-class.json';

export const useSpells = () => {
  const [spells] = useState<Spell[]>(spellsData as Spell[]);
  const [spellsByClass] = useState<SpellsByClass>(spellsByClassData as SpellsByClass);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedClass: 'all',
    selectedLevel: 'all',
    selectedDamageType: 'all',
    sortBy: 'name'
  });

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

    // Filter by damage type
    if (filters.selectedDamageType !== 'all') {
      filtered = filtered.filter(spell =>
        spell.damage && Array.isArray(spell.damage) && 
        spell.damage.some(damage => damage.damageType === filters.selectedDamageType)
      );
    }

    return filtered;
  }, [spells, spellsByClass, filters]);

  // Sort filtered spells
  const sortedSpells = useMemo(() => {
    const sorted = [...filteredSpells];
    
    switch (filters.sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'level':
        return sorted.sort((a, b) => a.level - b.level);
      case 'damage':
        return sorted.sort((a, b) => {
          const aDamageCount = (a.damage && a.damage.length) || 0;
          const bDamageCount = (b.damage && b.damage.length) || 0;
          return bDamageCount - aDamageCount;
        });
      default:
        return sorted;
    }
  }, [filteredSpells, filters.sortBy]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      selectedClass: 'all',
      selectedLevel: 'all',
      selectedDamageType: 'all',
      sortBy: 'name'
    });
  };

  return {
    spells: sortedSpells,
    filters,
    updateFilter,
    resetFilters,
    damageTypes,
    levels,
    totalSpells: spells.length,
    filteredCount: filteredSpells.length
  };
};
