import { useState, useCallback } from 'react';
import { CONST_FOR_MOVIES } from '../';
import validator from 'validator';

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });

    if (name === "email" && value.length !== 0) {
      const isValidEmail = validator.isEmail(value) && CONST_FOR_MOVIES.REGEX_EMAIL.test(value);
      setErrors({ ...errors, [name]: isValidEmail ? '' : 'Некорректно введен email' });
      setIsValid(target.closest('form').checkValidity() && isValidEmail);
    } else if (name === "name" && value.length !== 0) {
      const isValidName = CONST_FOR_MOVIES.REGEX_NAME.test(value);
      setErrors({ ...errors, [name]: isValidName ? '' : 'Некорректно указано имя, только буквы, пробел и дефис' });
      setIsValid(target.closest('form').checkValidity() && isValidName);
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
      setIsValid(target.closest('form').checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues };
}
