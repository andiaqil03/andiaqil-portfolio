/**
 * Site-wide map paper: a very faint contour texture across the page, denser
 * at the top and fading out, like the margin of a hiking map. Decorative.
 */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)] dark:opacity-60">
        <div className="topo absolute inset-0" />
      </div>
    </div>
  );
}
