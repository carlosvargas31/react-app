export interface Damage {
  dice: string;
  damageType: string;
}

export interface Spell {
  id: string;
  url: string;
  name: string;
  icon: string;
  level: number;
  upcast: boolean;
  action: string;
  duration: string;
  range: string;
  type: string;
  damage?: Damage[];
}

export interface SpellsByClass {
  [className: string]: string[];
}

export type ClassType = 'bard' | 'cleric' | 'druid' | 'sorcerer' | 'warlock' | 'wizard';

export type SortOption = 'name' | 'level' | 'damage';

export interface FilterState {
  searchTerm: string;
  selectedClass: ClassType | 'all';
  selectedLevel: number | 'all';
}
