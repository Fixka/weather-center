import React, { useState } from 'react';
import { AlertTriangle, Search, Phone, Radio, Heart } from 'lucide-react';

const EmergencyRef = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const emergencyProcedures = [
    {
      category: 'engine',
      title: 'ENGINE FAILURE DURING TAKEOFF',
      priority: 'CRITICAL',
      immediate: [
        'THROTTLE - CLOSE (affected engine)',
        'RUDDER - Apply opposite to failed engine',
        'AILERON - Level wings',
        'AIRSPEED - Maintain V2 or greater'
      ],
      subsequent: [
        'LANDING GEAR - UP (when positive rate)',
        'FLAPS - UP (when safe altitude)',
        'ENGINE FAILURE checklist - Complete',
        'RETURN for landing or continue - As required'
      ],
      notes: 'If failure occurs below V1, abort takeoff. If failure occurs above V1, continue takeoff and handle in flight.'
    },
    {
      category: 'fire',
      title: 'ENGINE FIRE IN FLIGHT',
      priority: 'CRITICAL',
      immediate: [
        'THROTTLE - IDLE (affected engine)',
        'FUEL LEVER - OFF (affected engine)',
        'FIRE HANDLE - PULL',
        'FIRE EXTINGUISHER - DISCHARGE'
      ],
      subsequent: [
        'ENGINE SHUTDOWN checklist - Complete',
        'LAND AS SOON AS PRACTICAL',
        'INFORM ATC of emergency',
        'PASSENGER briefing - As required'
      ],
      notes: 'Do not hesitate to declare emergency and request priority handling.'
    },
    {
      category: 'pressurization',
      title: 'RAPID DECOMPRESSION',
      priority: 'CRITICAL',
      immediate: [
        'OXYGEN MASKS - DON immediately',
        'OXYGEN - 100% EMERGENCY',
        'AUTOPILOT - DISENGAGE',
        'EMERGENCY DESCENT - INITIATE'
      ],
      subsequent: [
        'DESCENT to 10,000 ft or MEA',
        'THRUST LEVERS - As required',
        'PRESSURIZATION - Check and adjust',
        'OXYGEN - Continue until safe altitude'
      ],
      notes: 'Time of useful consciousness may be very limited. Act immediately.'
    },
    {
      category: 'electrical',
      title: 'TOTAL ELECTRICAL FAILURE',
      priority: 'HIGH',
      immediate: [
        'BATTERY SWITCH - ON',
        'ALTERNATOR - Check operation',
        'ELECTRICAL LOAD - Reduce to minimum',
        'NAVIGATION - Use backup instruments'
      ],
      subsequent: [
        'LAND AS SOON AS PRACTICAL',
        'RADIO - Use sparingly',
        'LIGHTS - Essential only',
        'APPROACH - Plan for no-flap landing'
      ],
      notes: 'Conserve battery power. Consider VFR conditions for approach.'
    },
    {
      category: 'weather',
      title: 'INADVERTENT IMC ENTRY',
      priority: 'HIGH',
      immediate: [
        'AUTOPILOT - ENGAGE (if available)',
        'ATTITUDE - Maintain level flight',
        'HEADING - Maintain present heading',
        'AIRSPEED - Maintain cruise speed'
      ],
      subsequent: [
        'ATC - CONTACT immediately',
        'VECTORS - Request for VMC',
        'INSTRUMENT APPROACH - If required',
        'DECLARE EMERGENCY - If not qualified'
      ],
      notes: 'If not instrument rated, declare emergency immediately and request assistance.'
    }
  ];

  const emergencyFrequencies = [
    { name: 'Emergency (International)', frequency: '121.500 MHz', description: 'International aeronautical emergency frequency' },
    { name: 'Emergency (Military)', frequency: '243.000 MHz', description: 'Military emergency frequency' },
    { name: 'Search and Rescue', frequency: '123.100 MHz', description: 'SAR coordination' },
    { name: 'Flight Service', frequency: '122.200 MHz', description: 'General flight service information' },
    { name: 'UNICOM', frequency: '122.800 MHz', description: 'Non-towered airport communications' }
  ];

  const squawkCodes = [
    { code: '7700', meaning: 'Emergency', description: 'General emergency - immediate assistance required' },
    { code: '7600', meaning: 'Radio Failure', description: 'Lost communications' },
    { code: '7500', meaning: 'Hijack', description: 'Aircraft hijacking' },
    { code: '1200', meaning: 'VFR', description: 'Standard VFR transponder code (US)' },
    { code: '7000', meaning: 'VFR', description: 'Standard VFR transponder code (International)' }
  ];

  const filteredProcedures = emergencyProcedures.filter(proc => {
    const matchesSearch = proc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || proc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Emergencies' },
    { id: 'engine', name: 'Engine' },
    { id: 'fire', name: 'Fire' },
    { id: 'pressurization', name: 'Pressurization' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'weather', name: 'Weather' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <AlertTriangle className="h-7 w-7 mr-3 text-red-600" />
          Emergency Reference
        </h2>
        <div className="text-red-600 font-semibold text-sm">
          ⚠️ FOR REFERENCE ONLY - FOLLOW YOUR AIRCRAFT'S OFFICIAL CHECKLIST
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
                placeholder="Search emergency procedures..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emergency Procedures */}
        <div className="lg:col-span-2 space-y-4">
          {filteredProcedures.map((procedure, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md border-l-4 border-red-500 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{procedure.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  procedure.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {procedure.priority}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    IMMEDIATE ACTION
                  </h4>
                  <ol className="space-y-2 text-sm">
                    {procedure.immediate.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center mr-3 mt-0.5">
                          {stepIndex + 1}
                        </span>
                        <span className="font-mono text-gray-900">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    SUBSEQUENT ACTION
                  </h4>
                  <ol className="space-y-2 text-sm">
                    {procedure.subsequent.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center mr-3 mt-0.5">
                          {stepIndex + 1}
                        </span>
                        <span className="font-mono text-gray-900">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>NOTE:</strong> {procedure.notes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Reference */}
        <div className="space-y-6">
          {/* Emergency Frequencies */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Radio className="h-5 w-5 mr-2 text-blue-600" />
              Emergency Frequencies
            </h3>
            <div className="space-y-3">
              {emergencyFrequencies.map((freq, index) => (
                <div key={index} className="border-b border-gray-100 pb-2 last:border-b-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-gray-900 text-sm">{freq.name}</span>
                    <span className="font-mono text-sm text-blue-600 font-bold">{freq.frequency}</span>
                  </div>
                  <p className="text-xs text-gray-600">{freq.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Squawk Codes */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-orange-600" />
              Emergency Squawk Codes
            </h3>
            <div className="space-y-3">
              {squawkCodes.map((code, index) => (
                <div key={index} className="border-b border-gray-100 pb-2 last:border-b-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-mono text-lg font-bold ${
                      code.code.startsWith('7') ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {code.code}
                    </span>
                    <span className="font-medium text-gray-900 text-sm">{code.meaning}</span>
                  </div>
                  <p className="text-xs text-gray-600">{code.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Emergency Declaration</h3>
            <div className="space-y-3 text-sm text-red-800">
              <p><strong>Phraseology:</strong></p>
              <div className="bg-white p-3 rounded border border-red-200 font-mono text-xs">
                "MAYDAY, MAYDAY, MAYDAY<br/>
                [Your Callsign]<br/>
                [Nature of Emergency]<br/>
                [Intentions]<br/>
                [Position/Altitude]<br/>
                [Souls on Board]<br/>
                [Fuel Remaining]"
              </div>
              <p className="text-xs">
                Don't hesitate to declare an emergency when the safety of the flight is in doubt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyRef;