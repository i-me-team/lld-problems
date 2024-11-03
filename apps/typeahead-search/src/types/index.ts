// Virtual list types
interface ItemData {
  suggestions: string[];
  itemHeight: number;
  onSelect: (word: string) => void;
}

interface TypeaheadProps {
  words?: string[];
  placeholder?: string;
  className?: string;
  itemHeight?: number;
  visibleItems?: number;
}

// Types
interface TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;
  word: string | null;
}

export type { TypeaheadProps, TrieNode, ItemData };
