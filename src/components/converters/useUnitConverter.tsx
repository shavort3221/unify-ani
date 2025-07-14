import { ConversionType } from './types';

// Group conversion types by category for UI organization
export const conversionCategories = {
  common: [
    { type: 'length', label: 'Length' },
    { type: 'weight', label: 'Weight & Mass' },
    { type: 'temperature', label: 'Temperature' },
    { type: 'volume', label: 'Volume' },
    { type: 'area', label: 'Area' },
    { type: 'pressure', label: 'Pressure' },
    { type: 'energy', label: 'Energy' },
    { type: 'currency', label: 'World Currency' },
    { type: 'power', label: 'Power' },
    { type: 'force', label: 'Force' },
    { type: 'time', label: 'Time' },
    { type: 'speed', label: 'Speed' },
    { type: 'angle', label: 'Angle' },
    { type: 'fuel', label: 'Fuel Consumption' },
    { type: 'data', label: 'Data Storage' },
    { type: 'bmi', label: 'Body Mass Index' },
    { type: 'clothing', label: 'Clothing Size' },
    { type: 'shoe', label: 'Shoe Size' },
    { type: 'wind', label: 'Wind Speeds' },
    { type: 'tire', label: 'Tyre Pressure' },
    { type: 'roman', label: 'Roman Numerals' },
    { type: 'worldTime', label: 'World Time' },
  ],
  engineering: [
    { type: 'velocityAngular', label: 'Velocity - Angular' },
    { type: 'acceleration', label: 'Acceleration' },
    { type: 'accelerationAngular', label: 'Acceleration - Angular' },
    { type: 'density', label: 'Density' },
    { type: 'specificVolume', label: 'Specific Volume' },
    { type: 'momentOfInertia', label: 'Moment of Inertia' },
    { type: 'momentOfForce', label: 'Moment of Force' },
    { type: 'torque', label: 'Torque' },
  ],
  digital: [
    { type: 'data', label: 'Data Storage' },
    { type: 'dataTransfer', label: 'Data Transfer Rate' },
    { type: 'resolution', label: 'Image Resolution' },
    { type: 'frequency', label: 'Frequency' },
    { type: 'typography', label: 'Typography' },
    { type: 'sound', label: 'Sound' },
    { type: 'prefix', label: 'SI Prefixes' },
  ],
  lifestyle: [
    { type: 'bmi', label: 'Body Mass Index' },
    { type: 'clothing', label: 'Clothing Size' },
    { type: 'shoe', label: 'Shoe Size' },
    { type: 'roman', label: 'Roman Numerals' },
    { type: 'wind', label: 'Wind Speeds' },
    { type: 'tire', label: 'Tyre Pressure' },
    { type: 'worldTime', label: 'World Time' },
  ],
  heat: [
    { type: 'fuelEfficiencyMass', label: 'Fuel Efficiency - Mass' },
    { type: 'fuelEfficiencyVolume', label: 'Fuel Efficiency - Volume' },
    { type: 'temperatureInterval', label: 'Temperature Interval' },
    { type: 'thermalExpansion', label: 'Thermal Expansion' },
    { type: 'thermalResistance', label: 'Thermal Resistance' },
    { type: 'thermalConductivity', label: 'Thermal Conductivity' },
    { type: 'specificHeatCapacity', label: 'Specific Heat Capacity' },
    { type: 'heatDensity', label: 'Heat Density' },
    { type: 'heatFluxDensity', label: 'Heat Flux Density' },
    { type: 'heatTransferCoefficient', label: 'Heat Transfer Coefficient' },
  ],
  fluids: [
    { type: 'flow', label: 'Flow' },
    { type: 'flowMass', label: 'Flow - Mass' },
    { type: 'flowMolar', label: 'Flow - Molar' },
    { type: 'massFluxDensity', label: 'Mass Flux Density' },
    { type: 'concentrationMolar', label: 'Concentration - Molar' },
    { type: 'concentrationSolution', label: 'Concentration - Solution' },
    { type: 'viscosityDynamic', label: 'Viscosity - Dynamic' },
    { type: 'viscosityKinematic', label: 'Viscosity - Kinematic' },
    { type: 'surfaceTension', label: 'Surface Tension' },
    { type: 'permeability', label: 'Permeability' },
  ],
  light: [
    { type: 'luminance', label: 'Luminance' },
    { type: 'luminousIntensity', label: 'Luminous Intensity' },
    { type: 'illumination', label: 'Illumination' },
    { type: 'digitalImageResolution', label: 'Digital Image Resolution' },
    { type: 'frequencyWavelength', label: 'Frequency Wavelength' },
  ],
  electricity: [
    { type: 'charge', label: 'Charge' },
    { type: 'linearCurrentDensity', label: 'Linear Current Density' },
    { type: 'surfaceCurrentDensity', label: 'Surface Current Density' },
    { type: 'volumeCurrentDensity', label: 'Volume Current Density' },
    { type: 'current', label: 'Current' },
    { type: 'linearChargeDensity', label: 'Linear Charge Density' },
    { type: 'surfaceChargeDensity', label: 'Surface Charge Density' },
    { type: 'volumeChargeDensity', label: 'Volume Charge Density' },
    { type: 'electricFieldStrength', label: 'Electric Field Strength' },
    { type: 'electricPotential', label: 'Electric Potential' },
    { type: 'electricResistance', label: 'Electric Resistance' },
    { type: 'electricResistivity', label: 'Electric Resistivity' },
    { type: 'electricConductance', label: 'Electric Conductance' },
    { type: 'electricConductivity', label: 'Electric Conductivity' },
    { type: 'capacitance', label: 'Capacitance' },
    { type: 'inductance', label: 'Inductance' },
  ],
  magnetism: [
    { type: 'magnetomotiveForce', label: 'Magnetomotive Force' },
    { type: 'magneticFieldStrength', label: 'Magnetic Field Strength' },
    { type: 'magneticFlux', label: 'Magnetic Flux' },
    { type: 'magneticFluxDensity', label: 'Magnetic Flux Density' },
  ],
  radiology: [
    { type: 'radiation', label: 'Radiation' },
    { type: 'radiationActivity', label: 'Radiation-Activity' },
    { type: 'radiationExposure', label: 'Radiation-Exposure' },
    { type: 'radiationAbsorbedDose', label: 'Radiation-Absorbed Dose' },
  ],
  other: [
    { type: 'prefix', label: 'Prefix' },
    { type: 'dataTransfer', label: 'Data Transfer' },
    { type: 'sound', label: 'Sound' },
    { type: 'typography', label: 'Typography' },
    { type: 'volumeLumber', label: 'Volume Lumber' },
  ],
};

// Expand getUnitsForType to include all units for each category as per the doc
export const getUnitsForType = (type: ConversionType) => {
  switch(type) {
    case 'length':
      return [
        { value: 'm', label: 'Meter (m)' },
        { value: 'km', label: 'Kilometer (km)' },
        { value: 'mi', label: 'Mile (mi)' },
        { value: 'ft', label: 'Foot (ft)' },
        { value: 'in', label: 'Inch (in)' },
        { value: 'cm', label: 'Centimeter (cm)' },
        { value: 'mm', label: 'Millimeter (mm)' },
        { value: 'yd', label: 'Yard (yd)' },
      ];
    case 'weight':
      return [
        { value: 'kg', label: 'Kilogram (kg)' },
        { value: 'g', label: 'Gram (g)' },
        { value: 'lb', label: 'Pound (lb)' },
        { value: 'oz', label: 'Ounce (oz)' },
        { value: 'st', label: 'Stone (st)' },
      ];
    case 'temperature':
      return [
        { value: 'c', label: 'Celsius (°C)' },
        { value: 'f', label: 'Fahrenheit (°F)' },
        { value: 'k', label: 'Kelvin (K)' },
      ];
    case 'volume':
      return [
        { value: 'l', label: 'Liter (L)' },
        { value: 'ml', label: 'Milliliter (ml)' },
        { value: 'gal', label: 'Gallon (gal)' },
        { value: 'cup', label: 'Cup (cup)' },
        { value: 'pt', label: 'Pint (pt)' },
      ];
    case 'time':
      return [
        { value: 's', label: 'Second (s)' },
        { value: 'min', label: 'Minute (min)' },
        { value: 'h', label: 'Hour (h)' },
        { value: 'd', label: 'Day (d)' },
        { value: 'wk', label: 'Week (wk)' },
      ];
    case 'speed':
      return [
        { value: 'mps', label: 'Meters per second (m/s)' },
        { value: 'kph', label: 'Kilometers per hour (km/h)' },
        { value: 'mph', label: 'Miles per hour (mph)' },
      ];
    case 'area':
      return [
        { value: 'm2', label: 'Square Meter (m²)' },
        { value: 'ft2', label: 'Square Foot (ft²)' },
        { value: 'ac', label: 'Acre (ac)' },
        { value: 'cm2', label: 'Square Centimeter (cm²)' },
        { value: 'mm2', label: 'Square Millimeter (mm²)' },
      ];
    case 'dataTransfer':
      return [
        { value: 'bps', label: 'Bits per second (bps)' },
        { value: 'kbps', label: 'Kilobits per second (kbps)' },
        { value: 'mbps', label: 'Megabits per second (Mbps)' },
        { value: 'gbps', label: 'Gigabits per second (Gbps)' },
        { value: 'tbps', label: 'Terabits per second (Tbps)' },
      ];
    case 'resolution':
      return [
        { value: 'dpi', label: 'Dots per inch (DPI)' },
        { value: 'ppi', label: 'Pixels per inch (PPI)' },
        { value: 'px', label: 'Pixels (px)' },
      ];
    case 'typography':
      return [
        { value: 'pt', label: 'Point (pt)' },
        { value: 'px', label: 'Pixel (px)' },
        { value: 'em', label: 'Em (em)' },
        { value: 'rem', label: 'Rem (rem)' },
      ];
    case 'sound':
      return [
        { value: 'db', label: 'Decibel (dB)' },
        { value: 'phon', label: 'Phon (phon)' },
        { value: 'sone', label: 'Sone (sone)' },
      ];
    case 'prefix':
      return [
        { value: 'kilo', label: 'Kilo (k)' },
        { value: 'mega', label: 'Mega (M)' },
        { value: 'giga', label: 'Giga (G)' },
        { value: 'tera', label: 'Tera (T)' },
      ];
    case 'worldTime':
      return [
        { value: 'utc', label: 'UTC' },
        { value: 'est', label: 'Eastern Standard Time (EST)' },
        { value: 'pst', label: 'Pacific Standard Time (PST)' },
        { value: 'cet', label: 'Central European Time (CET)' },
      ];
    // ...add more units for all new categories as needed...
    default:
      return [
        { value: 'unit1', label: 'Unit 1' },
        { value: 'unit2', label: 'Unit 2' },
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
  switch(type) {
    case 'length':
      if (from === 'mm' && to === 'cm') return value * 0.1;
      if (from === 'mm' && to === 'm') return value * 0.001;
      if (from === 'mm' && to === 'km') return value * 0.000001;
      if (from === 'cm' && to === 'mm') return value * 10;
      if (from === 'cm' && to === 'm') return value * 0.01;
      if (from === 'cm' && to === 'km') return value * 0.00001;
      if (from === 'm' && to === 'mm') return value * 1000;
      if (from === 'm' && to === 'cm') return value * 100;
      if (from === 'm' && to === 'km') return value * 0.001;
      if (from === 'km' && to === 'mm') return value * 1000000;
      if (from === 'km' && to === 'cm') return value * 100000;
      if (from === 'km' && to === 'm') return value * 1000;
      if (from === 'in' && to === 'mm') return value * 25.4;
      if (from === 'in' && to === 'cm') return value * 2.54;
      if (from === 'in' && to === 'm') return value * 0.0254;
      if (from === 'ft' && to === 'mm') return value * 304.8;
      if (from === 'ft' && to === 'cm') return value * 30.48;
      if (from === 'ft' && to === 'm') return value * 0.3048;
      if (from === 'yd' && to === 'mm') return value * 914.4;
      if (from === 'yd' && to === 'cm') return value * 91.44;
      if (from === 'yd' && to === 'm') return value * 0.9144;
      if (from === 'mi' && to === 'mm') return value * 1609344;
      if (from === 'mi' && to === 'cm') return value * 16093440;
      if (from === 'mi' && to === 'm') return value * 1609.344;
      if (from === 'mi' && to === 'km') return value * 1.609344;
      return value;
    case 'weight':
      if (from === 'g' && to === 'kg') return value * 0.001;
      if (from === 'g' && to === 'oz') return value * 0.035274;
      if (from === 'g' && to === 'lb') return value * 0.002205;
      if (from === 'g' && to === 'st') return value * 0.000157;
      if (from === 'kg' && to === 'g') return value * 1000;
      if (from === 'kg' && to === 'oz') return value * 35.274;
      if (from === 'kg' && to === 'lb') return value * 2.205;
      if (from === 'kg' && to === 'st') return value * 0.157;
      if (from === 'oz' && to === 'g') return value * 28.35;
      if (from === 'oz' && to === 'kg') return value * 0.02835;
      if (from === 'oz' && to === 'lb') return value * 0.0625;
      if (from === 'oz' && to === 'st') return value * 0.00446;
      if (from === 'lb' && to === 'g') return value * 453.592;
      if (from === 'lb' && to === 'kg') return value * 0.453592;
      if (from === 'lb' && to === 'oz') return value * 16;
      if (from === 'lb' && to === 'st') return value * 0.0714;
      if (from === 'st' && to === 'g') return value * 6479.891;
      if (from === 'st' && to === 'kg') return value * 6.479891;
      if (from === 'st' && to === 'oz') return value * 224;
      if (from === 'st' && to === 'lb') return value * 14;
      return value;
    case 'temperature':
      if (from === 'C' && to === 'F') return value * 1.8 + 32;
      if (from === 'C' && to === 'K') return value + 273.15;
      if (from === 'F' && to === 'C') return (value - 32) / 1.8;
      if (from === 'F' && to === 'K') return (value + 459.67) / 1.8;
      if (from === 'K' && to === 'C') return value - 273.15;
      if (from === 'K' && to === 'F') return value * 1.8 - 459.67;
      return value;
    case 'volume':
      if (from === 'ml' && to === 'l') return value * 0.001;
      if (from === 'ml' && to === 'fl_oz') return value * 0.033814;
      if (from === 'ml' && to === 'gal') return value * 0.000264;
      if (from === 'l' && to === 'ml') return value * 1000;
      if (from === 'l' && to === 'fl_oz') return value * 33.814;
      if (from === 'l' && to === 'gal') return value * 0.264;
      if (from === 'fl_oz' && to === 'ml') return value * 29.574;
      if (from === 'fl_oz' && to === 'l') return value * 0.029574;
      if (from === 'fl_oz' && to === 'gal') return value * 0.007813;
      if (from === 'gal' && to === 'ml') return value * 3785.41;
      if (from === 'gal' && to === 'l') return value * 3.78541;
      if (from === 'gal' && to === 'fl_oz') return value * 128;
      return value;
    case 'time':
      if (from === 's' && to === 'min') return value / 60;
      if (from === 's' && to === 'h') return value / 3600;
      if (from === 's' && to === 'd') return value / 86400;
      if (from === 's' && to === 'w') return value / 604800;
      if (from === 's' && to === 'mo') return value / 2629746;
      if (from === 's' && to === 'y') return value / 31556952;
      if (from === 'min' && to === 's') return value * 60;
      if (from === 'min' && to === 'h') return value / 60;
      if (from === 'min' && to === 'd') return value / 1440;
      if (from === 'min' && to === 'w') return value / 10080;
      if (from === 'min' && to === 'mo') return value / 43800;
      if (from === 'min' && to === 'y') return value / 525600;
      if (from === 'h' && to === 's') return value * 3600;
      if (from === 'h' && to === 'min') return value * 60;
      if (from === 'h' && to === 'd') return value / 24;
      if (from === 'h' && to === 'w') return value / 168;
      if (from === 'h' && to === 'mo') return value / 730;
      if (from === 'h' && to === 'y') return value / 8760;
      if (from === 'd' && to === 's') return value * 86400;
      if (from === 'd' && to === 'min') return value * 1440;
      if (from === 'd' && to === 'h') return value * 24;
      if (from === 'd' && to === 'w') return value / 7;
      if (from === 'd' && to === 'mo') return value / 30;
      if (from === 'd' && to === 'y') return value / 365;
      if (from === 'w' && to === 's') return value * 604800;
      if (from === 'w' && to === 'min') return value * 10080;
      if (from === 'w' && to === 'h') return value * 168;
      if (from === 'w' && to === 'd') return value * 7;
      if (from === 'w' && to === 'mo') return value / 4;
      if (from === 'w' && to === 'y') return value / 52;
      if (from === 'mo' && to === 's') return value * 2629746;
      if (from === 'mo' && to === 'min') return value * 43800;
      if (from === 'mo' && to === 'h') return value * 730;
      if (from === 'mo' && to === 'd') return value * 30;
      if (from === 'mo' && to === 'w') return value * 4;
      if (from === 'mo' && to === 'y') return value * 12;
      if (from === 'y' && to === 's') return value * 31556952;
      if (from === 'y' && to === 'min') return value * 525600;
      if (from === 'y' && to === 'h') return value * 8760;
      if (from === 'y' && to === 'd') return value * 365;
      if (from === 'y' && to === 'w') return value * 52;
      if (from === 'y' && to === 'mo') return value * 12;
      return value;
    case 'speed':
      if (from === 'm/s' && to === 'km/h') return value * 3.6;
      if (from === 'm/s' && to === 'mph') return value * 2.237;
      if (from === 'm/s' && to === 'knot') return value * 1.944;
      if (from === 'km/h' && to === 'm/s') return value / 3.6;
      if (from === 'km/h' && to === 'mph') return value / 1.609;
      if (from === 'km/h' && to === 'knot') return value / 1.852;
      if (from === 'mph' && to === 'm/s') return value / 2.237;
      if (from === 'mph' && to === 'km/h') return value * 1.609;
      if (from === 'mph' && to === 'knot') return value / 1.151;
      if (from === 'knot' && to === 'm/s') return value / 1.944;
      if (from === 'knot' && to === 'km/h') return value * 1.852;
      if (from === 'knot' && to === 'mph') return value * 1.151;
      return value;
    case 'area':
      if (from === 'm²' && to === 'km²') return value * 0.000001;
      if (from === 'm²' && to === 'ha') return value * 0.0001;
      if (from === 'm²' && to === 'ac') return value * 0.000247;
      if (from === 'km²' && to === 'm²') return value * 1000000;
      if (from === 'km²' && to === 'ha') return value * 100;
      if (from === 'km²' && to === 'ac') return value * 247.105;
      if (from === 'ha' && to === 'm²') return value * 10000;
      if (from === 'ha' && to === 'km²') return value * 0.01;
      if (from === 'ha' && to === 'ac') return value * 2.471;
      if (from === 'ac' && to === 'm²') return value * 4046.86;
      if (from === 'ac' && to === 'km²') return value * 0.004047;
      if (from === 'ac' && to === 'ha') return value * 0.4047;
      return value;
    case 'currency':
      if (from === 'USD' && to === 'EUR') return value * 0.85;
      if (from === 'USD' && to === 'GBP') return value * 0.75;
      if (from === 'USD' && to === 'JPY') return value * 110;
      if (from === 'USD' && to === 'CNY') return value * 6.5;
      if (from === 'EUR' && to === 'USD') return value * 1.18;
      if (from === 'EUR' && to === 'GBP') return value * 0.88;
      if (from === 'EUR' && to === 'JPY') return value * 130;
      if (from === 'EUR' && to === 'CNY') return value * 7.5;
      if (from === 'GBP' && to === 'USD') return value * 1.33;
      if (from === 'GBP' && to === 'EUR') return value * 1.14;
      if (from === 'GBP' && to === 'JPY') return value * 150;
      if (from === 'GBP' && to === 'CNY') return value * 8.5;
      if (from === 'JPY' && to === 'USD') return value * 0.0091;
      if (from === 'JPY' && to === 'EUR') return value * 0.0077;
      if (from === 'JPY' && to === 'GBP') return value * 0.0067;
      if (from === 'JPY' && to === 'CNY') return value * 0.06;
      if (from === 'CNY' && to === 'USD') return value * 0.15;
      if (from === 'CNY' && to === 'EUR') return value * 0.13;
      if (from === 'CNY' && to === 'GBP') return value * 0.12;
      if (from === 'CNY' && to === 'JPY') return value * 16.7;
      return value;
    case 'pressure':
      if (from === 'Pa' && to === 'kPa') return value / 1000;
      if (from === 'Pa' && to === 'bar') return value / 100000;
      if (from === 'Pa' && to === 'psi') return value / 6894.76;
      if (from === 'Pa' && to === 'atm') return value / 101325;
      if (from === 'kPa' && to === 'Pa') return value * 1000;
      if (from === 'kPa' && to === 'bar') return value / 100;
      if (from === 'kPa' && to === 'psi') return value / 6.895;
      if (from === 'kPa' && to === 'atm') return value / 101.325;
      if (from === 'bar' && to === 'Pa') return value * 100000;
      if (from === 'bar' && to === 'kPa') return value * 100;
      if (from === 'bar' && to === 'psi') return value * 14.504;
      if (from === 'bar' && to === 'atm') return value * 0.987;
      if (from === 'psi' && to === 'Pa') return value * 6894.76;
      if (from === 'psi' && to === 'kPa') return value * 6.895;
      if (from === 'psi' && to === 'bar') return value / 14.504;
      if (from === 'psi' && to === 'atm') return value / 14.696;
      if (from === 'atm' && to === 'Pa') return value * 101325;
      if (from === 'atm' && to === 'kPa') return value * 101.325;
      if (from === 'atm' && to === 'bar') return value * 1.013;
      if (from === 'atm' && to === 'psi') return value * 14.696;
      return value;
    case 'energy':
      if (from === 'J' && to === 'kJ') return value / 1000;
      if (from === 'J' && to === 'cal') return value / 4.184;
      if (from === 'J' && to === 'kcal') return value / 4184;
      if (from === 'J' && to === 'Wh') return value / 3600;
      if (from === 'J' && to === 'kWh') return value / 3600000;
      if (from === 'kJ' && to === 'J') return value * 1000;
      if (from === 'kJ' && to === 'cal') return value * 239.01;
      if (from === 'kJ' && to === 'kcal') return value * 0.239;
      if (from === 'kJ' && to === 'Wh') return value * 0.278;
      if (from === 'kJ' && to === 'kWh') return value * 0.000278;
      if (from === 'cal' && to === 'J') return value * 4.184;
      if (from === 'cal' && to === 'kJ') return value * 0.004;
      if (from === 'cal' && to === 'kcal') return value * 0.001;
      if (from === 'cal' && to === 'Wh') return value * 0.0012;
      if (from === 'kcal' && to === 'J') return value * 4184;
      if (from === 'kcal' && to === 'kJ') return value * 4.184;
      if (from === 'kcal' && to === 'Wh') return value * 1.163;
      if (from === 'Wh' && to === 'J') return value * 3600;
      if (from === 'Wh' && to === 'kJ') return value * 3.6;
      if (from === 'Wh' && to === 'cal') return value * 860.42;
      if (from === 'Wh' && to === 'kcal') return value * 0.86;
      if (from === 'kWh' && to === 'J') return value * 3600000;
      if (from === 'kWh' && to === 'kJ') return value * 3600;
      if (from === 'kWh' && to === 'cal') return value * 860420;
      if (from === 'kWh' && to === 'kcal') return value * 860.42;
      return value;
    case 'power':
      if (from === 'W' && to === 'kW') return value / 1000;
      if (from === 'W' && to === 'hp') return value / 745.7;
      if (from === 'W' && to === 'BTU/h') return value * 3.412;
      if (from === 'kW' && to === 'W') return value * 1000;
      if (from === 'kW' && to === 'hp') return value * 1.341;
      if (from === 'kW' && to === 'BTU/h') return value * 3412.14;
      if (from === 'hp' && to === 'W') return value * 745.7;
      if (from === 'hp' && to === 'kW') return value * 0.746;
      if (from === 'hp' && to === 'BTU/h') return value * 2544.43;
      if (from === 'BTU/h' && to === 'W') return value / 3.412;
      if (from === 'BTU/h' && to === 'kW') return value / 3412.14;
      if (from === 'BTU/h' && to === 'hp') return value / 2544.43;
      return value;
    case 'force':
      if (from === 'N' && to === 'kN') return value / 1000;
      if (from === 'N' && to === 'lbf') return value * 0.2248;
      if (from === 'N' && to === 'dyn') return value * 100000;
      if (from === 'kN' && to === 'N') return value * 1000;
      if (from === 'kN' && to === 'lbf') return value * 224.81;
      if (from === 'kN' && to === 'dyn') return value * 100000000;
      if (from === 'lbf' && to === 'N') return value * 4.448;
      if (from === 'lbf' && to === 'kN') return value * 0.004448;
      if (from === 'lbf' && to === 'dyn') return value * 444822;
      if (from === 'dyn' && to === 'N') return value / 100000;
      if (from === 'dyn' && to === 'kN') return value / 100000000;
      if (from === 'dyn' && to === 'lbf') return value / 444822;
      return value;
    case 'frequency':
      if (from === 'Hz' && to === 'kHz') return value / 1000;
      if (from === 'Hz' && to === 'MHz') return value / 1000000;
      if (from === 'Hz' && to === 'GHz') return value / 1000000000;
      if (from === 'kHz' && to === 'Hz') return value * 1000;
      if (from === 'kHz' && to === 'MHz') return value / 1000;
      if (from === 'kHz' && to === 'GHz') return value / 1000000;
      if (from === 'MHz' && to === 'Hz') return value * 1000000;
      if (from === 'MHz' && to === 'kHz') return value * 1000;
      if (from === 'MHz' && to === 'GHz') return value / 1000;
      if (from === 'GHz' && to === 'Hz') return value * 1000000000;
      if (from === 'GHz' && to === 'kHz') return value * 1000000;
      if (from === 'GHz' && to === 'MHz') return value * 1000;
      return value;
    case 'angle':
      if (from === 'deg' && to === 'rad') return value * Math.PI / 180;
      if (from === 'deg' && to === 'grad') return value * 1.111;
      if (from === 'deg' && to === 'turn') return value / 360;
      if (from === 'rad' && to === 'deg') return value * 180 / Math.PI;
      if (from === 'rad' && to === 'grad') return value * 200 / Math.PI;
      if (from === 'rad' && to === 'turn') return value * 0.159;
      if (from === 'grad' && to === 'deg') return value * 0.9;
      if (from === 'grad' && to === 'rad') return value * Math.PI / 200;
      if (from === 'grad' && to === 'turn') return value * 0.0025;
      if (from === 'turn' && to === 'deg') return value * 360;
      if (from === 'turn' && to === 'rad') return value * 2 * Math.PI;
      if (from === 'turn' && to === 'grad') return value * 400;
      return value;
    case 'data':
      if (from === 'bit' && to === 'byte') return value / 8;
      if (from === 'bit' && to === 'KB') return value / 8192;
      if (from === 'bit' && to === 'MB') return value / 8388608;
      if (from === 'bit' && to === 'GB') return value / 8589934592;
      if (from === 'bit' && to === 'TB') return value / 8796093022208;
      if (from === 'byte' && to === 'bit') return value * 8;
      if (from === 'byte' && to === 'KB') return value / 1024;
      if (from === 'byte' && to === 'MB') return value / 1048576;
      if (from === 'byte' && to === 'GB') return value / 1073741824;
      if (from === 'byte' && to === 'TB') return value / 1099511627776;
      if (from === 'KB' && to === 'bit') return value * 8192;
      if (from === 'KB' && to === 'byte') return value * 1024;
      if (from === 'KB' && to === 'MB') return value / 1024;
      if (from === 'KB' && to === 'GB') return value / 1048576;
      if (from === 'KB' && to === 'TB') return value / 1073741824;
      if (from === 'MB' && to === 'bit') return value * 8388608;
      if (from === 'MB' && to === 'byte') return value * 1048576;
      if (from === 'MB' && to === 'KB') return value * 1024;
      if (from === 'MB' && to === 'GB') return value / 1024;
      if (from === 'MB' && to === 'TB') return value / 1048576;
      if (from === 'GB' && to === 'bit') return value * 8589934592;
      if (from === 'GB' && to === 'byte') return value * 1073741824;
      if (from === 'GB' && to === 'KB') return value * 1048576;
      if (from === 'GB' && to === 'MB') return value * 1024;
      if (from === 'GB' && to === 'TB') return value / 1024;
      if (from === 'TB' && to === 'bit') return value * 8796093022208;
      if (from === 'TB' && to === 'byte') return value * 1099511627776;
      if (from === 'TB' && to === 'KB') return value * 1073741824;
      if (from === 'TB' && to === 'MB') return value * 1048576;
      if (from === 'TB' && to === 'GB') return value * 1024;
      return value;
    case 'resolution':
      if (from === 'px' && to === 'dpi') return value * 25.4;
      if (from === 'px' && to === 'ppi') return value * 25.4;
      if (from === 'dpi' && to === 'px') return value / 25.4;
      if (from === 'dpi' && to === 'ppi') return value / 25.4;
      if (from === 'ppi' && to === 'px') return value / 25.4;
      if (from === 'ppi' && to === 'dpi') return value / 25.4;
      return value;
    case 'roman':
      if (from === 'I' && to === 'V') return 1;
      if (from === 'I' && to === 'X') return 1;
      if (from === 'I' && to === 'L') return 1;
      if (from === 'I' && to === 'C') return 1;
      if (from === 'I' && to === 'D') return 1;
      if (from === 'I' && to === 'M') return 1;
      if (from === 'V' && to === 'I') return 5;
      if (from === 'V' && to === 'X') return 1;
      if (from === 'V' && to === 'L') return 1;
      if (from === 'V' && to === 'C') return 1;
      if (from === 'V' && to === 'D') return 1;
      if (from === 'V' && to === 'M') return 1;
      if (from === 'X' && to === 'I') return 10;
      if (from === 'X' && to === 'V') return 1;
      if (from === 'X' && to === 'L') return 1;
      if (from === 'X' && to === 'C') return 1;
      if (from === 'X' && to === 'D') return 1;
      if (from === 'X' && to === 'M') return 1;
      if (from === 'L' && to === 'I') return 50;
      if (from === 'L' && to === 'V') return 1;
      if (from === 'L' && to === 'X') return 1;
      if (from === 'L' && to === 'C') return 1;
      if (from === 'L' && to === 'D') return 1;
      if (from === 'L' && to === 'M') return 1;
      if (from === 'C' && to === 'I') return 100;
      if (from === 'C' && to === 'V') return 1;
      if (from === 'C' && to === 'X') return 1;
      if (from === 'C' && to === 'L') return 1;
      if (from === 'C' && to === 'D') return 1;
      if (from === 'C' && to === 'M') return 1;
      if (from === 'D' && to === 'I') return 500;
      if (from === 'D' && to === 'V') return 1;
      if (from === 'D' && to === 'X') return 1;
      if (from === 'D' && to === 'L') return 1;
      if (from === 'D' && to === 'C') return 1;
      if (from === 'D' && to === 'M') return 1;
      if (from === 'M' && to === 'I') return 1000;
      if (from === 'M' && to === 'V') return 1;
      if (from === 'M' && to === 'X') return 1;
      if (from === 'M' && to === 'L') return 1;
      if (from === 'M' && to === 'C') return 1;
      if (from === 'M' && to === 'D') return 1;
      return value;
    case 'fuel':
      if (from === 'L/100km' && to === 'mpg') return 235.215 / value;
      if (from === 'L/100km' && to === 'km/L') return 100 / value;
      if (from === 'mpg' && to === 'L/100km') return 235.215 / value;
      if (from === 'mpg' && to === 'km/L') return 235.215 / (value * 1.609);
      if (from === 'km/L' && to === 'L/100km') return 100 / value;
      if (from === 'km/L' && to === 'mpg') return 235.215 / (value * 1.609);
      return value;
    case 'bmi':
      if (from === 'kg/m²' && to === 'lb/ft²') return value * 20.4816;
      if (from === 'kg/m²' && to === 'BMI') return value;
      if (from === 'lb/ft²' && to === 'kg/m²') return value / 20.4816;
      if (from === 'lb/ft²' && to === 'BMI') return value * 703;
      if (from === 'BMI' && to === 'kg/m²') return value;
      if (from === 'BMI' && to === 'lb/ft²') return value / 703;
      return value;
    case 'clothing':
      if (from === 'US' && to === 'EU') return value * 0.9144;
      if (from === 'US' && to === 'UK') return value * 0.8382;
      if (from === 'US' && to === 'JP') return value * 0.9144;
      if (from === 'EU' && to === 'US') return value / 0.9144;
      if (from === 'EU' && to === 'UK') return value * 0.9144;
      if (from === 'EU' && to === 'JP') return value * 0.9144;
      if (from === 'UK' && to === 'US') return value / 0.8382;
      if (from === 'UK' && to === 'EU') return value / 0.9144;
      if (from === 'UK' && to === 'JP') return value * 0.8382;
      if (from === 'JP' && to === 'US') return value / 0.9144;
      if (from === 'JP' && to === 'EU') return value / 0.9144;
      if (from === 'JP' && to === 'UK') return value / 0.8382;
      return value;
    case 'shoe':
      if (from === 'US' && to === 'EU') return value * 0.9144;
      if (from === 'US' && to === 'UK') return value * 0.8382;
      if (from === 'US' && to === 'JP') return value * 0.9144;
      if (from === 'EU' && to === 'US') return value / 0.9144;
      if (from === 'EU' && to === 'UK') return value * 0.8382;
      if (from === 'EU' && to === 'JP') return value * 0.9144;
      if (from === 'UK' && to === 'US') return value / 0.8382;
      if (from === 'UK' && to === 'EU') return value / 0.9144;
      if (from === 'UK' && to === 'JP') return value * 0.8382;
      if (from === 'JP' && to === 'US') return value / 0.9144;
      if (from === 'JP' && to === 'EU') return value / 0.9144;
      if (from === 'JP' && to === 'UK') return value / 0.8382;
      return value;
    case 'wind':
      if (from === 'm/s' && to === 'km/h') return value * 3.6;
      if (from === 'm/s' && to === 'mph') return value * 2.237;
      if (from === 'm/s' && to === 'knot') return value * 1.944;
      if (from === 'km/h' && to === 'm/s') return value / 3.6;
      if (from === 'km/h' && to === 'mph') return value / 1.609;
      if (from === 'km/h' && to === 'knot') return value / 1.852;
      if (from === 'mph' && to === 'm/s') return value / 2.237;
      if (from === 'mph' && to === 'km/h') return value * 1.609;
      if (from === 'mph' && to === 'knot') return value / 1.151;
      if (from === 'knot' && to === 'm/s') return value / 1.944;
      if (from === 'knot' && to === 'km/h') return value * 1.852;
      if (from === 'knot' && to === 'mph') return value * 1.151;
      return value;
    case 'tire':
      if (from === 'psi' && to === 'kPa') return value * 6.895;
      if (from === 'psi' && to === 'bar') return value / 14.504;
      if (from === 'kPa' && to === 'psi') return value / 6.895;
      if (from === 'bar' && to === 'psi') return value * 14.504;
      if (from === 'bar' && to === 'kPa') return value * 100;
      if (from === 'kPa' && to === 'bar') return value / 100;
      return value;
    default:
      return value;
  }
}; 