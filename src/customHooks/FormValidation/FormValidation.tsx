import React, { useCallback } from "react";

type TValues = {
  [key: string]: string;
};

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState<TValues>({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const [isDirty, setIsDirty] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);

  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name: string = target.name;
    const value: string = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.checkValidity());

    value ? setIsDirty(false) : setIsDirty(true);
    name === "mail" && re.test(String(value).toLowerCase())
      ? setIsEmail(true)
      : setIsEmail(false);
  };

  const resetForm = useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsValid = false,
      newIsDirty = false,
      newEmail = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsDirty(newIsDirty);
      setIsEmail(newEmail);
    },
    [setValues, setErrors, setIsValid, setIsDirty, setIsEmail]
  );

  return { values, handleChange, errors, isValid, resetForm, isDirty, isEmail };
}
