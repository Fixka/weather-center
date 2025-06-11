import React, { useState } from 'react';
import { CloudSun, Search, RefreshCw, Wind, Eye, Thermometer, Droplets } from 'lucide-react';

const WeatherCenter = () => {
  const [searchIcao, setSearchIcao] = useState('');
  const [selectedReport, setSelectedReport] = useState('metar');

  const metarData = {
    raw: 'KJFK 121851Z 28008KT 10SM FEW250 05/M08 A3021 RMK AO2 SLP230 T00501083',
    decoded: {
      station: 'KJFK',
      time: '12th day, 18:51 UTC',
      wind: '280° at 8 knots',
      visibility: '10 statute miles',
      clouds: 'Few clouds at 25,000 feet',
      temperature: '5°C',
      dewpoint: '-8°C',
      altimeter: '30.21 inHg',
      conditions: 'VMC - Visual Meteorological Conditions'
    }
  };

  const tafData = {
    raw: 'KJFK 121720Z 1218/1324 28008KT P6SM FEW250 FM130200 30010KT P6SM SKC FM131200 32012KT P6SM SCT035',
    periods: [
      {
        time: '12th 18:00Z - 13th 02:00Z',
        wind: '280° at 8 knots',
        visibility: 'Greater than 6 SM',
        clouds: 'Few at 25,000 feet',
        conditions: 'VMC'
      },
      {
        time: '13th 02:00Z - 13th 12:00Z',
        wind: '300° at 10 knots',
        visibility: 'Greater than 6 SM',
        clouds: 'Sky Clear',
        conditions: 'VMC'
      },
      {
        time: '13th 12:00Z - 13th 24:00Z',
        wind: '320° at 12 knots',
        visibility: 'Greater than 6 SM',
        clouds: 'Scattered at 3,500 feet',
        conditions: 'VMC'
      }
    ]
  };

  const commonAbbreviations = [
    { abbr: 'VV', meaning: 'Vertical Visibility', category: 'visibility' },
    { abbr: 'CAVOK', meaning: 'Ceiling and Visibility OK', category: 'visibility' },
    { abbr: 'SCT', meaning: 'Scattered (3-4 oktas)', category: 'clouds' },
    { abbr: 'BKN', meaning: 'Broken (5-7 oktas)', category: 'clouds' },
    { abbr: 'OVC', meaning: 'Overcast (8 oktas)', category: 'clouds' },
    { abbr: 'CB', meaning: 'Cumulonimbus', category: 'clouds' },
    { abbr: 'TCU', meaning: 'Towering Cumulus', category: 'clouds' },
    { abbr: 'TSRA', meaning: 'Thunderstorm with Rain', category: 'weather' },
    { abbr: 'FZRA', meaning: 'Freezing Rain', category: 'weather' },
    { abbr: 'BLSN', meaning: 'Blowing Snow', category: 'weather' },
    { abbr: 'TEMPO', meaning: 'Temporary changes expected', category: 'forecast' },
    { abbr: 'PROB', meaning: 'Probability', category: 'forecast' },
    { abbr: 'FM', meaning: 'From (time)', category: 'forecast' },
    { abbr: 'BECMG', meaning: 'Becoming', category: 'forecast' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <CloudSun className="h-7 w-7 mr-3 text-blue-600" />
          Weather Center
        </h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <RefreshCw className="h-4 w-4" />
          <span>Update All</span>
        </button>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter ICAO code (e.g., KJFK, EGLL, LFPG)"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                value={searchIcao}
                onChange={(e) => setSearchIcao(e.target.value.toUpperCase())}
                maxLength={4}
              />
            </div>
          </div>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setSelectedReport('metar')}
              className={`px-4 py-2 text-sm font-medium ${
                selectedReport === 'metar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              METAR
            </button>
            <button
              onClick={() => setSelectedReport('taf')}
              className={`px-4 py-2 text-sm font-medium ${
                selectedReport === 'taf'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              TAF
            </button>
          </div>
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
            Get Weather
          </button>
        </div>
      </div>

      {/* Weather Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Raw Report */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedReport.toUpperCase()} Report - KJFK
            </h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-6">
              {selectedReport === 'metar' ? metarData.raw : tafData.raw}
            </div>

            {selectedReport === 'metar' ? (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-3">Decoded Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Wind className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Wind</p>
                      <p className="text-gray-900">{metarData.decoded.wind}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Visibility</p>
                      <p className="text-gray-900">{metarData.decoded.visibility}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Thermometer className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Temperature</p>
                      <p className="text-gray-900">{metarData.decoded.temperature}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Droplets className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Dewpoint</p>
                      <p className="text-gray-900">{metarData.decoded.dewpoint}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Flight Conditions:</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {metarData.decoded.conditions}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-3">Forecast Periods</h4>
                {tafData.periods.map((period, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="font-medium text-gray-900 mb-2">{period.time}</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Wind: </span>
                        <span className="text-gray-900">{period.wind}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Visibility: </span>
                        <span className="text-gray-900">{period.visibility}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Clouds: </span>
                        <span className="text-gray-900">{period.clouds}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Conditions: </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          period.conditions === 'VMC' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {period.conditions}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Abbreviations Reference */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Abbreviations</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {commonAbbreviations.map((item, index) => (
                <div key={index} className="border-b border-gray-100 pb-2">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-blue-600 text-sm">{item.abbr}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.category === 'visibility' ? 'bg-green-100 text-green-800' :
                      item.category === 'clouds' ? 'bg-blue-100 text-blue-800' :
                      item.category === 'weather' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCenter;