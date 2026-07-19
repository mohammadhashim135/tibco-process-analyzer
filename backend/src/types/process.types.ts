export interface Activity {
  name: string;
  type: string;
}

export interface Transition {
  from: string;
  to: string;
  condition: string;
}

export interface ProcessVariable {
  name: string;
  type: string;
}

export interface ErrorHandler {
  name: string;
}

export interface ProcessModel {
  processName: string;
  start: string;
  end: string;

  activities: Activity[];
  groups: Activity[];

  transitions: Transition[];

  variables: ProcessVariable[];

  errorHandlers: ErrorHandler[];
}