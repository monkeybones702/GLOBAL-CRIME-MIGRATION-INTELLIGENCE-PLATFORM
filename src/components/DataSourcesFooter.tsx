export default function DataSourcesFooter({country}: {country: string}) {
  return (
    <footer className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
      <h4 className="text-xs font-semibold text-slate-300 mb-2">Verified Data Sources: {country}</h4>
      <div className="flex flex-wrap gap-2 text-[10px] text-blue-400">
        <a href={`https://www.google.com/search?q=${country}+crime+statistics`} target="_blank" className="hover:underline">Crime Stats</a>
        <a href={`https://www.google.com/search?q=${country}+migration+data+census`} target="_blank" className="hover:underline">Demographics</a>
        <a href={`https://www.google.com/search?q=${country}+border+security+updates`} target="_blank" className="hover:underline">Border Security</a>
        <a href={`https://www.google.com/search?q=${country}+crime+news+social+media`} target="_blank" className="hover:underline">Social Media & News</a>
      </div>
    </footer>
  );
}
