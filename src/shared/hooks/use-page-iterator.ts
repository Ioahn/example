import { useMemo } from 'react';

export const usePageIterator = (
  currentPage: number,
  totalPages: number,
  cb: (value: string | number) => void
) => {
  return useMemo(() => {
    if (totalPages <= 1) return [{ page: 1, handler: () => cb(1) }];

    const pages = [];
    const maxVisible = 5; // Максимальное количество видимых страниц
    const halfVisible = Math.floor(maxVisible / 2);

    // Добавляем кнопку "предыдущая" если это не первая страница
    if (currentPage > 1) {
      pages.push('<');
    }

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Корректируем диапазон, если мы в начале или в конце списка
    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, startPage + maxVisible - 1);
    } else if (currentPage + halfVisible > totalPages) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Добавляем кнопку "следующая" если это не последняя страница
    if (currentPage < totalPages) {
      pages.push('>');
    }

    return pages.map((page) => ({ page, handler: () => cb(page) }));
  }, [currentPage, totalPages, cb]);
};
