export function UnderlineSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 15C30 5, 70 8, 100 10C130 12, 170 15, 195 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function SwirlSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 5C30 5, 15 20, 15 40C15 55, 25 65, 40 65C50 65, 58 58, 58 48C58 41, 53 36, 47 36C43 36, 40 39, 40 43"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

export function ArrowSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CircleDotsSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
      <circle cx="50" cy="10" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="90" cy="50" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="50" cy="90" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="10" cy="50" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
