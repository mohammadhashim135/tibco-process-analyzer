export interface Activity {
  name: string;
  type: string;
}

export interface Group {
  name: string;
  type: string;
}

export interface Transition {
  from: string;
  to: string;
  condition: string;
}

export interface ProcessModel {
  processName: string;
  start: string;
  end: string;
  activities: Activity[];
  groups: Group[];
  transitions: Transition[];
  variables: [];
  errorHandlers: [];
}