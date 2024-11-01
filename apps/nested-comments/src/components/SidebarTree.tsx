import { useState } from 'react';
import type { SidebarProps, TreeNode } from '../types/index.ts';
import { ChevronDown, ChevronRight } from 'lucide-react';

const SidebarTree: React.FC<SidebarProps> = ({ data }) => {
  const [openNodes, setOpenNodes] = useState<number[]>([]);

  function toggleNode(id: number) {
    if (openNodes.includes(id)) {
      setOpenNodes(openNodes.filter((nodeId) => nodeId !== id));
    } else {
      setOpenNodes([...openNodes, id]);
    }
  }

  function renderNode(node: TreeNode, level: number): JSX.Element {
    const { id, label, link } = node;

    const isOpen = openNodes.includes(id);
    const indent = level * 16;

    return (
      <section key={id} className={`py-1, pl-${indent}`}>
        <a
          href={link}
          className="hover:underline cursor-pointer flex items-center text-[#0097e6]"
          onClick={(e) => {
            e.preventDefault();
            toggleNode(id);
          }}
        >
          {node.children &&
            (isOpen ? (
              <ChevronDown size={16} className="mr-2" />
            ) : (
              <ChevronRight size={16} className="mr-2" />
            ))}
          {label}
        </a>
        {isOpen && node.children && (
          <section className="ml-4">
            {node.children!.map((cn) => renderNode(cn, level + 1))}
          </section>
        )}
      </section>
    );
  }

  return (
    <main className="bg-[#23272a] text-white p-4">
      {data.map((datum) => renderNode(datum, 0))}
    </main>
  );
};
export default SidebarTree;
