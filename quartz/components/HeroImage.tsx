import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { JSX } from "preact"
import style from "./styles/heroImage.scss"
import { slugifyFilePath, isFilePath } from "../util/path"

export default ((): QuartzComponentConstructor => {
  function HeroImage({ fileData, displayClass }: QuartzComponentProps) {
    // Don't show on index page or if no hero image
    if (fileData.slug === "index") {
      return null
    }

    // Check for heroImage in frontmatter (with aliases: hero, coverImage)
    const heroImage = 
      fileData.frontmatter?.heroImage ||
      fileData.frontmatter?.hero ||
      fileData.frontmatter?.coverImage

    if (!heroImage) {
      return null
    }

    // Resolve image path - handle both relative and absolute URLs
    let imageSrc = heroImage
    if (!imageSrc.startsWith("http") && !imageSrc.startsWith("//")) {
      // Relative path - slugify to match how Assets plugin processes files
      // This ensures paths like /Travel/thailand/3B3F55DE-B4D3.jpeg
      // become /Travel/thailand/3b3f55de-b4d3.jpeg (lowercase)
      if (imageSrc.startsWith("/")) {
        // Remove leading slash for slugify, then add it back
        const pathWithoutSlash = imageSrc.slice(1)
        if (isFilePath(pathWithoutSlash)) {
          imageSrc = `/${slugifyFilePath(pathWithoutSlash)}`
        } else {
          // If not a valid file path, just ensure it starts with /
          imageSrc = imageSrc
        }
      } else {
        // Path without leading slash
        if (isFilePath(imageSrc)) {
          imageSrc = `/${slugifyFilePath(imageSrc)}`
        } else {
          imageSrc = `/${imageSrc}`
        }
      }
    }

    return (
      <div class={classNames(displayClass, "hero-image-container")}>
        <img 
          src={imageSrc} 
          alt={fileData.frontmatter?.title || "Hero image"}
          class="hero-image"
        />
      </div>
    )
  }

  HeroImage.css = style

  return HeroImage
}) satisfies QuartzComponentConstructor

