import { ClientPostponeView, Specialists } from '@features/client';
import { Container } from '@shared/UI';

export const PostponeSlot = () => {
  return (
    <Container className='grid grid-cols-6 gap-y-4 gap-x-8 md:grid-cols-12 pt-4'>
      <div className='md:col-span-4 col-span-6 row-span-1'>
        <Specialists isPostpone />
      </div>
      <div className='md:col-span-8 col-span-6 row-span-6'>
        <ClientPostponeView />
      </div>
    </Container>
  );
};
