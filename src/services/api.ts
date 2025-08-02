import type { Spell } from '../types/spell';

const API_BASE_URL = 'https://inesdi2025-resources-p2.fly.dev/v1';

export const apiService = {
  // Get all available spell classes
  getClasses: async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/classes`);
    if (!response.ok) {
      throw new Error('Error al obtener las clases');
    }
    return response.json();
  },

  // Get spells for a specific class
  getSpellsByClass: async (className: string): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/classes/${className}/spells`);
    if (!response.ok) {
      throw new Error(`Error al obtener hechizos para la clase ${className}`);
    }
    return response.json();
  },

  // Get detailed information for a specific spell
  getSpell: async (spellId: string): Promise<Spell> => {
    const response = await fetch(`${API_BASE_URL}/spells/${spellId}`);
    if (!response.ok) {
      throw new Error(`Error al obtener el hechizo ${spellId}`);
    }
    const spellData = await response.json();
    return {
      ...spellData,
      icon: `${API_BASE_URL}/assets/spells/${spellId}`
    };
  },

  // Get class image URL
  getClassImageUrl: (classId: string): string => {
    return `${API_BASE_URL}/assets/classes/${classId}`;
  },

  // Get spell image URL
  getSpellImageUrl: (spellId: string): string => {
    return `${API_BASE_URL}/assets/spells/${spellId}`;
  }
};
