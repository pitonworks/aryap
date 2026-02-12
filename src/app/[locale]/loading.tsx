export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-neutral-200 border-t-brand rounded-full animate-spin" />
        <p className="text-neutral-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}
