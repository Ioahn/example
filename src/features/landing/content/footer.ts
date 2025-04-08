import { DOCS } from '@shared/constants';

export const footer = [
  {
    title: 'Для Бизнеса',
    href: '/business',
  },
  // {
  //   title: 'Блог',
  //   href: '/blogs',
  // },
  {
    title: 'О нас',
    href: '/about-us',
    sub_menu: [
      // {
      //   title: 'Контакты',
      //   href: '/contacts',
      // },
      {
        title: 'Пользовательское соглашение',
        href: `/docs/${DOCS.User_Agreement}`,
      },
      {
        title: 'Политика в отношении обработки и защиты персональных данных',
        href: `/docs/${DOCS.Privacy_Policy}`,
      },
    ],
  },
  {
    title: 'Поддержка',
    href: '/', // Add here click to open support carrot chat
    sub_menu: [
      {
        title: 'team@sense-a.ru',
        href: 'mailto:team@sense-a.ru',
      },
    ],
  },
];
