import { useRef, useState } from 'react'

const DURATION = 4500

function HouseIllustration() {
  // Board & batten lines across full facade width — windows/porch draw on top
  const battenXs = [74, 88, 102, 116, 130, 144, 158, 172, 186, 200, 214, 228]

  // Roof shingle lines — computed from peak (150,4) to base (50,96)
  const shingleLines = [16, 28, 40, 52, 64, 76, 88].map(y => {
    const p = (y - 4) / 92
    const hw = p * 100
    return { y, x1: 150 - hw, x2: 150 + hw }
  })

  return (
    <svg
      viewBox="0 0 300 218"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: '268px', display: 'block' }}
    >
      {/* Background trees */}
      <ellipse cx="28" cy="126" rx="30" ry="55" fill="#B8CEAA" opacity="0.48"/>
      <ellipse cx="44" cy="112" rx="22" ry="44" fill="#A8BE9A" opacity="0.38"/>
      <ellipse cx="272" cy="120" rx="30" ry="57" fill="#B8CEAA" opacity="0.48"/>
      <ellipse cx="256" cy="108" rx="22" ry="46" fill="#A8BE9A" opacity="0.38"/>

      {/* Lawn */}
      <rect x="0" y="206" width="300" height="12" fill="#C0CEB0" opacity="0.5" rx="2"/>

      {/* Main house body */}
      <rect x="58" y="94" width="184" height="114" fill="#F5F2EC" stroke="#C8C2B8" strokeWidth="1.5"/>

      {/* Board & batten vertical lines */}
      {battenXs.map(x => (
        <line key={x} x1={x} y1={94} x2={x} y2={208} stroke="#E5DDD0" strokeWidth="0.85"/>
      ))}

      {/* Main roof */}
      <polygon points="50,96 250,96 150,4" fill="#3A3632"/>
      {/* Subtle shingle lines on roof */}
      {shingleLines.map(({ y, x1, x2 }) => (
        <line key={y} x1={x1} y1={y} x2={x2} y2={y} stroke="#4E4A46" strokeWidth="0.7" opacity="0.45"/>
      ))}
      {/* Roof outline */}
      <polyline points="50,96 150,4 250,96" stroke="#26221E" strokeWidth="2" fill="none"/>
      <line x1="50" y1="96" x2="250" y2="96" stroke="#26221E" strokeWidth="1.5"/>

      {/* Porch / portico body */}
      <rect x="109" y="146" width="82" height="62" fill="#EDE7DF" stroke="#C8C2B8" strokeWidth="1"/>

      {/* Porch roof — low pitch */}
      <polygon points="100,148 200,148 150,131" fill="#4A4540"/>
      <polyline points="100,148 150,131 200,148" stroke="#26221E" strokeWidth="1.5" fill="none"/>
      <line x1="100" y1="148" x2="200" y2="148" stroke="#26221E" strokeWidth="1.5"/>

      {/* Porch columns */}
      <rect x="110" y="148" width="5" height="60" fill="#DDD6CC" stroke="#C0B8AC" strokeWidth="1"/>
      <rect x="185" y="148" width="5" height="60" fill="#DDD6CC" stroke="#C0B8AC" strokeWidth="1"/>

      {/* Ground floor left window — large picture window */}
      <rect x="64" y="138" width="42" height="50" fill="#C5DDE0" stroke="#3A3632" strokeWidth="1.5"/>
      <line x1="85" y1="138" x2="85" y2="188" stroke="#3A3632" strokeWidth="1"/>
      <line x1="64" y1="163" x2="106" y2="163" stroke="#3A3632" strokeWidth="1"/>
      <rect x="66" y="140" width="10" height="22" fill="white" opacity="0.18"/>

      {/* Ground floor right window */}
      <rect x="194" y="138" width="42" height="50" fill="#C5DDE0" stroke="#3A3632" strokeWidth="1.5"/>
      <line x1="215" y1="138" x2="215" y2="188" stroke="#3A3632" strokeWidth="1"/>
      <line x1="194" y1="163" x2="236" y2="163" stroke="#3A3632" strokeWidth="1"/>
      <rect x="196" y="140" width="10" height="22" fill="white" opacity="0.18"/>

      {/* Upper floor left window */}
      <rect x="68" y="104" width="34" height="24" fill="#C5DDE0" stroke="#3A3632" strokeWidth="1.5"/>
      <line x1="85" y1="104" x2="85" y2="128" stroke="#3A3632" strokeWidth="1"/>

      {/* Upper floor center window */}
      <rect x="130" y="100" width="40" height="28" fill="#C5DDE0" stroke="#3A3632" strokeWidth="1.5"/>
      <line x1="150" y1="100" x2="150" y2="128" stroke="#3A3632" strokeWidth="1"/>

      {/* Upper floor right window */}
      <rect x="198" y="104" width="34" height="24" fill="#C5DDE0" stroke="#3A3632" strokeWidth="1.5"/>
      <line x1="215" y1="104" x2="215" y2="128" stroke="#3A3632" strokeWidth="1"/>

      {/* Door — warm wood */}
      <rect x="126" y="162" width="48" height="46" fill="#9B7C5A" stroke="#3A3632" strokeWidth="1.5"/>
      {/* Door panels */}
      <rect x="130" y="167" width="18" height="14" fill="#876848" stroke="#6B5030" strokeWidth="0.75" rx="0.5"/>
      <rect x="152" y="167" width="18" height="14" fill="#876848" stroke="#6B5030" strokeWidth="0.75" rx="0.5"/>
      <rect x="130" y="185" width="18" height="17" fill="#876848" stroke="#6B5030" strokeWidth="0.75" rx="0.5"/>
      <rect x="152" y="185" width="18" height="17" fill="#876848" stroke="#6B5030" strokeWidth="0.75" rx="0.5"/>
      {/* Door handle */}
      <circle cx="163" cy="185" r="2.5" fill="#C8A060"/>

      {/* Foundation ledge */}
      <rect x="58" y="204" width="184" height="6" fill="#CEC6B8" stroke="#B8B0A2" strokeWidth="1"/>

      {/* Stepping stones */}
      <rect x="135" y="210" width="30" height="6" fill="#C0B8A6" stroke="#ACA498" strokeWidth="0.75" rx="1"/>
      <rect x="138" y="216" width="24" height="5" fill="#B8B0A0" stroke="#ACA498" strokeWidth="0.75" rx="1"/>

      {/* Foundation shrubs */}
      <ellipse cx="70" cy="206" rx="14" ry="7" fill="#9AB498" opacity="0.85"/>
      <ellipse cx="230" cy="206" rx="14" ry="7" fill="#9AB498" opacity="0.85"/>
      <ellipse cx="105" cy="207" rx="9" ry="6" fill="#8DAA88" opacity="0.75"/>
      <ellipse cx="195" cy="207" rx="9" ry="6" fill="#8DAA88" opacity="0.75"/>

      {/* Path-side shrubs */}
      <ellipse cx="121" cy="211" rx="7" ry="5" fill="#9AB898" opacity="0.65"/>
      <ellipse cx="179" cy="211" rx="7" ry="5" fill="#9AB898" opacity="0.65"/>
    </svg>
  )
}

export default function SplashScreen({ onDismiss }) {
  const [fading, setFading] = useState(false)
  const dismissed = useRef(false)

  function dismiss() {
    if (dismissed.current) return
    dismissed.current = true
    setFading(true)
    setTimeout(onDismiss, 420)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'linear-gradient(160deg, #FAF8F4 0%, #EBE7DF 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        paddingTop: 'calc(env(safe-area-inset-top) + 60px)',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 52px)',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Top content */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '28px', flex: 1, justifyContent: 'center',
      }}>

        <HouseIllustration />

        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h1
            className="serif"
            style={{ fontSize: '34px', fontWeight: 400, color: '#4A4540', lineHeight: 1.15 }}
          >
            Welcome home.
          </h1>
          <p style={{
            fontSize: '16px', color: '#8A8078',
            lineHeight: 1.65, maxWidth: '280px', margin: '0 auto',
          }}>
            Everything you need is right here — Lincoln's schedule, house details, and a few of our favorite spots in the neighborhood.
          </p>
        </div>

      </div>

      {/* Button */}
      <button
        onClick={dismiss}
        style={{
          width: '100%', maxWidth: '340px', height: '56px',
          borderRadius: '16px', border: 'none', cursor: 'pointer',
          position: 'relative', overflow: 'hidden',
          backgroundColor: '#4A4540', padding: 0,
        }}
      >
        <div
          className="splash-fill"
          onAnimationEnd={dismiss}
          style={{
            position: 'absolute', inset: 0,
            backgroundColor: '#7EC8C8',
            animationDuration: `${DURATION}ms`,
            transformOrigin: 'left center',
            borderRadius: '16px',
          }}
        />
        <span style={{
          position: 'relative', zIndex: 1,
          fontSize: '16px', fontWeight: 500,
          fontFamily: 'DM Sans, sans-serif',
          color: '#FFFFFF', letterSpacing: '0.01em',
        }}>
          Come on in
        </span>
      </button>

    </div>
  )
}
