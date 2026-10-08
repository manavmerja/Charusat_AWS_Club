# Data Layer Directory (`src/data/`)

This directory contains the central data sources for the website. The UI automatically reads from these files, so you can update website content without touching any TSX code.

---

## 1. `events.ts`
Stores all flagship events and workshops.

### Adding a New Event:
Add a new object to the array with the following schema:
```ts
{
  slug: "my-new-event", // Becomes URL: /events/my-new-event
  title: "Event Title",
  shortDescription: "Short summary shown on the main card",
  fullDescription: "Detailed markdown/text on the event slug page",
  date: "October 15, 2026",
  time: "10:00 AM - 1:00 PM IST",
  venue: "DEPSTAR Auditorium / Online",
  category: "Workshop" | "Hackathon" | "Cloud Meetup",
  status: "Upcoming" | "Past" | "Registration Open",
  registrationLink: "https://forms.gle/...",
  image: "/event-folder/cover.jpg",
  agenda: [
    { time: "10:00 AM", title: "Keynote & Setup" },
    ...
  ],
  speakers: [
    { name: "Speaker Name", role: "Cloud Architect", avatar: "/team/..." }
  ]
}
```

---

## 2. `team.ts`
Stores faculty mentors, core executive committee, and domain leads.

### Adding a New Team Member:
1. Place their photo in `/public/team/<Name>.png` (recommended 400x400 square or portrait).
2. Add their entry to `team.ts`:
```ts
{
  name: "Full Name",
  role: "President" | "Tech Lead" | "Event Lead" | "Design Lead" | "Member",
  subRole: "DevOps & Cloud Architect",
  department: "CSPIT CSE" | "DEPSTAR IT",
  image: "/team/FullName.png",
  socials: {
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username",
    instagram: "https://instagram.com/username"
  }
}
```
