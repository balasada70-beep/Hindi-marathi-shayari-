
export enum Language {
  Hindi = 'hindi',
  Marathi = 'marathi',
}

export interface WebSource {
  uri: string;
  title: string;
}

export interface Source {
  web?: WebSource;
}

export interface ShayriResult {
  text: string;
  sources?: Source[];
}
