export interface SapCpiDesign {
  flow: string;
  steps: string[];
  mappings?: string[];
  adapters?: string[];
  errorHandling?: string;
}

export interface Analysis {
  summary: string;
  complexity: string;
  reasoning: string;
  sapCpiDesign: SapCpiDesign;
}