import { TAreaType } from '@shared/api';
import { footer } from './footer';
import { navigation } from './navigation';

export const therapyA = {
  variant: 'primary',
  area: TAreaType.EPsychotherapy,
  cta_banner: {
    title: 'Психотерапия',
    description:
      '– это разговор. Научитесь понимать свои чувства, реакции, и справляться со сложными эмоциями',
    video: {
      description: 'Психолог, доктор психологических наук',
      name: 'Психолог, доктор психологических наук',
      sources: [
        {
          src: 'https://video-preview.s3.yandex.net/3f0yHAAAAAA.mp4',
        },
      ],
    },
    cta: {
      title: 'Запланировать сессию',
      href: '/client/select/area-type',
    },
  },
  quotes: [
    {
      id: 1,
      qoute:
        'Это искусство создания (с помощью беседы \n' +
        'и поведения) среды, которая облегчает движение человека к желаемым целям, \n' +
        'так, чтобы оно приносило',
      author: {
        icon: '/cat.jpg',
        name: 'Тимоти Голви',
      },
    },
    {
      id: 2,
      qoute:
        'Проблемы с психическим здоровьем являются одной из самых распространенных причин выгорания и больничных, предотвратите эти проблемы на раннем этапе, и создайте более здоровую рабочую среду',
      author: {
        icon: '/cat.jpg',
        name: 'Кот бегемот',
      },
    },
  ],
  discussions: [
    {
      id: 1,
      icon: '/landing/discussions/therapy_1.svg',
      description: `Проблемы в отношениях`,
    },
    {
      id: 2,
      icon: '/landing/discussions/therapy_2.svg',
      description: `Чувства и переживания`,
    },
    {
      id: 3,
      icon: '/landing/discussions/therapy_3.svg',
      description: `Стресс и перегрузки`,
    },
    {
      id: 4,
      icon: '/landing/discussions/therapy_4.svg',
      description: `Самооценка и уверенность в себе`,
    },
    {
      id: 5,
      icon: '/landing/discussions/therapy_5.svg',
      description: `Травматические события и потери`,
    },
    {
      id: 6,
      icon: '/landing/discussions/therapy_6.svg',
      description: `Зависимости 
и вредные привычки`,
    },
  ],
  first_banner: {
    variant: 'primary',
    button: { title: 'Выбрать психолога', href: '/' },
    image: '/landing/teraphy.png',
    title: 'Наш подход',
    description:
      'Мы используем психоаналитический подход \n' +
      'для работы с травмирующими событиями \n' +
      'прошлого и уменьшения их влияния на настоящее. \n' +
      '\n' +
      'Данный подход помогает изменить негативные повторяющиеся сценарии, лучше понять себя, \n' +
      'свои желания, стать увереннее и почувствовать собственную ценность.',
  },
  second_banner: {
    variant: 'primary',
    image: '/landing/teraphy_2.png',
    title: 'Наш подход',
    description:
      'Мы используем психоаналитический подход \n' +
      'для работы с травмирующими событиями \n' +
      'прошлого и уменьшения их влияния на настоящее. \n' +
      '\n' +
      'Данный подход помогает изменить негативные повторяющиеся сценарии, лучше понять себя, \n' +
      'свои желания, стать увереннее и почувствовать собственную ценность.',
  },
  process: [
    {
      stage: 1,
      title: 'Сформулируйте запрос',
      description: `Выберите направление работы и темы, которые наиболее актуальны для вас сейчас.`,
      image: '',
    },
  ],
  navigation,
  footer,
};
