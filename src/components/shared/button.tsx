export function Button({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`magedon text-5xl px-4 py-2 bg-red-700 shadow-md text-white hover:bg-red-800 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
