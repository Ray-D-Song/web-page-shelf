import { useState } from 'react'

export interface FolderTreeNode {
  name: string
  children: Array<FolderTreeNode>
  parent?: FolderTreeNode
  expanded: boolean
  path: string
}

interface DataNode {
  name: string
  children: Array<DataNode>
}

interface FileFolderTreeProps {
  treeData: Array<DataNode>
  onClickNode?: (node: FolderTreeNode) => void
}

function dataNode2TreeNode(dataNode: DataNode, parent?: FolderTreeNode): FolderTreeNode {
  const path = parent ? `${parent.path}/${dataNode.name}` : `/${dataNode.name}`
  const node = {
    name: dataNode.name,
    children: [] as Array<FolderTreeNode>,
    parent,
    path,
    expanded: true,
  }
  node.children = dataNode.children.map(child => dataNode2TreeNode(child, node))
  return node
}

function FileFolderTree({ treeData, onClickNode }: FileFolderTreeProps) {
  const tree = treeData.map(dataNode => dataNode2TreeNode(dataNode))
  const [currentNode, setCurrentNode] = useState<FolderTreeNode | null>(null)
  return (
    <ul className="space-y-1">
      {
        tree.map(node => (
          <FileTreeNode
            key={node.name}
            node={node}
            onClickNode={onClickNode}
            currentNode={currentNode}
            setCurrentNode={setCurrentNode}
          />
        ))
      }
    </ul>
  )
}

interface FileTreeNodeProps {
  node: FolderTreeNode
  onClickNode?: FileFolderTreeProps['onClickNode']
  currentNode?: FolderTreeNode | null
  setCurrentNode: (node: FolderTreeNode) => void
}

function FileTreeNode({ node, onClickNode, currentNode, setCurrentNode }: FileTreeNodeProps) {
  const [expanded, setExpanded] = useState(node.expanded)

  function handleClickFolder() {
    setExpanded(!expanded)
    handleClickLeaf()
  }

  function handleClickLeaf() {
    setCurrentNode(node)
    console.log(node === currentNode, node, currentNode)
    onClickNode && onClickNode(node)
  }

  const selectStyle = node.path === currentNode?.path ? 'bg-gray-100' : ''

  return (
    node.children.length === 0
      ? (
        <li>
          <span
            className={`${selectStyle} hover: block select-none rounded-lg px-4 py-2 text-sm text-gray-700 font-medium dark:bg-gray-800 hover:bg-gray-100 dark:text-gray-200 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200`}
            onClick={handleClickLeaf}
          >
            {node.name}
          </span>
        </li>
        )
      : (
        <li>
          <details open className="[&_summary::-webkit-details-marker]:hidden">
            <summary
              className={`${selectStyle} flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200`}
              onClick={handleClickFolder}
            >
              <span className="select-none text-sm font-medium">
                {node.name}
              </span>

              <span className={`shrink-0 transition duration-300 ${expanded ? 'rotate-180' : ''}`}>
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
                    <FileTreeNode
                      key={childNode.name}
                      node={childNode}
                      onClickNode={onClickNode}
                      currentNode={currentNode}
                      setCurrentNode={setCurrentNode}
                    />
                  ))
                }
            </ul>
          </details>
        </li>
        )
  )
}

export default FileFolderTree
