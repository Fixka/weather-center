import React, { useState } from 'react';
import { Navigation, Search, Plane, Gauge, Weight, Fuel } from 'lucide-react';

const AircraftData = () => {
  const [selectedAircraft, setSelectedAircraft] = useState('b737-800');
  const [searchTerm, setSearchTerm] = useState('');

  const aircraftDatabase = {
    'b737-800': {
      name: 'Boeing 737-800',
      category: 'Narrow Body',
      manufacturer: 'Boeing',
      image: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=400',
      specifications: {
        'Max Takeoff Weight': '79,010 kg (174,200 lb)',
        'Max Landing Weight': '66,360 kg (146,300 lb)',
        'Max Zero Fuel Weight': '62,730 kg (138,300 lb)',
        'Operating Empty Weight': '41,413 kg (91,300 lb)',
        'Max Payload': '21,317 kg (47,000 lb)',
        'Fuel Capacity': '26,020 L (6,875 US gal)',
        'Range': '5,665 km (3,060 nmi)',
        'Service Ceiling': '41,000 ft',
        'Max Speed': 'Mach 0.82',
        'Cruise Speed': 'Mach 0.785',
        'Length': '39.5 m (129.5 ft)',
        'Wingspan': '35.8 m (117.5 ft)',
        'Height': '12.5 m (41.0 ft)'
      },
      limitations: {
        'Maximum Operating Altitude': '41,000 ft',
        'Maximum Operating Speed': '340 KIAS / Mach 0.82',
        'Maximum Flap Extension Speed (Flaps 1,5,10)': '250 KIAS',
        'Maximum Flap Extension Speed (Flaps 15,25,30,40)': '200 KIAS',
        'Maximum Landing Gear Extension Speed': '270 KIAS',
        'Maximum Landing Gear Extended Speed': '270 KIAS',
        'Maximum Tire Ground Speed': '195 kts',
        'Turbulence Penetration Speed': '280 KIAS / Mach 0.76',
        'Maximum Windshear Speed': 'V2 + 15 kts'
      },
      performance: {
        'Takeoff Distance (MTOW, SL, ISA)': '2,500 m (8,200 ft)',
        'Landing Distance (MLW, SL, ISA)': '1,600 m (5,250 ft)',
        'Rate of Climb (MTOW, ISA, SL)': '2,500 ft/min',
        'Single Engine Rate of Climb': '400 ft/min',
        'Approach Speed (MLW)': '140-150 KIAS',
        'Stall Speed (Clean, MTOW)': '158 KIAS',
        'Stall Speed (Landing Config, MLW)': '111 KIAS'
      }
    },
    'a320': {
      name: 'Airbus A320',
      category: 'Narrow Body',
      manufacturer: 'Airbus',
      image: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400',
      specifications: {
        'Max Takeoff Weight': '78,000 kg (171,960 lb)',
        'Max Landing Weight': '67,400 kg (148,592 lb)',
        'Max Zero Fuel Weight': '64,500 kg (142,198 lb)',
        'Operating Empty Weight': '42,600 kg (93,915 lb)',
        'Max Payload': '21,900 kg (48,280 lb)',
        'Fuel Capacity': '24,210 L (6,400 US gal)',
        'Range': '6,150 km (3,320 nmi)',
        'Service Ceiling': '39,100 ft',
        'Max Speed': 'Mach 0.82',
        'Cruise Speed': 'Mach 0.78',
        'Length': '37.6 m (123.2 ft)',
        'Wingspan': '35.8 m (117.4 ft)',
        'Height': '11.8 m (38.7 ft)'
      },
      limitations: {
        'Maximum Operating Altitude': '39,100 ft',
        'Maximum Operating Speed': '350 KIAS / Mach 0.82',
        'Maximum Flap Extension Speed (Config 1)': '230 KIAS',
        'Maximum Flap Extension Speed (Config 2)': '200 KIAS',
        'Maximum Flap Extension Speed (Config 3)': '185 KIAS',
        'Maximum Flap Extension Speed (Config Full)': '177 KIAS',
        'Maximum Landing Gear Extension Speed': '250 KIAS',
        'Maximum Landing Gear Extended Speed': '280 KIAS',
        'Turbulence Penetration Speed': '280 KIAS / Mach 0.76'
      },
      performance: {
        'Takeoff Distance (MTOW, SL, ISA)': '2,090 m (6,860 ft)',
        'Landing Distance (MLW, SL, ISA)': '1,400 m (4,593 ft)',
        'Rate of Climb (MTOW, ISA, SL)': '2,200 ft/min',
        'Single Engine Rate of Climb': '350 ft/min',
        'Approach Speed (MLW)': '135-145 KIAS',
        'Stall Speed (Clean, MTOW)': '154 KIAS',
        'Stall Speed (Landing Config, MLW)': '108 KIAS'
      }
    },
    'b777-300er': {
      name: 'Boeing 777-300ER',
      category: 'Wide Body',
      manufacturer: 'Boeing',
      image: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400',
      specifications: {
        'Max Takeoff Weight': '351,535 kg (775,000 lb)',
        'Max Landing Weight': '251,290 kg (554,000 lb)',
        'Max Zero Fuel Weight': '238,370 kg (525,000 lb)',
        'Operating Empty Weight': '188,560 kg (415,600 lb)',
        'Max Payload': '49,810 kg (109,800 lb)',
        'Fuel Capacity': '181,280 L (47,890 US gal)',
        'Range': '14,690 km (7,930 nmi)',
        'Service Ceiling': '43,100 ft',
        'Max Speed': 'Mach 0.89',
        'Cruise Speed': 'Mach 0.84',
        'Length': '73.9 m (242.4 ft)',
        'Wingspan': '64.8 m (212.7 ft)',
        'Height': '18.5 m (60.8 ft)'
      },
      limitations: {
        'Maximum Operating Altitude': '43,100 ft',
        'Maximum Operating Speed': '330 KIAS / Mach 0.89',
        'Maximum Flap Extension Speed (Flaps 1,5,10,20)': '270 KIAS',
        'Maximum Flap Extension Speed (Flaps 25,30)': '235 KIAS',
        'Maximum Landing Gear Extension Speed': '270 KIAS',
        'Maximum Landing Gear Extended Speed': '320 KIAS',
        'Turbulence Penetration Speed': '280 KIAS / Mach 0.85'
      },
      performance: {
        'Takeoff Distance (MTOW, SL, ISA)': '3,380 m (11,090 ft)',
        'Landing Distance (MLW, SL, ISA)': '2,135 m (7,005 ft)',
        'Rate of Climb (MTOW, ISA, SL)': '1,900 ft/min',
        'Single Engine Rate of Climb': '290 ft/min',
        'Approach Speed (MLW)': '150-160 KIAS',
        'Stall Speed (Clean, MTOW)': '173 KIAS',
        'Stall Speed (Landing Config, MLW)': '125 KIAS'
      }
    }
  };

  const aircraftList = Object.entries(aircraftDatabase).filter(([key, aircraft]) =>
    aircraft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aircraft.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentAircraft = aircraftDatabase[selectedAircraft];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Navigation className="h-7 w-7 mr-3 text-purple-600" />
          Aircraft Database
        </h2>
      </div>

      {/* Search and Selection */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search aircraft by name or manufacturer..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-48"
            value={selectedAircraft}
            onChange={(e) => setSelectedAircraft(e.target.value)}
          >
            {aircraftList.map(([key, aircraft]) => (
              <option key={key} value={key}>{aircraft.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Aircraft Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Aircraft Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <img
              src={currentAircraft.image}
              alt={currentAircraft.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{currentAircraft.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Manufacturer:</span>
                  <span className="font-medium">{currentAircraft.manufacturer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{currentAircraft.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Weight & Balance */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Weight className="h-5 w-5 mr-2 text-blue-600" />
                Specifications
              </h4>
              <div className="space-y-3 text-sm">
                {Object.entries(currentAircraft.specifications).slice(0, 8).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-gray-600 text-xs">{key}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Limitations */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Gauge className="h-5 w-5 mr-2 text-red-600" />
                Limitations
              </h4>
              <div className="space-y-3 text-sm">
                {Object.entries(currentAircraft.limitations).slice(0, 8).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-gray-600 text-xs">{key}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Plane className="h-5 w-5 mr-2 text-green-600" />
                Performance
              </h4>
              <div className="space-y-3 text-sm">
                {Object.entries(currentAircraft.performance).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-gray-600 text-xs">{key}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Reference - {currentAircraft.name}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{currentAircraft.specifications['Max Speed']}</div>
            <div className="text-sm text-gray-600">Maximum Speed</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{currentAircraft.specifications['Service Ceiling']}</div>
            <div className="text-sm text-gray-600">Service Ceiling</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{currentAircraft.specifications['Range']}</div>
            <div className="text-sm text-gray-600">Maximum Range</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{currentAircraft.specifications['Max Payload']}</div>
            <div className="text-sm text-gray-600">Maximum Payload</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AircraftData;