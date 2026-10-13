/**
 * Site-wide atmosphere: three slow-drifting aurora light fields (indigo, sky,
 * emerald) and a fine film grain. Fixed behind everything; purely decorative.
 */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="aurora-blob a -top-[25vh] -left-[15vw] size-[70vmax] opacity-[0.22] dark:opacity-[0.28]"
        style={{ background: 'radial-gradient(closest-side, var(--g-indigo), transparent)' }}
      />
      <div
        className="aurora-blob b top-[10vh] -right-[25vw] size-[65vmax] opacity-[0.18] dark:opacity-[0.22]"
        style={{ background: 'radial-gradient(closest-side, var(--g-sky), transparent)' }}
      />
      <div
        className="aurora-blob c -bottom-[35vh] left-[15vw] size-[60vmax] opacity-[0.16] dark:opacity-[0.2]"
        style={{ background: 'radial-gradient(closest-side, var(--g-emerald), transparent)' }}
      />
      <div className="grain absolute inset-0 opacity-[0.05] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-overlay" />
    </div>
  );
}
