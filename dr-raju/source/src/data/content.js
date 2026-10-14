/**
 * All site content in one place.
 *
 * Section numbers are generated sequentially at render time (see SECTION_ORDER),
 * so inserting or removing a section can never leave a numbering gap.
 */
import portrait from "../assets/raju-B8vpkMaS.png";
import conversation from "../assets/g01-D4Fw9skF.jpg";
import gallery1 from "../assets/g01-D4Fw9skF.jpg";
import gallery2 from "../assets/g03-EYHnb0Y_.jpg";
import gallery3 from "../assets/g04-rxrRHLqn.jpg";
import gallery4 from "../assets/g05-mYj1lAwD.jpg";
import gallery5 from "../assets/g06-CP78mX8j.jpg";
import gallery6 from "../assets/g09-B5Gk2NAj.jpg";
import gallery7 from "../assets/g10-DBKRfwRA.jpg";

export const LINKS = {
  waigProfile: "https://waigfoundation.com/members/3",
  forbesProfile:
    "https://www.forbesindia.com/article/upfront/brand-connect/visionaries-turning-bold-ideas-into-realities/2994376/1",
  linkedin: "https://www.linkedin.com/in/drrajuai",
  astravionLab:
    "https://www.linkedin.com/posts/drrajuai_astravion-bankingai-generativeai-activity-7467864319616053248-hJA7",
  mediaMeet:
    "https://www.linkedin.com/posts/drrajuai_aigovernance-responsibleai-ethicalai-activity-7421232871845113859-NbsV",
  nasscom:
    "https://www.linkedin.com/posts/drrajuai_nasscomcertification-businessanalytics-activity-7420669689351249920-KQOX",
  email: "mailto:raju.r3spai@gmail.com",
};

export const HERO = {
  eyebrow: "Leadership · Responsible AI",
  location: "Hyderabad, India",
  name: "Dr. Gundala Nagaraju",
  role: "Raju | Technology & AI governance",
  lede: "Bringing technology leadership, responsible AI and industry learning together.",
  roleLine1: "President & Chairperson",
  roleLine2: "World AI Governance Foundation",
  portrait,
  portraitAlt: "Dr. Gundala Nagaraju, photographed in a dark suit",
  portraitCaption: "Portrait · WAIG Foundation leadership profile",
};

export const MARQUEE = [
  "Responsible AI",
  "Governance by design",
  "ISO/IEC 42001",
  "Risk & accountability",
  "Mentorship",
  "Industry–academia",
];

export const NAV = [
  { id: "about", label: "About" },
  { id: "leadership", label: "Leadership" },
  { id: "work", label: "AI governance" },
  { id: "mentorship", label: "Mentorship" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
  { id: "booking", label: "Schedule a meeting" },
];

export const ABOUT = {
  heading: "Technology with purpose. Leadership with accountability.",
  body: [
    "Dr. Gundala Nagaraju works at the intersection of IT strategy, application architecture and digital transformation. His WAIG leadership biography describes a focus on aligning advanced technologies with business goals, spanning AI/ML, data science and enterprise platforms.",
    "His public work brings together enterprise AI delivery, responsible governance and practical learning for students, professionals and founders.",
  ],
  link: { label: "WAIG leadership biography", href: LINKS.waigProfile },
};

export const LEADERSHIP = {
  cards: [
    {
      kicker: "AI governance",
      title: "World AI Governance Foundation",
      body: "President and Chairperson; Global Executive Director.",
      link: { label: "Official leadership profile", href: LINKS.waigProfile },
    },
    {
      kicker: "Enterprise leadership",
      title: "Astravion & technology ventures",
      body: "Publicly profiled for fractional C-level work with ESF Labs / Astravion NextGen Catalyst and SmartMieten Tech.",
      link: { label: "May 2026 Brand Connect profile", href: LINKS.forbesProfile },
    },
    {
      kicker: "Alumni & academia",
      title: "IIT Kharagpur Hyderabad",
      body: "President of the Hyderabad Alumni Chapter, as described in the May 2026 public profile.",
      link: { label: "Published profile", href: LINKS.forbesProfile },
    },
  ],
};

export const WORK = {
  heading: "Responsible AI, from strategy to delivery.",
  body: "His published Astravion work describes AI delivery with governance, transparency and accountability built into its design. These themes connect technology decisions with enterprise risk and business value.",
  pillars: [
    {
      title: "Governance by design",
      body: "ISO/IEC 42001:2023-aligned AI delivery and enterprise governance.",
    },
    {
      title: "Risk & accountability",
      body: "Explainability, model monitoring, bias mitigation and AI risk management.",
    },
    {
      title: "Enterprise adoption",
      body: "Banking AI proof of concepts, data engineering and responsible transformation.",
    },
    {
      title: "Trust & security",
      body: "Security and privacy considered across the AI lifecycle.",
    },
  ],
  link: { label: "Astravion Banking AI Innovation Lab · June 2026", href: LINKS.astravionLab },
};

export const CONVERSATION = {
  kicker: "WAIG Foundation media meet",
  image: conversation,
  imageAlt: "WAIG Foundation leaders at a media briefing in Hyderabad, January 2026",
  caption:
    "WAIG Foundation media meet, Hyderabad · January 2026. Photo from Dr. Raju's public post.",
  link: { label: "View the event", href: LINKS.mediaMeet },
  heading: "Connecting governance, industry and the public.",
  body: "The Hyderabad gathering brought industry and academia into discussion on ethical AI, security, transparency and responsible adoption.",
};

export const MENTORSHIP = {
  heading: "Build capability. Connect learning to practice.",
  body: "His public education initiatives describe hands-on mentorship and industry exposure for students, faculty development and industry-aligned programs. The focus is on practical AI/ML and business analytics learning, with links between academia, startups and industry.",
  kicker: "Industry-aligned learning",
  title: "NASSCOM FSP–EPBL Certification Program",
  body2:
    "The January 2026 industry-academia announcement names a planned rollout of this program alongside mentorship, workshops and faculty development.",
  note: "Program reference, not a personal certificate.",
  link: { label: "Read the program announcement", href: LINKS.nasscom },
};

export const PUBLISHED = {
  kicker: "Forbes India · Brand Connect",
  heading: "Steering the global conversation on responsible AI",
  body: "A May 2026 profile on technology leadership, enterprise transformation and mentorship.",
  link: { label: "Read the published profile", href: LINKS.forbesProfile },
  note: "Brand Connect is advertisement-equivalent content, not produced by Forbes India journalists. This is a published profile, not an editorial award.",
};

export const GALLERY = {
  heading: "Moments from the public record.",
  slides: [
    { src: gallery1, alt: "Panel seated before a world map at the WAIG Foundation media meet", caption: "WAIG Foundation media meet", meta: "WAIG Foundation media meet · January 2026", thumb: "WAIG Foundation media meet", contain: false },
    { src: gallery2, alt: "Panel addressing journalists at the media meet", caption: "Addressing the press", meta: "WAIG Foundation media meet · January 2026", thumb: "Addressing the press", contain: false },
    { src: gallery3, alt: "Press briefing with cameras at the media meet in Hyderabad", caption: "Press briefing", meta: "WAIG Foundation media meet · January 2026", thumb: "Press briefing", contain: false },
    { src: gallery4, alt: "Attendees holding a signed document at the MoU event", caption: "MoU announcement", meta: "MoU announcement · January 2026", thumb: "MoU announcement", contain: false },
    { src: gallery5, alt: "Participants signing documents at the MoU event", caption: "Signing session", meta: "MoU announcement · January 2026", thumb: "Signing session", contain: false },
    { src: gallery6, alt: "Astravion graphic listing core banking AI use cases", caption: "Core banking AI use cases", meta: "Astravion innovation lab · June 2026", thumb: "Core banking AI use cases", contain: true },
    { src: gallery7, alt: "Illustrated sketch-note profile graphic shared by Dr. Raju", caption: "Illustrated profile", meta: "Illustrated profile graphic", thumb: "Illustrated profile graphic", contain: true },
  ],
  sourcePrefix: "All 7 images are from Dr. Raju's public LinkedIn posts:",
  sourceLinks: [
    { label: "media meet", href: LINKS.mediaMeet },
    { label: "MoU announcement", href: LINKS.nasscom },
    { label: "Astravion", href: LINKS.astravionLab },
  ],
};

export const CONTACT = {
  heading: "Start a professional conversation.",
  body: "For direct enquiries, connect through Dr. Raju's public LinkedIn profile.",
  actions: [
    { label: "Connect on LinkedIn", href: LINKS.linkedin, variant: "ghost" },
    { label: "Email Dr. Raju", href: LINKS.email, variant: "solid" },
  ],
  note: "Email Dr. Raju directly or send a meeting request. Suggested times are requests only and require email confirmation.",
};

export const BOOKING = {
  heading: "Choose a date and time that suits you.",
  note: "Suggested slots only; availability is not live. Submit to open an email request. The meeting is not confirmed until Dr. Raju replies.",
  dateLabel: "Choose a preferred date",
  timeLabel: "Suggested 30-minute times · India Standard Time (UTC+05:30)",
  slots: ["10:00", "11:30", "14:00", "16:00"],
  fields: {
    name: "Name",
    email: "Email",
    message: "Message (optional)",
  },
  consent:
    "Your details are added to an email draft. This site does not store or send the message; you send it from your email app.",
  submit: "Open meeting request email",
};

export const FOOTER = {
  line: "Dr. Gundala Nagaraju (Raju) · Leadership, technology & responsible AI",
};

/**
 * The single source of truth for section order. Eyebrow numbers are derived
 * from position in this array, which is why the old build drifted to
 * "08 / Contact" followed by "11 / Schedule".
 */
export const SECTION_ORDER = [
  { id: "about", label: "About" },
  { id: "leadership", label: "Leadership" },
  { id: "work", label: "AI governance" },
  { id: "conversation", label: "In the conversation" },
  { id: "mentorship", label: "Mentorship & learning" },
  { id: "published", label: "Published profile" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
  { id: "booking", label: "Schedule a conversation" },
];

export const sectionNumber = (id) =>
  String(SECTION_ORDER.findIndex((s) => s.id === id) + 1).padStart(2, "0");