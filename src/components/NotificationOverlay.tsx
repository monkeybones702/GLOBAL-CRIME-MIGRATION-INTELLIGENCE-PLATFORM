import {useState, useEffect} from 'react';

export default function NotificationOverlay() {
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // Simulate incoming high-priority alert
    const timer = setTimeout(() => {
      setNotification('High-priority alert: Significant migration trend shift detected in Region Z.');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!notification) return null;

  return (
    <div className="fixed top-20 right-10 w-80 bg-red-600 text-white p-4 rounded-lg shadow-xl z-50 animate-bounce">
      <h4 className="font-bold">New Alert</h4>
      <p className="text-sm">{notification}</p>
      <button onClick={() => setNotification(null)} className="text-xs underline mt-2">Dismiss</button>
    </div>
  );
}
