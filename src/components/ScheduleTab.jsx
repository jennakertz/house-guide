import { useState, useEffect, useMemo } from 'react'
import { haptic } from '../haptic'
import {
  Sunrise, Moon, BedDouble, Utensils, Footprints,
  ShoppingBag, Clock, ChevronDown, X,
} from 'lucide-react'

// ─── Colors ──────────────────────────────────────────────────────────────────
const C = {
  text:    '#4A4540',
  muted:   '#8A8078',
  border:  '#E8E4DE',
  card:    '#FFFFFF',
  bg:      '#F5F3EF',
  blue:    '#7EC8C8',
  sage:    '#8DB898',
  lav:     '#B8A8CC',
  yellow:  '#E8CC88',
  dark:    '#4A4540',
  divider: '#EDE9E3',
}

const MEALTIME_RULES = [
  'Lincoln must always be seated in his high chair to eat — at the counter or the table. No walking around with food.',
  'Food comes from his shelf (middle shelf, fridge) or what Elizabeth prepared.',
  'Utensils and bowls: far right cabinet in the pantry.',
  'He drinks water from his straw cup throughout the day.',
  'If he throws food on the floor: calmly say "looks like you\'re all done." If he does it again, end the meal and try again in 20 minutes.',
  'He likes to feed Spritz — it\'s a habit we\'re working on.',
]

const CARD_SHADOW = '0 1px 2px rgba(74,69,64,0.05), 0 2px 10px rgba(74,69,64,0.06)'
const ACTIVE_SHADOW = '0 2px 14px rgba(126,200,200,0.22), 0 1px 3px rgba(74,69,64,0.07)'

// ─── Timeline events ─────────────────────────────────────────────────────────
const TWO_NAP_EVENTS = [
  {
    id: 'wake',
    startHour: 6, endHour: 7.25,
    time: '6:00 – 7:15 AM',
    title: 'Wake up & morning bottle',
    Icon: Sunrise,
    preview: 'Leave him in the crib until 7:00–7:15 AM.',
    details: [
      "It's okay to leave Lincoln in his crib for a few minutes while you wake up. Get him out by 7:00–7:15 AM.",
      "Give him his morning bottle — 6 oz, warmed. (We may be transitioning to a sippy cup by the time you arrive — we'll update you.)",
      "Bottles are warmed using the bottle warmer on the counter — follow the printed instructions next to it.",
    ],
    character: 'lincoln',
    dotColor: C.blue,
  },
  {
    id: 'spritz-walk-am',
    startHour: 7, endHour: 8,
    time: '7:00 – 8:00 AM',
    title: 'Spritz: Morning walk',
    Icon: Footprints,
    preview: 'Take Spritz for his morning walk.',
    details: [
      "Usually just walk to the park entrance and back — or go longer around the lake if you're feeling it.",
      "Poop bags go in the trash cans right at the park entrance — there are two of them.",
      "If he's being stubborn about walking, say \"we're going to the park\" and that usually gets him moving.",
      "To lure him back home, promise him breakfast.",
      "If it's raining, he can use the backyard instead — try to get him to go in the mulch.",
    ],
    character: 'spritz',
    dotColor: C.yellow,
  },
  {
    id: 'breakfast',
    startHour: 7.25, endHour: 9.5,
    time: '7:15 – 9:30 AM',
    title: 'Breakfast & playtime',
    Icon: Utensils,
    preview: 'Food from his shelf in the fridge.',
    details: [
      "Food is on the middle shelf of the fridge — that's Lincoln's shelf. Only feed him food from there, or food Elizabeth has prepared.",
      "His bowls, plates, and utensils are in the far right cabinet of the pantry.",
      "He drinks water from a straw cup throughout the day.",
    ],
    character: 'lincoln',
    dotColor: C.sage,
    hasMealtimeRules: true,
  },
  {
    id: 'spritz-breakfast',
    startHour: 8, endHour: 8.5,
    time: 'After morning walk',
    title: 'Spritz: Breakfast',
    Icon: ShoppingBag,
    preview: '1.5 scoops of kibble, then one treat.',
    details: [
      "1.5 scoops of kibble.",
      'After he eats, one treat — either a CET Chew (we call it a "treasure") OR a Veggie Dent (we call it "tartar control"). One treat per day, not both.',
      "No human food or table scraps — it upsets his belly.",
    ],
    character: 'spritz',
    dotColor: C.yellow,
  },
  {
    id: 'nap1',
    startHour: 10, endHour: 11.5,
    time: '~10:00 – 11:30 AM',
    title: 'First nap',
    Icon: Moon,
    preview: 'About 3.5 hrs after wake-up.',
    details: [
      "Nap starts about 3.5 hours after he woke up.",
      "Nap routine: (1) Change diaper, (2) Put on sleep sack, (3) Read 1–2 books, (4) Place in crib with his stuffed animals and at least 3 pacifiers.",
      "Monitor him on the Nanit — the old iPhone is kept downstairs. Passcode: 111111.",
    ],
    character: 'lincoln',
    dotColor: C.lav,
  },
  {
    id: 'lunch',
    startHour: 11.5, endHour: 13,
    time: '~11:30 AM – 1:00 PM',
    title: 'Lunch & play',
    Icon: Utensils,
    preview: "He'll usually sleep about 1.5 hours.",
    details: [
      "He'll usually sleep about 1.5 hours. After he wakes, give him lunch from his fridge shelf.",
      "Snack too if he seems hungry.",
    ],
    character: 'lincoln',
    dotColor: C.sage,
    hasMealtimeRules: true,
  },
  {
    id: 'nap2',
    startHour: 15, endHour: 15.5,
    time: '3:00 – 3:30 PM',
    title: 'Second nap',
    Icon: Moon,
    preview: 'Same nap routine. Down between 3:00–3:30 PM.',
    details: [
      "Same nap routine as above.",
      "Try to get him down between 3:00–3:30 PM.",
      "Do not let him sleep past 5:15 PM — wake him gently if needed so he has enough sleep pressure for bedtime.",
    ],
    character: 'lincoln',
    dotColor: C.lav,
    twoNapOnly: true,
  },
  {
    id: 'wake-nap2',
    startHour: 16.5, endHour: 17.25,
    time: '~4:30 – 5:15 PM',
    title: 'Wake from second nap',
    Icon: Sunrise,
    preview: 'He should be up by 5:15 PM at the latest.',
    details: [
      "He should be up by 5:15 PM at the latest.",
      "After he wakes, offer a snack if he asks for one.",
    ],
    character: 'lincoln',
    dotColor: C.blue,
    twoNapOnly: true,
  },
  {
    id: 'spritz-walk-pm',
    startHour: 17, endHour: 17.5,
    time: '~5:00 PM',
    title: 'Spritz: Evening walk',
    Icon: Footprints,
    preview: 'Evening walk around 5 PM.',
    details: [
      "Usually just walk to the park entrance and back — or go longer around the lake if you're feeling it.",
      "Poop bags go in the trash cans right at the park entrance — there are two of them.",
      "If he's being stubborn, say \"we're going to the park\" to get him moving.",
      "To lure him back home, promise him dinner.",
    ],
    character: 'spritz',
    dotColor: C.yellow,
  },
  {
    id: 'dinner',
    startHour: 17.5, endHour: 18.5,
    time: '~5:30 – 6:30 PM',
    title: 'Dinner',
    Icon: Utensils,
    preview: 'Dinner from his fridge shelf.',
    details: [
      "Dinner from his fridge shelf.",
      "Snack if he asks.",
    ],
    character: 'lincoln',
    dotColor: C.sage,
    hasMealtimeRules: true,
  },
  {
    id: 'bedtime',
    startHour: 18, endHour: 19,
    time: '6:00 – 7:00 PM',
    title: 'Bedtime',
    Icon: BedDouble,
    preview: 'Timing depends on when he woke from his last nap.',
    details: [
      "Timing depends on when he woke from his last nap.",
      "If he woke at 3:30 PM → start bedtime at 6:00 PM.",
      "If he woke around 5:00 PM → start bedtime around 6:45 PM.",
      "Aim for him to be in the crib by 7:00 PM.",
      "Bedtime routine: (1) Warm bottle or sippy cup, (2) Change diaper, (3) Sleep sack, (4) Read 1–2 books, (5) Crib with stuffed animals and at least 3 pacifiers.",
      "Keep the Nanit on overnight.",
    ],
    character: 'lincoln',
    dotColor: C.dark,
  },
  {
    id: 'spritz-dinner',
    startHour: 18.1, endHour: 18.6,
    time: '~6:00 PM',
    title: 'Spritz: Dinner',
    Icon: ShoppingBag,
    preview: '1 scoop of kibble.',
    details: [
      "1 scoop of kibble.",
      "Spritz will beg constantly. He does not need any additional food.",
    ],
    character: 'spritz',
    dotColor: C.yellow,
  },
  {
    id: 'overnight',
    startHour: 19, endHour: 31,
    time: '7:00 PM – 7:00 AM',
    title: 'Overnight',
    Icon: Moon,
    preview: 'He almost always sleeps through.',
    details: [
      "Lincoln occasionally fusses briefly at night — about once every two weeks.",
      "Wait about a minute before going in; he almost always self-soothes.",
      "If he's having a full meltdown, go in and comfort him. This is very rare.",
    ],
    character: 'lincoln',
    dotColor: C.lav,
  },
]

const ONE_NAP_EVENTS = TWO_NAP_EVENTS
  .filter(e => !e.twoNapOnly)
  .map(e => {
    if (e.id !== 'nap1') return e
    return {
      ...e,
      title: 'Nap',
      preview: 'May sleep up to 3 hours on a one-nap day.',
      details: [
        "Nap starts about 3.5 hours after he woke up. On a one-nap day, he may sleep up to 3 hours — that's okay.",
        "Nap routine: (1) Change diaper, (2) Put on sleep sack, (3) Read 1–2 books, (4) Place in crib with his stuffed animals and at least 3 pacifiers.",
        "Monitor him on the Nanit — the old iPhone is kept downstairs. Passcode: 111111.",
        "If he sleeps under 2 hrs 45 min, he may still need a second nap later.",
      ],
    }
  })

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function getTimeStr() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function getCurrentHour() {
  const n = new Date()
  return n.getHours() + n.getMinutes() / 60
}

function getCurrentEventId(events) {
  const h = getCurrentHour()
  const active = events.filter(e => {
    if (e.endHour > 24) {
      return h >= e.startHour || h < e.endHour - 24
    }
    return h >= e.startHour && h < e.endHour
  })
  if (active.length) {
    return (active.find(e => e.character === 'lincoln') ?? active[0]).id
  }
  // During schedule gaps, fall back to the next upcoming event
  return getNextEventId(events)
}

function getNextEventId(events) {
  const h = getCurrentHour()
  const upcoming = events
    .filter(e => e.startHour > h)
    .sort((a, b) => a.startHour - b.startHour)
  return upcoming[0]?.id ?? null
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionLabel({ children, style = {} }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      fontSize: '10px', fontWeight: 500, color: C.muted,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      ...style,
    }}>
      <div style={{ width: '14px', height: '1.5px', backgroundColor: C.blue, flexShrink: 0 }} />
      {children}
    </div>
  )
}

function SegmentedControl({ options, value, onChange }) {
  return (
    <div style={{
      display: 'flex', backgroundColor: C.bg,
      borderRadius: '8px', padding: '3px',
      border: `1px solid ${C.border}`,
    }}>
      {options.map(opt => {
        const active = value === opt.id
        return (
          <button
            key={opt.id}
            onClick={() => { haptic(40); onChange(opt.id) }}
            style={{
              flex: 1, padding: '8px 12px', borderRadius: '6px',
              border: 'none', cursor: 'pointer',
              backgroundColor: active ? C.card : 'transparent',
              color: active ? C.text : C.muted,
              fontSize: '14px', fontWeight: active ? 500 : 400,
              fontFamily: 'DM Sans, sans-serif',
              boxShadow: active ? '0 1px 4px rgba(0,0,0,0.07)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function MealtimeRulesModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(26,22,18,0.45)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        zIndex: 100,
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '430px',
          backgroundColor: C.card,
          borderRadius: '16px 16px 0 0',
          padding: '0 20px calc(32px + env(safe-area-inset-bottom))',
        }}
      >
        {/* drag handle */}
        <div style={{
          width: '36px', height: '4px', borderRadius: '2px',
          backgroundColor: C.border, margin: '12px auto 20px',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Utensils size={18} strokeWidth={1.5} color={C.muted} />
            <span style={{ fontSize: '16px', fontWeight: 500, color: C.text }}>Mealtime rules</span>
          </div>
          <button
            onClick={() => { haptic(40); onClose() }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px', color: C.muted,
            }}
          >
            <X size={18} strokeWidth={1.5} color={C.muted} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {MEALTIME_RULES.map((rule, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: '4px', height: '4px', borderRadius: '50%',
                backgroundColor: C.sage, flexShrink: 0, marginTop: '9px',
              }} />
              <span style={{ fontSize: '14px', color: C.text, lineHeight: '1.55' }}>{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TimelineEvent({ event, isActive, isCurrent, onToggle, onMealtimeRules }) {
  const { Icon } = event
  return (
    <div id={`event-${event.id}`} style={{ display: 'flex', alignItems: 'flex-start' }}>
      {/* Dot column */}
      <div style={{
        width: '32px', flexShrink: 0,
        display: 'flex', justifyContent: 'center',
        paddingTop: '17px', position: 'relative', zIndex: 1,
      }}>
        <div style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
          {isCurrent && (
            <div className="dot-ping" style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              backgroundColor: event.dotColor,
            }} />
          )}
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: event.dotColor,
            boxShadow: isCurrent
              ? `0 0 0 3px ${event.dotColor}33, 0 0 0 2.5px #F5F3EF`
              : '0 0 0 2.5px #F5F3EF',
            position: 'relative', zIndex: 1,
          }} />
        </div>
      </div>
      {/* Card */}
      <div style={{ flex: 1, paddingBottom: '10px' }}>
        <button
          onClick={onToggle}
          style={{
            width: '100%', border: 'none', background: 'none',
            cursor: 'pointer', padding: 0, textAlign: 'left',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          <div style={{
            backgroundColor: isCurrent ? '#F5FBFB' : C.card,
            borderRadius: '10px',
            border: `1px solid ${C.border}`,
            borderLeft: isCurrent ? `2px solid ${C.blue}` : `1px solid ${C.border}`,
            padding: isCurrent ? '14px 14px 14px 13px' : '14px',
            boxShadow: isCurrent ? ACTIVE_SHADOW : CARD_SHADOW,
            transition: 'background-color 0.2s, box-shadow 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
              <span style={{ fontSize: '12px', color: C.muted, letterSpacing: '0.01em' }}>
                {event.time}
              </span>
              {isCurrent && (
                <span style={{
                  fontSize: '11px', fontWeight: 500, color: C.blue,
                  backgroundColor: `${C.blue}18`,
                  padding: '2px 7px', borderRadius: '20px',
                  letterSpacing: '0.04em',
                }}>
                  Now
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                <Icon size={18} strokeWidth={1.5} color={isCurrent ? C.blue : C.muted} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '15px', fontWeight: 500, color: C.text }}>{event.title}</span>
              </div>
              <ChevronDown
                size={16} strokeWidth={1.5} color="#C4BDB5"
                style={{
                  transform: isActive ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s', flexShrink: 0, marginLeft: '8px',
                }}
              />
            </div>
            <div style={{ fontSize: '13px', color: C.muted, marginTop: '4px', lineHeight: '1.4' }}>
              {event.preview}
            </div>

            {event.hasMealtimeRules && (
              <button
                onClick={e => { e.stopPropagation(); haptic(40); onMealtimeRules() }}
                style={{
                  marginTop: '10px',
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  backgroundColor: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '12px', fontWeight: 500, color: C.muted,
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                }}
              >
                <Utensils size={12} strokeWidth={1.5} />
                Mealtime rules
              </button>
            )}

            {isActive && (
              <div style={{ marginTop: '14px', borderTop: `1px solid ${C.border}`, paddingTop: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {event.details.map((d, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '4px', height: '4px', borderRadius: '50%',
                        backgroundColor: C.sage, flexShrink: 0, marginTop: '9px',
                      }} />
                      <span style={{ fontSize: '14px', color: C.text, lineHeight: '1.5' }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ScheduleTab() {
  const [oneNap, setOneNap] = useState(false)
  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(() => {
    const id = getCurrentEventId(TWO_NAP_EVENTS)
    return id === 'overnight' ? 'overnight' : null
  })
  const [mealtimeOpen, setMealtimeOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [timeStr, setTimeStr] = useState(getTimeStr)

  const baseEvents = useMemo(
    () => (oneNap ? ONE_NAP_EVENTS : TWO_NAP_EVENTS),
    [oneNap]
  )

  const filteredEvents = useMemo(
    () => filter === 'all' ? baseEvents : baseEvents.filter(e => e.character === filter),
    [baseEvents, filter]
  )

  useEffect(() => { setExpandedId(null) }, [filter, oneNap])

  useEffect(() => {
    setCurrentId(getCurrentEventId(filteredEvents))
    setTimeStr(getTimeStr())
    const id = setInterval(() => {
      setCurrentId(getCurrentEventId(filteredEvents))
      setTimeStr(getTimeStr())
    }, 30000)
    return () => clearInterval(id)
  }, [filteredEvents])

  function jumpToNow() {
    const id = getCurrentEventId(filteredEvents)
    if (!id) return
    haptic(50)
    setExpandedId(id)
    setTimeout(() => {
      const el = document.getElementById(`event-${id}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }

  function toggleEvent(id) {
    haptic(40)
    setExpandedId(prev => (prev === id ? null : id))
  }

  return (
    <div style={{ padding: '24px 16px 8px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header */}
      <div>
        <h1
          className="serif"
          style={{ fontSize: '26px', fontWeight: 400, color: C.text, lineHeight: 1.25 }}
        >
          {getGreeting()} — here's the day.
        </h1>
        <p style={{ fontSize: '15px', color: C.muted, marginTop: '4px' }}>
          {timeStr}
        </p>
      </div>

      {/* Controls row */}
      <div data-tour="tour-schedule-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={jumpToNow}
          style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            backgroundColor: '#4A4540', color: '#FFFFFF',
            border: 'none', borderRadius: '6px',
            padding: '9px 16px', fontSize: '13px', fontWeight: 500,
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            flexShrink: 0,
          }}
        >
          <Clock size={15} strokeWidth={2} color="#FFFFFF" />
          Jump to Now
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          <span
            onClick={() => { haptic(60); setOneNap(v => !v) }}
            style={{
              fontSize: '13px', color: C.muted, cursor: 'pointer',
              userSelect: 'none', whiteSpace: 'nowrap',
            }}
          >
            One nap day
          </span>
          <button
            onClick={() => { haptic(60); setOneNap(v => !v) }}
            role="switch"
            aria-checked={oneNap}
            style={{
              width: '44px', height: '26px', borderRadius: '100px',
              backgroundColor: oneNap ? C.blue : C.border,
              border: 'none', cursor: 'pointer', padding: 0,
              position: 'relative', flexShrink: 0,
              transition: 'background-color 0.25s',
              outline: 'none',
            }}
          >
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              position: 'absolute', top: '3px',
              left: oneNap ? '21px' : '3px',
              transition: 'left 0.25s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
            }} />
          </button>
        </div>
      </div>

      {/* Segmented filter */}
      <div data-tour="tour-schedule-filter">
        <SegmentedControl
          options={[
            { id: 'all',     label: 'Everyone' },
            { id: 'lincoln', label: 'Lincoln'  },
            { id: 'spritz',  label: 'Spritz'   },
          ]}
          value={filter}
          onChange={setFilter}
        />
      </div>

      {/* One-nap banner */}
      {oneNap && filter !== 'spritz' && (
        <div style={{
          backgroundColor: '#F0FAFA',
          border: `1px solid ${C.blue}`,
          borderRadius: '8px',
          padding: '11px 14px',
          fontSize: '13px',
          color: C.text,
          lineHeight: '1.5',
        }}>
          <strong>One nap day</strong> — schedule adjusted. If he sleeps under 2 hrs 45 min, he may still need a second nap.
        </div>
      )}

      {/* Timeline section label */}
      <SectionLabel style={{ paddingLeft: '32px' }}>Today's schedule</SectionLabel>

      {/* Timeline */}
      <div style={{ position: 'relative', marginTop: '-8px' }}>
        {/* Spine line */}
        <div style={{
          position: 'absolute',
          left: '15px', top: '14px', bottom: '14px',
          width: '1px', backgroundColor: C.border, zIndex: 0,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredEvents.map(event => (
            <TimelineEvent
              key={event.id}
              event={event}
              isActive={expandedId === event.id}
              isCurrent={currentId === event.id}
              onToggle={() => toggleEvent(event.id)}
              onMealtimeRules={() => setMealtimeOpen(true)}
            />
          ))}
          {/* End marker */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '32px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                backgroundColor: C.blue, boxShadow: '0 0 0 2.5px #F5F3EF',
                opacity: 0.45,
              }} />
            </div>
            <span style={{ fontSize: '13px', color: C.muted, fontStyle: 'italic' }}>
              {filter === 'spritz' ? 'Good night, Spritz.' : 'Sweet dreams, Lincoln. ✨'}
            </span>
          </div>
        </div>
      </div>

      {/* Mealtime rules modal */}
      {mealtimeOpen && <MealtimeRulesModal onClose={() => setMealtimeOpen(false)} />}

    </div>
  )
}
