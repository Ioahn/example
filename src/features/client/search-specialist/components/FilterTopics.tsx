import { useCallback, useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { RiCloseLine } from 'react-icons/ri';
import {
  applyFilter,
  emptyTopics,
  getTopics,
  selectMarkedTopicsIds,
  selectRequirements,
  selectTopics,
} from '@entities/models';
import { Categories, SelectAreaType } from '@features/client';
import { SelectRequirement } from '@features/client/search-specialist/components/SelectRequirements';
import { TAreaType } from '@shared/api';
import {
  FormRequirementState,
  normalizeFormRequirementValues,
} from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { BudgetPicker, Button } from '@shared/UI';
import {
  GENDER_OPTIONS,
  RESET_KEY,
  TIME_OPTIONS,
  WEEK_DAY_OPTIONS,
} from '@shared/constants';

type Props = {
  onClose: () => void;
};

export const FilterTopics: FCC<Props> = ({ onClose }) => {
  const categories = useAppSelector(selectTopics);
  const choseTopics = useAppSelector(selectMarkedTopicsIds);
  const { gender, time, areaType, maxPrice, minPrice, weekDays, ageRange } =
    useAppSelector(selectRequirements);
  const dispatch = useAppDispatch();

  const maxDefaultBudgetValue =
    areaType === TAreaType.EPsychotherapy ? 7000 : 15000;

  const methods = useForm({
    defaultValues: {
      choseTopics,
      gender: gender === null ? [RESET_KEY] : gender.split(','),
      time: time === null ? [RESET_KEY] : time.split(','),
      age: ageRange === null ? [RESET_KEY] : ageRange.split(','),
      budget:
        minPrice === null || maxPrice === null
          ? [0, maxDefaultBudgetValue]
          : [minPrice, maxPrice],
      week_days: weekDays === null ? [RESET_KEY] : weekDays.split(','),
      area_type: areaType,
    },
  });

  const onSubmitValue = useCallback(
    (form: AnyObject) => {
      const { choseTopics, area_type, ...rest } = form as {
        choseTopics: string[];
        area_type: TAreaType;
      } & FormRequirementState;

      dispatch(
        applyFilter({
          choseTopics,
          area_type,
          ...normalizeFormRequirementValues(rest),
        })
      );

      onClose();
    },
    [dispatch, onClose]
  );

  const area = methods.watch('area_type');

  useEffect(() => {
    if (areaType !== area) {
      dispatch(getTopics(area));
      dispatch(emptyTopics());
      methods.resetField('choseTopics', { defaultValue: [] });
    }
  }, [areaType, area, dispatch]);

  return (
    <div className='relative flex h-full flex-col overflow-y-scroll px-6 pt-6'>
      <div className='flex items-center justify-between max-md:mb-6 sm:mb-10'>
        <p className='font-semibold max-md:text-md sm:text-lg'>Фильтры</p>
        <Button
          variant='ghost'
          size='base'
          onPress={onClose}
          endIcon={<RiCloseLine className='text-md' />}
        />
      </div>
      <form
        onSubmit={methods.handleSubmit(onSubmitValue)}
        className='flex flex-col gap-4'
      >
        <FormProvider {...methods}>
          <SelectAreaType title='Направление' />
          <SelectRequirement
            name='gender'
            options={GENDER_OPTIONS}
            title='Пол'
          />
          <SelectRequirement
            name='time'
            options={TIME_OPTIONS}
            title='Доступное время'
          />
          <SelectRequirement
            name='week_days'
            options={WEEK_DAY_OPTIONS}
            title='Дни недели'
          />
          <Controller
            control={methods.control}
            name='budget'
            render={({ field }) => (
              <BudgetPicker
                category='Бюджет'
                onChange={field.onChange}
                label='Цена'
                minValue={0}
                maxValue={maxDefaultBudgetValue}
                defaultValue={field.value}
                variant='primary'
              />
            )}
          />
          <p className='font-semibold md:text-md'>Темы для обсуждений</p>
          <Categories categories={categories} />
        </FormProvider>
        <div className='sticky bottom-[-6px] flex w-full justify-end gap-4 bg-white/50 py-2 backdrop-blur-md'>
          <Button variant='ghost' onPress={onClose} className='max-md:hidden'>
            Отмена
          </Button>
          <Button type='submit' className='max-md:hidden'>
            Применить
          </Button>
          <Button type='submit' fullWidth className='sm:hidden'>
            Продолжить
          </Button>
        </div>
      </form>
    </div>
  );
};
