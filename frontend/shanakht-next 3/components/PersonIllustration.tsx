export default function PersonIllustration() {
  return (
    <svg
      className="illustration"
      viewBox="0 0 480 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* soft backdrop blob */}
      <ellipse cx="250" cy="230" rx="210" ry="200" fill="var(--sky-100)" />

      {/* desk / ground line */}
      <line x1="40" y1="420" x2="450" y2="420" stroke="var(--navy-700)" strokeWidth="3" strokeLinecap="round" />

      {/* ---- figure ---- */}
      <g className="float-figure">
        {/* torso */}
        <path
          d="M155 420 C150 330 175 275 240 270 C305 275 330 330 325 420 Z"
          fill="#FFFFFF"
          stroke="var(--navy-700)"
          strokeWidth="4"
        />
        {/* tie / scarf accent */}
        <path d="M232 278 L248 278 L242 340 L238 340 Z" fill="var(--red-600)" />

        {/* neck */}
        <rect x="222" y="238" width="36" height="34" rx="10" fill="var(--sky-100)" stroke="var(--navy-700)" strokeWidth="4" />

        {/* head */}
        <circle cx="240" cy="205" r="46" fill="#FDFEFF" stroke="var(--navy-700)" strokeWidth="4" />

        {/* hair */}
        <path
          d="M194 205 C188 155 210 130 240 130 C272 130 294 156 286 206 C280 190 268 182 262 190 C256 178 240 175 232 186 C222 176 202 182 198 200 Z"
          fill="var(--navy-900)"
        />

        {/* simple face */}
        <circle cx="224" cy="208" r="3.5" fill="var(--navy-900)" />
        <circle cx="256" cy="208" r="3.5" fill="var(--navy-900)" />
        <path d="M226 224 Q240 234 254 224" stroke="var(--navy-900)" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* left arm bent up, holding a card near chest */}
        <path
          d="M182 320 C160 300 155 270 168 245"
          stroke="var(--navy-700)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        {/* right arm bent up, holding a second card */}
        <path
          d="M298 320 C322 298 328 266 314 240"
          stroke="var(--navy-700)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />

        {/* card held in left hand (front-facing, near chest) */}
        <g transform="translate(150,225) rotate(-8)">
          <rect width="86" height="54" rx="9" fill="#FFFFFF" stroke="var(--navy-700)" strokeWidth="3" />
          <circle cx="18" cy="20" r="9" fill="var(--sky-100)" stroke="var(--sky-500)" strokeWidth="2" />
          <rect x="34" y="14" width="42" height="6" rx="3" fill="var(--red-600)" />
          <rect x="34" y="26" width="30" height="6" rx="3" fill="var(--sky-300)" />
          <rect x="10" y="38" width="66" height="6" rx="3" fill="var(--sky-300)" opacity="0.6" />
        </g>

        {/* card held in right hand, slightly higher & tilted */}
        <g transform="translate(300,205) rotate(11)">
          <rect width="86" height="54" rx="9" fill="var(--navy-700)" />
          <circle cx="18" cy="20" r="9" fill="#FFFFFF" opacity="0.85" />
          <rect x="34" y="14" width="42" height="6" rx="3" fill="#FFFFFF" opacity="0.9" />
          <rect x="34" y="26" width="30" height="6" rx="3" fill="var(--red-400)" />
          <rect x="10" y="38" width="66" height="6" rx="3" fill="#FFFFFF" opacity="0.35" />
        </g>
      </g>

      {/* ---- floating data chips (like extracted-field snippets) ---- */}
      <g className="float-chip chip-a">
        <rect x="356" y="120" width="72" height="14" rx="7" fill="var(--red-600)" />
        <rect x="356" y="142" width="50" height="14" rx="7" fill="var(--navy-500)" />
      </g>
      <g className="float-chip chip-b">
        <rect x="368" y="180" width="60" height="14" rx="7" fill="var(--sky-300)" />
        <rect x="368" y="202" width="40" height="14" rx="7" fill="var(--red-400)" />
      </g>

      {/* checkmark badge */}
      <g className="float-chip chip-c" transform="translate(60,150)">
        <circle cx="20" cy="20" r="20" fill="var(--red-600)" />
        <path d="M11 20 L17 26 L29 13" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* small icon chips resting on the baseline, echoing "tools on the desk" */}
      <g transform="translate(70,392)">
        <rect width="40" height="30" rx="8" fill="var(--navy-700)" />
        <circle cx="20" cy="15" r="7" fill="none" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M20 8 v14 M14 15 h12" stroke="#FFFFFF" strokeWidth="1.6" />
      </g>
      <g transform="translate(122,398)">
        <rect width="34" height="24" rx="7" fill="var(--red-600)" />
        <rect x="8" y="8" width="18" height="8" rx="2" fill="#FFFFFF" />
      </g>
      <g transform="translate(346,398)">
        <rect width="34" height="24" rx="7" fill="var(--sky-500)" />
        <circle cx="17" cy="12" r="6" fill="#FFFFFF" opacity="0.85" />
      </g>
    </svg>
  );
}
