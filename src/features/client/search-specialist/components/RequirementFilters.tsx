import { Controller, useFormContext } from 'react-hook-form';
import {
  RiArrowDropDownFill,
  RiMenLine,
  RiStarHalfLine,
  RiUserSmileLine,
  RiWomenLine,
} from 'react-icons/ri';
import { useToggleState } from 'react-stately';
import { RadioWithOptions } from '@features/specialist';
import { TGender } from '@shared/api';
import { cn } from '@shared/utils';
import { Card, Collapse, ToggleButton } from '@shared/UI';

const gender = [
  {
    id: TGender.EMale,
    value: TGender.EMale,
    icon: RiMenLine,
    label: 'Мужской',
  },
  {
    id: TGender.EFemale,
    value: TGender.EFemale,
    icon: RiWomenLine,
    label: 'Женский',
  },
  {
    id: 'none',
    value: 'none',
    icon: RiUserSmileLine,
    label: 'Не важно',
  },
];

const time = [
  {
    id: 'morning',
    value: 'morning',
    icon: RiStarHalfLine,
    label: 'Утро',
  },
  {
    id: 'daytime',
    value: 'daytime',
    icon: RiMenLine,
    label: 'День',
  },
  {
    id: 'evening',
    value: 'evening',
    icon: RiMenLine,
    label: 'Вечер',
  },
  {
    id: 'none',
    value: 'none',
    icon: RiMenLine,
    label: 'Не важно',
  },
];

const budget = [
  {
    id: 'yunling',
    value: '3000',
    label: '3000₽',
  },
  {
    id: 'padavan',
    value: '5000',
    label: '5000₽',
  },
  {
    id: 'jedi',
    value: '7000',
    label: '7000₽',
  },
  {
    id: 'master jedi',
    value: '10000',
    label: '10000₽',
  },
  {
    id: 'no matter',
    value: '0',
    label: 'Не важно',
  },
];

export const Requirements: FCC = () => {
  const { control } = useFormContext();
  return (
    <div className='flex flex-col gap-4'>
      <RequirementFilters label='Пол'>
        <Controller
          name='gender'
          control={control}
          render={({ field }) => (
            <RadioWithOptions
              defaultValue={field.value}
              onChange={field.onChange}
              options={gender}
              isRequired
              className='flex-row flex-wrap'
              aria-label='Пол'
            />
          )}
        />
      </RequirementFilters>
      <RequirementFilters label='Доступное время'>
        <Controller
          name='time'
          control={control}
          render={({ field }) => (
            <RadioWithOptions
              defaultValue={field.value}
              onChange={field.onChange}
              aria-label='Время'
              options={time}
              className='flex-row flex-wrap'
            />
          )}
        />
      </RequirementFilters>
      <RequirementFilters label='Бюджет'>
        <Controller
          name='budget'
          control={control}
          render={({ field }) => (
            <RadioWithOptions
              defaultValue={field.value}
              onChange={field.onChange}
              aria-label='Бюджет'
              options={budget}
              className='flex-row flex-wrap'
            />
          )}
        />
      </RequirementFilters>
    </div>
  );
};

export const RequirementFilters: FCC<{ label: string }> = ({
  className,
  children,
  label,
}) => {
  const state = useToggleState({ defaultSelected: true });

  return (
    <Card
      className={cn('flex flex-col', className)}
      variant='primary'
      size='md'
    >
      <ToggleButton
        onPress={state.toggle}
        className='flex w-full max-w-none justify-between rounded-md'
        variant='clear'
      >
        <h2 className='font-semibold'>{label}</h2>
        <RiArrowDropDownFill
          className={cn(
            `text-lg transition-transform duration-150 ease-in`,
            state.isSelected && 'rotate-180'
          )}
        />
      </ToggleButton>
      <Collapse isOpen={state.isSelected} className='pt-5'>
        {children}
      </Collapse>
    </Card>
  );
};
