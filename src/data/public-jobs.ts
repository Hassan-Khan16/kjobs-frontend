import type { PublicEmployer, PublicJob } from "@/types/public-job";

const defaultResponsibilities = [
  "Own day-to-day delivery and collaborate with product, design, and engineering",
  "Contribute to planning, reviews, and quality standards",
  "Communicate progress clearly and raise risks early",
  "Help improve team process and documentation",
];

const defaultRequirements = [
  "Proven experience in a similar role",
  "Strong written and verbal communication",
  "Comfortable working independently and in a team",
  "A portfolio or work history that demonstrates impact",
];

const defaultBenefits = [
  "Competitive salary",
  "Health coverage",
  "Flexible work arrangement",
  "Learning stipend",
];

function job(
  partial: Omit<
    PublicJob,
    "responsibilities" | "requirements" | "benefits" | "companyDesc" | "companySize" | "companyIndustry"
  > &
    Partial<
      Pick<
        PublicJob,
        | "responsibilities"
        | "requirements"
        | "benefits"
        | "companyDesc"
        | "companySize"
        | "companyIndustry"
      >
    >,
): PublicJob {
  return {
    responsibilities: defaultResponsibilities,
    requirements: defaultRequirements,
    benefits: defaultBenefits,
    companyDesc: `${partial.company} is hiring through KJobs for roles that help teams move faster.`,
    companySize: "100–200 employees",
    companyIndustry: partial.category,
    ...partial,
  };
}

export const PUBLIC_JOBS: PublicJob[] = [
  job({
    id: "1",
    title: "Senior Frontend Developer",
    company: "Nexora Labs",
    companyId: "nexora-labs",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140K – $180K",
    posted: "2 days ago",
    postedAt: "2026-09-30T10:00:00.000Z",
    category: "Engineering",
    experienceLevel: "Senior",
    initials: "NL",
    color: "#2F5BDE",
    description:
      "Nexora Labs is looking for a Senior Frontend Developer to join our growing product team. You'll work on cutting-edge web applications that serve millions of users, collaborate closely with product and design, and help define our frontend architecture.",
    responsibilities: [
      "Lead development of complex, scalable UI components using React and TypeScript",
      "Collaborate with design and product to translate concepts into polished interfaces",
      "Define and enforce frontend architecture, code standards, and best practices",
      "Mentor junior engineers and contribute to engineering culture",
      "Drive performance optimization and accessibility improvements across the platform",
      "Participate in code reviews, technical planning, and sprint ceremonies",
    ],
    requirements: [
      "5+ years of professional frontend development experience",
      "Deep expertise with React, TypeScript, and modern CSS",
      "Strong understanding of web performance, accessibility (WCAG 2.1), and SEO",
      "Experience with design systems and component libraries",
      "Familiarity with CI/CD pipelines and testing practices",
      "Excellent communication and collaboration skills",
    ],
    benefits: [
      "Competitive salary with equity package",
      "Comprehensive health, dental, and vision coverage",
      "Flexible hybrid work arrangement",
      "Generous PTO and paid parental leave",
      "$3,000 annual learning & development budget",
      "Home office stipend and hardware allowance",
    ],
    companyDesc:
      "Nexora Labs builds developer tools and infrastructure products trusted by over 50,000 engineering teams worldwide. We're backed by top-tier investors and growing fast.",
    companySize: "200–500 employees",
    companyIndustry: "Developer Tools / SaaS",
  }),
  job({
    id: "2",
    title: "Software Engineer",
    company: "Quantum Systems",
    companyId: "quantum-systems",
    location: "Remote",
    type: "Full-time",
    salary: "$120K – $160K",
    posted: "1 day ago",
    postedAt: "2026-10-01T10:00:00.000Z",
    category: "Engineering",
    experienceLevel: "Mid",
    initials: "QS",
    color: "#6366F1",
    description:
      "Quantum Systems is hiring a Software Engineer to help build the next generation of distributed computing infrastructure. This is a fully remote role with a collaborative, async-first culture.",
    responsibilities: [
      "Design and implement backend services using Go and Python",
      "Contribute to distributed systems architecture and scalability planning",
      "Write high-coverage tests and maintain production reliability",
      "Participate in on-call rotations and incident response",
      "Work cross-functionally with product managers and other engineers",
    ],
    requirements: [
      "3+ years of professional software engineering experience",
      "Proficiency in Go, Python, or similar languages",
      "Experience with distributed systems and microservices",
      "Familiarity with cloud platforms (AWS, GCP, or Azure)",
      "Strong fundamentals in algorithms and data structures",
    ],
    benefits: [
      "Fully remote with flexible hours",
      "Competitive compensation and equity",
      "Health, dental, and vision insurance",
      "$2,500 annual equipment and home office budget",
      "Quarterly offsites and team retreats",
    ],
    companyDesc:
      "Quantum Systems builds high-performance distributed computing infrastructure for enterprises.",
    companySize: "100–200 employees",
    companyIndustry: "Infrastructure / Cloud",
  }),
  job({
    id: "3",
    title: "Product Designer",
    company: "Veriflow Inc.",
    companyId: "veriflow",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110K – $145K",
    posted: "3 days ago",
    postedAt: "2026-09-29T10:00:00.000Z",
    category: "Design",
    experienceLevel: "Mid",
    initials: "VI",
    color: "#38BDF8",
    description:
      "Veriflow is looking for a Product Designer to shape product experiences across web and mobile. You will partner with research, engineering, and go-to-market teams.",
    companyIndustry: "Fintech",
  }),
  job({
    id: "4",
    title: "Backend Developer",
    company: "Arclight Tech",
    companyId: "arclight-tech",
    location: "Austin, TX",
    type: "Hybrid",
    salary: "$130K – $165K",
    posted: "4 hours ago",
    postedAt: "2026-10-02T08:00:00.000Z",
    category: "Engineering",
    experienceLevel: "Mid",
    initials: "AT",
    color: "#243B6B",
    description:
      "Arclight Tech needs a Backend Developer to scale APIs, data pipelines, and internal platforms that power customer-facing products.",
  }),
  job({
    id: "5",
    title: "Marketing Manager",
    company: "Brandwave Co.",
    companyId: "brandwave",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$90K – $120K",
    posted: "1 day ago",
    postedAt: "2026-10-01T12:00:00.000Z",
    category: "Marketing",
    experienceLevel: "Mid",
    initials: "BW",
    color: "#2F5BDE",
    description:
      "Brandwave is hiring a Marketing Manager to lead campaigns, content, and demand generation for a growing B2B brand.",
    companyIndustry: "Marketing",
  }),
  job({
    id: "6",
    title: "DevOps Engineer",
    company: "CloudEdge Solutions",
    companyId: "cloudedge",
    location: "Remote",
    type: "Contract",
    salary: "$150K – $190K",
    posted: "5 hours ago",
    postedAt: "2026-10-02T07:00:00.000Z",
    category: "Engineering",
    experienceLevel: "Senior",
    initials: "CE",
    color: "#6366F1",
    description:
      "CloudEdge is looking for a DevOps Engineer to own CI/CD, observability, and cloud infrastructure for high-traffic services.",
  }),
  job({
    id: "7",
    title: "UX Researcher",
    company: "Designify Studio",
    companyId: "designify",
    location: "Remote",
    type: "Part-time",
    salary: "$80K – $110K",
    posted: "2 days ago",
    postedAt: "2026-09-30T14:00:00.000Z",
    category: "Design",
    experienceLevel: "Mid",
    initials: "DS",
    color: "#38BDF8",
    description:
      "Designify needs a UX Researcher to run studies, synthesize insights, and help product teams make evidence-based decisions.",
  }),
  job({
    id: "8",
    title: "Data Scientist",
    company: "Insight Analytics",
    companyId: "insight-analytics",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$135K – $175K",
    posted: "3 days ago",
    postedAt: "2026-09-29T09:00:00.000Z",
    category: "Data",
    experienceLevel: "Senior",
    initials: "IA",
    color: "#2F5BDE",
    description:
      "Insight Analytics is hiring a Data Scientist to build models, dashboards, and decision systems for enterprise customers.",
  }),
  job({
    id: "9",
    title: "Product Manager",
    company: "LaunchPad Inc.",
    companyId: "launchpad",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$125K – $160K",
    posted: "6 days ago",
    postedAt: "2026-09-26T10:00:00.000Z",
    category: "Product",
    experienceLevel: "Mid",
    initials: "LP",
    color: "#6366F1",
    description:
      "LaunchPad is looking for a Product Manager to own roadmap, discovery, and delivery for a core product surface.",
  }),
  job({
    id: "10",
    title: "iOS Developer",
    company: "Mobily Apps",
    companyId: "mobily-apps",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$130K – $165K",
    posted: "1 day ago",
    postedAt: "2026-10-01T11:00:00.000Z",
    category: "Engineering",
    experienceLevel: "Mid",
    initials: "MA",
    color: "#243B6B",
    description:
      "Mobily Apps needs an iOS Developer to ship polished SwiftUI experiences and keep a high-quality mobile codebase healthy.",
  }),
  job({
    id: "11",
    title: "Content Strategist",
    company: "Brandwave Co.",
    companyId: "brandwave",
    location: "Remote",
    type: "Full-time",
    salary: "$75K – $100K",
    posted: "4 days ago",
    postedAt: "2026-09-28T10:00:00.000Z",
    category: "Marketing",
    experienceLevel: "Mid",
    initials: "BW",
    color: "#2F5BDE",
    description:
      "Brandwave is hiring a Content Strategist to define narrative, own editorial calendars, and support product launches.",
  }),
  job({
    id: "12",
    title: "Security Engineer",
    company: "CipherCore",
    companyId: "ciphercore",
    location: "Washington, DC",
    type: "Full-time",
    salary: "$145K – $185K",
    posted: "2 days ago",
    postedAt: "2026-09-30T16:00:00.000Z",
    category: "Engineering",
    experienceLevel: "Senior",
    initials: "CC",
    color: "#6366F1",
    description:
      "CipherCore is looking for a Security Engineer to harden infrastructure, lead reviews, and support a growing security program.",
  }),
];

export const PUBLIC_EMPLOYERS: PublicEmployer[] = [
  {
    id: "nexora-labs",
    name: "Nexora Labs",
    industry: "Developer Tools / SaaS",
    location: "San Francisco, CA",
    openJobs: 1,
    initials: "NL",
    color: "#2F5BDE",
    description:
      "Nexora Labs builds developer tools and infrastructure products trusted by engineering teams worldwide.",
    size: "200–500 employees",
  },
  {
    id: "quantum-systems",
    name: "Quantum Systems",
    industry: "Infrastructure / Cloud",
    location: "Remote",
    openJobs: 1,
    initials: "QS",
    color: "#6366F1",
    description:
      "Quantum Systems builds high-performance distributed computing infrastructure for enterprises.",
    size: "100–200 employees",
  },
  {
    id: "veriflow",
    name: "Veriflow Inc.",
    industry: "Fintech",
    location: "New York, NY",
    openJobs: 1,
    initials: "VI",
    color: "#38BDF8",
    description: "Veriflow helps teams verify and ship financial products with confidence.",
    size: "80–150 employees",
  },
  {
    id: "arclight-tech",
    name: "Arclight Tech",
    industry: "Engineering",
    location: "Austin, TX",
    openJobs: 1,
    initials: "AT",
    color: "#243B6B",
    description: "Arclight Tech builds platforms that help product teams scale.",
    size: "50–100 employees",
  },
  {
    id: "brandwave",
    name: "Brandwave Co.",
    industry: "Marketing",
    location: "Chicago, IL",
    openJobs: 2,
    initials: "BW",
    color: "#2F5BDE",
    description: "Brandwave is a growth studio helping B2B brands find their next audience.",
    size: "40–80 employees",
  },
];

export const JOB_CATEGORIES = [
  "All",
  "Engineering",
  "Design",
  "Marketing",
  "Data",
  "Product",
] as const;

export const JOB_TYPES = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Hybrid",
  "Remote",
] as const;
