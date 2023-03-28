import { isEmail } from '@/helper/common.helper';
import { useState } from 'react';
import Select from 'react-select';
import { customSelectStyles } from '../../common/FormComponents/Logic/formComponents.helper';
import ConfirmPopUp from '../ConfirmPopUp';

export default function MultiEmailInput({
  type = 'Internal',
  items = [],
  setItems,
  beforeRemoveEmail = async () => true,
  isDisabled = false
}) {
  const [removeEmail, setRemoveEmail] = useState({
    emailListAfterRemoval: [],
    isConfirmDisplayed: false,
    removeEmail: null
  });
  const [error, setError] = useState(null);
  const [value, setValue] = useState('');

  function handleKeyDown(evt) {
    if (isDisabled) return;
    if (['Enter', 'Tab', ','].includes(evt.key)) {
      evt.preventDefault();

      if (value && isValid(value)) {
        setItems([
          ...items,
          <p>
            {value} <span>{type}</span>
          </p>
        ]);
        setValue('');
        evt.target.blur();
        evt.target.focus();
      }
      return;
    }
  }

  function handleChange(val, actionType) {
    if (isDisabled) return;
    if (actionType?.action !== 'input-change') return;
    // if (!isEmail(value)) return;
    setError(null);
    setValue(val?.trim());
  }

  function isValid(email) {
    let error = null;

    if (isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      setError(error);

      return false;
    }

    return true;
  }

  function isInList(email) {
    return items.includes(email);
  }

  const defaultStyles = customSelectStyles(false, '100%', false, false, {
    controlStyles: {
      '&:hover': isDisabled
        ? {
            cursor: 'no-drop'
          }
        : {}
    }
  });
  const customStyles = {
    ...defaultStyles,
    container: () => ({
      ...defaultStyles.container,
      margin: '10px auto'
    }),

    multiValue: (styles, { data }) => ({
      ...defaultStyles.multiValue,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor: 'var(--secondary_white)',
      borderRadius: '20px',

      padding: '2px 10px',
      margin: '5px'
    }),
    multiValueLabel: (styles, { data }) => ({
      ...defaultStyles.multiValueLabel,
      color: data.color,

      span: {
        backgroundColor: 'var(--black)',
        borderRadius: '20px',
        padding: '0px 10px',
        margin: 'auto 3px'
      }
    }),
    multiValueRemove: (styles, { data }) => ({
      ...defaultStyles.multiValueRemove,
      color: data.color,

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      height: '15px',
      width: '15px',

      marginLeft: '5px',
      borderRadius: '50%',
      backgroundColor: 'var(--dark_three)'
    })
  };

  const val = items?.map((e) => {
    if (typeof e !== 'string') return { label: e, value: e };

    return {
      label: (
        <p>
          {e} <span>{type}</span>
        </p>
      ),
      value: e
    };
  });
  return (
    <>
      <div style={{ position: 'relative' }}>
        <Select
          options={val}
          value={val}
          inputValue={value}
          name="email"
          placeholder="Enter email and enter"
          className="w-100"
          styles={customStyles}
          isMulti={true}
          isClearable={false}
          isDisabled={isDisabled}
          onInputChange={handleChange}
          onKeyDown={handleKeyDown}
          onChange={(removedEmailList, actionType) => {
            if (isDisabled) return;
            if (actionType?.action === 'remove-value') {
              setRemoveEmail({
                emailListAfterRemoval: removedEmailList.map((email) => email.value),
                isConfirmDisplayed: true,
                removeEmail:
                  actionType?.removedValue?.value?.props?.children?.[0] ||
                  actionType?.removedValue?.value ||
                  null
              });
            }
          }}
          components={{ DropdownIndicator: () => null }}
          noOptionsMessage={() => null}
        />

        {!!removeEmail?.isConfirmDisplayed && (
          <ConfirmPopUp
            title={`Are you sure, you want to remove ${removeEmail?.removeEmail || 'email'}?`}
            btnObj={{
              handleClickLeft: async () => {
                const shouldRemove = await beforeRemoveEmail(removeEmail?.removeEmail);

                if (shouldRemove) setItems(removeEmail?.emailListAfterRemoval);

                setRemoveEmail({
                  emailListAfterRemoval: [],
                  isConfirmDisplayed: false,
                  removeEmail: null
                });
              },
              handleClickRight: () =>
                setRemoveEmail({
                  emailListAfterRemoval: [],
                  isConfirmDisplayed: false,
                  removeEmail: null
                })
            }}
          />
        )}
      </div>
    </>
  );
}
