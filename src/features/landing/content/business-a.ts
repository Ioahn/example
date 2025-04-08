import { footer } from './footer';
import { navigation } from './navigation';

export const businessA = {
  banner: {
    title: `<span class='text-content-accent-vivid'>Коучинг</span> и <span class='text-content-accent'>психотерапия</span> для бизнеса`,
    quote: {
      description: `"<span class='text-content-accent-vivid'>Сильный лидер</span> нового времени — это лидер, который не просто готов к изменениям, а готов принимать помощь другого, чтобы эти <span class='text-content-accent'>изменения состоялись</span>."`,
      author: 'А.В. Россохин',
      subtitle:
        'основатель платформы Sense-A, доктор психологических наук, заведующий кафедрой психоанализа в НИУ ВШЭ',
    },
    image: '/landing/buisness/Rossohin.png',
    button: {
      href: '#business-subscribe-form',
      text: 'Оставить заявку',
    },
  },
  goals: {
    title:
      'Возвращаем устойчивость бизнесу \n' + 'в условиях неопределенности.',
    subtitle: 'Решаем бизнес-уравнения любой сложности.',
    blocks: [
      {
        id: 1,
        title: `Поможем <span class='text-content-accent-vivid'>компании:</span>`,
        goals: [
          {
            id: 1,
            icon: '/landing/buisness/discount-percent-increase-arrow.png',
            text: 'Сократить процент увольнений',
          },
          {
            id: 2,
            icon: '/landing/buisness/office-file-text-graph.png',
            text: 'Уменьшить расходы на HR',
          },
          {
            id: 3,
            icon: '/landing/buisness/business-management-teamwork-clap.png',
            text: 'Увеличить эффективность \n' + 'и мотивацию сотрудников',
          },
          {
            id: 4,
            icon: '/landing/buisness/collaboration-team-chat.png',
            text: 'Улучшить коммуникацию \n' + 'внутри команды',
          },
        ],
      },
      {
        id: 2,
        title: `Поможем вашим <span class='text-content-accent'>сотрудникам:</span>`,
        goals: [
          {
            id: 1,
            icon: '/landing/buisness/messages-people-user-bubble.png',
            text: 'Справиться с выгоранием и личными проблемами',
          },
          {
            id: 2,
            icon: '/landing/buisness/meeting-user-man-stress.png',
            text: 'Снизить уровень тревоги и внутреннего сопротивления',
          },
          {
            id: 3,
            icon: '/landing/buisness/plugin-jigsaw-puzzle.png',
            text: 'Найти баланс между работой и личной жизнью',
          },
          {
            id: 4,
            icon: '/landing/buisness/video-meeting-team-monitor-man.png',
            text: 'Повысить личную эффективность и самоорганизацию',
          },
        ],
      },
    ],
  },
  advantages: {
    title: 'Прозрачный формат работы',
    subtitle:
      'Используем гибкие инструменты для достижения максимального результата',
    cards: [
      {
        id: 1,
        title: 'Оплата только по факту оказания услуги',
        description: 'Берем оплату только за фактически проведенные сессии',
        type: 'primary',
      },
      {
        id: 2,
        title: 'Отчетность и аналитика',
        type: 'secondary',
        description:
          'Предоставляем информацию об активности сотрудника и по количеству проведенных сессий',
      },
      {
        id: 3,
        type: 'tertiary',
        title: 'Гибкие настройки \n' + 'ваших трат',
        description:
          'Подбираем специалистов под индивидуальный запрос и помогаем дойти до результата',
      },
    ],
  },
  process: {
    title: 'Как устроен процесс',
    steps: [
      {
        id: 1,
        title: `Определим <span class='font-semibold'>индивидуальный запрос</span> каждого сотрудника`,
      },
      {
        id: 2,
        title: `Предложим <span class='font-semibold'>подходящих</span> специалистов`,
      },
      {
        id: 3,
        title: `<span class='font-semibold'>Сотрудник сам выбирает</span> подходящее время сессии и специалиста`,
      },
    ],
  },
  solution: {
    title: 'Уникальный продукт для директоров и топ менеджеров компаний',
    card: {
      title: 'Executive - коучинг',
      description:
        'Коучинг для руководителей, которые понимают, что изменения в компании начинаются с них.',
    },
    advantages: [
      {
        id: 1,
        icon: '/landing/buisness/app-window-user.png',
        text: 'Наши коучи обладают многолетним успешным опытом в бизнесе, что позволяет им понимать все нюансы корпоративной среды.',
      },
      {
        id: 2,
        icon: '/landing/buisness/business-management-agreement.png',
        text: 'Каждый из наших экспертов прошел личную терапию и коучинг, что обогащает их подход к работе с клиентами.',
      },
      {
        id: 3,
        icon: '/landing/buisness/office-stamp-document.png',
        text: 'Постоянное обучение и обновление знаний обеспечивает актуальность и эффективность наших подходов.',
      },
      {
        id: 4,
        icon: '/landing/buisness/website-development-browser-page-layout.png',
        text: 'Мы предлагаем персонализированные стратегии, направленные на достижение ваших бизнес-целей и личного роста.',
      },
    ],
  },
  aboutUs: {
    title: 'Sense-A - это сообщество профессионалов',
    description: `Наша платформа уникальна тем, что <span class='font-semibold'>все специалисты 
                  Sense-A прошли обучение</span> в Национальном исследовательском университете 
                  Высшая школа экономики <span class='font-semibold'>(НИУ ВШЭ)</span>`,
    cards: [
      {
        id: 1,
        image: '/landing/buisness/psychology_vivid.png',
        text: `"Психоанализ и психоаналитическая <span class='font-semibold text-content-accent'>психотерапия</span>"`,
      },
      {
        id: 2,
        image: '/landing/buisness/psychology_accent.png',
        text: `"Психоанализ и психоаналитическое <span class='font-semibold text-content-accent-vivid'>бизнес-консультирование</span>"`,
      },
    ],
    subtitle: `Эти образовательные программы были созданы основателем Sense-A, что <span class='font-semibold'>гарантирует глубокое понимание</span> психоаналитических принципов и их эффективное применение в коучинге, психотерапии и бизнес-консультировании.`,
    image: '/landing/buisness/faces.png',
  },
  navigation,
  footer,
};
