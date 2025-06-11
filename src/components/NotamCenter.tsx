import React, { useState } from 'react';
import { Bell, Search, Filter, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

const NotamCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const notams = [
    {
      id: 'A0234/25',
      airport: 'KJFK',
      title: 'RUNWAY 04L/22R CLOSED FOR MAINTENANCE',
      description: 'RWY 04L/22R CLSD DUE TO MAINTENANCE WORK. BIRDS AND WILDLIFE HAZARD REPORTED IN VICINITY OF AIRPORT.',
      priority: 'HIGH',
      category: 'runway',
      effective: '2025-01-12 06:00Z',
      expires: '2025-01-15 23:59Z',
      coordinates: 'N40.38.23 W073.46.44',
      radius: '3NM'
    },
    {
      id: 'A0235/25',
      airport: 'KORD',
      title: 'ILS RUNWAY 10R OUT OF SERVICE',
      description: 'ILS RWY 10R U/S FOR SCHEDULED MAINTENANCE. ALTERNATE APPROACH PROCEDURES AVAILABLE.',
      priority: 'MEDIUM',
      category: 'navigation',
      effective: '2025-01-12 12:00Z',
      expires: '2025-01-12 18:00Z',
      coordinates: 'N41.58.43 W087.54.17',
      radius: '5NM'
    },
    {
      id: 'A0236/25',
      airport: 'KLAX',
      title: 'TAXIWAY A RECONSTRUCTION',
      description: 'TWY A RECONSTRUCTION NORTH OF TWY B. EXPECT DELAYS DURING PEAK HOURS.',
      priority: 'LOW',
      category: 'taxiway',
      effective: '2025-01-10 00:00Z',
      expires: '2025-02-01 06:00Z',
      coordinates: 'N33.56.33 W118.24.29',
      radius: '2NM'
    },
    {
      id: 'A0237/25',
      airport: 'KDEN',
      title: 'TEMPORARY FLIGHT RESTRICTION',
      description: 'TFR IN EFFECT FOR SPECIAL EVENT. NO AIRCRAFT OPERATIONS BELOW 3000 FT AGL.',
      priority: 'HIGH',
      category: 'airspace',
      effective: '2025-01-13 14:00Z',
      expires: '2025-01-13 22:00Z',
      coordinates: 'N39.51.42 W104.40.23',
      radius: '10NM'
    },
    {
      id: 'A0238/25',
      airport: 'KSEA',
      title: 'CONSTRUCTION EQUIPMENT ON TAXIWAY',
      description: 'CONSTRUCTION EQUIPMENT OPERATING ON TWY S BETWEEN TWY A AND TWY B.',
      priority: 'MEDIUM',
      category: 'equipment',
      effective: '2025-01-12 07:00Z',
      expires: '2025-01-12 17:00Z',
      coordinates: 'N47.26.56 W122.18.32',
      radius: '1NM'
    }
  ];

  const filteredNotams = notams.filter(notam => {
    const matchesSearch = notam.airport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notam.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         notam.priority.toLowerCase() === selectedFilter ||
                         notam.category === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'MEDIUM':
        return <Info className="h-4 w-4 text-yellow-600" />;
      case 'LOW':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Bell className="h-7 w-7 mr-3 text-orange-600" />
          NOTAM Center
        </h2>
        <div className="text-sm text-gray-600">
          Showing {filteredNotams.length} of {notams.length} NOTAMs
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by airport, title, or description..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All NOTAMs</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
              <option value="runway">Runway</option>
              <option value="navigation">Navigation</option>
              <option value="taxiway">Taxiway</option>
              <option value="airspace">Airspace</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>
        </div>
      </div>

      {/* NOTAMs List */}
      <div className="space-y-4">
        {filteredNotams.map((notam) => (
          <div key={notam.id} className={`bg-white rounded-lg shadow-md border-l-4 ${
            notam.priority === 'HIGH' ? 'border-red-500' :
            notam.priority === 'MEDIUM' ? 'border-yellow-500' :
            'border-green-500'
          } p-6`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getPriorityIcon(notam.priority)}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg text-gray-900">{notam.airport}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notam.priority)}`}>
                      {notam.priority}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                      {notam.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">{notam.title}</h3>
                </div>
              </div>
              <span className="text-sm font-mono text-gray-500">{notam.id}</span>
            </div>

            <p className="text-gray-700 mb-4 font-mono text-sm bg-gray-50 p-3 rounded">
              {notam.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <div>
                  <p className="font-medium">Effective</p>
                  <p>{notam.effective}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <div>
                  <p className="font-medium">Expires</p>
                  <p>{notam.expires}</p>
                </div>
              </div>
              <div className="text-gray-600">
                <p className="font-medium">Coordinates</p>
                <p className="font-mono">{notam.coordinates}</p>
              </div>
              <div className="text-gray-600">
                <p className="font-medium">Radius</p>
                <p>{notam.radius}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleString()} UTC
              </div>
              <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">
                View Full Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredNotams.length === 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No NOTAMs Found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
};

export default NotamCenter;