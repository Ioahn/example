import { Container } from '@shared/UI';

type Props = {
  title: string;
};
export const Authentication: FCC<Props> = ({ children, title }) => {
  return (
    <Container className='grid h-full grid-cols-6 items-center sm:mt-9 sm:grid-cols-12'>
      <div className='col-span-6 col-start-1 sm:col-span-8 sm:col-start-3 md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-5'>
        <h1 className='mb-5 text-center md:text-lg font-semibold text-md'>
          {title}
        </h1>
        {children}
      </div>
    </Container>
  );
};
