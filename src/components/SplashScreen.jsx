import { useRef, useState } from 'react'
import { Home } from 'lucide-react'

const DURATION = 4500

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
        paddingTop: 'calc(env(safe-area-inset-top) + 80px)',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 52px)',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Top content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', flex: 1, justifyContent: 'center' }}>

        {/* Icon card */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(126,200,200,0.25)',
          boxShadow: '0 4px 24px rgba(74,69,64,0.10), 0 1px 4px rgba(74,69,64,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Home size={32} strokeWidth={1.5} color="#7EC8C8" />
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h1
            className="serif"
            style={{
              fontSize: '34px',
              fontWeight: 400,
              color: '#4A4540',
              lineHeight: 1.15,
            }}
          >
            Welcome home.
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#8A8078',
            lineHeight: 1.65,
            maxWidth: '280px',
            margin: '0 auto',
          }}>
            Everything you need is right here — Lincoln's schedule, house details, and a few of our favorite spots in the neighborhood.
          </p>
        </div>

      </div>

      {/* Button */}
      <button
        onClick={dismiss}
        style={{
          width: '100%',
          maxWidth: '340px',
          height: '56px',
          borderRadius: '16px',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#4A4540',
          padding: 0,
        }}
      >
        {/* Fill layer */}
        <div
          className="splash-fill"
          onAnimationEnd={dismiss}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#7EC8C8',
            animationDuration: `${DURATION}ms`,
            transformOrigin: 'left center',
            borderRadius: '16px',
          }}
        />
        {/* Label */}
        <span style={{
          position: 'relative',
          zIndex: 1,
          fontSize: '16px',
          fontWeight: 500,
          fontFamily: 'DM Sans, sans-serif',
          color: '#FFFFFF',
          letterSpacing: '0.01em',
        }}>
          Come on in
        </span>
      </button>

    </div>
  )
}
