import React, { useState } from 'react';
import { Calculator, Wind, Fuel, Navigation, Clock, Gauge } from 'lucide-react';

const FlightCalculators = () => {
  const [activeCalculator, setActiveCalculator] = useState('wind');
  
  // Wind Calculator State
  const [windSpeed, setWindSpeed] = useState('');
  const [windDirection, setWindDirection] = useState('');
  const [runwayHeading, setRunwayHeading] = useState('');
  const [windResult, setWindResult] = useState(null);

  // Weight & Balance Calculator State
  const [emptyWeight, setEmptyWeight] = useState('');
  const [pilot, setPilot] = useState('');
  const [passengers, setPassengers] = useState('');
  const [baggage, setBaggage] = useState('');
  const [fuel, setFuel] = useState('');
  const [wbResult, setWbResult] = useState(null);

  // Great Circle Calculator State
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [gcResult, setGcResult] = useState(null);

  const calculators = [
    { id: 'wind', name: 'Wind Components', icon: Wind },
    { id: 'wb', name: 'Weight & Balance', icon: Gauge },
    { id: 'gc', name: 'Great Circle', icon: Navigation },
    { id: 'fuel', name: 'Fuel Planning', icon: Fuel },
    { id: 'time', name: 'Time/Speed/Distance', icon: Clock }
  ];

  const calculateWindComponents = () => {
    const ws = parseFloat(windSpeed);
    const wd = parseFloat(windDirection);
    const rh = parseFloat(runwayHeading);
    
    if (isNaN(ws) || isNaN(wd) || isNaN(rh)) return;
    
    const angleDiff = Math.abs(wd - rh);
    const adjustedAngle = angleDiff > 180 ? 360 - angleDiff : angleDiff;
    const angleRad = (adjustedAngle * Math.PI) / 180;
    
    const headwindComponent = ws * Math.cos(angleRad);
    const crosswindComponent = ws * Math.sin(angleRad);
    
    setWindResult({
      headwind: Math.round(headwindComponent),
      crosswind: Math.round(crosswindComponent),
      angleDiff: Math.round(adjustedAngle)
    });
  };

  const calculateWeightBalance = () => {
    const ew = parseFloat(emptyWeight);
    const p = parseFloat(pilot);
    const pass = parseFloat(passengers);
    const bag = parseFloat(baggage);
    const f = parseFloat(fuel);
    
    if (isNaN(ew) || isNaN(p) || isNaN(pass) || isNaN(bag) || isNaN(f)) return;
    
    const totalWeight = ew + p + pass + bag + f;
    
    setWbResult({
      totalWeight: totalWeight,
      maxWeight: 2550, // Example MTOW
      weightStatus: totalWeight <= 2550 ? 'WITHIN LIMITS' : 'OVERWEIGHT'
    });
  };

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'wind':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Wind Component Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wind Speed (kts)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(e.target.value)}
                  placeholder="15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wind Direction (°)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={windDirection}
                  onChange={(e) => setWindDirection(e.target.value)}
                  placeholder="270"
                  min="0"
                  max="360"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Runway Heading (°)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={runwayHeading}
                  onChange={(e) => setRunwayHeading(e.target.value)}
                  placeholder="240"
                  min="0"
                  max="360"
                />
              </div>
            </div>
            <button
              onClick={calculateWindComponents}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Calculate Wind Components
            </button>
            
            {windResult && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-4">Wind Component Results</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{Math.abs(windResult.headwind)} kts</div>
                    <div className="text-sm text-gray-600">
                      {windResult.headwind >= 0 ? 'Headwind' : 'Tailwind'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{windResult.crosswind} kts</div>
                    <div className="text-sm text-gray-600">Crosswind</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{windResult.angleDiff}°</div>
                    <div className="text-sm text-gray-600">Wind Angle</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'wb':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Weight & Balance Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Empty Weight (lbs)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={emptyWeight}
                  onChange={(e) => setEmptyWeight(e.target.value)}
                  placeholder="1650"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pilot (lbs)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={pilot}
                  onChange={(e) => setPilot(e.target.value)}
                  placeholder="180"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passengers (lbs)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  placeholder="340"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Baggage (lbs)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={baggage}
                  onChange={(e) => setBaggage(e.target.value)}
                  placeholder="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fuel (lbs)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  placeholder="300"
                />
              </div>
            </div>
            <button
              onClick={calculateWeightBalance}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Calculate Weight & Balance
            </button>
            
            {wbResult && (
              <div className={`border rounded-lg p-6 ${
                wbResult.weightStatus === 'WITHIN LIMITS' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}>
                <h4 className={`font-semibold mb-4 ${
                  wbResult.weightStatus === 'WITHIN LIMITS' ? 'text-green-900' : 'text-red-900'
                }`}>Weight & Balance Results</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{wbResult.totalWeight} lbs</div>
                    <div className="text-sm text-gray-600">Total Weight</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{wbResult.maxWeight} lbs</div>
                    <div className="text-sm text-gray-600">Maximum Weight</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${
                      wbResult.weightStatus === 'WITHIN LIMITS' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {wbResult.weightStatus}
                    </div>
                    <div className="text-sm text-gray-600">Status</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Calculator Under Development</h3>
            <p className="text-gray-600">This calculator will be available in a future update.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Calculator className="h-7 w-7 mr-3 text-green-600" />
          Flight Calculators
        </h2>
      </div>

      {/* Calculator Selection */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCalculator === calc.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{calc.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculator Content */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        {renderCalculator()}
      </div>

      {/* Safety Notice */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-red-800">Flight Safety Warning</h3>
            <p className="text-sm text-red-700 mt-1">
              These calculators are for reference only. Always verify all calculations with official aircraft documentation, 
              performance charts, and follow your company's Standard Operating Procedures. Flight safety is paramount.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCalculators;