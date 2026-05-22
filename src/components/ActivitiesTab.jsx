import { useState } from 'react'
import { haptic } from '../haptic'
import {
  Leaf, Palette, Footprints, Baby, MapPin,
  Flame, UtensilsCrossed, Coffee,
} from 'lucide-react'

const CARD_SHADOW = '0 1px 2px rgba(74,69,64,0.05), 0 2px 10px rgba(74,69,64,0.06)'

const C = {
  text:    '#4A4540',
  muted:   '#8A8078',
  border:  '#E8E4DE',
  card:    '#FFFFFF',
  bg:      '#F5F3EF',
  blue:    '#7EC8C8',
}

function SectionLabel({ children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      fontSize: '10px', fontWeight: 500, color: C.muted,
      letterSpacing: '0.12em', textTransform: 'uppercase',
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

function ActivityCard({ Icon, title, children }) {
  return (
    <div style={{
      backgroundColor: C.card, borderRadius: '10px',
      border: `1px solid ${C.border}`, padding: '16px',
      boxShadow: CARD_SHADOW,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <Icon size={18} strokeWidth={1.5} color={C.blue} />
        <span style={{ fontSize: '15px', fontWeight: 500, color: C.text }}>{title}</span>
      </div>
      <div style={{ fontSize: '14px', color: C.text, lineHeight: '1.6' }}>
        {children}
      </div>
    </div>
  )
}

function FoodCard({ Icon, name, cuisine, detail }) {
  return (
    <div style={{
      backgroundColor: C.card, borderRadius: '10px',
      border: `1px solid ${C.border}`, padding: '14px 16px',
      boxShadow: CARD_SHADOW,
      display: 'flex', alignItems: 'flex-start', gap: '12px',
    }}>
      <Icon size={18} strokeWidth={1.5} color={C.blue} style={{ flexShrink: 0, marginTop: '1px' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '14px', fontWeight: 500, color: C.text }}>{name}</div>
        {cuisine && (
          <div style={{ fontSize: '13px', color: C.muted, marginTop: '2px' }}>{cuisine}</div>
        )}
        {detail && (
          <div style={{ fontSize: '13px', color: C.muted, marginTop: '2px', fontStyle: 'italic' }}>{detail}</div>
        )}
      </div>
    </div>
  )
}

const PLAYGROUNDS = [
  ['John Howell Park', 'next to Virginia Highland Elementary'],
  ['Piedmont Park', 'inside the park near the main lawn'],
  ['Orme Drive playground', 'a quick walk, a little more off the beaten path'],
]

export default function ActivitiesTab() {
  const [segment, setSegment] = useState('activities')

  return (
    <div style={{ padding: '24px 16px 8px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header */}
      <div>
        <h1
          className="serif"
          style={{ fontSize: '26px', fontWeight: 400, color: C.text, lineHeight: 1.2 }}
        >
          Things to do.
        </h1>
        <p style={{ fontSize: '15px', color: C.muted, marginTop: '4px' }}>
          Get out and explore the neighborhood.
        </p>
      </div>

      {/* Segmented control */}
      <SegmentedControl
        options={[{ id: 'activities', label: 'Activities' }, { id: 'food', label: 'Food' }]}
        value={segment}
        onChange={setSegment}
      />

      {/* Activities */}
      {segment === 'activities' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          <ActivityCard Icon={Leaf} title="Atlanta Botanical Garden">
            A 10-minute walk through Piedmont Park — and we have a family pass, so it's free. Worth it for the seasonal gardens, the conservatory, and the canopy walk.
          </ActivityCard>

          <ActivityCard Icon={Palette} title="High Museum of Art">
            We have a membership — free admission for the group. Atlanta's leading art museum, right on Peachtree Street. Great for a quieter morning or if the weather turns.
          </ActivityCard>

          <ActivityCard Icon={Footprints} title="Piedmont Park">
            Just a short walk from the house. Lincoln and Spritz both love wandering along the lake — look for the ducks near the water or try to spot the turtles sunning on the logs.
          </ActivityCard>

          <ActivityCard Icon={Baby} title="Playgrounds">
            <div>Several great options nearby:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
              {PLAYGROUNDS.map(([name, note]) => (
                <div key={name} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '4px', height: '4px', borderRadius: '50%',
                    backgroundColor: C.blue, flexShrink: 0, marginTop: '8px',
                  }} />
                  <span><strong>{name}</strong> — {note}</span>
                </div>
              ))}
            </div>
          </ActivityCard>

          <ActivityCard Icon={MapPin} title="Virginia Highland">
            Walk up to the intersection of Virginia and Highland — there are shops, restaurants, and a great little bookstore that Lincoln loves. Good for a morning or afternoon outing.
          </ActivityCard>

        </div>
      )}

      {/* Food */}
      {segment === 'food' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

          <SectionLabel>Walk there</SectionLabel>
          <FoodCard
            Icon={Flame}
            name="Lewis Barbecue"
            cuisine="Texas-style BBQ"
            detail="Some of the best BBQ in Atlanta — worth the walk."
          />
          <FoodCard
            Icon={UtensilsCrossed}
            name="Whiskey Bird"
            cuisine="Asian-inspired small plates"
            detail="Great for a casual lunch or dinner. Nice outdoor seating."
          />
          <FoodCard
            Icon={UtensilsCrossed}
            name="A Taste of Tuscany"
            cuisine="Italian café"
            detail="Cozy neighborhood spot in Virginia Highland. Lunch on weekdays and weekends."
          />
          <FoodCard
            Icon={MapPin}
            name="Virginia Highland strip"
            cuisine="Lots of options"
            detail="Anything along Virginia Ave or N. Highland is fair game."
          />

          <div style={{ marginTop: '8px' }}>
            <SectionLabel>Delivery</SectionLabel>
          </div>
          <FoodCard
            Icon={UtensilsCrossed}
            name="Muchacho"
            cuisine="Mexican-American"
          />
          <FoodCard
            Icon={UtensilsCrossed}
            name="Chai Pani"
            cuisine="Indian street food"
          />
          <FoodCard
            Icon={UtensilsCrossed}
            name="Surin of Thailand"
            cuisine="Thai"
          />
          <FoodCard
            Icon={UtensilsCrossed}
            name="La Tavola Trattoria"
            cuisine="Italian"
          />

          <div style={{ marginTop: '8px' }}>
            <SectionLabel>Coffee</SectionLabel>
          </div>
          <FoodCard
            Icon={Coffee}
            name="Stroll"
            cuisine="Espresso bar"
            detail="Corner of Piedmont Park — the closest to us. Weekends only, opens at 9 AM."
          />
          <FoodCard
            Icon={Coffee}
            name="Starbucks"
            cuisine="Coffee"
            detail="Less than 10 minutes on foot."
          />
          <FoodCard
            Icon={Coffee}
            name="Perk Coffee"
            cuisine="Local coffee shop · Virginia Highland"
            detail="~20-minute walk. Worth it for a longer morning stroll."
          />

        </div>
      )}

    </div>
  )
}
