interface TreeNode {
  name: string
  children: Array<TreeNode>
}

interface FileFolderTreeProps {
  treeData: Array<TreeNode>
}

function FileFolderTree({ treeData }: FileFolderTreeProps) {
  return (
    <ul className="space-y-1">
      {
      treeData.map(node => (
        <FileTreeNode key={node.name} node={node} />
      ))
      }
    </ul>
  )
}

function FileTreeNode({ node }: { node: TreeNode }) {
  return (
    node.children.length === 0
      ? (
        <li>
          <span className="block rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 font-medium">
            {node.name}
          </span>
        </li>
        )
      : (
        <li>
          <details open className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="text-sm font-medium">
                {node.name}
              </span>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul className="mt-2 px-4 space-y-1">
              {
                node.children.map(childNode => (
                  <FileTreeNode key={childNode.name} node={childNode} />
                ))
              }
            </ul>
          </details>
        </li>
        )
  )
}

export default FileFolderTree
