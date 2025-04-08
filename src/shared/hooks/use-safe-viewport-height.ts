import { useEffect, useState } from 'react';

export const useSafeViewportHeight = () => {
  const [safeHeight, setSafeHeight] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 0
  );

  useEffect(() => {
    const updateHeight = () => {
      // Если доступен visualViewport, используем его для получения корректной высоты
      const height = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;

      setSafeHeight(height);
    };

    // Подписываемся на изменения размера visualViewport, если доступен
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateHeight);
      window.visualViewport.addEventListener('scroll', updateHeight);
    } else {
      // Fallback на обычный resize для старых браузеров
      window.addEventListener('resize', updateHeight);
    }

    // Инициализация высоты при первой загрузке
    updateHeight();

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateHeight);
        window.visualViewport.removeEventListener('scroll', updateHeight);
      } else {
        window.removeEventListener('resize', updateHeight);
      }
    };
  }, []);

  return safeHeight;
};
