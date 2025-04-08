import { Controller, useForm } from 'react-hook-form';
import { useDebounce } from 'react-use';
import {
  openSearchSpecialist,
  selectRequirements,
  updateRequirements,
} from '@entities/models';
import { TAreaType } from '@shared/api';
import {
  FormRequirementState,
  normalizeFormRequirementValues,
} from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import {
  BudgetPicker,
  Button,
  CheckboxButtonGroup,
  Container,
} from '@shared/UI';
import {
  GENDER_OPTIONS,
  RESET_KEY,
  TIME_OPTIONS,
  WEEK_DAY_OPTIONS,
} from '@shared/constants';

export const SelectRequirements: FCC = () => {
  const dispatch = useAppDispatch();
  const { control, watch } = useForm();
  const { areaType } = useAppSelector(selectRequirements);
  const formValues = watch();

  const maxBudgetValue = areaType === TAreaType.EPsychotherapy ? 7000 : 15000;

  useDebounce(
    () => {
      dispatch(
        updateRequirements(
          normalizeFormRequirementValues(formValues as FormRequirementState)
        ) as AnyObject
      );
    },
    300,
    [formValues]
  );

  return (
    <Container className='grid grid-cols-6 gap-6 md:grid-cols-12'>
      <h1 className='col-span-6 mt-8 md:text-lg text-md font-semibold md:col-span-8 md:col-start-3'>
        Пожелания к специалисту
      </h1>
      <div className='col-span-6 flex flex-col gap-4 md:col-span-8 md:col-start-3'>
        <Controller
          control={control}
          name='gender'
          render={({ field }) => (
            <CheckboxButtonGroup
              options={GENDER_OPTIONS}
              category='Пол'
              resetKey={RESET_KEY}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name='budget'
          defaultValue={[0, maxBudgetValue]}
          render={({ field }) => (
            <BudgetPicker
              category='Бюджет'
              onChange={field.onChange}
              label='Цена'
              minValue={0}
              maxValue={maxBudgetValue}
              defaultValue={[0, maxBudgetValue]}
            />
          )}
        />
        <Controller
          control={control}
          name='time'
          render={({ field }) => (
            <CheckboxButtonGroup
              options={TIME_OPTIONS}
              category='Время дня'
              onChange={field.onChange}
              resetKey={RESET_KEY}
            />
          )}
        />
        <Controller
          control={control}
          name='week_days'
          render={({ field }) => (
            <CheckboxButtonGroup
              options={WEEK_DAY_OPTIONS}
              category='Дни недели'
              onChange={field.onChange}
              resetKey={RESET_KEY}
            />
          )}
        />
      </div>
      <div className='col-span-6 mb-8 flex max-md:flex-wrap gap-4 justify-end md:col-span-8 md:col-start-3'>
        <Button
          variant='ghost'
          className='max-md:max-w-none max-md:w-full'
          onPress={() => {
            dispatch(openSearchSpecialist());
          }}
        >
          Пропустить
        </Button>
        <Button
          onPress={() => dispatch(openSearchSpecialist())}
          className='max-md:max-w-none max-md:w-full'
        >
          Продолжить
        </Button>
      </div>
    </Container>
  );
};
