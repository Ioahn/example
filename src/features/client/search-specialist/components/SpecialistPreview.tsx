import { ReactElement } from 'react';
import { RiBriefcase4Line, RiMessage3Line } from 'react-icons/ri';
import { Avatar, IconWithDescription } from '@features/client';
import { TSpecialistSearchEntrySchema } from '@shared/api';
import { getLanguageNames, getNumberLocalText } from '@shared/utils';
import { WorkingAreas } from '@shared/UI';

type Props = Pick<
  TSpecialistSearchEntrySchema,
  | 'avatar_url'
  | 'working_areas'
  | 'specialization_title'
  | 'experience'
  | 'languages'
> & {
  title?: string | ReactElement;
};

export const SpecialistPreview: FCC<Props> = ({
  avatar_url,
  working_areas,
  specialization_title,
  experience,
  languages,
  title,
}) => (
  <div className='flex gap-4 flex-wrap'>
    <Avatar
      src={avatar_url}
      className='flex-[1_0_100%] sm:flex-[0_1_clamp(150px,15%,100%)]'
      areas={working_areas}
    />
    <div className='flex flex-[1_0_min-content] flex-col items-stretch'>
      {title}
      <p className='text-base text-content-secondary overflow-wrap-anywhere'>
        {specialization_title}
      </p>
      <div className='mt-5 flex flex-wrap gap-5 max-md:flex-col'>
        <IconWithDescription
          className='flex'
          icon={<RiBriefcase4Line />}
          description='Cтаж'
          value={getNumberLocalText(experience, ['лет', 'год', 'года'])}
        />
        <IconWithDescription
          className='flex flex-[1_0_min-content]'
          icon={<RiMessage3Line />}
          description='Языки работы'
          value={getLanguageNames(languages).join(', ')}
        />
      </div>
    </div>
    <WorkingAreas areas={working_areas} className='max-md:hidden' />
  </div>
);
