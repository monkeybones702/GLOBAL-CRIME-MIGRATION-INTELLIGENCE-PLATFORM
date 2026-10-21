export default function TimeSlider({onChange}: {onChange: (year: number) => void}) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-3/4 bg-white p-4 rounded-lg shadow-lg border border-slate-200">
      <h3 className="text-sm font-semibold mb-2 text-slate-800">Filter by Year</h3>
      <input
        type="range"
        min="2000"
        max="2025"
        defaultValue="2025"
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );
}
