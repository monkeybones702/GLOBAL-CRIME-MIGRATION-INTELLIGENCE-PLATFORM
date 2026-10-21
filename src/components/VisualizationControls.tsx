export default function VisualizationControls({
  onToggleType,
  activeType,
}: {
  onToggleType: (type: 'choropleth' | 'bubble' | 'heatmap') => void;
  activeType: 'choropleth' | 'bubble' | 'heatmap';
}) {
  const types = ['choropleth', 'bubble', 'heatmap'] as const;
  return (
    <div className="absolute top-20 right-6 bg-white p-4 rounded-lg shadow-md border border-slate-200">
      <h3 className="font-semibold text-sm mb-2 text-slate-800">Map View</h3>
      <div className="flex flex-col gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onToggleType(type)}
            className={`px-3 py-1 rounded text-xs capitalize ${
              activeType === type ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
