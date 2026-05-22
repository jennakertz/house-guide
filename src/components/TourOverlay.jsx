import { useState, useEffect } from 'react'

const PAD = 10
const GAP = 14

const STEPS = [
  {
    id: 'nav', tab: 'schedule', target: 'tour-nav', position: 'above', borderRadius: 22,
    title: 'Four sections, one guide.',
    body: 'Use the nav to switch between Schedule, House, Explore, and Contacts.',
    cta: 'Next',
  },
  {
    id: 'schedule', tab: 'schedule', target: 'tour-schedule-controls', position: 'below', borderRadius: 10,
    title: 'The daily schedule.',
    body: "Lincoln's day as a timeline — the current event is always highlighted. Tap any card to expand it. Jump to Now snaps you back to the current moment.",
    cta: 'Next',
  },
  {
    id: 'subnav', tab: 'schedule', target: 'tour-schedule-filter', position: 'below', borderRadius: 10,
    title: 'Sub-tabs organize each section.',
    body: 'Filter the schedule here, or find similar tabs in House and Explore to switch between views.',
    cta: 'Got it',
  },
]

export default function TourOverlay({ onDismiss, onTabChange }) {
  const [stepIdx, setStepIdx] = useState(0)
  const [rect, setRect]       = useState(null)
  const [ready, setReady]     = useState(false)
  const [fading, setFading]   = useState(false)

  const step = STEPS[stepIdx]

  useEffect(() => {
    setReady(false)
    onTabChange(step.tab)
    const t = setTimeout(() => {
      const el = document.querySelector(`[data-tour="${step.target}"]`)
      if (el) {
        setRect(el.getBoundingClientRect())
        setReady(true)
      }
    }, 260)
    return () => clearTimeout(t)
  }, [stepIdx]) // eslint-disable-line

  function advance() {
    if (stepIdx < STEPS.length - 1) {
      setStepIdx(i => i + 1)
    } else {
      dismiss()
    }
  }

  function dismiss() {
    if (fading) return
    setFading(true)
    setTimeout(onDismiss, 380)
  }

  const vw = window.innerWidth
  const vh = window.innerHeight
  const isAbove = step.position === 'above'

  // Keep rect dimensions stable — only toggle scale so the hole
  // always collapses/expands from its own center, never from a corner
  const hx = rect ? rect.left - PAD : 0
  const hy = rect ? rect.top  - PAD : 0
  const hw = rect ? rect.width  + PAD * 2 : 0
  const hh = rect ? rect.height + PAD * 2 : 0
  const hr = rect ? step.borderRadius + PAD : 0

  const tipBottom = rect ? vh - (rect.top - PAD) + GAP : 0
  const tipTop    = rect ? rect.bottom + PAD + GAP      : 0

  return (
    <div
      onClick={advance}
      style={{
        position: 'fixed', inset: 0, zIndex: 150,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.35s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Always-present SVG dim; hole scales in/out from its own center */}
      <svg
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 151, pointerEvents: 'none' }}
        viewBox={`0 0 ${vw} ${vh}`}
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="tour-mask">
            <rect width={vw} height={vh} fill="white" />
            <rect
              x={hx} y={hy} width={hw} height={hh} rx={hr}
              fill="black"
              style={{
                transformOrigin: 'center',
                transform: ready ? 'scale(1)' : 'scale(0)',
                transition: 'transform 0.22s ease',
              }}
            />
          </mask>
        </defs>
        <rect width={vw} height={vh} fill="rgba(28,25,22,0.68)" mask="url(#tour-mask)" />
      </svg>

      {/* Tooltip */}
      {rect && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'fixed',
            left: '50%',
            width: 'calc(100% - 32px)',
            maxWidth: '398px',
            ...(isAbove
              ? { bottom: tipBottom, transform: `translateX(-50%) translateY(${ready ? 0 : 8}px)` }
              : { top: tipTop,       transform: `translateX(-50%) translateY(${ready ? 0 : -8}px)` }
            ),
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            padding: '20px',
            boxShadow: '0 8px 32px rgba(28,25,22,0.14), 0 2px 8px rgba(28,25,22,0.07)',
            zIndex: 152,
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.22s ease, transform 0.22s ease',
          }}
        >
          {/* Progress dots + Skip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '14px' }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{
                height: '5px',
                width: i === stepIdx ? '18px' : '5px',
                borderRadius: '3px',
                backgroundColor: i === stepIdx ? '#7EC8C8' : '#E8E4DE',
                transition: 'width 0.25s, background-color 0.25s',
              }} />
            ))}
            <button
              onClick={e => { e.stopPropagation(); dismiss() }}
              style={{
                marginLeft: 'auto', border: 'none', background: 'none',
                fontSize: '13px', color: '#B0A89E', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', padding: 0,
              }}
            >
              Skip
            </button>
          </div>

          <h3 style={{
            fontSize: '17px', fontWeight: 600, color: '#4A4540',
            fontFamily: 'DM Sans, sans-serif', marginBottom: '6px',
            letterSpacing: '-0.01em',
          }}>
            {step.title}
          </h3>
          <p style={{
            fontSize: '14px', color: '#8A8078', lineHeight: 1.6,
            fontFamily: 'DM Sans, sans-serif', marginBottom: '16px',
          }}>
            {step.body}
          </p>

          <button
            onClick={e => { e.stopPropagation(); advance() }}
            style={{
              width: '100%', height: '44px', borderRadius: '10px',
              backgroundColor: '#7EC8C8', color: '#FFFFFF',
              border: 'none', cursor: 'pointer',
              fontSize: '14px', fontWeight: 600,
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '0.01em',
            }}
          >
            {step.cta}
          </button>
        </div>
      )}
    </div>
  )
}
