import {
  Award,
  Baby,
  Bone,
  BrainCircuit,
  Droplets,
  HeartHandshake,
  HeartPulse,
  Cpu,
  Users,
  UserCheck,
} from 'lucide-react';

// -----------------------------
// NAVIGATION LINKS
// -----------------------------
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About Us' },
  { href: '/#services', label: 'Services' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/patient-resources', label: 'Patient Resources' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

// -----------------------------
// ICON MAPPING
// -----------------------------
export const iconMap = {
  Droplets,
  BrainCircuit,
  Bone,
  Baby,
  HeartPulse,
  HeartHandshake,
  Award,
  Cpu,
  Users,
  UserCheck,
};

// Base URL from Environment Variable
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// -----------------------------
// FETCH SERVICES
// -----------------------------
export async function getServices() {
  try {
    const res = await fetch(`${API_URL}/services`, {
      next: { revalidate: 10 },
    });

    if (!res.ok) throw new Error("Failed to fetch services");

    return await res.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// -----------------------------
// FETCH TESTIMONIALS
// -----------------------------
export async function getTestimonials() {
  try {
    const res = await fetch(`${API_URL}/testimonials`, {
      next: { revalidate: 10 },
    });

    if (!res.ok) throw new Error("Failed to fetch testimonials");

    return await res.json();
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

// -----------------------------
// WHY CHOOSE US DATA
// -----------------------------
export const whyChooseUs = [
  {
    title: 'Qualified Professionals',
    description:
      'Our team consists of certified and experienced personnel dedicated to your recovery.',
    icon: UserCheck,
  },
  {
    title: 'Personalized Care',
    description:
      'We create tailored treatment plans that address your unique needs and goals.',
    icon: HeartHandshake,
  },
  {
    title: 'Modern Equipment',
    description:
      'We use state-of-the-art equipment to provide the most effective treatments.',
    icon: Cpu,
  },
  {
    title: 'Supportive Environment',
    description:
      'A calming and encouraging atmosphere to help you feel motivated and hopeful.',
    icon: Users,
  },
];
