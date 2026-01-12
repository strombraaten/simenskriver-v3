import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import GraphConstructor from "./Graph"
// @ts-ignore
import script from "./scripts/graph.inline"
import style from "./styles/graph.scss"

// Graph component that only shows if showGraph is true in frontmatter
export default ((): QuartzComponentConstructor => {
  const Graph = GraphConstructor()
  
  function ConditionalGraph(props: QuartzComponentProps) {
    const showGraph = props.fileData.frontmatter?.showGraph === true || 
                      props.fileData.frontmatter?.showGraph === "true"
    
    if (!showGraph) {
      return null
    }

    return <Graph {...props} />
  }

  ConditionalGraph.css = style
  ConditionalGraph.afterDOMLoaded = script

  return ConditionalGraph
}) satisfies QuartzComponentConstructor

