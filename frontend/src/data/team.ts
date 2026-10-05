// Team Data for AWS Student Builder Group — CHARUSAT
// Profile photos: drop images into `public/team/` and set `image` (e.g. "/team/vedant.jpg").
// If omitted or broken, the card renders a styled initial badge.

export type Socials = {
  linkedin?: string;
  github?: string;
  instagram?: string;
  email?: string;
};

export type Mentor = {
  name: string;
  role: string;
  designation: string;
  department: string;
  initials: string;
  image?: string;
  imagePosition?: string;
  bio?: string;
  socials?: Socials;
};

export type StudentLeader = {
  name: string;
  role: string;
  badges: string[];
  department: string;
  initials: string;
  image?: string;
  imagePosition?: string;
  bio?: string;
  socials?: Socials;
};

export type DivisionMember = {
  name: string;
  role: string;
  initials: string;
  image?: string;
  imagePosition?: string;
  department?: string;
  specialty?: string;
  socials?: Socials;
};

export type Division = {
  id: string;
  name: string;
  icon: string;
  description: string;
  accentColor: "purple" | "emerald" | "amber" | "cyan" | "violet";
  members: DivisionMember[];
};

export const ACADEMIC_MENTORS: Mentor[] = [
  {
    name: "Dr. Purvi Prajapati",
    role: "Faculty Convenor",
    designation: "Head of Department",
    department: "CSPIT-IT",
    initials: "PP",
    image: "/team/Dr. Purvi Prajapati.jpeg",
    bio: "Provides departmental leadership and academic backing, ensuring student cloud initiatives align with academic excellence.",
    socials: {
      linkedin: "https://www.linkedin.com/in/purvi-prajapati-37ba6651",
    },
  },
  {
    name: "Prof. Ravi Patel",
    role: "Faculty Coordinator",
    designation: "Assistant Professor",
    department: "CSPIT-IT",
    initials: "RP",
    image: "/team/Prof. Ravi Patel.jpeg",
    bio: "Coordinates campus laboratory access, student approvals, and logistical support for technical workshops and hands-on sessions.",
    socials: {
      linkedin: "https://www.linkedin.com/in/ravi-patel-13686b19",
    },
  },
];

export const STUDENT_LEADERSHIP: StudentLeader[] = [
  {
    name: "Diya Prajapati",
    role: "Group Leader( Cloud Captain )",
    badges: ["AWS Cloud Captain", "Chapter Lead"],
    department: "DEPSTAR-CSE",
    initials: "DP",
    image: "/team/Diya_Group_Leader.png",
    imagePosition: "center 38%",
    bio: "Leads the AWS Student Builder Group at CHARUSAT. Sets the semester roadmap, coordinates founding student teams, and acts as the official liaison to AWS Student Programs.",
    socials: {
      linkedin: "https://www.linkedin.com/in/diya-h-prajapati",
      github: "https://github.com/Diyap235",
    },
  },
];

export const FOUNDING_DIVISIONS: Division[] = [
  {
    id: "cloud-engineering",
    name: "Cloud Team",
    icon: "☁️",
    description:
      "Plans terminal lab sessions, tests workshop code, and guides attendees through VPCs, IAM policies, and Free Tier cost alarms.",
    accentColor: "purple",
    members: [
      {
        name: "Bhargav Rakholiya",
        role: "Cloud Team",
        department: "DEPSTAR - CSE",
        initials: "BR",
        image: "/team/Bhargav_Rakholiya.png",
        specialty: "AWS Architecture & Security",
        socials: {
          linkedin: "http://www.linkedin.com/in/bhargav-rakholiya",
          github: "https://github.com/bhargavrakholiya123",
        },
      },
      {
        name: "Param Vadhadiya",
        role: "Cloud Team",
        department: "DEPSTAR - CSE",
        initials: "PV",
        image: "/team/Param Vadhadiya Cloud-Team.jpg",
        specialty: "Infrastructure & Networking",
        socials: {
          linkedin: "https://www.linkedin.com/in/param-vadhadiya/",
          github: "https://github.com/Paramvadhadiya500",
        },
      },
      {
        name: "Dev Jivani",
        role: "Cloud Team",
        department: "CSPIT - CE",
        initials: "DJ",
        image: "/team/Dev_Cloud-Team.jpeg",
        specialty: "Compute & Serverless",
        socials: {
          linkedin: "http://www.linkedin.com/in/dev-jivani-6a71a8321",
          github: "https://github.com/Devjivani1606",
        },
      },
      {
        name: "Vansh Malani",
        role: "Cloud Team",
        department: "DEPSTAR-CSE",
        initials: "VM",
        image: "/team/Vansh_Malani_cloud.jpg",
        specialty: "Linux & Cloud DevOps",
        socials: {
          linkedin: "https://www.linkedin.com/in/vanshmalani275/",
          github: "https://github.com/vmalani27",
        },
      },
    ],
  },
  {
    id: "web-platforms",
    name: "Web Team",
    icon: "🌐",
    description:
      "Architects and maintains community web applications, event registration portals, documentation, and open repositories.",
    accentColor: "emerald",
    members: [
      {
        name: "Manav Merja",
        role: "Web Team",
        department: "DEPSTAR - CE",
        initials: "MM",
        image: "/team/Manav_Merja_card.jpg",
        specialty: "Full Stack & Cloud Deployments",
        socials: {
          linkedin: "http://www.linkedin.com/in/manav-merja-124ba7317",
          github: "https://github.com/manavmerja",
        },
      },
      {
        name: "Vedant Bhatt",
        role: "Web Team",
        department: "CSPIT - CE",
        initials: "VB",
        image: "/team/Vedant Bhatt_Web_Team.png",
        specialty: "Frontend Systems & UI Engineering",
        socials: {
          linkedin: "http://www.linkedin.com/in/vedantbhattce",
          github: "https://github.com/vedantCE",
        },
      },
    ],
  },
  {
    id: "creative-design",
    name: "Creative Team",
    icon: "🎨",
    description:
      "Crafts visual brand identity, technical architecture diagrams, session posters, stage backdrops, and presentation decks.",
    accentColor: "cyan",
    members: [
      {
        name: "Jiya Sadaria",
        role: "Creative Team",
        department: "CSPIT - AIML",
        initials: "JS",
        image: "/team/jiya sadaria.png",
        specialty: "Visual Identity & Brand Systems",
        socials: {
          linkedin: "www.linkedin.com/in/ jiya-sadaria-a76370311",
          github: "https://github.com/Jiyabhaviksadaria",
        },
      },
      {
        name: "Dipobithi Das",
        role: "Creative Team",
        department: "DEPSTAR - IT",
        initials: "DD",
        image: "/team/Dipobithi Das.jpg",
        specialty: "UI/UX & Workshop Creatives",
        socials: {
          linkedin: "https://www.linkedin.com/in/dipobithi-das-95a732317",
          github: "https://github.com/dipobithi-21",
        },
      },
      {
        name: "Hasti Borda",
        role: "Creative Team",
        department: "DEPSTAR - CSE",
        initials: "HB",
        image: "/team/Hasti_Borda_card.jpg",
        specialty: "Graphics & Digital Media",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/hasti-borda-535834320?utm_source=share_via&utm_content=profile&utm_medium=member_android",
          github: "https://github.com/hastiborda1?tab=repositories",
        },
      },
    ],
  },
  {
    id: "community-engagement",
    name: "Community Engagement Team",
    icon: "📡",
    description:
      "Coordinates student registrations across departments, manages newcomer onboarding, and drives active community discussions.",
    accentColor: "violet",
    members: [
      {
        name: "Jeet Vadhia",
        role: "Community Team",
        department: "DEPSTAR - IT",
        initials: "JV",
        image: "/team/Jeet_Vadhia.png",
        specialty: "Campus Outreach",
        socials: {
          linkedin: "https://www.linkedin.com/in/jeet-vadhia/",
          github: "https://github.com/Jeet16-kumar",
        },
      },
      {
        name: "Bhakti Tank",
        role: "Community Team",
        department: "CSPIT - IT",
        initials: "BT",
        image: "/team/BHAKTI_TANK_COMMUNITY_TEAM.jpeg",
        specialty: "Student Onboarding & Queries",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/bhakti-tank-4838303a0?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
          github: "https://github.com/bhaktitank023-web",
        },
      },
      {
        name: "Dhanya Vala",
        role: "Community Team",
        department: "CSPIT - CSE",
        initials: "DV",
        image: "",
        specialty: "Peer Networking & Support",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/dhanya-vala-96b643375?utm_source=share_via&utm_content=profile&utm_medium=member_android",
          github: "https://github.com/dhanya1710",
        },
      },
      {
        name: "Naik Durva",
        role: "Community Team",
        department: "CSPIT - IT",
        initials: "ND",
        image: "/team/Durva_Naik_card.jpg",
        specialty: "Event Communications",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/durva-naik-569823427?utm_source=share_via&utm_content=profile&utm_medium=member_android",
          github: "https://github.com/26it040-ai",
        },
      },
      {
        name: "Kavya Shah",
        role: "Community Team",
        department: "DEPSTAR - CSE",
        initials: "KS",
        image: "/team/Kavya shah-communityteam.png",
        specialty: "Engagement & Member Relations",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/kavya-shah-ab342441a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
          github: "https://github.com/Kavyashah27",
        },
      },
    ],
  },
  {
    id: "media-operations",
    name: "Media Team",
    icon: "🎬",
    description:
      "Manages session photography, workshop video recordings, auditorium audio/visual production, and social media reels.",
    accentColor: "amber",
    members: [
      {
        name: "Ajay Kothari",
        role: "Media Team",
        department: "CMPICA - BCA",
        initials: "AK",
        image: "/team/AjayKothari_MediaTeam.jpg",
        specialty: "Event Production & Video",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/ajay-kothari-05318b245?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
          github: "https://github.com/typicallyajay",
        },
      },
      {
        name: "Shah Devam",
        role: "Media Team",
        department: "CSPIT - EC",
        initials: "SD",
        image: "/team/devamshah_media_team.jpg",
        specialty: "Photography & Post-Production",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/devam-shah-1096b0315?utm_source=share_via&utm_content=profile&utm_medium=member_android",
          github: "https://github.com/devammshah",
        },
      },
      {
        name: "Khushi Marathe",
        role: "Media Team",
        department: "DEPSTAR - CSE",
        initials: "KM",
        image: "/team/Khushi marathe media team.jpg",
        specialty: "Event Logistics & Production",
        socials: {
          linkedin: "https://www.linkedin.com/in/khushi-marathe-938322320?utm_source=share_via&utm_content=profile&utm_medium=member_android",
          github: "https://github.com/khushixmarathe",
        },
      },
      {
        name: "Jeel Mendpara",
        role: "Media Team",
        department: "CMPICA - BCA",
        initials: "JM",
        image: "/team/Jeel Mendpara.jpeg",
        specialty: "Social Media & Content Captures",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/jeel-mendpara-556598353?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
          github: "https://github.com/Golu5921",
        },
      },
      {
        name: "Vedant Kapadia",
        role: "Media Team",
        department: "DEPSTAR - CE",
        initials: "VK",
        image: "/team/Vedant-Kapadia-MediaTeam.jpg",
        specialty: "Lab & Stage Coordination",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/vedant-kapadia-7834a92b8?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
          github: "https://github.com/AmateurCoder9",
        },
      },
    ],
  },
];
