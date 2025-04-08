import { RiArrowRightLine } from 'react-icons/ri';
import { Appear, Opacity, StageCard } from '@features/landing';
import { Button, Container, Image } from '@shared/UI';

export const HowItWorks = () => (
  <section>
    <Container>
      <Appear y={0} x={100} rootMargin='-50% 0%' className='mb-8'>
        <h3 className='md:text-xl text-lg font-semibold'>Как это работает</h3>
      </Appear>
      <div className='flex flex-col gap-4'>
        <Appear y={0} x={100} rootMargin='-50% 0%'>
          <Opacity rootMargin='-50% 0%'>
            <StageCard
              stage={1}
              title='Оставьте заявку'
              description='Заполните форму, и с вами свяжется один из наших представителей.'
              className='text-content-inverse bg-black'
            >
              <div className='md:py-10 md:pr-8 relative'>
                <Image
                  src='/landing/FormExample.png'
                  alt='теги'
                  width={340}
                  height={340}
                  className='md:translate-x-[150px]'
                />
              </div>
            </StageCard>
          </Opacity>
        </Appear>
        <Appear y={0} x={-100} rootMargin='-50% 0%'>
          <Opacity rootMargin='-50% 0%'>
            <StageCard
              stage={2}
              title='Выберите специалиста'
              description='Предложим специалистов по вашим темам, включая коучей и психотерапевтов, которые работают с вашим запросом.'
              className='text-content-inverse bg-black'
            >
              <div className='p-10'>
                <Image
                  src='/landing/business_manager.png'
                  alt='карта коуча'
                  width={280}
                  height={240}
                  className='md:translate-x-[230px]'
                />
                <Image
                  src='/landing/business_message.png'
                  alt='Список коучей'
                  width={280}
                  height={100}
                  className='md:-translate-y-[50px] translate-y-[10px]'
                />
              </div>
            </StageCard>
          </Opacity>
        </Appear>
        <Appear y={0} x={100} rootMargin='-50% 0%'>
          <Opacity rootMargin='-50% 0%'>
            <StageCard
              stage={3}
              title='Запланируйте сессию'
              description='Зарезервируйте время у специалиста,с которым вы хотели бы поработать.'
              className='text-content-inverse bg-black'
            >
              <div>
                <Image
                  src='/landing/PersonListWhite.png'
                  alt='Список коучей'
                  width={340}
                  height={280}
                  className='md:translate-y-[100px]'
                />
                <Image
                  src='/landing/CouchCard.png'
                  alt='карта коуча'
                  width={400}
                  height={244}
                  className='md:-translate-y-[220px] -translate-y-[120px] translate-x-[150px]'
                />
              </div>
            </StageCard>
          </Opacity>
        </Appear>
      </div>
      <div className='h-16' />
      <Appear rootMargin='-20% 0%'>
        <Button endIcon={<RiArrowRightLine />} className='m-auto'>
          Оставить заявку
        </Button>
      </Appear>
    </Container>
  </section>
);
