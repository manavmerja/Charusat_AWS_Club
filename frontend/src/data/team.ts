// Team data 
// Edit this file to update the Team section — no component changes needed.
//
// Profile photos: drop images into `public/team/` and set `image` to the path
// relative to /public (e.g. "/team/vedant-bhatt.jpg"). Square or portrait
// (4:5) photos look best. If `image` is omitted or the file is missing, the
// card falls back to an initials avatar.

export type Socials = {
  linkedin?: string
  github?: string
  instagram?: string
  email?: string
}

export type Faculty = {
  name: string
  role: string
  designation: string
  department: string
  image?: string
  /** Short quote revealed when the card flips on hover. Falls back to designation/department (faculty) or role (members). */
  thought?: string
  socials?: Socials
}

export type Member = {
  name: string
  role: string
  image?: string
  /** Short quote revealed when the card flips on hover. Falls back to designation/department (faculty) or role (members). */
  thought?: string
  socials?: Socials
}

export const FACULTY: Faculty[] = [
  {
    name: "Faculty Advisor Name",
    role: "Faculty Advisor",
    designation: "Assistant Professor",
    department: "Dept. of Information Technology, CHARUSAT",
    image: "",
    thought: "Great engineers are built by curiosity, not by syllabus.",
    socials: { linkedin: "https://linkedin.com", email: "advisor@charusat.ac.in" },
  },
  {
    name: "Faculty Coordinator Name",
    role: "Faculty Coordinator",
    designation: "Assistant Professor",
    department: "Dept. of Information Technology",
    image: "/team/faculty-coordinator.jpg",
    thought: "The cloud is just someone else's computer — learn how it really works.",
    socials: { linkedin: "https://linkedin.com", email: "coordinator@charusat.ac.in" },
  },
]

export const MEMBERS: Member[] = [
  {
    name: "ABC",
    role: "Club Lead",
    image: "/team/vedant-bhatt.jpg",
    thought: "Build in public, learn in public, grow together.",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Member Name",
    role: "Co-Lead",
    image: "/team/co-lead.jpg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Member Name",
    role: "Cloud Lead",
    image: "/team/cloud-lead.jpg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Member Name",
    role: "Web Team",
    image: "/team/Vedant Bhatt_Web_Team.png",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Member Name",
    role: "Design Lead",
    image: "/team/design-lead.jpg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Member Name",
    role: "Events Lead",
    image: "/team/events-lead.jpg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Member Name",
    role: "Community Lead",
    image: "/team/community-lead.jpg",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
  },
  {
    name: "Member Name",
    role: "Content Lead",
    image: "/team/content-lead.jpg",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
  },
]
