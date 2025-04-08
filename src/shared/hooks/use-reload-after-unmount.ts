import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * 🛑🛑🛑 Использовать с осторожностью в dev. Корректно работает только в режиме
 * с отключенным StrictMode. Может вызвать бесконечные перезагрузки
 */
export const useReloadAfterUnmount = () => {
  const router = useRouter();

  useEffect(() => {
    return () => router.reload();
  }, []);
};
