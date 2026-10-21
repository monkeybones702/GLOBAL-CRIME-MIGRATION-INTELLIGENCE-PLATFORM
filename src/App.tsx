import {useState, useEffect, useRef, useCallback} from 'react';
import Map from './components/Map';
import SidePanel from './components/SidePanel';
import Legend from './components/Legend';
import SearchBar from './components/SearchBar';
import TimeSlider from './components/TimeSlider';
import NotificationOverlay from './components/NotificationOverlay';
import VisualizationControls from './components/VisualizationControls';

export default function App() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [activeLayers, setActiveLayers] = useState({crime: true, migration: true});
  const [mapType, setMapType] = useState<'choropleth' | 'bubble' | 'heatmap'>('choropleth');
  const searchRef = useRef<HTMLInputElement>(null);

  const toggleLayer = useCallback((layer: 'crime' | 'migration') => {
    setActiveLayers(prev => ({...prev, [layer]: !prev[layer]}));
  }, []);

  const handleCountrySelect = (country: string) => {
    setSelectedCountries(prev => {
      if (prev.includes(country)) return prev.filter(c => c !== country);
      if (prev.length >= 2) return [prev[1], country];
      return [...prev, country];
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === 't' || e.key === 'T') {
        toggleLayer('crime');
      } else if (e.key === 'Escape') {
        setSelectedCountries([]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleLayer]);

  return (
    <div className="flex h-screen w-screen bg-slate-950">
      <NotificationOverlay />
      {selectedCountries.length > 0 && (
        <div className="h-full shadow-2xl z-40">
          <SidePanel countries={selectedCountries} />
        </div>
      )}
      <main className="flex-1 p-8 h-full flex flex-col">
        <h1 className="text-4xl font-bold mb-6 text-slate-100">Global Intelligence Dashboard</h1>
        <SearchBar onSearch={(q) => console.log('Searching for:', q)} searchRef={searchRef} />
        <div className="relative flex-1 bg-slate-900 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
          <Map onCountrySelect={handleCountrySelect} />
          <Legend activeLayers={activeLayers} onToggleLayer={toggleLayer} />
          <VisualizationControls activeType={mapType} onToggleType={setMapType} />
        </div>
        <TimeSlider onChange={(year) => console.log('Year changed:', year)} />
      </main>
    </div>
  );
}
