import { useEffect } from 'react';
import { delay } from '@shared/utils';

export const useDisableCarrotQuest = () => {
  useEffect(() => {
    let cq: typeof carrotquest;
    let isUnmounted = false;

    const getCarrotQuest = async () => {
      while (!window.carrotquest && !isUnmounted) {
        await delay(1_000);
      }

      if (isUnmounted) return;

      try {
        cq = window.carrotquest;
        closeMessenger(); // Закрываем сразу после инициализации
        monitorCarrotQuest(); // Запускаем периодический мониторинг
      } catch {
        await delay(1_000);
        if (!isUnmounted) getCarrotQuest();
      }
    };

    const closeMessenger = () => {
      try {
        cq?.messenger?.toStateNo();
      } catch (err) {
        console.error('Не удалось закрыть CarrotQuest:', err);
      }
    };

    const monitorCarrotQuest = async () => {
      while (!isUnmounted) {
        try {
          if (cq?.messenger?.currentState !== 'no') {
            closeMessenger();
          }
        } catch (err) {
          console.error('Ошибка при проверке состояния CarrotQuest:', err);
        }
        await delay(1_000); // Проверяем каждую секунду
      }
    };

    getCarrotQuest();

    return () => {
      isUnmounted = true; // Останавливаем мониторинг
      try {
        cq?.messenger?.toStateCollapsed?.(); // Принудительно сворачиваем
      } catch (err) {
        console.error('Ошибка при завершении CarrotQuest:', err);
      }
    };
  }, []);
};
