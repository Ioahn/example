import { useEffect } from 'react';

export const useOverscrollDisable = () => {
  useEffect(() => {
    const body = document.body;

    body.classList.add('overscroll-none');

    return () => body.classList.remove('overscroll-none');
  }, []);
};
