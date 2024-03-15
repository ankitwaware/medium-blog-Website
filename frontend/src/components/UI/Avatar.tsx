export default function Avatar({
  username,
  className,
}: {
  username: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full size-7 p-3 flex justify-center items-center capitalize text-black bg-slate-200 font-bold ${className}`}
    >
      <span>{username.slice(0, 1)}</span>
    </div>
  );
}
