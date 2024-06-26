export default function Error() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
        <h1 className="text-2xl">Error</h1>
        <p>Something went wrong</p>
      </div>
    </div>
  );
}
