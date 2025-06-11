import React, { useState } from 'react';
import { Map, Search, Navigation, Plane, ArrowDown, ArrowUp } from 'lucide-react';

const ProceduresCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState('sid');
  const [searchTerm, setSearchTerm] = useState('');

  const procedures = {
    sid: [
      {
        name: 'CANDR4',
        airport: 'KJFK',
        runway: '04L/04R',
        description: 'CANARSIE FOUR DEPARTURE',
        minima: {
          'Minimum Climb Gradient': '200 ft/nm to 1500 ft',
          'Minimum Weather': 'Standard Takeoff Minimums',
          'Radar Required': 'No'
        },
        route: 'CANDR ROBUC BREZY MERIT SCUPP',
        altitudes: 'Climb via SID except maintain 5000',
        notes: 'RNAV equipped aircraft only. GPS required.'
      },
      {
        name: 'DEEZZ5',
        airport: 'KLAX',
        runway: '06L/06R/07L/07R',
        description: 'DEEZZ FIVE DEPARTURE',
        minima: {
          'Minimum Climb Gradient': '240 ft/nm to 6000 ft',
          'Minimum Weather': 'Standard Takeoff Minimums',
          'Radar Required': 'Yes'
        },
        route: 'DEEZZ BAYST KBRAT',
        altitudes: 'Climb via SID except maintain 6000',
        notes: 'DME required. Minimum climb of 400 ft/nm to 2500 ft.'
      }
    ],
    star: [
      {
        name: 'LENDY6',
        airport: 'KJFK',
        runway: '04L/04R/22L/22R',
        description: 'LENDY SIX ARRIVAL',
        minima: {
          'Minimum Weather': 'Standard',
          'DME Required': 'Yes',
          'RNAV Required': 'Yes'
        },
        route: 'LENDY ROBER DOVEY ELIOT CCC',
        altitudes: 'Descend via STAR',
        notes: 'Expect vectors to final approach course.'
      },
      {
        name: 'BAYST4',
        airport: 'KLAX',
        runway: '06L/06R/07L/07R',
        description: 'BAYST FOUR ARRIVAL',
        minima: {
          'Minimum Weather': 'Standard',
          'DME Required': 'Yes',
          'RNAV Required': 'No'
        },
        route: 'BAYST DARTS LMITS BBUZZ',
        altitudes: 'Descend via STAR except maintain 7000',
        notes: 'Turboprop aircraft maintain 6000.'
      }
    ],
    approach: [
      {
        name: 'ILS RWY 04L',
        airport: 'KJFK',
        runway: '04L',
        description: 'ILS OR LOC RWY 04L',
        minima: {
          'ILS DA': '200 ft (192 ft HAT)',
          'LOC MDA': '540 ft (532 ft HAT)',
          'ILS Visibility': 'RVR 1800 or 1/2 SM',
          'LOC Visibility': 'RVR 4000 or 3/4 SM',
          'Missed Approach': 'Climb to 2000 direct JFK VOR'
        },
        frequencies: {
          'Localizer': '110.9 MHz',
          'Glideslope': '110.9 MHz',
          'DME': '110.9 MHz'
        },
        notes: 'Category D aircraft increase visibility to RVR 5000. Autopilot coupled approach authorized.'
      },
      {
        name: 'RNAV RWY 06L',
        airport: 'KLAX',
        runway: '06L',
        description: 'RNAV (GPS) RWY 06L',
        minima: {
          'LNAV DA': '270 ft (245 ft HAT)',
          'LNAV/VNAV DA': '200 ft (175 ft HAT)',
          'LPV DA': '200 ft (175 ft HAT)',
          'LNAV Visibility': '3/4 SM',
          'LNAV/VNAV Visibility': '1/2 SM',
          'LPV Visibility': 'RVR 4000',
          'Missed Approach': 'Climb to 2000 direct DARTS'
        },
        notes: 'GPS required. WAAS required for LPV and LNAV/VNAV.'
      }
    ]
  };

  const currentProcedures = procedures[selectedCategory as keyof typeof procedures] || [];
  
  const filteredProcedures = currentProcedures.filter(proc => 
    proc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proc.airport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { id: 'sid', name: 'SID', icon: ArrowUp, description: 'Standard Instrument Departures' },
    { id: 'star', name: 'STAR', icon: ArrowDown, description: 'Standard Terminal Arrivals' },
    { id: 'approach', name: 'Approaches', icon: Plane, description: 'Instrument Approach Procedures' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Map className="h-7 w-7 mr-3 text-indigo-600" />
          Procedures Center
        </h2>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
          <div className="flex space-x-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search procedures..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {categories.find(c => c.id === selectedCategory)?.description}
        </div>
      </div>

      {/* Procedures List */}
      <div className="space-y-4">
        {filteredProcedures.map((procedure, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{procedure.name}</h3>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    {procedure.airport}
                  </span>
                  {'runway' in procedure && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      RWY {procedure.runway}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 font-medium">{procedure.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Route/Minima */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  {selectedCategory === 'approach' ? 'Approach Minima' : 'Route Information'}
                </h4>
                {selectedCategory !== 'approach' && 'route' in procedure && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-600">Route: </span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{procedure.route}</span>
                  </div>
                )}
                {selectedCategory !== 'approach' && 'altitudes' in procedure && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-600">Altitudes: </span>
                    <span className="text-sm">{procedure.altitudes}</span>
                  </div>
                )}
                <div className="space-y-2">
                  {Object.entries(procedure.minima).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequencies/Notes */}
              <div>
                {'frequencies' in procedure && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Navigation Aids</h4>
                    <div className="space-y-2">
                      {Object.entries(procedure.frequencies).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600">{key}:</span>
                          <span className="font-mono font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Notes & Restrictions</h4>
                  <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <strong>⚠️ CRITICAL:</strong> {procedure.notes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProcedures.length === 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
          <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Procedures Found</h3>
          <p className="text-gray-600">Try adjusting your search terms or category selection.</p>
        </div>
      )}
    </div>
  );
};

export default ProceduresCenter;