import React, { useState } from 'react';
import { Plane, CloudSun, Bell, Map, Calculator, AlertTriangle, Settings, Navigation } from 'lucide-react';
import Dashboard from './components/Dashboard';
import WeatherCenter from './components/WeatherCenter';
import NotamCenter from './components/NotamCenter';
import AircraftData from './components/AircraftData';
import ProceduresCenter from './components/ProceduresCenter';
import FlightCalculators from './components/FlightCalculators';
import EmergencyRef from './components/EmergencyRef';
import UTCClock from './components/UTCClock';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Plane },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'notam', label: 'NOTAMs', icon: Bell },
    { id: 'aircraft', label: 'Aircraft Data', icon: Navigation },
    { id: 'procedures', label: 'Procedures', icon: Map },
    { id: 'calculators', label: 'Calculators', icon: Calculator },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'weather':
        return <WeatherCenter />;
      case 'notam':
        return <NotamCenter />;
      case 'aircraft':
        return <AircraftData />;
      case 'procedures':
        return <ProceduresCenter />;
      case 'calculators':
        return <FlightCalculators />;
      case 'emergency':
        return <EmergencyRef />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Plane className="h-8 w-8 text-orange-400" />
              <div>
                <h1 className="text-xl font-bold">ATPL Assistant</h1>
                <p className="text-blue-200 text-xs">Professional Pilot Operations Center</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <UTCClock />
              <Settings className="h-6 w-6 text-blue-200 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center text-sm">
            <div>© 2025 ATPL Assistant - Aviation Safety First</div>
            <div className="text-gray-400">Always verify critical information with official sources</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;