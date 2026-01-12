import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { JSX } from "preact"
import style from "./styles/currentlyIn.scss"

interface CurrentlyInOptions {
  currentLocation?: string
  nextLocation?: string
}

export default ((opts?: CurrentlyInOptions): QuartzComponentConstructor => {
  const options: CurrentlyInOptions = {
    currentLocation: opts?.currentLocation || "Thailand",
    nextLocation: opts?.nextLocation || "Japan",
  }

  function CurrentlyIn({ displayClass }: QuartzComponentProps) {
    return (
      <div class={classNames(displayClass, "currently-in")}>
        <h3>Currently In</h3>
        <div class="location">
          <strong>{options.currentLocation}</strong>
        </div>
        {options.nextLocation && (
          <>
            <div class="next-label">Next</div>
            <div class="location next">
              <strong>{options.nextLocation}</strong>
            </div>
          </>
        )}
      </div>
    )
  }

  CurrentlyIn.css = style

  return CurrentlyIn
}) satisfies QuartzComponentConstructor

