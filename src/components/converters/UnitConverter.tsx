import React, { useState, useRef, useEffect } from 'react';
import { 
  Ruler, Weight, Thermometer, Droplet, Clock, Gauge, DollarSign,
  AreaChart, Zap, RotateCcw, Activity, Calculator, Percent,
  Database, Magnet, Waves, Type, FlaskConical, Scale, Atom,
  Flame, Fuel, IndianRupee, Binary, Compass, Heart, Map, Search,
  Settings, Star, Timer, Trophy, Volume, Wrench, FileText, Info,
  ArrowUp, ArrowDown, Calendar, X, Cpu, Radio, Wind, Car, Image,
  User, Shirt, Footprints, CloudSnow, Gauge as TireIcon
} from 'lucide-react';
import { conversionCategories } from './useUnitConverter';
import { ConversionType } from './types';
import ConversionCard from './ConversionCard';
import GlassmorphicCard from '../ui-elements/GlassmorphicCard';
import { cn } from '../../lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';

const UnitConverter: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('common');
  const [selectedType, setSelectedType] = useState<ConversionType>('length');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activePanel, setActivePanel] = useState<'convert' | 'history' | 'quick'>('convert');
  const tabsRef = useRef<HTMLDivElement>(null);
  const [showTips, setShowTips] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('showTips') !== 'false';
    }
    return true;
  });
  
  const TOP_COMMON_COUNT = 8;
  const [showAllCommon, setShowAllCommon] = useState(false);

  useEffect(() => {
    const activeTab = tabsRef.current?.querySelector('.active-tab');
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedType]);

  // Enhanced conversion icons with new categories
  const conversionIcons: Record<string, React.ReactNode> = {
    // Common converters
    length: <Ruler size={18} />,
    weight: <Weight size={18} />,
    temperature: <Thermometer size={18} />,
    volume: <Droplet size={18} />,
    time: <Clock size={18} />,
    speed: <Gauge size={18} />,
    area: <AreaChart size={18} />,
    pressure: <Gauge size={18} />,
    currency: <IndianRupee size={18} />,
    angle: <Compass size={18} />,
    data: <Database size={18} />,
    // New categories
    energy: <Zap size={18} />,
    power: <Flame size={18} />,
    force: <Magnet size={18} />,
    frequency: <Radio size={18} />,
    fuel: <Fuel size={18} />,
    resolution: <Image size={18} />,
    bmi: <User size={18} />,
    clothing: <Shirt size={18} />,
    shoe: <Footprints size={18} />,
    wind: <Wind size={18} />,
    tire: <TireIcon size={18} />,
    roman: <Type size={18} />
  };
  
  const handleTypeChange = (type: ConversionType) => {
    setSelectedType(type);
  };

  // Enhanced unit mappings for all categories
  const getUnitsForType = (type: ConversionType) => {
    switch(type) {
      case 'length':
        return [
          { value: 'mm', label: 'Millimeter (mm)' },
          { value: 'cm', label: 'Centimeter (cm)' },
          { value: 'm', label: 'Meter (m)' },
          { value: 'km', label: 'Kilometer (km)' },
          { value: 'in', label: 'Inch (in)' },
          { value: 'ft', label: 'Foot (ft)' },
          { value: 'yd', label: 'Yard (yd)' },
          { value: 'mi', label: 'Mile (mi)' },
        ];
      case 'weight':
        return [
          { value: 'mg', label: 'Milligram (mg)' },
          { value: 'g', label: 'Gram (g)' },
          { value: 'kg', label: 'Kilogram (kg)' },
          { value: 'oz', label: 'Ounce (oz)' },
          { value: 'lb', label: 'Pound (lb)' },
          { value: 't', label: 'Metric Ton (t)' },
        ];
      case 'temperature':
        return [
          { value: 'c', label: 'Celsius (°C)' },
          { value: 'f', label: 'Fahrenheit (°F)' },
          { value: 'k', label: 'Kelvin (K)' },
        ];
      case 'area':
        return [
          { value: 'mm2', label: 'Square Millimeter (mm²)' },
          { value: 'cm2', label: 'Square Centimeter (cm²)' },
          { value: 'm2', label: 'Square Meter (m²)' },
          { value: 'ha', label: 'Hectare (ha)' },
          { value: 'km2', label: 'Square Kilometer (km²)' },
          { value: 'in2', label: 'Square Inch (in²)' },
          { value: 'ft2', label: 'Square Foot (ft²)' },
          { value: 'ac', label: 'Acre (ac)' },
          { value: 'mi2', label: 'Square Mile (mi²)' }
        ];
      case 'volume':
        return [
          { value: 'ml', label: 'Milliliter (ml)' },
          { value: 'l', label: 'Liter (L)' },
          { value: 'pt', label: 'Pint (pt)' },
          { value: 'qt', label: 'Quart (qt)' },
          { value: 'gal', label: 'Gallon (gal)' },
          { value: 'floz', label: 'Fluid Ounce (fl oz)' },
          { value: 'cup', label: 'Cup (cup)' }
        ];
      case 'time':
        return [
          { value: 'ms', label: 'Millisecond (ms)' },
          { value: 's', label: 'Second (s)' },
          { value: 'min', label: 'Minute (min)' },
          { value: 'h', label: 'Hour (h)' },
          { value: 'd', label: 'Day (d)' },
          { value: 'wk', label: 'Week (wk)' },
          { value: 'mo', label: 'Month (mo)' },
          { value: 'yr', label: 'Year (yr)' }
        ];
      case 'speed':
        return [
          { value: 'mps', label: 'Meters per second (m/s)' },
          { value: 'kph', label: 'Kilometers per hour (km/h)' },
          { value: 'mph', label: 'Miles per hour (mph)' },
          { value: 'kn', label: 'Knot (kn)' },
          { value: 'ftps', label: 'Feet per second (ft/s)' }
        ];
      case 'data':
        return [
          { value: 'b', label: 'Byte (B)' },
          { value: 'kb', label: 'Kilobyte (KB)' },
          { value: 'mb', label: 'Megabyte (MB)' },
          { value: 'gb', label: 'Gigabyte (GB)' },
          { value: 'tb', label: 'Terabyte (TB)' },
          { value: 'pb', label: 'Petabyte (PB)' }
        ];
      case 'pressure':
        return [
          { value: 'pa', label: 'Pascal (Pa)' },
          { value: 'kpa', label: 'Kilopascal (kPa)' },
          { value: 'bar', label: 'Bar (bar)' },
          { value: 'psi', label: 'Pound per square inch (psi)' },
          { value: 'atm', label: 'Atmosphere (atm)' },
          { value: 'torr', label: 'Torr (Torr)' }
        ];
      case 'angle':
        return [
          { value: 'deg', label: 'Degree (°)' },
          { value: 'rad', label: 'Radian (rad)' },
          { value: 'grad', label: 'Gradian (grad)' },
          { value: 'arcmin', label: 'Arcminute (\')' },
          { value: 'arcsec', label: 'Arcsecond (")' }
        ];
      case 'energy':
        return [
          { value: 'j', label: 'Joule (J)' },
          { value: 'kj', label: 'Kilojoule (kJ)' },
          { value: 'cal', label: 'Calorie (cal)' },
          { value: 'kcal', label: 'Kilocalorie (kcal)' },
          { value: 'btu', label: 'British Thermal Unit (BTU)' },
          { value: 'kwh', label: 'Kilowatt Hour (kWh)' }
        ];
      case 'power':
        return [
          { value: 'w', label: 'Watt (W)' },
          { value: 'kw', label: 'Kilowatt (kW)' },
          { value: 'hp', label: 'Horsepower (hp)' },
          { value: 'btuh', label: 'BTU per hour (BTU/h)' }
        ];
      case 'force':
        return [
          { value: 'n', label: 'Newton (N)' },
          { value: 'dyn', label: 'Dyne (dyn)' },
          { value: 'lbf', label: 'Pound-force (lbf)' },
          { value: 'kgf', label: 'Kilogram-force (kgf)' }
        ];
      case 'frequency':
        return [
          { value: 'hz', label: 'Hertz (Hz)' },
          { value: 'khz', label: 'Kilohertz (kHz)' },
          { value: 'mhz', label: 'Megahertz (MHz)' },
          { value: 'ghz', label: 'Gigahertz (GHz)' }
        ];
      case 'fuel':
        return [
          { value: 'mpg', label: 'Miles per gallon (mpg)' },
          { value: 'l100km', label: 'Liters per 100km (L/100km)' },
          { value: 'kml', label: 'Kilometers per liter (km/L)' }
        ];
      case 'resolution':
        return [
          { value: 'dpi', label: 'Dots per inch (DPI)' },
          { value: 'ppi', label: 'Pixels per inch (PPI)' },
          { value: 'px', label: 'Pixels (px)' }
        ];
      case 'bmi':
        return [
          { value: 'bmi', label: 'BMI' },
          { value: 'weight', label: 'Weight (kg)' },
          { value: 'height', label: 'Height (m)' }
        ];
      case 'clothing':
        return [
          { value: 'us', label: 'US Size' },
          { value: 'uk', label: 'UK Size' },
          { value: 'eu', label: 'EU Size' }
        ];
      case 'shoe':
        return [
          { value: 'us', label: 'US Size' },
          { value: 'uk', label: 'UK Size' },
          { value: 'eu', label: 'EU Size' }
        ];
      case 'wind':
        return [
          { value: 'beaufort', label: 'Beaufort Scale (Bf)' },
          { value: 'kph', label: 'Kilometers per hour (km/h)' },
          { value: 'mph', label: 'Miles per hour (mph)' },
          { value: 'kn', label: 'Knots (kn)' }
        ];
      case 'tire':
        return [
          { value: 'psi', label: 'PSI (psi)' },
          { value: 'bar', label: 'Bar (bar)' },
          { value: 'kpa', label: 'Kilopascal (kPa)' }
        ];
      case 'roman':
        return [
          { value: 'decimal', label: 'Decimal (123)' },
          { value: 'roman', label: 'Roman (XII)' }
        ];
      default:
        return [
          { value: 'unit1', label: 'Unit 1' },
          { value: 'unit2', label: 'Unit 2' },
        ];
    }
  };

  // Filter converter types based on search term
  const filterConverters = (category: keyof typeof conversionCategories) => {
    if (!searchTerm) {
      if (category === 'common' && !showAllCommon) {
        return conversionCategories[category].slice(0, TOP_COMMON_COUNT);
      }
      return conversionCategories[category];
    }
    
    return conversionCategories[category].filter(item => 
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const getAllConverters = () => {
    if (!searchTerm) return [];
    
    let allResults: { type: ConversionType; label: string; category: string }[] = [];
    
    Object.entries(conversionCategories).forEach(([category, items]) => {
      const filtered = items.filter(item => 
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      allResults = [
        ...allResults,
        ...filtered.map(item => ({
          ...item,
          type: item.type as ConversionType,
          category
        }))
      ];
    });
    
    return allResults;
  };
  
  const searchResults = getAllConverters();
  
  return (
    <section id="converter" className="py-8 px-6 md:px-12 scroll-mt-24 animate-fade-in">


    
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Powerful & Simple
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold">Advanced Unit Converter</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Convert between hundreds of different units with precision and ease. Select a category to get started.
          </p>
          
          {/* Enhanced search bar */}
          <div className="max-w-md mx-auto mt-4 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="Search for a converter..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            {/* Enhanced search results */}
            {searchTerm && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-background border border-input rounded-lg shadow-lg p-2 z-10">
                <div className="max-h-60 overflow-y-auto">
                  {searchResults.map((item, index) => (
                    <button
                      key={`${item.type}-${index}`}
                      onClick={() => {
                        setSelectedTab(item.category);
                        handleTypeChange(item.type as ConversionType);
                        setSearchTerm('');
                      }}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-muted flex items-center gap-2"
                    >
                      {conversionIcons[item.type] || <Calculator size={18} />}
                      <span>{item.label}</span>
                      <span className="ml-auto text-xs opacity-60 capitalize">
                        {item.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <LayoutGroup>
            <Tabs defaultValue="common" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <div className="relative overflow-hidden mb-2">
              <TabsList className="w-full justify-start overflow-x-auto pb-2 flex gap-2 bg-transparent h-auto relative">
                {['common', 'engineering', 'digital', 'lifestyle'].map((tab) => (
                  <TabsTrigger 
                    key={tab}
                    value={tab}
                    className="px-4 py-2 relative z-10 transition-colors duration-200 data-[state=active]:text-primary-foreground data-[state=inactive]:text-foreground/70 data-[state=inactive]:hover:text-foreground"
                  >
                    {selectedTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-md"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }}
                      />
                    )}
                    <span className="relative z-10 capitalize">{tab}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <TabsContent key={selectedTab} value={selectedTab} className="mt-4" forceMount>
                <motion.div 
                  key={selectedTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ 
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="relative w-full"
                >
                  {selectedTab === 'common' && !searchTerm && (
                    <div className="flex flex-wrap gap-2 items-center overflow-hidden">
                      {conversionCategories.common.slice(0, TOP_COMMON_COUNT).map((item) => (
                        <button
                          key={item.type}
                          onClick={() => handleTypeChange(item.type as ConversionType)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap animate-button animate-verified",
                            selectedType === item.type 
                              ? "bg-primary text-primary-foreground active-tab verified" 
                              : "bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 hover:shadow-md"
                          )}
                        >
                          {conversionIcons[item.type] || <Calculator size={18} />}
                          <span>{item.label}</span>
                        </button>
                      ))}
                      <AnimatePresence initial={false}>
                        {showAllCommon && (
                          <motion.div
                            key="extra"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                            className="flex flex-wrap gap-2 items-center overflow-hidden"
                          >
                            {conversionCategories.common.slice(TOP_COMMON_COUNT).map((item) => (
                              <button
                                key={item.type}
                                onClick={() => handleTypeChange(item.type as ConversionType)}
                                className={cn(
                                  "flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap animate-button animate-verified",
                                  selectedType === item.type 
                                    ? "bg-primary text-primary-foreground active-tab verified" 
                                    : "bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 hover:shadow-md"
                                )}
                              >
                                {conversionIcons[item.type] || <Calculator size={18} />}
                                <span>{item.label}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                  {selectedTab !== 'common' && !searchTerm && (
                    <div className="flex flex-wrap gap-2 items-center overflow-hidden">
                      {conversionCategories[selectedTab]?.map((item) => (
                        <button
                          key={item.type}
                          onClick={() => handleTypeChange(item.type as ConversionType)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap animate-button animate-verified",
                            selectedType === item.type 
                              ? "bg-primary text-primary-foreground active-tab verified" 
                              : "bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 hover:shadow-md"
                          )}
                        >
                          {conversionIcons[item.type] || <Calculator size={18} />}
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {selectedTab === 'common' && !searchTerm && (
                    <div className="mt-3">
                      <button
                        className="px-4 py-1 rounded bg-muted text-muted-foreground hover:bg-secondary/70 transition text-sm"
                        onClick={() => setShowAllCommon(v => !v)}
                      >
                        {showAllCommon ? 'Show Less' : 'Show More'}
                      </button>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            </AnimatePresence>
            </Tabs>
          </LayoutGroup>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className={showTips ? "w-full lg:w-9/12 animate-card" : "w-full lg:w-full animate-card"}>
            <ConversionCard
              category={selectedType}
              units={getUnitsForType(selectedType)}
              activePanel={activePanel}
              setActivePanel={setActivePanel}
            />
          </div>
          {showTips && (
            <div className="w-full lg:w-3/12 animate-card" style={{ animationDelay: '100ms' }}>
              <GlassmorphicCard variant="subtle" hover borderGlow className="bg-white/40 dark:bg-white/10 p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Conversion Tips</h3>
                  <button
                    className="ml-2 p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition"
                    onClick={() => {
                      setShowTips(false);
                      localStorage.setItem('showTips', 'false');
                    }}
                    title="Hide tips"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Quick Tips</h4>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-xs">
                      <li>• Use keyboard shortcuts for faster conversion</li>
                      <li>• Adjust decimal places in settings</li>
                      <li>• Copy results with one click</li>
                      <li>• View your conversion history</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">Did You Know?</h4>
                    <p className="text-green-700 dark:text-green-300 text-xs">
                      Hover over unit names to see helpful descriptions and learn more about each measurement.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-1">New Features</h4>
                    <ul className="text-purple-700 dark:text-purple-300 space-y-1 text-xs">
                      <li>• BMI Calculator</li>
                      <li>• Roman Numeral Converter</li>
                      <li>• Clothing & Shoe Sizes</li>
                      <li>• Wind Speed & Tire Pressure</li>
                    </ul>
                  </div>
                </div>
              </GlassmorphicCard>
            </div>
          )}
          {!showTips && (
            <div className="w-full lg:hidden flex justify-center mt-4">
              <button
                className="px-4 py-2 rounded bg-white/30 dark:bg-white/10 text-sm text-primary hover:bg-white/50 dark:hover:bg-white/20 transition"
                onClick={() => {
                  setShowTips(true);
                  localStorage.setItem('showTips', 'true');
                }}
              >
                Show Tips
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-20 glass rounded-xl p-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-display font-medium mb-2">Enhanced Features</h3>
            <p className="text-muted-foreground">
              Discover all the powerful features that make conversion effortless
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 animate-card hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="text-primary" size={24} />
              </div>
              <h4 className="text-lg font-medium mb-2">Customizable</h4>
              <p className="text-muted-foreground text-sm">
                Adjust decimal places, save preferences, and personalize your experience
              </p>
            </div>
            
            <div className="text-center p-4 animate-card hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-primary" size={24} />
              </div>
              <h4 className="text-lg font-medium mb-2">History Tracking</h4>
              <p className="text-muted-foreground text-sm">
                Keep track of your recent conversions with timestamps and easy copying
              </p>
            </div>
            
            <div className="text-center p-4 animate-card hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-primary" size={24} />
              </div>
              <h4 className="text-lg font-medium mb-2">Quick Shortcuts</h4>
              <p className="text-muted-foreground text-sm">
                Access common conversions instantly with keyboard shortcuts
              </p>
            </div>
            
            <div className="text-center p-4 animate-card hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="text-primary" size={24} />
              </div>
              <h4 className="text-lg font-medium mb-2">Educational</h4>
              <p className="text-muted-foreground text-sm">
                Learn about units with helpful tooltips and descriptions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnitConverter;