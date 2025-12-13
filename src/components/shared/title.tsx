export default function Title({ text }: { text: string }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl my-4 font-bold">{text}</h2>
    </div>
  );
}
