export default function InputParseError({
  formattedFieldErrors,
}: {
  formattedFieldErrors: { [key: string]: string }
}) {
  return (
    <ul className="list-disc pl-4">
      {Object.keys(formattedFieldErrors).map((field) => {
        const errorMessage = formattedFieldErrors[field]
        return <li key={field}>{errorMessage}</li>
      })}
    </ul>
  )
}
