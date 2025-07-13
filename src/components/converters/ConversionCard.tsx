import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCcw, ArrowRightLeft, Copy, Trash2, Info, Settings } from 'lucide-react';
import AnimatedNumber from '@/components/ui-elements/AnimatedNumber';
import { ConversionType, getUnitsForType, convertValue } from '@/hooks/useUnitConverter';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface ConversionCardProps {
  category: ConversionType;
  units: { value: string; label: string }[];
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

const ConversionCard = ({ category, units }: ConversionCardProps) => {
  const [fromUnit, setFromUnit] = useState(units[0]?.value || '');
  const [toUnit, setToUnit] = useState(units[1]?.value || units[0]?.value || '');
  const [value, setValue] = useState(1);
  const [result, setResult] = useState(0);
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [history, setHistory] = useState<any[]>([]);
  const [inputError, setInputError] = useState('');
  const { toast } = useToast();
  
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
      setHistory(allHistory.filter((item: any) => item.category === category).slice(0, 10));
    }
  }, [category]);

  // Update units when category changes
  useEffect(() => {
    if (units.length > 0) {
      setFromUnit(units[0].value);
      setToUnit(units.length > 1 ? units[1].value : units[0].value);
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

  // Calculate result whenever inputs change
  useEffect(() => {
    if (!inputError && fromUnit && toUnit) {
      const convertedResult = convert(value, fromUnit, toUnit, category);
      setResult(convertedResult);
      
      // Add to history if it's a meaningful conversion
      if (value !== 0 && convertedResult !== 0 && fromUnit !== toUnit) {
        const historyItem = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          category,
          fromValue: value,
          fromUnit,
          toValue: convertedResult,
          toUnit,
          formattedResult: formatResult(convertedResult)
        };
        
        // Update local history
        const newHistory = [historyItem, ...history.filter(h => h.id !== historyItem.id)].slice(0, 10);
        setHistory(newHistory);
        
        // Update global history
        const allHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
        const updatedAllHistory = [historyItem, ...allHistory.filter((h: any) => h.id !== historyItem.id)].slice(0, 50);
        localStorage.setItem('conversionHistory', JSON.stringify(updatedAllHistory));
      }
    }
  }, [value, fromUnit, toUnit, category, decimalPlaces, inputError]);

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
    const filteredHistory = allHistory.filter((item: any) => item.category !== category);
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
    const filteredHistory = allHistory.filter((item: any) => item.id !== id);
    localStorage.setItem('conversionHistory', JSON.stringify(filteredHistory));
  };

  const applyQuickConversion = (quickConv: any) => {
    if (quickConv.category === category) {
      setFromUnit(quickConv.from);
      setToUnit(quickConv.to);
      setValue(1);
    }
  };

  // Get unit details for tooltips
  const getUnitDetails = (unitId: string) => {
    const unitDetails = getUnitsForType(category);
    return unitDetails.find(u => u.id === unitId);
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

  return (
    <Card className="w-full shadow-md border border-gray-100 dark:border-gray-800">
      <CardContent className="pt-6">
        <Tabs defaultValue="convert" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="convert">Convert</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="shortcuts">Quick</TabsTrigger>
          </TabsList>
          
          <TabsContent value="convert" className="space-y-6">
            {/* Settings Row */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Decimal Places:</span>
                <select 
                  value={decimalPlaces} 
                  onChange={(e) => setDecimalPlaces(Number(e.target.value))}
                  className="px-2 py-1 rounded border bg-background text-sm"
                >
                  {[2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  From
                  {getUnitDetails(fromUnit)?.description && (
                    <div className="group relative">
                      <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {getUnitDetails(fromUnit)?.description}
                      </div>
                    </div>
                  )}
                </label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
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
                    className={cn("mt-2", inputError && "border-red-500")}
                    placeholder="Enter value"
                  />
                  {inputError && (
                    <p className="text-xs text-red-500">{inputError}</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center my-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={switchUnits} 
                  className="rounded-full h-10 w-10"
                  title="Swap units (or press Tab)"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  To
                  {getUnitDetails(toUnit)?.description && (
                    <div className="group relative">
                      <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {getUnitDetails(toUnit)?.description}
                      </div>
                    </div>
                  )}
                </label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <AnimatedNumber 
                    value={result} 
                    className="text-lg font-medium" 
                    decimals={decimalPlaces}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyResult(formatResult(result))}
                    className="ml-2 h-6 w-6 p-0"
                    title="Copy result"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <p className="text-sm text-center text-blue-700 dark:text-blue-300">
                  {value} {fromUnit} = {formatResult(result)} {toUnit}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Recent Conversions</h3>
              {history.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearHistory}>
                  Clear All
                </Button>
              )}
            </div>
            
            {history.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No conversion history yet</p>
                <p className="text-sm mt-1">Your recent conversions will appear here</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {history.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {item.fromValue} {item.fromUnit} → {item.formattedResult} {item.toUnit}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(item.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyResult(item.formattedResult)}
                        className="h-6 w-6 p-0"
                        title="Copy result"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearHistoryItem(item.id)}
                        className="h-6 w-6 p-0"
                        title="Remove from history"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="shortcuts" className="space-y-4">
            <h3 className="text-lg font-medium">Quick Conversions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {quickConversions.map((quick, index) => (
                <Button
                  key={index}
                  variant={quick.category === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => applyQuickConversion(quick)}
                  disabled={quick.category !== category}
                  className="text-xs"
                >
                  {quick.label}
                </Button>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Keyboard Shortcuts</h4>
              <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <div><kbd className="px-1 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs">Enter</kbd> Convert (when typing)</div>
                <div><kbd className="px-1 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs">Escape</kbd> Reset values</div>
                <div><kbd className="px-1 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs">Tab</kbd> Navigate between fields</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-end border-t border-gray-100 dark:border-gray-800 py-3">
        <Button variant="ghost" size="sm" onClick={resetValues} className="text-xs">
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConversionCard;