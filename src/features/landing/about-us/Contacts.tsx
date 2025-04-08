import { Button, Container } from '@shared/UI';

export const Contacts = function Contacts() {
  return (
    <section className='bg-bg-primary'>
      <div className='h-14' />
      <Container
        className='flex justify-center items-center flex-col gap-6 text-center'
        type='landing'
      >
        <p className='font-galaxy-semibold'>Контакты</p>
        <p className='font-rock'>
          По всем вопросам, касающихся работы проекта <br /> обращайтесь по
          почте: <span className='font-semibold'>team@sense-a.ru</span>
        </p>
        <p className='font-rock'>
          или через <span className='font-semibold'>онлайн поддержку</span>
        </p>
        <Button onPress={() => carrotquest.open()}>Написать</Button>
      </Container>
      <div className='h-28' />
    </section>
  );
};
