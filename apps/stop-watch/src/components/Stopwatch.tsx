import { useEffect, useState } from 'react';
import type { FormattedTime, StopwatchState } from '../types/index.ts';

const Stopwatch: React.FC = () => {
  // State to track stopwatch status and time
  const [stopwatchState, setStopwatchState] = useState<StopwatchState>({
    isRunning: false,
    time: 0,
  });

  // Interval reference to manage timer
  const [intervalId, setIntervalId] = useState<number | null>(null);

  // Utility function to format time
  const formatTime = (totalMilliseconds: number): FormattedTime => {
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const milliseconds = totalMilliseconds % 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds, milliseconds };
  };

  // Start the stopwatch
  const startStopwatch = () => {
    if (!stopwatchState.isRunning) {
      const startTime = Date.now() - stopwatchState.time;

      const newIntervalId = setInterval(() => {
        setStopwatchState((_) => ({
          isRunning: true,
          time: Date.now() - startTime,
        }));
      }, 10); // Update every 10ms for smooth millisecond tracking

      setIntervalId(newIntervalId);
    }
  };

  // Pause the stopwatch
  const pauseStopwatch = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setStopwatchState((prevState) => ({
        ...prevState,
        isRunning: false,
      }));
    }
  };

  // Reset the stopwatch
  const resetStopwatch = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setStopwatchState({
      isRunning: false,
      time: 0,
    });
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  // Destructure formatted time
  const { hours, minutes, seconds, milliseconds } = formatTime(
    stopwatchState.time,
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-2">Stopwatch</h1>
      <div className="">
        {hours.toString().padStart(2, '0')}:
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}.
        {milliseconds.toString().padStart(3, '0')}
      </div>
      <div className="controls">
        {!stopwatchState.isRunning ? (
          <button onClick={startStopwatch}>Start</button>
        ) : (
          <button onClick={pauseStopwatch}>Pause</button>
        )}
        <button onClick={resetStopwatch}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
