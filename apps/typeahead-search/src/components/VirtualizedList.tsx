import { useCallback, useEffect, useRef, useState } from 'react';
import type { ItemData } from '../types/index.ts';

const VirtualizedList: React.FC<{
  data: ItemData;
  containerHeight: number;
}> = ({ data, containerHeight }) => {
  const { suggestions, itemHeight, onSelect } = data;
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
  const [_, setScrollTop] = useState(0);

  const totalHeight = suggestions.length * itemHeight;
  const visibleItemCount = Math.ceil(containerHeight / itemHeight);

  const updateVisibleRange = useCallback(() => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(start + visibleItemCount + 2, suggestions.length);

    setVisibleRange({ start: Math.max(0, start - 2), end });
    setScrollTop(scrollTop);
  }, [itemHeight, visibleItemCount, suggestions.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateVisibleRange();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(container);
    container.addEventListener('scroll', updateVisibleRange);

    return () => {
      observer.disconnect();
      container.removeEventListener('scroll', updateVisibleRange);
    };
  }, [updateVisibleRange]);

  const visibleItems = suggestions
    .slice(visibleRange.start, visibleRange.end)
    .map((suggestion, index) => ({
      suggestion,
      index: index + visibleRange.start,
    }));

  return (
    <div
      ref={containerRef}
      className="overflow-auto"
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ suggestion, index }) => (
          <div
            key={index}
            onClick={() => onSelect(suggestion)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer absolute w-full"
            style={{
              top: index * itemHeight,
              height: itemHeight,
            }}
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedList;
