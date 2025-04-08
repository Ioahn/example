import { RiEdit2Line } from 'react-icons/ri';
import {
  loadEditSpecialistProfile,
  selectApprovalMessage,
  selectSpecialistPrivateState,
} from '@entities/models';
import {
  AboutSpecialist,
  Education,
  OpenModalButton,
  ShortSpecialistCard,
} from '@features/client';
import { UpdateProfileForm } from '@features/specialist';
import { isProduction } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Card, Container, Link, Notify } from '@shared/UI';

export const PrivateSpecialistProfile = () => {
  const {
    id,
    avatar_url,
    working_areas,
    experience,
    specialization_title,
    first_name,
    last_name,
    languages,
    topics,
    about_me,
    education,
    additional_education,
  } = useAppSelector(selectSpecialistPrivateState);
  const approval = useAppSelector(selectApprovalMessage);
  const dispatch = useAppDispatch();

  return (
    <Container className='grid grid-cols-6 gap-4 md:grid-cols-12'>
      <div className='col-span-6 mt-4 flex items-center justify-between md:col-span-8 md:col-start-3'>
        <h1 className='font-semibold max-md:text-md sm:text-lg'>
          Публичный профиль
        </h1>
        <OpenModalButton
          withDot={false}
          modalRender={(onClose) => <UpdateProfileForm onClose={onClose} />}
          onOpen={() => dispatch(loadEditSpecialistProfile())}
        >
          <span className='max-md:hidden'>Редактировать</span>
          <RiEdit2Line className='text-md sm:hidden' />
        </OpenModalButton>
      </div>
      <div className='col-span-6 md:col-span-8 md:col-start-3'>
        {approval && typeof approval === 'string' && (
          <Notify type='error'>
            Изменения данных профиля требуют доработки: {approval}
          </Notify>
        )}

        {approval && typeof approval === 'boolean' && (
          <Notify type='info'>
            Изменения данных профиля в процессе модерации
          </Notify>
        )}
      </div>
      <div className='col-span-6 flex flex-col gap-2 md:col-span-8 md:col-start-3'>
        <ShortSpecialistCard
          avatar_url={avatar_url}
          working_areas={working_areas}
          experience={experience}
          specialization_title={specialization_title}
          first_name={first_name}
          // TODO исправить проблемы с типизацией на стороне спеки
          last_name={last_name as unknown as null}
          languages={languages}
          topics={topics}
        />
        <AboutSpecialist className='col-span-7' description={about_me} />
        <Education
          className='col-span-7'
          education={education}
          additional_education={additional_education}
        />
      </div>

      {/*Debug information*/}
      {!isProduction() && (
        <div className='col-span-6 flex flex-col gap-2 md:col-span-8 md:col-start-3'>
          <Card variant='secondary' className='flex flex-col gap-6'>
            <p className='font-bold'>
              Debug Information (Available only on test)
            </p>
            <p>
              Ссылка на публичный профиль, который видят клиенты{' '}
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/client/search-specialist/profile/${id}`}
                className='text-content-secondary underline'
                target='_blank'
              >
                {process.env.NEXT_PUBLIC_APP_URL}
                /client/search-specialist/profile/{id}
              </Link>
            </p>
            <p>
              <Link
                href={`${process.env.NEXT_PUBLIC_API_BASE_URL}admin/specialist_account_pending_profile_changes/list?search=${id}`}
                className='text-content-secondary underline'
                target='_blank'
              >
                Ссылка, чтобы перейти в админку для подтверждения/отклонения
                изменений профиля
              </Link>
            </p>
          </Card>
        </div>
      )}
    </Container>
  );
};
