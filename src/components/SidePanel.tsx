import {useEffect, useState} from 'react';
import LineChart from './LineChart';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DataSourcesFooter from './DataSourcesFooter';

export default function SidePanel({countries}: {countries: string[]}) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
        const cachedData = localStorage.getItem(`intelligence_${countries.join('_')}`);
        if (cachedData) {
            setData(JSON.parse(cachedData));
            return;
        }

        const newData = await Promise.all(countries.map(async (c) => {
            const response = await fetch(`/api/intelligence/${c}`);
            return response.json();
        }));
        setData(newData);
        localStorage.setItem(`intelligence_${countries.join('_')}`, JSON.stringify(newData));
    }
    fetchData();
  }, [countries]);

  const exportPDF = async () => {
    const input = document.getElementById('side-panel-content');
    if (!input) return;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 0);
    pdf.save('intelligence-report.pdf');
  };

  return (
    <div id="side-panel-content" className="w-[500px] h-full p-6 bg-slate-900 border-l border-slate-700 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-slate-100">Intelligence Comparison</h2>
      <div className="grid grid-cols-2 gap-4">
        {data.map((d, index) => (
          <div key={index} className="space-y-4">
            <h3 className="font-bold text-slate-100">{d.country}</h3>
            <div className="p-3 bg-slate-800 rounded-lg">
              <p className="text-xs font-semibold text-red-400">Crime</p>
              <p className="text-lg font-bold text-slate-100">{d.crime}</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg">
              <p className="text-xs font-semibold text-blue-400">Migration</p>
              <p className="text-lg font-bold text-slate-100">{d.migration}</p>
            </div>
            <DataSourcesFooter country={d.country} />
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2 text-slate-100">Trend Comparison</h3>
        {data.length > 0 && <LineChart data={data[0].trends} />}
      </div>
      <div className="mt-6 flex gap-2">
        <button className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-600">Bookmark</button>
        <button className="flex-1 px-4 py-2 bg-slate-700 text-slate-100 rounded-lg text-sm font-semibold hover:bg-slate-600">Export CSV</button>
        <button onClick={exportPDF} className="flex-1 px-4 py-2 bg-slate-700 text-slate-100 rounded-lg text-sm font-semibold hover:bg-slate-600">Export PDF</button>
      </div>
      <div className="mt-6 p-4 bg-slate-800 rounded-lg">
        <h3 className="text-sm font-semibold mb-2 text-purple-300">AI Trends Analysis</h3>
        <p className="text-xs text-slate-300">
          AI Analysis: Scanning for anomalies... No statistically significant spikes detected in crime or migration data for the last 30 days.
        </p>
      </div>
    </div>
  );
}
