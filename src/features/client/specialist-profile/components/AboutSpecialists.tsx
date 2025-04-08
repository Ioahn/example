import { Item } from 'react-stately';
import { ANCHOR_OUR_SPECIALISTS_ID } from '@features/client';
import { Card, Image, List } from '@shared/UI';
import CheckMark from '@public/svg/CheckMark.svg';

const items = [
  {
    label: 'Без случайных людей',
    description:
      'Наши специалисты - это профессионалы высокого уровня, которых основатели платформы лично пригласили и знают многие годы.',
  },
  {
    label: 'Образование',
    description:
      'Все специалисты прошли обучение на магистерской программе НИУ ВШЭ и имеют диплом психолога. Программа ориентирована на подготовку экспертов в области психологии и коучинга, и ее создатели являются основателями Sense-A.',
  },
  {
    label: 'Конфиденциальность',
    description:
      'Мы придаем особое значение защите конфиденциальной информации наших клиентов. Мы не собираем никакую информацию в процессе сессий, о их содержании знаете только вы и специалист. Все наши специалисты подписывают специальное соглашение о конфиденциальности.',
  },
  {
    label: 'Постоянное развитие',
    description:
      'Наши специалисты регулярно проходят дополнительное образование и супервизии, поддерживая и развивая свою профессиональную компетентность.',
  },
  {
    label: 'Опыт в бизнесе',
    description:
      'Коучи с фокусом на бизнес-запросы обладают успешным личным опытом в сфере бизнеса, что делает их исключительными наставниками для вашего развития и развития вашего бизнеса.',
  },
  {
    label: 'Супервизии',
    description:
      'Все наши специалисты находятся в регулярной супервизии, имеют опыт личной терапии и коучинга. Это помогает им поддерживать важнейший принцип психотерапии: безоценочность и уважение к ценностям клиента.',
  },
  {
    label: 'Контроль качества',
    description:
      'Для нас действительно важно, чтобы вы получили отличный опыт работы с психологом или коучем. Мы открыты для обратной связи и регулярно проводим оценку качества работы специалистов.',
  },
];

export const AboutSpecialists: FCC = ({ className }) => {
  return (
    <Card variant='secondary' className={className}>
      <div id={ANCHOR_OUR_SPECIALISTS_ID} className='flex flex-col gap-8'>
        <p className='font-bold'>Почему специалистам Sense-A стоит доверять?</p>
        <List className='flex flex-col gap-8' items={items}>
          {(item) => (
            <Item textValue={item.label} key={item.label}>
              <div className='flex gap-4'>
                <Image
                  src={CheckMark}
                  width={24}
                  alt='check mark'
                  className='flex-shrink-0'
                />
                <p>
                  <span className='text-content-accent font-semibold'>
                    {item.label}:
                  </span>{' '}
                  {item.description}
                </p>
              </div>
            </Item>
          )}
        </List>
      </div>
    </Card>
  );
};
