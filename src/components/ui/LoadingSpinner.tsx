export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-gray-600 border-t-cyan-500 animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-r-purple-500 animate-spin" style={{ animationDelay: '150ms' }}></div>
        <div className="absolute inset-2 w-12 h-12 rounded-full border-2 border-transparent border-b-pink-500 animate-spin" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  )
}
