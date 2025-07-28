import { useState, useEffect } from 'react';
import type { ClassType, SpellClass } from '../types/spell';
import { apiService } from '../services/api';

export const useSpellClasses = () => {
  const [classNames, setClassNames] = useState<Record<ClassType, SpellClass>>({} as Record<ClassType, SpellClass>);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const classIds = await apiService.getClasses();
        
        const classesData: Record<ClassType, SpellClass> = {} as Record<ClassType, SpellClass>;
        
        for (const classId of classIds) {
          classesData[classId as ClassType] = {
            id: classId,
            name: classId,
            image: apiService.getClassImageUrl(classId)
          };
        }
        
        setClassNames(classesData);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return { classNames, isLoading, error };
};
