import { useState, useEffect } from 'react'

const GAP = 14
const PAD = 10

const STEPS = [
  {
    id: 'nav',
    tab: 'schedule',
    target: 'tour-nav',
    position: 'above',
    borderRadius: 22,
    title: 'Four sections, one guide.',
    body: 'Use the nav to switch between Schedule, House, Explore, and Contacts.',
    cta: 'Next',
  },
  {
    id: 'schedule',
    tab: 'schedule',
    target: 'tour-schedule-controls',
    position: 'below',
    borderRadius: 10,
    title: "The daily schedule.",
    body: "Lincoln's day as a timeline — the current event is always highlighted. Tap any card to expand it. Jump to Now snaps you back to the current moment.",
    cta: 'Next',
  },
  {
    id: 'subnav',
    tab: 'house',
    target: 'tour-segment',
    position: 'below',
    borderRadius: 12,
    title: 'Each section has sub-tabs.',
    body: 'Tap to switch between them — most pages organize their info this way.',
    cta: 'Got it',
  },
]

export default function TourOverlay({ onDismiss, onTabChange }) {
  const [stepIdx, setStepIdx] = useState(0)
  const [rect, setRect] = useState(null)
  const [fading, setFading] = useState(false)

  const step = STEPS[stepIdx]

  useEffect(() => {
    onTabChange(step.tab)
    setRect(null)
    const timer = setTimeout(() => {
      const el = document.querySelector(`[data-tour="${step.target}"]`)
      if (el) setRect(el.getBoundingClientRect())
    }, 220)
    return () => clearTimeout(timer)
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

  const spot = rect ? {
    top:    rect.top    - PAD,
    left:   rect.left   - PAD,
    width:  rect.width  + PAD * 2,
    height: rect.height + PAD * 2,
  } : null

  const isAbove = step.position === 'above'

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
      {spot && (
        <>
          {/* Spotlight — transparent cutout, box-shadow dims the rest */}
          <div style={{
            position: 'fixed',
            top: spot.top, left: spot.left,
            width: spot.width, height: spot.height,
            borderRadius: step.borderRadius + PAD,
            boxShadow: '0 0 0 9999px rgba(28,25,22,0.70)',
            pointerEvents: 'none',
            zIndex: 151,
          }} />

          {/* Tooltip card */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'fixed',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'calc(100% - 32px)',
              maxWidth: '398px',
              ...(isAbove
                ? { bottom: window.innerHeight - spot.top + GAP }
                : { top: spot.top + spot.height + GAP }
              ),
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              padding: '20px',
              boxShadow: '0 8px 32px rgba(28,25,22,0.16), 0 2px 8px rgba(28,25,22,0.08)',
              zIndex: 152,
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
                onClick={(e) => { e.stopPropagation(); dismiss() }}
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
              onClick={(e) => { e.stopPropagation(); advance() }}
              style={{
                width: '100%', height: '44px', borderRadius: '10px',
                backgroundColor: '#4A4540', color: '#FFFFFF',
                border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: 500,
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {step.cta}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
