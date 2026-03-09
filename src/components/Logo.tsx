// Exact paths from svgrepo.com/show/4185/family-sofa.svg
// Recolored to accent, "ac" monogram added in backrest, Option 2 wordmark
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* viewBox trimmed to the sofa shape — removes blank top/bottom padding */}
      <svg
        viewBox="0 75 390.672 225"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-auto shrink-0"
        aria-hidden="true"
      >
        {/* Backrest arch — exact path from reference */}
        <path
          fill="#8C6E4B"
          d="M83.934,195.093l0.004,0.285l0.008,17.451h222.781l0.012-17.709
             c0.559-20.158,13.303-36.898,31.126-43.34
             c-9.385-33.271-39.935-57.668-76.21-57.668H129.018
             c-36.274,0-66.825,24.396-76.21,57.668
             C70.631,158.22,83.375,174.956,83.934,195.093z"
        />

        {/* Armrests + seat + legs — exact path from reference */}
        <path
          fill="#8C6E4B"
          d="M354.19,161.489c-19.806,0-35.911,15.783-36.456,35.457l-0.014,28.432H72.95
             l-0.013-28.432c-0.545-19.674-16.651-35.457-36.456-35.457
             C16.333,161.489,0,177.823,0,197.972c0,20.148,16.333,36.48,36.481,36.48
             c0.645,0,1.234-0.018,1.87-0.051c0,0,0.021,20.27,0.021,20.639
             c0,16.383,13.281,29.662,29.662,29.662h6.533v8.561
             c0,1.82,1.477,3.297,3.297,3.297h21.941c1.82,0,3.297-1.477,3.297-3.297
             v-8.561h184.465v8.561c0,1.82,1.477,3.297,3.297,3.297h21.941
             c1.82,0,3.297-1.477,3.297-3.297v-8.561h6.516
             c16.383,0,29.662-13.279,29.662-29.662c0-0.148-0.01-0.295-0.012-0.443
             v-20.195c0.637,0.033,1.276,0.051,1.921,0.051
             c20.147,0,36.481-16.332,36.481-36.48
             C390.672,177.823,374.338,161.489,354.19,161.489z"
        />


      </svg>

      <span className="leading-none flex items-baseline">
        <span className="font-sans font-bold text-[19px] tracking-[-0.4px] text-text">
          Agent
        </span>
        <span className="font-sans font-light text-[19px] tracking-[0.2px] text-text/55">
          Couch
        </span>
      </span>
    </div>
  );
}
