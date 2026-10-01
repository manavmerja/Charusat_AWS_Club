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
  socials?: Socials
}

export type Member = {
  name: string
  role: string
  domain: string
  image?: string
  socials?: Socials
}

export const FACULTY: Faculty[] = [
  {
    name: "Faculty Advisor Name",
    role: "Faculty Advisor",
    designation: "Assistant Professor",
    department: "Dept. of Information Technology, CHARUSAT",
    image: "/team/faculty-advisor.jpg",
    socials: { linkedin: "https://linkedin.com", email: "advisor@charusat.ac.in" },
  },
  {
    name: "Faculty Coordinator Name",
    role: "Faculty Coordinator",
    designation: "Assistant Professor",
    department: "Dept. of Information Technology",
    image: "/team/faculty-coordinator.jpg",
    socials: { linkedin: "https://linkedin.com", email: "coordinator@charusat.ac.in" },
  },
]

export const MEMBERS: Member[] = [
  {
    name: "ABC",
    role: "Club Lead",
    domain: "Leadership",
    image: "/team/vedant-bhatt.jpg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Member Name",
    role: "Co-Lead",
    domain: "Leadership",
    image: "/team/co-lead.jpg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Member Name",
    role: "Cloud Lead",
    domain: "Cloud & DevOps",
    image: "/team/cloud-lead.jpg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Member Name",
    role: "Web Lead",
    domain: "Web Development",
    image: "/team/web-lead.jpg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Member Name",
    role: "Design Lead",
    domain: "UI / UX",
    image: "/team/design-lead.jpg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Member Name",
    role: "Events Lead",
    domain: "Operations",
    image: "/team/events-lead.jpg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Member Name",
    role: "Community Lead",
    domain: "Outreach",
    image: "/team/community-lead.jpg",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
  },
  {
    name: "Member Name",
    role: "Content Lead",
    domain: "Social Media",
    image: "/team/content-lead.jpg",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
  },
]
