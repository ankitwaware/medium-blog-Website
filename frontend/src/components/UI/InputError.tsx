export default function InputError({ message }: { message: string }) {
  return <span className="text-xs font-medium text-red-600">{message}</span>;
}
