export const attendanceOptions = ['yes', 'no'] as const
export const foodPreferenceOptions = ['veg', 'non-veg'] as const
export const affiliationOptions = ['bride', 'groom', 'both'] as const

export type AttendanceOption = (typeof attendanceOptions)[number]
export type FoodPreferenceOption = (typeof foodPreferenceOptions)[number]
export type AffiliationOption = (typeof affiliationOptions)[number]

export interface RsvpFormValues {
  guestName: string
  partySize: number
  attendance: AttendanceOption
  foodPreference: FoodPreferenceOption
  affiliation: AffiliationOption
  message: string
}

export interface RsvpInsert
  extends Pick<RsvpFormValues, 'attendance' | 'message'> {
  guest_name: string
  party_size: number
  food_preference: FoodPreferenceOption
  affiliation: AffiliationOption
}

export interface RsvpRecord extends RsvpInsert {
  id: string
  created_at: string
  updated_at: string
}

export type RsvpSubmitState = 'idle' | 'submitting' | 'success' | 'error'

export type AppMode = 'full' | 'simple'
