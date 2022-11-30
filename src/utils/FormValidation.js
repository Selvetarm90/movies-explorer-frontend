import validator from 'validator';
import { useCallback, useState } from 'react';

export function FormValidation( resetMessage  ) {
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  const validEmail = (target, name, value) => {
    setIsValid(
      !validator.isEmail(value)
        ? validator.isEmail(value)
        : target.closest('form').checkValidity(),
    );
    setValues({ ...values, [name]: value });
    setErrors({
      ...errors,
      [name]: validator.isEmail(value) ? '' : 'Некоректный e-mail',
    });
  };

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    if (evt.target.closest('input').className === 'form__input ') {
      resetMessage();
    }
    if (evt.target.closest('input').className === 'form-register__input ') {
      resetMessage();
    }
    if (evt.target.closest('input').className === 'form-register__input') {
      resetMessage();
    }
    if (name === 'email') {
      validEmail(evt.target, name, value);
      return;
    }
    setIsValid(evt.target.closest('form').checkValidity());
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
  };

  const resetInputs = useCallback(
    (isValid = false, values = {}, errors = {}) => {
      setIsValid(isValid);
      setValues(values);
      setErrors(errors);
    },
    [setIsValid, setValues, setErrors],
  );

  return {
    isValid,
    values,
    errors,
    handleChange,
    resetInputs,
    setIsValid,
    setValues,
    setErrors,
  };
}
