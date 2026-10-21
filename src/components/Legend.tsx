export default function Legend({
  onToggleLayer,
  activeLayers,
}: {
  onToggleLayer: (layer: 'crime' | 'migration') => void;
  activeLayers: {crime: boolean; migration: boolean};
}) {
  return (
    <div className="absolute top-20 left-6 bg-white p-4 rounded-lg shadow-md border border-slate-200">
      <h3 className="font-semibold text-sm mb-2 text-slate-800">Map Layers</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={activeLayers.crime}
            onChange={() => onToggleLayer('crime')}
            className="accent-red-600"
          />
          <span className="text-xs text-slate-300">Crime Density</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={activeLayers.migration}
            onChange={() => onToggleLayer('migration')}
            className="accent-blue-600"
          />
          <span className="text-xs text-slate-300">Migration Volume</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="accent-amber-600"
          />
          <span className="text-xs text-slate-300">Illegal Immigrant Crime</span>
        </label>
      </div>
    </div>
  );
}
