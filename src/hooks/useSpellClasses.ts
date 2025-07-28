import { useState, useEffect } from 'react';
import type { ClassType, SpellClass } from '../types/spell';

export const useSpellClasses = () => {
  const [classNames, setClassNames] = useState<Record<ClassType, SpellClass>>({} as Record<ClassType, SpellClass>);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('https://inesdi2025-resources-p2.fly.dev/v1/classes');
        
        if (!response.ok) {
          throw new Error('Error al obtener las clases');
        }
        
        const classIds: string[] = await response.json();
        
        const classesData: Record<ClassType, SpellClass> = {} as Record<ClassType, SpellClass>;
        
        for (const classId of classIds) {
          classesData[classId as ClassType] = {
            id: classId,
            name: classId,
            image: `https://inesdi2025-resources-p2.fly.dev/v1/assets/classes/${classId}`
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
