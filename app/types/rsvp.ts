export interface RSVP {
  id: string;
  name: string;
  guestsCount: number;
  contact: string;
  willDanceOsuokhay: boolean;
  willPlaySports: boolean;
  dietaryNote: string;
  createdAt: string;
}

export interface Reel {
  title: string;
  desc: string;
  bgGradient: string;
  stats: string;
  videoUrl: string;
}

export interface ProgramSlot {
  time: string;
  label: string;
  title: string;
  description: string;
  location: string;
  tag: string;
  tagColor: string;
  accentColor: string;
}

export interface Sponsor {
  tier: string;
  name: string;
  description: string;
  role: string;
}

export interface MapPin {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  isVenue?: boolean;
}
