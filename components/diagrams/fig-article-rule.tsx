import { Dia, FigSvg } from "./dia";

/** Ports build.py's fig_article_rule(): a simple drawn section divider used between article sections. */
export function FigArticleRule() {
  return (
    <Dia>
      <FigSvg
        viewBox="0 0 900 40"
        preserveAspectRatio="none"
        label="Section rule."
        inner='<line x1="0" y1="20" x2="900" y2="20" class="s-d draw" style="--dd:80ms"/>'
      />
    </Dia>
  );
}
