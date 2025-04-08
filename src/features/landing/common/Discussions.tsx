import { Appear } from '@features/landing';
import { Button, Container, Image } from '@shared/UI';

type Props = {
  discussions: {
    id: number;
    icon: string;
    description: string;
  }[];
};

export const Discussions: FCC<Props> = ({ discussions }) => {
  return (
    <section>
      <Container className='grid md:grid-cols-12 grid-cols-6 gap-4'>
        {discussions.map(({ icon, id, description }, i) => (
          <Appear delay={i * 50} key={id} className='md:col-span-4 col-span-3'>
            <div className='flex flex-col gap bg-bg-secondary p-6 rounded-2xl h-full'>
              <Image
                src={icon}
                alt={icon}
                width={72}
                height={72}
                className='w-16 h-16'
              />
              <div className='md:w-1/2 md:mt-14 mt-7 md:text-lg text-xs'>
                {description}
              </div>
            </div>
          </Appear>
        ))}

        <div className='col-span-6 md:col-span-12 flex justify-center mt-14'>
          <Button href='/'>Запланировать сессию</Button>
        </div>
      </Container>
    </section>
  );
};
