import Typeahead from './components/Typeahead.tsx';

export default function App() {
  // Generate a large list of words for testing
  const largeWordList = Array.from(
    { length: 10000 },
    (_, i) => `word-${i.toString().padStart(5, '0')}`,
  );

  return (
    <div className="p-4">
      <Typeahead
        words={largeWordList}
        placeholder="Search items..."
        className="max-w-md"
        itemHeight={40}
        visibleItems={8}
      />
    </div>
  );
}
