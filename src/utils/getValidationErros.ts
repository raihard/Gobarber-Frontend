import { ValidationError } from 'yup';
interface Erros {
  [key: string]: string;
}
export default function getValidationErros(err: ValidationError) {
  const ValidationErrors: Erros = {};

  err.inner.forEach(error => {
    ValidationErrors[error.path] = error.message;
  });

  return ValidationErrors;
}
