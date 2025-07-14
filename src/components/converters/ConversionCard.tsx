import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCcw, ArrowRightLeft, Copy, Trash2, Info, Settings } from 'lucide-react';
import AnimatedNumber from '@/components/ui-elements/AnimatedNumber';
import { ConversionType } from './types';
import { getUnitsForType, convertValue } from './useUnitConverter';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';

export interface ConversionHistoryItem {
  id: number;
  timestamp: string;
  category: ConversionType;
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
  formattedResult: string;
}

interface ConversionCardProps {
  category: ConversionType;
  units: { value: string; label: string }[];
  activePanel: 'convert' | 'history' | 'quick';
  setActivePanel: (panel: 'convert' | 'history' | 'quick') => void;
}

// Quick conversion shortcuts
const quickConversions = [
  { label: 'cm → in', from: 'cm', to: 'in', category: 'length' as ConversionType },
  { label: 'kg → lbs', from: 'kg', to: 'lb', category: 'weight' as ConversionType },
  { label: '°C → °F', from: 'c', to: 'f', category: 'temperature' as ConversionType },
  { label: 'L → gal', from: 'l', to: 'gal', category: 'volume' as ConversionType },
  { label: 'mi → km', from: 'mi', to: 'km', category: 'length' as ConversionType },
  { label: 'm → ft', from: 'm', to: 'ft', category: 'length' as ConversionType },
  { label: 'g → oz', from: 'g', to: 'oz', category: 'weight' as ConversionType }
];

const ConversionCard = ({ category, units, activePanel, setActivePanel }: ConversionCardProps) => {
  const [fromUnit, setFromUnit] = useState(units[0]?.value || '');
  const [toUnit, setToUnit] = useState(units[1]?.value || units[0]?.value || '');
  const [value, setValue] = useState(1);
  const [result, setResult] = useState(0);
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);
  const [inputError, setInputError] = useState('');
  const { toast } = useToast();
  // REMOVE: const [activeTab, setActiveTab] = useState('convert');
  const [shouldRecord, setShouldRecord] = useState(false);
  
  // Load preferences and history
  useEffect(() => {
    const savedPreferences = localStorage.getItem('converterPreferences');
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      setDecimalPlaces(prefs.decimalPlaces || 2);
    }
    
    const savedHistory = localStorage.getItem('conversionHistory');
    if (savedHistory) {
      const allHistory = JSON.parse(savedHistory);
      setHistory(allHistory.filter((item: ConversionHistoryItem) => item.category === category).slice(0, 10));
    }
  }, [category]);

  // Update units when category changes
  useEffect(() => {
    if (units.length > 0) {
      setFromUnit(units[0].value);
      setToUnit(units.length > 1 ? units[1].value : units[0].value);
    }
  }, [units, category]);

  // When units or category change, reset value/result and prevent history recording
  useEffect(() => {
    if (units.length > 0) {
      setFromUnit(units[0].value);
      setToUnit(units.length > 1 ? units[1].value : units[0].value);
      setValue(1);
      setResult(0);
      setShouldRecord(false); // Prevent recording default conversion
    }
  }, [units, category]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numValue = parseFloat(inputValue);
    
    // Input validation
    if (inputValue === '') {
      setValue(0);
      setInputError('');
      return;
    }
    
    if (isNaN(numValue)) {
      setInputError('Please enter a valid number');
      return;
    }
    
    // Check for negative values where inappropriate
    if (numValue < 0 && ['temperature', 'data', 'frequency', 'energy'].includes(category)) {
      if (category === 'temperature' && fromUnit !== 'c' && fromUnit !== 'f') {
        setInputError('Kelvin cannot be negative');
        return;
      }
      if (category !== 'temperature') {
        setInputError('Value cannot be negative');
        return;
      }
    }
    
    setInputError('');
    setValue(numValue);
  };

  // Enhanced conversion function
  const convert = (value: number, fromUnit: string, toUnit: string, category: ConversionType): number => {
    try {
      return convertValue(value, fromUnit, toUnit, category);
    } catch (error) {
      console.error('Conversion error:', error);
      return 0;
    }
  };

  // Only record conversion when user submits (Enter or Convert button)
  const handleConvert = () => {
    if (!inputError && fromUnit && toUnit) {
      const convertedResult = convert(value, fromUnit, toUnit, category);
      setResult(convertedResult);
      setShouldRecord(true);
    }
  };

  // Listen for Enter key to trigger conversion
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement?.tagName === 'INPUT') {
        handleConvert();
      } else if (e.key === 'Escape') {
        resetValues();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [value, fromUnit, toUnit, category, inputError]);

  // Only record in history if shouldRecord is true
  useEffect(() => {
    if (shouldRecord && !inputError && fromUnit && toUnit && value !== 0 && result !== 0 && fromUnit !== toUnit) {
      const historyItem: ConversionHistoryItem = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        category,
        fromValue: value,
        fromUnit,
        toValue: result,
        toUnit,
        formattedResult: formatResult(result)
      };
      const newHistory = [historyItem, ...history.filter(h => h.id !== historyItem.id)].slice(0, 10);
      setHistory(newHistory);
      const allHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
      const updatedAllHistory = [historyItem, ...allHistory.filter((h: ConversionHistoryItem) => h.id !== historyItem.id)].slice(0, 50);
      localStorage.setItem('conversionHistory', JSON.stringify(updatedAllHistory));
      setShouldRecord(false);
    }
  }, [shouldRecord, result]);

  // Format result for display
  const formatResult = (result: number): string => {
    if (isNaN(result)) return "Error";
    if (category === 'roman' && toUnit === 'roman') {
      // Handle roman numeral display
      return convertToRoman(Math.round(result));
    }
    return result.toFixed(decimalPlaces);
  };

  // Roman numeral conversion helper
  const convertToRoman = (num: number): string => {
    if (num < 1 || num > 3999) return "Out of range";
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let result = '';
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        result += numerals[i];
        num -= values[i];
      }
    }
    return result;
  };

  const switchUnits = () => {
    const tempFromUnit = fromUnit;
    const tempToUnit = toUnit;
    
    setFromUnit(tempToUnit);
    setToUnit(tempFromUnit);
    
    toast({
      title: "Units switched",
      description: `Switched from ${tempFromUnit} to ${tempToUnit}`,
      duration: 2000,
    });
  };

  const resetValues = () => {
    setValue(1);
    setFromUnit(units[0]?.value || '');
    setToUnit(units[1]?.value || units[0]?.value || '');
    setInputError('');
  };

  const copyResult = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard",
      duration: 1500,
    });
  };

  const clearHistory = () => {
    setHistory([]);
    const allHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    const filteredHistory = allHistory.filter((item: ConversionHistoryItem) => item.category !== category);
    localStorage.setItem('conversionHistory', JSON.stringify(filteredHistory));
    
    toast({
      title: "History cleared",
      description: "Conversion history has been cleared",
      duration: 2000,
    });
  };

  const clearHistoryItem = (id: number) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    
    const allHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    const filteredHistory = allHistory.filter((item: ConversionHistoryItem) => item.id !== id);
    localStorage.setItem('conversionHistory', JSON.stringify(filteredHistory));
  };

  const applyQuickConversion = (quickConv: { from: string; to: string; category: ConversionType }) => {
    if (quickConv.category === category) {
      setFromUnit(quickConv.from);
      setToUnit(quickConv.to);
      setValue(1);
    }
  };

  // Get unit details for tooltips
  const getUnitDetails = (unitId: string) => {
    const unitDetails = getUnitsForType(category);
    return unitDetails.find(u => u.value === unitId);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement?.tagName === 'INPUT') {
        // Already handled by input change
      } else if (e.key === 'Escape') {
        resetValues();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const [historyVisible, setHistoryVisible] = useState(true);
  const clearHistoryAnimated = () => {
    setHistoryVisible(false);
    setTimeout(() => {
      clearHistory();
      setHistoryVisible(true);
    }, 300); // Match fade-out duration
  };

  // Panel rendering logic
  const renderConvertPanel = () => (
    <CardContent className="pt-6">
      {/* Settings Row */}
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-card mb-4">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-muted-foreground hidden sm:block" />
          <span className="text-xs sm:text-sm font-medium">Decimal Places:</span>
          <select 
            value={decimalPlaces} 
            onChange={(e) => setDecimalPlaces(Number(e.target.value))}
            className="px-2 py-1 rounded border bg-background text-xs sm:text-sm animate-input focus-ring touch-manipulation"
          >
            {[2, 3, 4, 5, 6].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-3">
        {/* From Unit */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium flex items-center gap-1">
            From
            {getUnitDetails(fromUnit)?.label && (
              <div className="group relative hidden sm:block">
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 animate-smooth whitespace-nowrap z-10 pointer-events-none">
                  {getUnitDetails(fromUnit)?.label}
                </div>
              </div>
            )}
          </label>
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger className="w-full h-12 sm:h-10 text-sm sm:text-base touch-manipulation">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit.value} value={unit.value} className="text-sm sm:text-base py-3 sm:py-2 touch-manipulation">
                  {unit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="space-y-1">
            <Input
              type="number"
              value={value.toString()}
              onChange={handleInputChange}
              className={cn("mt-2 h-12 sm:h-10 text-base sm:text-sm touch-manipulation", inputError && "border-red-500")}
              placeholder="Enter value"
            />
            {inputError && (
              <p className="text-xs text-red-500">{inputError}</p>
            )}
          </div>
        </div>
        
        {/* Swap Button */}
        <div className="flex justify-center my-2 sm:my-0 order-2 sm:order-none">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={switchUnits} 
            className="rounded-full h-12 w-12 sm:h-10 sm:w-10 animate-button hover:rotate-180 touch-manipulation"
            title="Swap units (or press Tab)"
          >
            <ArrowRightLeft className="h-5 w-5 sm:h-4 sm:w-4" />
          </Button>
        </div>
        
        {/* To Unit */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium flex items-center gap-1">
            To
            {getUnitDetails(toUnit)?.label && (
              <div className="group relative hidden sm:block">
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 animate-smooth whitespace-nowrap z-10 pointer-events-none">
                  {getUnitDetails(toUnit)?.label}
                </div>
              </div>
            )}
          </label>
          <Select value={toUnit} onValueChange={setToUnit}>
            <SelectTrigger className="w-full h-12 sm:h-10 text-sm sm:text-base touch-manipulation">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit.value} value={unit.value} className="text-sm sm:text-base py-3 sm:py-2 touch-manipulation">
                  {unit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-2 p-4 sm:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-100 dark:border-gray-800 flex items-center justify-between animate-card min-h-[48px] sm:min-h-[40px]">
            <AnimatedNumber 
              value={result} 
              className="text-base sm:text-lg font-medium" 
              decimals={decimalPlaces}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyResult(formatResult(result))}
              className="ml-2 h-8 w-8 sm:h-6 sm:w-6 p-0 animate-button touch-manipulation"
              title="Copy result"
            >
              <Copy className="h-4 w-4 sm:h-3 sm:w-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 sm:p-3 animate-card">
          <p className="text-xs sm:text-sm text-center text-blue-700 dark:text-blue-300">
            {value} {fromUnit} = {formatResult(result)} {toUnit}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
        <Button
          variant="default"
          onClick={handleConvert}
          className="flex-1 sm:flex-none animate-button h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
        >
          Convert
        </Button>
        <Button
          variant="outline"
          onClick={resetValues}
          className="flex-1 sm:flex-none animate-button h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
        >
          Reset
        </Button>
      </div>
    </CardContent>
  );

  const renderHistoryPanel = () => (
    <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-card mb-4">
        <h3 className="text-base sm:text-lg font-medium">Recent Conversions</h3>
        {history.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearHistoryAnimated} className="animate-button text-xs sm:text-sm touch-manipulation">
            Clear All
          </Button>
        )}
      </div>
      {history.length === 0 ? (
        <div className="text-center py-12 sm:py-8 text-muted-foreground">
          <p className="text-sm sm:text-base">No conversion history yet</p>
          <p className="text-xs sm:text-sm mt-1">Your recent conversions will appear here</p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-2 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
          {history.map((item) => (
            <div key={item.id} className="flex items-start sm:items-center justify-between p-4 sm:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-card">
              <div className="flex-1">
                <div className="text-sm sm:text-sm font-medium break-all">
                  {item.fromValue} {item.fromUnit} → {item.formattedResult} {item.toUnit}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-1 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyResult(item.formattedResult)}
                  className="h-8 w-8 sm:h-6 sm:w-6 p-0 animate-button touch-manipulation"
                  title="Copy result"
                >
                  <Copy className="h-4 w-4 sm:h-3 sm:w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearHistoryItem(item.id)}
                  className="h-8 w-8 sm:h-6 sm:w-6 p-0 animate-button touch-manipulation"
                  title="Remove from history"
                >
                  <Trash2 className="h-4 w-4 sm:h-3 sm:w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  );

  const renderQuickPanel = () => (
    <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
      <h3 className="text-base sm:text-lg font-medium mb-4">Quick Conversions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {quickConversions.map((quick, index) => (
          <Button
            key={index}
            variant={quick.category === category ? "default" : "outline"}
            size="sm"
            onClick={() => applyQuickConversion(quick)}
            disabled={quick.category !== category}
            className="text-xs sm:text-xs animate-button h-10 sm:h-8 touch-manipulation"
          >
            {quick.label}
          </Button>
        ))}
      </div>
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg animate-card hidden sm:block">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base">Keyboard Shortcuts</h4>
        <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <div><kbd className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded text-xs animate-shimmer">Enter</kbd> Convert (when typing)</div>
          <div><kbd className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded text-xs animate-shimmer">Escape</kbd> Reset values</div>
          <div><kbd className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded text-xs animate-shimmer">Tab</kbd> Navigate between fields</div>
        </div>
      </div>
    </CardContent>
  );

  return (
    <Card className="w-full shadow-md border border-gray-100 dark:border-gray-800 animate-fade-in mx-4 sm:mx-0">
      <div className="pt-4 sm:pt-6 pb-4 sm:pb-6">
        <div className="flex justify-start pl-4 sm:pl-6">
          <LayoutGroup>
            <Tabs
            value={activePanel}
            onValueChange={(v) => {
              if (v === 'convert' || v === 'history' || v === 'quick') setActivePanel(v);
            }}
            className="w-full animate-smooth"
          >
            <TabsList className="flex gap-4 sm:gap-6 lg:gap-8 mb-4 animate-smooth px-0 bg-transparent relative overflow-x-auto">
              {['convert', 'history', 'quick'].map((panel) => (
                <TabsTrigger 
                  key={panel}
                  value={panel}
                  className="relative z-10 px-3 sm:px-4 py-2 transition-colors duration-200 data-[state=active]:text-primary-foreground data-[state=inactive]:text-foreground/70 data-[state=inactive]:hover:text-foreground bg-transparent text-sm sm:text-base whitespace-nowrap touch-manipulation"
                >
                  {activePanel === panel && (
                    <motion.div
                      layoutId="activePanelTab"
                      className="absolute inset-0 bg-primary rounded-md"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                  <span className="relative z-10 capitalize">{panel}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            </Tabs>
          </LayoutGroup>
        </div>
        
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activePanel}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ 
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {activePanel === 'convert' && renderConvertPanel()}
            {activePanel === 'history' && renderHistoryPanel()}
            {activePanel === 'quick' && renderQuickPanel()}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default ConversionCard;
    <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">