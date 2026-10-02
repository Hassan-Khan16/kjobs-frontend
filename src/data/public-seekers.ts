export type PublicSeeker = {
  id: string;
  name: string;
  initials: string;
  title: string;
  location: string;
  experience: string;
  availability: string;
  skills: string[];
  summary: string;
  accent: string;
};

export const PUBLIC_SEEKERS: PublicSeeker[] = [
  {
    id: "amara-wilson",
    name: "Amara Wilson",
    initials: "AW",
    title: "Senior Product Designer",
    location: "New York, NY",
    experience: "7 years",
    availability: "Available now",
    skills: ["Product Design", "Figma", "Design Systems"],
    summary: "Product designer focused on thoughtful SaaS experiences and scalable design systems.",
    accent: "bg-brand-royal",
  },
  {
    id: "daniel-kim",
    name: "Daniel Kim",
    initials: "DK",
    title: "Full-Stack Engineer",
    location: "Remote",
    experience: "6 years",
    availability: "Available now",
    skills: ["React", "Node.js", "TypeScript"],
    summary: "Full-stack engineer building reliable products for fast-moving technology teams.",
    accent: "bg-brand-indigo",
  },
  {
    id: "maya-patel",
    name: "Maya Patel",
    initials: "MP",
    title: "Growth Marketing Lead",
    location: "Austin, TX",
    experience: "8 years",
    availability: "Open to offers",
    skills: ["Growth Strategy", "SEO", "Analytics"],
    summary: "Data-led marketer with a track record of growing B2B and consumer SaaS brands.",
    accent: "bg-brand-sky",
  },
  {
    id: "noah-bennett",
    name: "Noah Bennett",
    initials: "NB",
    title: "Backend Engineer",
    location: "Seattle, WA",
    experience: "5 years",
    availability: "Available now",
    skills: ["Python", "AWS", "PostgreSQL"],
    summary: "Backend specialist creating secure, resilient systems that perform at scale.",
    accent: "bg-brand-navy-2",
  },
  {
    id: "sofia-martinez",
    name: "Sofia Martinez",
    initials: "SM",
    title: "Product Manager",
    location: "Chicago, IL",
    experience: "6 years",
    availability: "Open to offers",
    skills: ["Product Strategy", "Agile", "Research"],
    summary: "Customer-focused product leader turning complex problems into clear roadmaps.",
    accent: "bg-brand-royal",
  },
  {
    id: "ethan-brooks",
    name: "Ethan Brooks",
    initials: "EB",
    title: "Data Scientist",
    location: "Boston, MA",
    experience: "4 years",
    availability: "Available now",
    skills: ["Python", "Machine Learning", "SQL"],
    summary: "Data scientist translating large datasets into practical business decisions.",
    accent: "bg-brand-indigo",
  },
];

export const SEEKER_FILTERS = [
  "All talent",
  "Design",
  "Engineering",
  "Marketing",
  "Product",
  "Data",
] as const;
