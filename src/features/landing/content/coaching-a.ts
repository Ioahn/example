import { TAreaType } from '@shared/api';
import { footer } from './footer';
import { navigation } from './navigation';

export const coachingA = {
  variant: 'primary',
  area: TAreaType.ECoaching,
  cta_banner: {
    title: 'Коучинг',
    description:
      '– это взаимодействие из позиции двух взрослых \n' +
      'и равных людей, где один помогает другому превратить мечту в план действий',
    video: {
      description: 'Экзекьютив коуч, бизнес коуч',
      name: 'Валентина Тихонова',
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
      icon: '/landing/discussions/couch_1.svg',
      description: `Постановку
и достижение целей`,
    },
    {
      id: 2,
      icon: '/landing/discussions/couch_2.svg',
      description: `Отсутствие мотивации
и прокастинацию`,
    },
    {
      id: 3,
      icon: '/landing/discussions/couch_3.svg',
      description: `Карьерное 
консультирование`,
    },
    {
      id: 4,
      icon: '/landing/discussions/couch_4.svg',
      description: 'Ведение переговоров и коммуникации',
    },
    {
      id: 5,
      icon: '/landing/discussions/couch_5.svg',
      description: `Сложности 
в принятии решений`,
    },
    {
      id: 6,
      icon: '/landing/discussions/couch_6.svg',
      description: `Подготовка 
к собеседованию`,
    },
  ],
  first_banner: {
    variant: 'primary',
    button: { title: 'Выбрать коуча', href: '/' },
    image: '/landing/couch.png',
    title: 'Наш подход',
    description: `Наши коучи имеют высшее психологическое образование и работают в психоаналитическом подходе – это позволяет сделать работу более глубокой и эффективной. 

Такой подход дает возможность уделить 
внимание не только действиям, но и чувствам, переживаниям, которые могут служить препятствием для достижения целей, 
учит справляться с ними.`,
  },
  second_banner: {
    variant: 'primary',
    image: '/landing/couch_2.png',
    title: 'Результаты коучинга',
    description: `В ходе работы специалист помогает определить ресурсы, необходимые для достижения цели, убрать ограничения и страхи, заметить свои сильные стороны и имеющиеся возможности. 

Итог – вдохновение, смелость, уверенность 
в своих силах и четкий план действий.`,
  },
  navigation,
  footer,
};
