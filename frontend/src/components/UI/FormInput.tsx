interface FormInput {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}: FormInput) {
  return (
    <div className="flex flex-col text-start gap-y-3 mb-6">
      <label htmlFor={id} className="font-semibold leading-none">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={onChange}
        className="outline-none border border-slate-400 p-2.5 rounded-md placeholder:text-slate-500 placeholder:font-medium"
      />
    </div>
  );
}
