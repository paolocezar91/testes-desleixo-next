export function Button({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
