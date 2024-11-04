import type { TrieNode } from '../types/index.ts';

export default class Trie {
  root: TrieNode;

  constructor() {
    this.root = {
      children: {},
      isEndOfWord: false,
      word: null,
    };
  }

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = {
          children: {},
          isEndOfWord: false,
          word: null,
        };
      }
      node = node.children[ch];
    }
    node.isEndOfWord = true;
    node.word = word;
  }

  startsWith(prefix: string): TrieNode | null {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) {
        return null;
      }
      node = node.children[ch];
    }
    return node;
  }

  getWordsFromPrefix(prefix: string): string[] {
    const node = this.startsWith(prefix);
    const result: string[] = [];

    const iterateTrie = (node: TrieNode): void => {
      if (node.isEndOfWord && node.word) {
        result.push(node.word);
      }
      for (const ch in node.children) {
        iterateTrie(node.children[ch]);
      }
    };

    if (node) {
      iterateTrie(node);
    }
    return result;
  }
}
