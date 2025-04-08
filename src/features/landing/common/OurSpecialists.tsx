import {
  RiAwardLine,
  RiFundsBoxLine,
  RiGovernmentLine,
  RiPsychotherapyLine,
  RiStarLine,
} from 'react-icons/ri';
import { openClientTopics } from '@entities/models';
import { Appear } from '@features/landing';
import { TAreaType } from '@shared/api';
import { cn } from '@shared/utils';
import { useAppDispatch } from '@shared/hooks';
import { Button, Container } from '@shared/UI';

const ourSpecialist = [
  {
    id: 1,
    icon: RiAwardLine,
    description: 'Диплом\n' + 'психолога ВШЭ',
    area: TAreaType.ECoaching,
  },
  {
    id: 2,
    icon: RiStarLine,
    description: 'Дополнительное образование',
    area: TAreaType.EPsychotherapy,
  },
  {
    id: 3,
    icon: RiPsychotherapyLine,
    description: 'Проходят супервизии',
    area: TAreaType.ECoaching,
  },
  {
    id: 4,
    icon: RiGovernmentLine,
    description: 'Члены профессиональных ассоциаций',
    area: TAreaType.EPsychotherapy,
  },
  {
    id: 5,
    icon: RiFundsBoxLine,
    description: 'Повышают квалификацию',
    area: TAreaType.ECoaching,
  },
];

export const OurSpecialists = () => {
  const dispatch = useAppDispatch();

  return (
    <section>
      <Container>
        <Appear
          className='flex items-center gap-6 mb-8'
          y={0}
          x={100}
          rootMargin='-20% 0%'
        >
          <h3 className='md:text-xl text-lg font-semibold'>Наши специалисты</h3>
          <Button
            variant='tertiary'
            onPress={() => dispatch(openClientTopics())}
            className='text-content-primary bg-bg-primary max-md:hidden'
            size='md'
          >
            Все специалисты
          </Button>
        </Appear>
        <div className='gap-4 max-md:flex-wrap md:overflow-hidden relative grid grid-cols-5'>
          {ourSpecialist.map(({ id, icon: Icon, description, area }, i) => (
            <Appear
              key={id}
              className='md:col-span-1 col-span-5 flex gap-4 md:flex-col items-center'
              y={100}
              x={0}
              rootMargin='-20% 0%'
              delay={i * 100}
            >
              <div
                className={cn('flex md:p-4 p-2 rounded-full', {
                  ['bg-content-accent']: area === TAreaType.EPsychotherapy,
                  ['bg-content-accent-vivid']: area === TAreaType.ECoaching,
                })}
              >
                <Icon className='md:text-xl text-md text-content-inverse' />
              </div>
              <p className='md:text-md md:text-center'>{description}</p>
            </Appear>
          ))}
        </div>
      </Container>
    </section>
  );
};
