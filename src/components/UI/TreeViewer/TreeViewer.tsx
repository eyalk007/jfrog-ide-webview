import { useState } from 'react'
import { TreeNode } from '../../../model/treeNode'
import Header from './Header'
import TreeContainer from './TreeContainer'
import css from './TreeViewer.module.css'

export interface Props {
  id: string
  root: TreeNode
  height: number
  width:number
}

const TreeViewer = (props: Props) => {
	const filterHandler = (filter: string) => {
		setFilter(filter)
	}
	const activeNodeHandler = (nodeName: string) => {
		setActiveNode(nodeName)
	}
	const [filter, setFilter] = useState('')
	const [activeNode, setActiveNode] = useState(undefined as string | undefined)
	return (
		<div id="container" className={css.container}>
			<Header filter={filter} setFilter={filterHandler} setActiveNode={activeNodeHandler}/>
			<TreeContainer
				id={props.id}
				activeNode={activeNode}
				root={props.root}
				filter={filter}
				height={props.height}
				width={props.width}
				handleClick={activeNodeHandler}/>
		</div>
	)
}
export default TreeViewer