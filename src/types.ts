export interface HousingListing {
  id: string;
  title: string;
  university: string;
  distance: string;
  price: number;
  type: 'Bed Space' | 'Single Room' | 'Shared Room' | 'Studio';
  wifi: boolean;
  insideCR: boolean;
  withSink: boolean;
  cctv: boolean;
  image: string;
  isVerified: boolean;
  landlordName: string;
  description: string;
  amenities: string[];
  rules: string[];
}

export interface RoommateProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  course: string;
  year: number;
  tags: string[];
  sleepSchedule: string;
  cleanliness: string;
  budget: string;
  bio: string;
  matchScore?: number;
}

export interface Message {
  sender: 'user' | 'agent';
  text: string;
  time: string;
}
