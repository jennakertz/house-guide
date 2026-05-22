// Gracefully no-ops on iOS Safari and desktop
export const haptic = (ms = 8) => navigator.vibrate?.(ms)
