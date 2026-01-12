// @ts-ignore
import scrollbarScript from "./scripts/scrollbar.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Minimal component that just adds the scrollbar script
// No UI needed - scrollbars are handled via CSS and JavaScript
const Scrollbar: QuartzComponent = (_props: QuartzComponentProps) => {
  return null // No UI component needed
}

Scrollbar.afterDOMLoaded = scrollbarScript

export default (() => Scrollbar) satisfies QuartzComponentConstructor
