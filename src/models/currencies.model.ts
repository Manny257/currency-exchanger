export interface currenciesResponse {
  success: string;
  symbols: { [key: string]: string };
}

export interface convertResponse {
  success: string;
  timestamp: number;
  query: { [key: string]: string | number };
  date: string;
  result: number;
}

export interface currency {
  symbol: string;
  fullName: string;
}

export interface latestRateResponse {
  success: string;
  timestamp: number;
  rates: { [key: string]: number };
  date: string;
  base: string;
}
