import { StageCard } from '@features/landing';
import { cn } from '@shared/utils';
import { Container, Image } from '@shared/UI';

export const HowAreGoingProcess: FCC = function HowAreGoingProcess({
  className,
}) {
  return (
    <section>
      <Container
        className={cn('grid-cols-6 grid md:grid-cols-12 gap-x-8', className)}
        type='landing'
      >
        <div className='h-8 md:h-[3.75rem] col-span-6 md:col-span-12' />
        <h2 className='col-span-6 md:col-span-12 font-galaxy-semibold text-center'>
          Как проходит процесс
        </h2>
        <div className='h-8 md:h-[3.75rem] col-span-6 md:col-span-12' />

        <StageCard
          stage={1}
          title='Сформулируйте запрос'
          className='md:col-span-4 col-span-6'
          description={
            <span>
              Выберите из предложенного списка направление работы и темы,
              которые наиболее актуальны для вас сейчас. Они могут быть{' '}
              <span className='text-content-accent'>психологические</span> и{' '}
              <span className='text-content-accent-vivid'>коучинговые</span>
            </span>
          }
        >
          <div className='aspect-w-16 aspect-h-9 relative'>
            <Image
              src='/landing/home/stage-1.png'
              alt='теги'
              fill
              className='object-contain'
            />
          </div>
        </StageCard>

        <div className='h-8 md:hidden col-span-6' />

        <StageCard
          stage={2}
          title='Выберите специалиста'
          description={
            <span>
              Предложим специалистов,{' '}
              <span className='text-content-accent-vivid'>коучей</span> и{' '}
              <span className='text-content-accent'>психотерапевтов</span>,
              которые работают с вашим запросом.
            </span>
          }
          className='md:col-span-4 col-span-6'
        >
          <div className='aspect-w-16 aspect-h-9 relative'>
            <Image
              src='/landing/home/stage-2.png'
              alt='теги'
              fill
              className='object-contain'
            />
          </div>
        </StageCard>

        <div className='h-8 md:hidden col-span-6' />

        <StageCard
          stage={3}
          title='Запланируйте сессию'
          description={
            <span>
              <span className='font-semibold'>Зарезервируйте время</span> у
              специалиста, с которым вы хотели бы поработать. В каждой анкете
              есть подробная информация об образовании и опыте, стоимости
              работы.
            </span>
          }
          className='md:col-span-4 col-span-6'
        >
          <div className='aspect-w-16 aspect-h-9 relative'>
            <Image
              src='/landing/home/stage-3.png'
              alt='теги'
              fill
              className='object-contain'
            />
          </div>
        </StageCard>

        <div className='h-8 md:h-[3.75rem] col-span-6 md:col-span-12' />
      </Container>
    </section>
  );
};
