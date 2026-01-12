import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/whyField.scss"

const WhyField: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const why = fileData.frontmatter?.why
  
  if (!why) {
    return null
  }
  
  // Convert why values to human-readable text
  const whyText: Record<string, string> = {
    keep: "keep",
    remember: "remember",
    think: "think",
    "work-out": "work out",
    share: "share",
  }
  
  // Handle both single value and array
  const whyValues = Array.isArray(why) ? why : [why]
  const displayValues = whyValues.map(w => whyText[w] || w)
  
  // Format: "This is to: remember and share" or "This is to: remember"
  let displayText = displayValues[0]
  if (displayValues.length === 2) {
    displayText = `${displayValues[0]} and ${displayValues[1]}`
  } else if (displayValues.length > 2) {
    const last = displayValues.pop()
    displayText = `${displayValues.join(", ")}, and ${last}`
  }
  
  return (
    <div class={classNames(displayClass, "why-field-wrapper")}>
      <p class="why-text">
        This is to: <span class="why-value">{displayText}</span>
      </p>
    </div>
  )
}

WhyField.css = style

export default (() => WhyField) satisfies QuartzComponentConstructor

