export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="relative">
        {/* Outer Ring */}
        <div className="h-16 w-16 rounded-full border-4 border-primary/20"></div>

        {/* Animated Ring */}
        <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-primary border-r-primary"></div>

        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
        </div>
      </div>

      <p className="mt-6 text-sm font-medium text-default-600 animate-pulse">
        Loading...
      </p>
    </div>
  );
}