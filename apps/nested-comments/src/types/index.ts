// TreeNode
type TreeNode = {
  id: number;
  label: string;
  link: string;
  children?: TreeNode[];
};

// Sidebar Tree type
type SidebarProps = { data: TreeNode[] };

export type { TreeNode, SidebarProps };
