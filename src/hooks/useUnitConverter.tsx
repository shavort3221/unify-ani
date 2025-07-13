import { useState, useEffect } from 'react';
import { useCurrencyConverter, currencies } from '../utils/currencyConverter';

// Types of conversions available - expanded with new categories
export type ConversionType = 
  'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'time' | 'speed' | 
  'data' | 'pressure' | 'angle' | 'currency' | 'energy' | 'power' | 'force' |
  'frequency' | 'fuel' | 'resolution' | 'bmi' | 'clothing' | 'shoe' | 'wind' |
  'tire' | 'roman';

// Unit interface
export interface Unit {
  id: string;
  name: string;
  symbol: string;
  description?: string;
  learnMoreUrl?: string;
}

// Conversion result interface
export interface ConversionResult {
  value: number;
  formattedValue: string;
  fromValue: number;
  fromUnit: Unit;
  toUnit: Unit;
}

// Define available unit types
export const unitTypes = [
  { value: 'length', label: 'Length' },
  { value: 'weight', label: 'Weight' },
  { value: 'temperature', label: 'Temperature' },
  { value: 'area', label: 'Area' },
  { value: 'volume', label: 'Volume' },
  { value: 'time', label: 'Time' },
  { value: 'speed', label: 'Speed' },
  { value: 'data', label: 'Data Storage' },
  { value: 'pressure', label: 'Pressure' },
  { value: 'angle', label: 'Angle' },
  { value: 'currency', label: 'Currency' },
  { value: 'energy', label: 'Energy' },
  { value: 'power', label: 'Power' },
  { value: 'force', label: 'Force' },
  { value: 'frequency', label: 'Frequency' },
  { value: 'fuel', label: 'Fuel Consumption' },
  { value: 'resolution', label: 'Image Resolution' },
  { value: 'bmi', label: 'BMI Calculator' },
  { value: 'clothing', label: 'Clothing Size' },
  { value: 'shoe', label: 'Shoe Size' },
  { value: 'wind', label: 'Wind Speed' },
  { value: 'tire', label: 'Tire Pressure' },
  { value: 'roman', label: 'Roman Numerals' }
];

// Group conversion types by category for UI organization - expanded
export const conversionCategories = {
  common: [
    { type: 'length' as ConversionType, label: 'Length' },
    { type: 'weight' as ConversionType, label: 'Weight & Mass' },
    { type: 'temperature' as ConversionType, label: 'Temperature' },
    { type: 'volume' as ConversionType, label: 'Volume' },
    { type: 'time' as ConversionType, label: 'Time' },
    { type: 'speed' as ConversionType, label: 'Speed' },
    { type: 'area' as ConversionType, label: 'Area' },
    { type: 'currency' as ConversionType, label: 'Currency' }
  ],
  engineering: [
    { type: 'pressure' as ConversionType, label: 'Pressure' },
    { type: 'energy' as ConversionType, label: 'Energy' },
    { type: 'power' as ConversionType, label: 'Power' },
    { type: 'force' as ConversionType, label: 'Force' },
    { type: 'frequency' as ConversionType, label: 'Frequency' },
    { type: 'angle' as ConversionType, label: 'Angle' }
  ],
  digital: [
    { type: 'data' as ConversionType, label: 'Data Storage' },
    { type: 'resolution' as ConversionType, label: 'Image Resolution' },
    { type: 'roman' as ConversionType, label: 'Roman Numerals' }
  ],
  lifestyle: [
    { type: 'fuel' as ConversionType, label: 'Fuel Consumption' },
    { type: 'bmi' as ConversionType, label: 'BMI Calculator' },
    { type: 'clothing' as ConversionType, label: 'Clothing Size' },
    { type: 'shoe' as ConversionType, label: 'Shoe Size' },
    { type: 'wind' as ConversionType, label: 'Wind Speed' },
    { type: 'tire' as ConversionType, label: 'Tire Pressure' }
  ]
};

// Function to get units for a specific type - expanded with all new categories
export const getUnitsForType = (type: ConversionType): Unit[] => {
  switch(type) {
    case 'length':
      return [
        { id: 'mm', name: 'Millimeter', symbol: 'mm', description: 'One thousandth of a meter' },
        { id: 'cm', name: 'Centimeter', symbol: 'cm', description: 'One hundredth of a meter' },
        { id: 'm', name: 'Meter', symbol: 'm', description: 'Base unit of length in SI system' },
        { id: 'km', name: 'Kilometer', symbol: 'km', description: 'One thousand meters' },
        { id: 'in', name: 'Inch', symbol: 'in', description: 'Imperial unit, 1/12 of a foot' },
        { id: 'ft', name: 'Foot', symbol: 'ft', description: 'Imperial unit, 12 inches' },
        { id: 'yd', name: 'Yard', symbol: 'yd', description: 'Imperial unit, 3 feet' },
        { id: 'mi', name: 'Mile', symbol: 'mi', description: 'Imperial unit, 5280 feet' }
      ];
    case 'weight':
      return [
        { id: 'mg', name: 'Milligram', symbol: 'mg', description: 'One thousandth of a gram' },
        { id: 'g', name: 'Gram', symbol: 'g', description: 'Base unit of mass in metric system' },
        { id: 'kg', name: 'Kilogram', symbol: 'kg', description: 'One thousand grams, SI base unit' },
        { id: 'oz', name: 'Ounce', symbol: 'oz', description: 'Imperial unit, 1/16 of a pound' },
        { id: 'lb', name: 'Pound', symbol: 'lb', description: 'Imperial unit of weight' },
        { id: 'st', name: 'Stone', symbol: 'st', description: 'British unit, 14 pounds' },
        { id: 't', name: 'Metric Ton', symbol: 't', description: 'One thousand kilograms' }
      ];
    case 'temperature':
      return [
        { id: 'c', name: 'Celsius', symbol: '°C', description: 'Water freezes at 0°, boils at 100°' },
        { id: 'f', name: 'Fahrenheit', symbol: '°F', description: 'Water freezes at 32°, boils at 212°' },
        { id: 'k', name: 'Kelvin', symbol: 'K', description: 'Absolute temperature scale, SI base unit' }
      ];
    case 'area':
      return [
        { id: 'mm2', name: 'Square Millimeter', symbol: 'mm²', description: 'Very small area measurement' },
        { id: 'cm2', name: 'Square Centimeter', symbol: 'cm²', description: 'Common small area measurement' },
        { id: 'm2', name: 'Square Meter', symbol: 'm²', description: 'SI unit of area' },
        { id: 'ha', name: 'Hectare', symbol: 'ha', description: '10,000 square meters' },
        { id: 'km2', name: 'Square Kilometer', symbol: 'km²', description: 'Large area measurement' },
        { id: 'in2', name: 'Square Inch', symbol: 'in²', description: 'Imperial small area unit' },
        { id: 'ft2', name: 'Square Foot', symbol: 'ft²', description: 'Common imperial area unit' },
        { id: 'ac', name: 'Acre', symbol: 'ac', description: '43,560 square feet' },
        { id: 'mi2', name: 'Square Mile', symbol: 'mi²', description: 'Large imperial area unit' }
      ];
    case 'volume':
      return [
        { id: 'ml', name: 'Milliliter', symbol: 'ml', description: 'One thousandth of a liter' },
        { id: 'l', name: 'Liter', symbol: 'L', description: 'Common metric volume unit' },
        { id: 'pt', name: 'Pint', symbol: 'pt', description: 'Imperial volume unit' },
        { id: 'qt', name: 'Quart', symbol: 'qt', description: 'Imperial unit, 2 pints' },
        { id: 'gal', name: 'Gallon', symbol: 'gal', description: 'Imperial unit, 4 quarts' },
        { id: 'floz', name: 'Fluid Ounce', symbol: 'fl oz', description: 'Small imperial volume unit' },
        { id: 'cup', name: 'Cup', symbol: 'cup', description: 'Cooking measurement, 8 fl oz' }
      ];
    case 'time':
      return [
        { id: 'ms', name: 'Millisecond', symbol: 'ms', description: 'One thousandth of a second' },
        { id: 's', name: 'Second', symbol: 's', description: 'SI base unit of time' },
        { id: 'min', name: 'Minute', symbol: 'min', description: '60 seconds' },
        { id: 'h', name: 'Hour', symbol: 'h', description: '60 minutes' },
        { id: 'd', name: 'Day', symbol: 'd', description: '24 hours' },
        { id: 'wk', name: 'Week', symbol: 'wk', description: '7 days' },
        { id: 'mo', name: 'Month', symbol: 'mo', description: 'Approximately 30.44 days' },
        { id: 'yr', name: 'Year', symbol: 'yr', description: '365.25 days' }
      ];
    case 'speed':
      return [
        { id: 'mps', name: 'Meters per second', symbol: 'm/s', description: 'SI unit of speed' },
        { id: 'kph', name: 'Kilometers per hour', symbol: 'km/h', description: 'Common metric speed unit' },
        { id: 'mph', name: 'Miles per hour', symbol: 'mph', description: 'Imperial speed unit' },
        { id: 'kn', name: 'Knot', symbol: 'kn', description: 'Nautical speed unit' },
        { id: 'ftps', name: 'Feet per second', symbol: 'ft/s', description: 'Imperial speed unit' }
      ];
    case 'data':
      return [
        { id: 'b', name: 'Byte', symbol: 'B', description: '8 bits of data' },
        { id: 'kb', name: 'Kilobyte', symbol: 'KB', description: '1,024 bytes' },
        { id: 'mb', name: 'Megabyte', symbol: 'MB', description: '1,024 KB' },
        { id: 'gb', name: 'Gigabyte', symbol: 'GB', description: '1,024 MB' },
        { id: 'tb', name: 'Terabyte', symbol: 'TB', description: '1,024 GB' },
        { id: 'pb', name: 'Petabyte', symbol: 'PB', description: '1,024 TB' }
      ];
    case 'pressure':
      return [
        { id: 'pa', name: 'Pascal', symbol: 'Pa', description: 'SI unit of pressure' },
        { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', description: '1,000 pascals' },
        { id: 'bar', name: 'Bar', symbol: 'bar', description: '100,000 pascals' },
        { id: 'psi', name: 'Pound per square inch', symbol: 'psi', description: 'Imperial pressure unit' },
        { id: 'atm', name: 'Atmosphere', symbol: 'atm', description: 'Standard atmospheric pressure' },
        { id: 'torr', name: 'Torr', symbol: 'Torr', description: '1/760 of an atmosphere' }
      ];
    case 'angle':
      return [
        { id: 'deg', name: 'Degree', symbol: '°', description: '1/360 of a full rotation' },
        { id: 'rad', name: 'Radian', symbol: 'rad', description: 'SI unit of angle' },
        { id: 'grad', name: 'Gradian', symbol: 'grad', description: '1/400 of a full rotation' },
        { id: 'arcmin', name: 'Arcminute', symbol: "'", description: '1/60 of a degree' },
        { id: 'arcsec', name: 'Arcsecond', symbol: '"', description: '1/60 of an arcminute' }
      ];
    case 'energy':
      return [
        { id: 'j', name: 'Joule', symbol: 'J', description: 'SI unit of energy' },
        { id: 'kj', name: 'Kilojoule', symbol: 'kJ', description: '1,000 joules' },
        { id: 'cal', name: 'Calorie', symbol: 'cal', description: 'Energy to heat 1g water by 1°C' },
        { id: 'kcal', name: 'Kilocalorie', symbol: 'kcal', description: '1,000 calories (food calorie)' },
        { id: 'btu', name: 'British Thermal Unit', symbol: 'BTU', description: 'Imperial energy unit' },
        { id: 'kwh', name: 'Kilowatt Hour', symbol: 'kWh', description: 'Electrical energy unit' }
      ];
    case 'power':
      return [
        { id: 'w', name: 'Watt', symbol: 'W', description: 'SI unit of power' },
        { id: 'kw', name: 'Kilowatt', symbol: 'kW', description: '1,000 watts' },
        { id: 'hp', name: 'Horsepower', symbol: 'hp', description: 'Imperial power unit' },
        { id: 'btuh', name: 'BTU per hour', symbol: 'BTU/h', description: 'Imperial power unit' }
      ];
    case 'force':
      return [
        { id: 'n', name: 'Newton', symbol: 'N', description: 'SI unit of force' },
        { id: 'dyn', name: 'Dyne', symbol: 'dyn', description: 'CGS unit of force' },
        { id: 'lbf', name: 'Pound-force', symbol: 'lbf', description: 'Imperial force unit' },
        { id: 'kgf', name: 'Kilogram-force', symbol: 'kgf', description: 'Metric force unit' }
      ];
    case 'frequency':
      return [
        { id: 'hz', name: 'Hertz', symbol: 'Hz', description: 'SI unit of frequency' },
        { id: 'khz', name: 'Kilohertz', symbol: 'kHz', description: '1,000 Hz' },
        { id: 'mhz', name: 'Megahertz', symbol: 'MHz', description: '1,000,000 Hz' },
        { id: 'ghz', name: 'Gigahertz', symbol: 'GHz', description: '1,000,000,000 Hz' }
      ];
    case 'fuel':
      return [
        { id: 'mpg', name: 'Miles per gallon', symbol: 'mpg', description: 'Imperial fuel efficiency' },
        { id: 'l100km', name: 'Liters per 100km', symbol: 'L/100km', description: 'Metric fuel consumption' },
        { id: 'kml', name: 'Kilometers per liter', symbol: 'km/L', description: 'Metric fuel efficiency' }
      ];
    case 'resolution':
      return [
        { id: 'dpi', name: 'Dots per inch', symbol: 'DPI', description: 'Print resolution' },
        { id: 'ppi', name: 'Pixels per inch', symbol: 'PPI', description: 'Screen resolution' },
        { id: 'px', name: 'Pixels', symbol: 'px', description: 'Digital image unit' }
      ];
    case 'bmi':
      return [
        { id: 'bmi', name: 'BMI', symbol: 'BMI', description: 'Body Mass Index' },
        { id: 'weight', name: 'Weight', symbol: 'kg', description: 'Body weight in kg' },
        { id: 'height', name: 'Height', symbol: 'm', description: 'Height in meters' }
      ];
    case 'clothing':
      return [
        { id: 'us', name: 'US Size', symbol: 'US', description: 'United States clothing size' },
        { id: 'uk', name: 'UK Size', symbol: 'UK', description: 'United Kingdom clothing size' },
        { id: 'eu', name: 'EU Size', symbol: 'EU', description: 'European clothing size' }
      ];
    case 'shoe':
      return [
        { id: 'us', name: 'US Size', symbol: 'US', description: 'United States shoe size' },
        { id: 'uk', name: 'UK Size', symbol: 'UK', description: 'United Kingdom shoe size' },
        { id: 'eu', name: 'EU Size', symbol: 'EU', description: 'European shoe size' }
      ];
    case 'wind':
      return [
        { id: 'beaufort', name: 'Beaufort Scale', symbol: 'Bf', description: 'Wind force scale 0-12' },
        { id: 'kph', name: 'Kilometers per hour', symbol: 'km/h', description: 'Metric wind speed' },
        { id: 'mph', name: 'Miles per hour', symbol: 'mph', description: 'Imperial wind speed' },
        { id: 'kn', name: 'Knots', symbol: 'kn', description: 'Nautical wind speed' }
      ];
    case 'tire':
      return [
        { id: 'psi', name: 'PSI', symbol: 'psi', description: 'Pounds per square inch' },
        { id: 'bar', name: 'Bar', symbol: 'bar', description: 'Metric pressure unit' },
        { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', description: 'SI pressure unit' }
      ];
    case 'roman':
      return [
        { id: 'decimal', name: 'Decimal', symbol: '123', description: 'Standard decimal numbers' },
        { id: 'roman', name: 'Roman', symbol: 'XII', description: 'Roman numeral system' }
      ];
    case 'currency':
      return currencies.map(code => ({
        id: code.toLowerCase(),
        name: code,
        symbol: code,
        description: `${code} currency`
      }));
    default:
      return [
        { id: 'unit1', name: 'Unit 1', symbol: 'u1' },
        { id: 'unit2', name: 'Unit 2', symbol: 'u2' }
      ];
  }
};

// Enhanced conversion function with all new categories
export const convertValue = (
  value: number,
  from: string,
  to: string,
  type: ConversionType
): number => {
  if (from === to) return value;
  
  switch (type) {
    case 'length':
      const lengthToMeters: Record<string, number> = {
        mm: 0.001, cm: 0.01, m: 1, km: 1000,
        in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344
      };
      return (value * lengthToMeters[from]) / lengthToMeters[to];
      
    case 'weight':
      const weightToGrams: Record<string, number> = {
        mg: 0.001, g: 1, kg: 1000, oz: 28.3495, 
        lb: 453.592, st: 6350.29, t: 1000000
      };
      return (value * weightToGrams[from]) / weightToGrams[to];
      
    case 'temperature':
      if (from === 'c' && to === 'f') return (value * 9/5) + 32;
      if (from === 'f' && to === 'c') return (value - 32) * 5/9;
      if (from === 'c' && to === 'k') return value + 273.15;
      if (from === 'k' && to === 'c') return value - 273.15;
      if (from === 'f' && to === 'k') return ((value - 32) * 5/9) + 273.15;
      if (from === 'k' && to === 'f') return ((value - 273.15) * 9/5) + 32;
      return value;
      
    case 'area':
      const areaToM2: Record<string, number> = {
        mm2: 0.000001, cm2: 0.0001, m2: 1, ha: 10000, km2: 1000000,
        in2: 0.00064516, ft2: 0.092903, ac: 4046.86, mi2: 2589988.11
      };
      return (value * areaToM2[from]) / areaToM2[to];
      
    case 'volume':
      const volumeToLiters: Record<string, number> = {
        ml: 0.001, l: 1, pt: 0.473176, qt: 0.946353,
        gal: 3.78541, floz: 0.0295735, cup: 0.236588
      };
      return (value * volumeToLiters[from]) / volumeToLiters[to];
      
    case 'time':
      const timeToSeconds: Record<string, number> = {
        ms: 0.001, s: 1, min: 60, h: 3600, d: 86400,
        wk: 604800, mo: 2629746, yr: 31556952
      };
      return (value * timeToSeconds[from]) / timeToSeconds[to];
      
    case 'speed':
      const speedToMPS: Record<string, number> = {
        mps: 1, kph: 0.277778, mph: 0.44704, kn: 0.514444, ftps: 0.3048
      };
      return (value * speedToMPS[from]) / speedToMPS[to];
      
    case 'data':
      const dataToBytes: Record<string, number> = {
        b: 1, kb: 1024, mb: 1048576, gb: 1073741824, 
        tb: 1099511627776, pb: 1125899906842624
      };
      return (value * dataToBytes[from]) / dataToBytes[to];
      
    case 'pressure':
      const pressureToPa: Record<string, number> = {
        pa: 1, kpa: 1000, bar: 100000, psi: 6894.76, atm: 101325, torr: 133.322
      };
      return (value * pressureToPa[from]) / pressureToPa[to];
      
    case 'angle':
      const angleToRad: Record<string, number> = {
        deg: Math.PI/180, rad: 1, grad: Math.PI/200, 
        arcmin: Math.PI/10800, arcsec: Math.PI/648000
      };
      return (value * angleToRad[from]) / angleToRad[to];
      
    case 'energy':
      const energyToJoules: Record<string, number> = {
        j: 1, kj: 1000, cal: 4.184, kcal: 4184, btu: 1055.06, kwh: 3600000
      };
      return (value * energyToJoules[from]) / energyToJoules[to];
      
    case 'power':
      const powerToWatts: Record<string, number> = {
        w: 1, kw: 1000, hp: 745.7, btuh: 0.293071
      };
      return (value * powerToWatts[from]) / powerToWatts[to];
      
    case 'force':
      const forceToNewtons: Record<string, number> = {
        n: 1, dyn: 0.00001, lbf: 4.44822, kgf: 9.80665
      };
      return (value * forceToNewtons[from]) / forceToNewtons[to];
      
    case 'frequency':
      const frequencyToHz: Record<string, number> = {
        hz: 1, khz: 1000, mhz: 1000000, ghz: 1000000000
      };
      return (value * frequencyToHz[from]) / frequencyToHz[to];
      
    case 'fuel':
      // Complex conversion for fuel consumption
      if (from === 'mpg' && to === 'l100km') return 235.214 / value;
      if (from === 'l100km' && to === 'mpg') return 235.214 / value;
      if (from === 'mpg' && to === 'kml') return value * 0.425144;
      if (from === 'kml' && to === 'mpg') return value / 0.425144;
      if (from === 'l100km' && to === 'kml') return 100 / value;
      if (from === 'kml' && to === 'l100km') return 100 / value;
      return value;
      
    case 'roman':
      if (from === 'decimal' && to === 'roman') return convertToRoman(value);
      if (from === 'roman' && to === 'decimal') return convertFromRoman(value.toString());
      return value;
      
    default:
      return value;
  }
};

// Roman numeral conversion functions
const convertToRoman = (num: number): number => {
  if (num < 1 || num > 3999) return 0;
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let result = '';
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += numerals[i];
      num -= values[i];
    }
  }
  return result as any; // Return as string but typed as number for interface compatibility
};

const convertFromRoman = (roman: string): number => {
  const romanNumerals: Record<string, number> = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
  };
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanNumerals[roman[i]];
    const next = romanNumerals[roman[i + 1]];
    if (next && current < next) {
      result += next - current;
      i++;
    } else {
      result += current;
    }
  }
  return result;
};

// Main hook with enhanced features
export const useUnitConverter = () => {
  const [unitType, setUnitType] = useState<ConversionType>('length');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [inputValue, setInputValue] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);
  const [availableUnits, setAvailableUnits] = useState<string[]>([]);
  const [decimalPlaces, setDecimalPlaces] = useState<number>(2);
  const [history, setHistory] = useState<any[]>([]);
  
  // Currency specific hook
  const { 
    convert: convertCurrency, 
    isLoading: currencyLoading, 
    error: currencyError 
  } = useCurrencyConverter();

  // Load preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('converterPreferences');
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      setDecimalPlaces(prefs.decimalPlaces || 2);
      setUnitType(prefs.lastCategory || 'length');
    }
    
    const savedHistory = localStorage.getItem('conversionHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = () => {
    const preferences = {
      decimalPlaces,
      lastCategory: unitType,
      lastFromUnit: fromUnit,
      lastToUnit: toUnit
    };
    localStorage.setItem('converterPreferences', JSON.stringify(preferences));
  };

  // Update available units when unit type changes
  useEffect(() => {
    const units = getUnitsForType(unitType).map(unit => unit.id);
    
    setAvailableUnits(units);
    if (units.length > 0) {
      setFromUnit(units[0]);
      setToUnit(units.length > 1 ? units[1] : units[0]);
    } else {
      setFromUnit('');
      setToUnit('');
    }
    
    setResult(null);
    savePreferences();
  }, [unitType]);

  // Convert the value with enhanced logic
  const convert = () => {
    if (!fromUnit || !toUnit || inputValue === undefined) {
      setResult(null);
      return;
    }

    try {
      let convertedValue: number;
      
      if (unitType === 'currency') {
        convertedValue = convertCurrency(inputValue, toUnit);
      } else {
        convertedValue = convertValue(inputValue, fromUnit, toUnit, unitType);
      }
      
      setResult(convertedValue);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        category: unitType,
        fromValue: inputValue,
        fromUnit,
        toValue: convertedValue,
        toUnit,
        formattedResult: convertedValue.toFixed(decimalPlaces)
      };
      
      const newHistory = [historyItem, ...history.slice(0, 9)]; // Keep last 10
      setHistory(newHistory);
      localStorage.setItem('conversionHistory', JSON.stringify(newHistory));
      
    } catch (error) {
      console.error('Conversion error:', error);
      setResult(null);
    }
  };

  // Swap units function
  const swapUnits = () => {
    const tempFrom = fromUnit;
    const tempTo = toUnit;
    setFromUnit(tempTo);
    setToUnit(tempFrom);
  };

  // Clear history functions
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('conversionHistory');
  };

  const clearHistoryItem = (id: number) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('conversionHistory', JSON.stringify(newHistory));
  };

  useEffect(() => {
    convert();
  }, [inputValue, fromUnit, toUnit, unitType, decimalPlaces]);

  useEffect(() => {
    savePreferences();
  }, [decimalPlaces, fromUnit, toUnit]);

  return {
    unitType,
    setUnitType,
    fromUnit,
    setFromUnit,
    toUnit,
    setToUnit,
    inputValue,
    setInputValue,
    result,
    availableUnits,
    unitTypes,
    convert,
    swapUnits,
    decimalPlaces,
    setDecimalPlaces,
    history,
    clearHistory,
    clearHistoryItem,
    loading: unitType === 'currency' && currencyLoading,
    error: unitType === 'currency' ? currencyError : null
  };
};

export default useUnitConverter;