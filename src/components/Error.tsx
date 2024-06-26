export default function Error() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-red-500 text-white font-bold rounded-lg shadow-lg p-10">
        <h1 className="text-2xl">Error</h1>
        <p>Something went wrong, try refreshing your browser</p>
      </div>
    </div>
  );
}
