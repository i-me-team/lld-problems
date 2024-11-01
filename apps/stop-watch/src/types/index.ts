// Interface for Stopwatch state
interface StopwatchState {
  isRunning: boolean;
  time: number; // time in milliseconds
}

// Interface for formatted time
interface FormattedTime {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export type { StopwatchState, FormattedTime };
