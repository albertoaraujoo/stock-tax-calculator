interface FormErrorMessageProps {
  message: string | undefined;
}

const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  return <div className="text-sm mt-1 text-danger">{message}</div>;
};

export default FormErrorMessage;
