// TODO нужен рефактор этого компонента
import { createContext, useContext, useRef } from 'react';
import { RiArrowDropDownFill, RiCloseLine } from 'react-icons/ri';
import Select, {
  DropdownIndicatorProps,
  GroupProps,
  MultiValueGenericProps,
  MultiValueRemoveProps,
  OptionProps,
  Props as SelectProps,
  components,
} from 'react-select';
import { useClickAway, useToggle } from 'react-use';
import { TAreaType } from '@shared/api';
import { cn } from '@shared/utils';
import { Button, Checkbox, Collapse } from '@shared/UI';

type Props = { value: string; label: string; type?: TAreaType };

const SelectContext = createContext(false);

const replaceString = (
  input: string,
  searchValue: string,
  func: (value: string) => string
): string => {
  const regex = new RegExp(searchValue, 'gi');
  return input.replace(regex, (match) => func(match));
};

const DropdownIndicator = (props: DropdownIndicatorProps<Props>) => {
  const isOpen = useContext(SelectContext);

  return (
    <components.DropdownIndicator {...props}>
      <RiArrowDropDownFill
        className={cn(
          `text-md text-black transition-transform duration-150 ease-in`,
          isOpen && 'rotate-180'
        )}
      />
    </components.DropdownIndicator>
  );
};

const Group = (props: GroupProps<Props> & { data?: { group?: string } }) => {
  const [isOpen, toggle] = useToggle(true);

  return (
    <components.Group {...props}>
      <Button
        variant='clear'
        size='icon'
        endIcon={
          <RiArrowDropDownFill
            className={cn(
              `text-md text-black transition-transform duration-150 ease-in`,
              isOpen && 'rotate-180'
            )}
          />
        }
        fullWidth
        className='mb-2 mt-1 flex cursor-pointer items-center justify-between px-2'
        onPress={toggle}
      >
        {props.data?.group}
      </Button>
      <Collapse isOpen={isOpen}>{props.children}</Collapse>
    </components.Group>
  );
};

const Option = (props: OptionProps<Props>) => {
  let label = <span>{props.data.label}</span>;

  if (props.selectProps.inputValue) {
    const newLabel = replaceString(
      props.data.label,
      props.selectProps.inputValue,
      (value) => `<span class='text-content-accent-vivid'>${value}</span>`
    );

    label = <span dangerouslySetInnerHTML={{ __html: newLabel }} />;
  }

  return (
    <div className='px-2 py-3' ref={props.innerRef}>
      <components.Option {...props}>
        <Checkbox value={props.data.value} isSelected={props.isSelected}>
          {label}
        </Checkbox>
      </components.Option>
    </div>
  );
};

const MultiValueLabel = (props: MultiValueGenericProps<Props>) => {
  return (
    <components.MultiValueLabel {...props}>
      <div
        className={cn(
          'flex items-center gap-1 rounded-md bg-bg-primary px-4 py-1',
          {
            ['before:block before:rounded-full before:border-[3px] before:p-1 before:content-[""]']:
              props.data.type,
            ['before:bg-content-accent']:
              props.data.type === TAreaType.EPsychotherapy,
            ['before:bg-content-accent-vivid']:
              props.data.type === TAreaType.ECoaching,
          }
        )}
      >
        {props.data.label}
      </div>
    </components.MultiValueLabel>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps<Props>) => {
  return (
    <components.MultiValueRemove {...props}>
      <RiCloseLine className='text-md' />
    </components.MultiValueRemove>
  );
};

type MultiSelectProps = SelectProps<Props> & {
  label?: string;
  isRequired?: boolean;
  errorMessage?: string;
};

export const MultiSelect: FCC<MultiSelectProps> = ({
  className,
  label,
  isRequired,
  errorMessage,
  ...rest
}) => {
  const ref = useRef(null);
  const [isOpen, toggle] = useToggle(false);

  useClickAway(ref, () => isOpen && toggle());

  return (
    <div className={cn('flex flex-col gap-2', className)} ref={ref}>
      {label && (
        <span
          className='text-xs aria-required:after:ml-1 aria-required:after:text-content-accent-vivid aria-required:after:content-["*"]'
          aria-required={isRequired}
        >
          {label}
        </span>
      )}
      <SelectContext.Provider value={isOpen}>
        <Select
          unstyled
          hideSelectedOptions={false}
          components={{
            DropdownIndicator,
            Option,
            Group,
            MultiValueRemove,
            MultiValueLabel,
          }}
          classNames={{
            indicatorSeparator: () => 'hidden',
            clearIndicator: () => '!hidden',
            control: (props) =>
              cn(
                'flex !min-h-[4.5rem] rounded-2xl w-full items-center gap-5 rounded-2xl border px-2 md:px-6 py-4 text-content-tertiary caret-content-accent-vivid outline-none transition-all',
                {
                  ['border-border-active ring-4 ring-content-tertiary/50']:
                    props.isFocused || isOpen,
                  ['border-border-primary']: !(props.isFocused || isOpen),
                  ['bg-border-tertiary']: props.isDisabled,
                  ['border-content-accent-vivid']: errorMessage,
                }
              ),
            menu: () =>
              'rounded-xl bg-content-inverse px-3 py-6 shadow-popover ',
            multiValue: () =>
              'text-xs flex item-center gap-1 bg-bg-primary rounded text-content-primary py-1 px-2',
            valueContainer: () => 'flex gap-2',
            input: () => 'text-content-primary',
          }}
          isMulti
          menuIsOpen={isOpen}
          onMenuOpen={toggle}
          noOptionsMessage={() => 'Пока нет доступных вариантов'}
          {...rest}
        />
      </SelectContext.Provider>
      {errorMessage && (
        <div className='ml-2 text-xs text-content-accent-vivid'>
          {errorMessage}
        </div>
      )}
    </div>
  );
};
