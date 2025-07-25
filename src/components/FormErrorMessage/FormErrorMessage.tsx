interface FormErrorMessageProps {
  message: string | undefined;
}

export default function FormErrorMessage({ message }: FormErrorMessageProps) {
  return <div className="text-sm mt-1 text-danger">{message}</div>;
}
