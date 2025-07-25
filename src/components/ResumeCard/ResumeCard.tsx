interface ResumeCardProps {
  titleColor: string;
  textColor: string;
  borderColor: string;
  text: string;
  title: string;
}

export function ResumeCard({
  titleColor,
  textColor,
  borderColor,
  title,
  text,
}: ResumeCardProps) {
  const borderClass =
    borderColor === "purple"
      ? "border-purple"
      : borderColor === "success"
        ? "border-success"
        : "border-gray";

  const titleClass =
    titleColor === "purple"
      ? "text-purple-light"
      : titleColor === "success"
        ? "text-success-light"
        : "text-gray-light";

  const textClass =
    textColor === "danger"
      ? "text-danger"
      : textColor === "success"
        ? "text-success"
        : "text-white";

  return (
    <div className={`bg-gray-dark p-6 rounded-lg border-2 ${borderClass}`}>
      <h3 className={`mb-2 text-sm font-medium ${titleClass}`}>{title}</h3>
      <p className={`text-2xl font-bold ${textClass}`}>{text}</p>
    </div>
  );
}
