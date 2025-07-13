
import { useQuery } from '@tanstack/react-query';

// List of available currencies
export const currencies = [
  "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", 
  "HKD", "NZD", "SEK", "KRW", "SGD", "NOK", "MXN", "INR", 
  "RUB", "ZAR", "TRY", "BRL", "TWD"
];

// Free currency API endpoint
const API_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@latest/latest/currencies";

// Fetch exchange rates from base currency
const fetchExchangeRates = async (baseCurrency: string) => {
  try {
    const response = await fetch(`${API_URL}/${baseCurrency.toLowerCase()}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    const data = await response.json();
    return data[baseCurrency.toLowerCase()];
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

export const useCurrencyConverter = (baseCurrency: string = 'USD') => {
  const { data: rates, isLoading, error } = useQuery({
    queryKey: ['currencyRates', baseCurrency],
    queryFn: () => fetchExchangeRates(baseCurrency),
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  // Convert from base currency to target currency
  const convert = (amount: number, targetCurrency: string): number => {
    if (!rates || !rates[targetCurrency.toLowerCase()]) {
      return 0;
    }
    return amount * rates[targetCurrency.toLowerCase()];
  };

  return {
    convert,
    rates,
    isLoading,
    error,
    currencies
  };
};
