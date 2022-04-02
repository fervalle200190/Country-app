export interface CountryProps {
  response: Info[];
}

export interface Info {
  flags: string;
  name: string;
  population: number;
  region: string;
  capital: string;
}
