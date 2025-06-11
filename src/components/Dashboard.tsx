import React from 'react';
import { CloudSun, Bell, Plane, AlertTriangle, Wind, Navigation, Clock } from 'lucide-react';

const Dashboard = () => {
  const quickStats = [
    { label: 'Active NOTAMs', value: '23', icon: Bell, color: 'text-orange-600 bg-orange-100' },
    { label: 'Weather Updates', value: '156', icon: CloudSun, color: 'text-blue-600 bg-blue-100' },
    { label: 'Aircraft Types', value: '45', icon: Plane, color: 'text-green-600 bg-green-100' },
    { label: 'Procedures', value: '892', icon: Navigation, color: 'text-purple-600 bg-purple-100' },
  ];

  const recentWeather = [
    { station: 'KJFK', metar: 'KJFK 121851Z 28008KT 10SM FEW250 05/M08 A3021', condition: 'Good', time: '18:51Z' },
    { station: 'KORD', metar: 'KORD 121851Z 30012G18KT 10SM SCT035 02/M06 A3018', condition: 'Moderate', time: '18:51Z' },
    { station: 'KLAX', metar: 'KLAX 121853Z 24008KT 10SM FEW015 18/12 A2992', condition: 'Good', time: '18:53Z' },
  ];

  const criticalNotams = [
    { id: 'A0234/25', airport: 'KJFK', message: 'RWY 04L/22R CLSD FOR MAINTENANCE', priority: 'HIGH', validUntil: '2025-01-15 23:59Z' },
    { id: 'A0235/25', airport: 'KORD', message: 'ILS RWY 10R U/S', priority: 'MEDIUM', validUntil: '2025-01-12 18:00Z' },
    { id: 'A0236/25', airport: 'KLAX', message: 'TAXIWAY A RECONSTRUCTION NORTH OF TWY B', priority: 'LOW', validUntil: '2025-02-01 06:00Z' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Quick Stats */}
      <div className="lg:col-span-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Flight Operations Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className={`rounded-md p-3 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Weather */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CloudSun className="h-5 w-5 mr-2 text-blue-600" />
              Recent Weather Reports
            </h3>
            <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()} UTC</span>
          </div>
          <div className="space-y-4">
            {recentWeather.map((weather, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-900">{weather.station}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      weather.condition === 'Good' ? 'bg-green-100 text-green-800' :
                      weather.condition === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {weather.condition}
                    </span>
                    <span className="text-xs text-gray-500">{weather.time}</span>
                  </div>
                </div>
                <p className="font-mono text-sm text-gray-700 bg-gray-50 p-2 rounded">{weather.metar}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical NOTAMs */}
      <div className="lg:col-span-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
            Critical NOTAMs
          </h3>
          <div className="space-y-4">
            {criticalNotams.map((notam, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm">{notam.airport}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    notam.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                    notam.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {notam.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{notam.message}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  Valid until: {notam.validUntil}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="lg:col-span-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Flight Planning Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-all">
              <Wind className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">Wind Calculator</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-all">
              <Plane className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">Weight & Balance</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-all">
              <Navigation className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">Great Circle</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-all">
              <CloudSun className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">Altimetry</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-all">
              <Clock className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">Time Zones</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-all">
              <AlertTriangle className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">Fuel Planning</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;