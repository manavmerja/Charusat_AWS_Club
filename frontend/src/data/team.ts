// Team Data for AWS Student Builder Group — CHARUSAT
// Profile photos: drop images into `public/team/` and set `image` (e.g. "/team/vedant.jpg").
// If omitted or broken, the card renders a styled initial badge.

export type Socials = {
  linkedin?: string
  github?: string
  instagram?: string
  email?: string
}

export type Mentor = {
  name: string
  role: string
  designation: string
  department: string
  initials: string
  image?: string
  bio?: string
  socials?: Socials
}

export type StudentLeader = {
  name: string
  role: string
  badges: string[]
  department: string
  initials: string
  image?: string
  bio?: string
  socials?: Socials
}

export type DivisionMember = {
  name: string
  role: string
  initials: string
  image?: string
  specialty?: string
  socials?: Socials
}

export type Division = {
  id: string
  name: string
  icon: string
  description: string
  accentColor: "purple" | "emerald" | "amber" | "cyan" | "violet"
  members: DivisionMember[]
}

export const ACADEMIC_MENTORS: Mentor[] = [
  {
    name: "Dr. Purvi Prajapati",
    role: "Faculty Convenor",
    designation: "Head of Department",
    department: "Department of Information Technology, CHARUSAT",
    initials: "PP",
    bio: "Provides departmental leadership and academic backing, ensuring student cloud initiatives align with academic excellence.",
    socials: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Prof. Ravi Patel",
    role: "Faculty Coordinator",
    designation: "Assistant Professor",
    department: "Department of Information Technology, CHARUSAT",
    initials: "RP",
    bio: "Coordinates campus laboratory access, student approvals, and logistical support for technical workshops and hands-on sessions.",
    socials: {
      linkedin: "https://linkedin.com",
    },
  },
]

export const STUDENT_LEADERSHIP: StudentLeader[] = [
  {
    name: "Diya Prajapati",
    role: "Student Builder Leader",
    badges: ["AWS Cloud Captain", "Chapter Lead"],
    department: "CHARUSAT",
    initials: "DP",
    bio: "Leads the AWS Student Builder Group at CHARUSAT. Sets the semester roadmap, coordinates founding student teams, and acts as the official liaison to AWS Student Programs.",
    socials: {
      linkedin: "https://linkedin.com",
    },
  },
]

export const FOUNDING_DIVISIONS: Division[] = [
  {
    id: "cloud-engineering",
    name: "Cloud Engineering",
    icon: "☁️",
    description: "Plans terminal lab sessions, tests workshop code, and guides attendees through VPCs, IAM policies, and Free Tier cost alarms.",
    accentColor: "purple",
    members: [
      {
        name: "Bhargav Rakhol",
        role: "Cloud Engineering Lead",
        initials: "BR",
        specialty: "AWS Architecture & Security",
        socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
      },
      {
        name: "Param Vadhadiya",
        role: "Cloud Engineer",
        initials: "PV",
        specialty: "Infrastructure & Networking",
        socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
      },
      {
        name: "Dev Jivani",
        role: "Cloud Engineer",
        initials: "DJ",
        specialty: "Compute & Serverless",
        socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
      },
      {
        name: "Vansh Malani",
        role: "Cloud Engineer",
        initials: "VM",
        specialty: "Linux & Cloud DevOps",
        socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
      },
    ],
  },
  {
    id: "web-platforms",
    name: "Web & Platforms",
    icon: "🌐",
    description: "Architects and maintains community web applications, event registration portals, documentation, and open repositories.",
    accentColor: "emerald",
    members: [
      {
        name: "Manav Merja",
        role: "Web & Platforms Lead",
        initials: "MM",
        specialty: "Full Stack & Cloud Deployments",
        socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
      },
      {
        name: "Vedant Bhatt",
        role: "Web & Platforms",
        initials: "VB",
        image: "/team/Vedant Bhatt_Web_Team.png",
        specialty: "Frontend Systems & UI Engineering",
        socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
      },
    ],
  },
  {
    id: "creative-design",
    name: "Creative & Design",
    icon: "🎨",
    description: "Crafts visual brand identity, technical architecture diagrams, session posters, stage backdrops, and presentation decks.",
    accentColor: "cyan",
    members: [
      {
        name: "Jiya Sadaria",
        role: "Design Lead",
        initials: "JS",
        specialty: "Visual Identity & Brand Systems",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        name: "Dipobithi Das",
        role: "Creative Designer",
        initials: "DD",
        specialty: "UI/UX & Workshop Creatives",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        name: "Hasti Borda",
        role: "Creative Designer",
        initials: "HB",
        specialty: "Graphics & Digital Media",
        socials: { linkedin: "https://linkedin.com" },
      },
    ],
  },
  {
    id: "community-engagement",
    name: "Community Engagement",
    icon: "📡",
    description: "Coordinates student registrations across departments, manages newcomer onboarding, and drives active community discussions.",
    accentColor: "violet",
    members: [
      {
        name: "Jeet Vadhia",
        role: "Community Lead",
        initials: "JV",
        specialty: "Campus Outreach & Operations",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        name: "Bhakti Tank",
        role: "Community Coordinator",
        initials: "BT",
        specialty: "Student Onboarding & Queries",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        name: "Dhanya Vala",
        role: "Community Coordinator",
        initials: "DV",
        specialty: "Peer Networking & Support",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        name: "Naik Durva",
        role: "Community Coordinator",
        initials: "ND",
        specialty: "Event Communications",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        name: "Kavya Shah",
        role: "Community Coordinator",
        initials: "KS",
        specialty: "Engagement & Member Relations",
        socials: { linkedin: "https://linkedin.com" },
      },
    ],
  },
  {
    id: "media-operations",
    name: "Media & Operations",
    icon: "🎬",
    description: "Manages session photography, workshop video recordings, auditorium audio/visual production, and social media reels.",
    accentColor: "amber",
    members: [
      {
        name: "Ajay Kothari",
        role: "Media & Operations Lead",
        initials: "AK",
        specialty: "Event Production & Video",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        name: "Shah Devam",
        role: "Media Specialist",
        initials: "SD",
        specialty: "Photography & Post-Production",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        name: "Khushi Marathe",
        role: "Operations Coordinator",
        initials: "KM",
        specialty: "Event Logistics & Production",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        name: "Jeel Mendpara",
        role: "Media Specialist",
        initials: "JM",
        specialty: "Social Media & Content Captures",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        name: "Vedant Kapadia",
        role: "Operations Specialist",
        initials: "VK",
        specialty: "Lab & Stage Coordination",
        socials: { linkedin: "https://linkedin.com" },
      },
    ],
  },
]
