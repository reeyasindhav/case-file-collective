export type CaseStatus = "active" | "cold" | "solved";

export interface Suspect {
  id: string;
  name: string;
  role: string;
  note: string;
  status: "person of interest" | "cleared" | "unidentified";
}

export interface TimelineEvent {
  id: string;
  time: string;
  date: string;
  title: string;
  detail: string;
  verified: boolean;
}

export interface EvidenceItem {
  id: string;
  label: string;
  type: "photo" | "document" | "audio" | "testimony";
  note: string;
  image?: string;
}

export interface CaseFile {
  id: string;
  slug: string;
  title: string;
  location: string;
  date: string;
  status: CaseStatus;
  progress: number;
  summary: string;
  image: string;
  tags: string[];
  followers: number;
  suspects: Suspect[];
  timeline: TimelineEvent[];
  evidence: EvidenceItem[];
}

const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`;

export const cases: CaseFile[] = [
  {
    id: "CB-042",
    slug: "the-vanishing-at-blackwater",
    title: "The Vanishing at Blackwater",
    location: "Blackwater County, Oregon",
    date: "September 18, 2023",
    status: "active",
    progress: 64,
    summary:
      "A 27-year-old hydrologist left a field station at dusk and never reached the highway. Her truck was found idling nine miles east with the doors open and the radio tuned to static.",
    image: img("blackwater-forest"),
    tags: ["missing person", "rural", "ongoing"],
    followers: 4821,
    suspects: [
      {
        id: "s1",
        name: "The Station Caretaker",
        role: "Last confirmed contact",
        note: "Logged her departure at 21:14 but never signed the register.",
        status: "person of interest",
      },
      {
        id: "s2",
        name: "Red Pickup Driver",
        role: "Unidentified vehicle",
        note: "Seen twice on the county road, plate obscured by mud.",
        status: "unidentified",
      },
      {
        id: "s3",
        name: "Field Partner",
        role: "Colleague",
        note: "Alibi corroborated by two independent witnesses.",
        status: "cleared",
      },
    ],
    timeline: [
      {
        id: "t1",
        time: "18:40",
        date: "09.18.23",
        title: "Last radio check-in",
        detail: "Routine water-level report from the north basin.",
        verified: true,
      },
      {
        id: "t2",
        time: "21:14",
        date: "09.18.23",
        title: "Departs field station",
        detail: "Caretaker log entry, handwritten, no counter-signature.",
        verified: true,
      },
      {
        id: "t3",
        time: "22:41",
        date: "09.18.23",
        title: "Gas station footage",
        detail: "Truck passes the pumps without stopping. Second figure unclear.",
        verified: false,
      },
      {
        id: "t4",
        time: "02:07",
        date: "09.19.23",
        title: "Phone ping, tower 4",
        detail: "Nine miles east of the recovered vehicle. Never explained.",
        verified: false,
      },
      {
        id: "t5",
        time: "07:30",
        date: "09.19.23",
        title: "Vehicle recovered",
        detail: "Engine running, half tank, keys in the ignition.",
        verified: true,
      },
    ],
    evidence: [
      {
        id: "e1",
        label: "Field station register",
        type: "document",
        note: "Entry #08 — signature missing.",
        image: img("register-paper", 640, 480),
      },
      {
        id: "e2",
        label: "Pump-side still frame",
        type: "photo",
        note: "22:41 timestamp burned in.",
        image: img("gas-station-night", 640, 480),
      },
      {
        id: "e3",
        label: "Dispatch call audio",
        type: "audio",
        note: "4m 12s — background hum unidentified.",
      },
      {
        id: "e4",
        label: "Caretaker statement",
        type: "testimony",
        note: "Revised twice within 72 hours.",
      },
    ],
  },
  {
    id: "CB-039",
    slug: "the-orchard-house-tapes",
    title: "The Orchard House Tapes",
    location: "Marrow, Illinois",
    date: "June 04, 1997",
    status: "cold",
    progress: 22,
    summary:
      "Eleven cassette tapes recovered from a demolished farmhouse contain 31 hours of conversation between voices no one has ever identified.",
    image: img("orchard-house"),
    tags: ["cold case", "audio", "unidentified"],
    followers: 2140,
    suspects: [
      {
        id: "s1",
        name: "Voice A",
        role: "Primary speaker",
        note: "Midwestern accent, references a 'delivery on Sunday'.",
        status: "unidentified",
      },
      {
        id: "s2",
        name: "Property Owner",
        role: "Deceased 2004",
        note: "Denied knowledge of the tapes in a 1998 interview.",
        status: "person of interest",
      },
    ],
    timeline: [
      {
        id: "t1",
        time: "—",
        date: "06.04.97",
        title: "House demolished",
        detail: "Crew recovers a sealed tin box in the crawlspace.",
        verified: true,
      },
      {
        id: "t2",
        time: "—",
        date: "11.12.98",
        title: "First transcription",
        detail: "Local reporter publishes four pages, then drops the story.",
        verified: true,
      },
      {
        id: "t3",
        time: "—",
        date: "03.02.19",
        title: "Digitisation",
        detail: "Community upload reveals a buried second track.",
        verified: false,
      },
    ],
    evidence: [
      {
        id: "e1",
        label: "Tape 07, side B",
        type: "audio",
        note: "Second layer audible only at 0.5x speed.",
      },
      {
        id: "e2",
        label: "Crawlspace photograph",
        type: "photo",
        note: "Tin box in situ, 1997.",
        image: img("crawlspace", 640, 480),
      },
    ],
  },
  {
    id: "CB-031",
    slug: "highway-17-disappearances",
    title: "Highway 17 Disappearances",
    location: "Coastal Highway, California",
    date: "October 12, 2011",
    status: "active",
    progress: 48,
    summary:
      "Three hitchhikers vanished from the same twelve-mile stretch across four years. Each carried a paper map marked with the same roadside pull-out.",
    image: img("coastal-highway"),
    tags: ["serial", "highway", "ongoing"],
    followers: 6390,
    suspects: [
      {
        id: "s1",
        name: "The Map Seller",
        role: "Rest-stop vendor",
        note: "Sold identical maps at the northbound rest area until 2013.",
        status: "person of interest",
      },
      {
        id: "s2",
        name: "Long-haul Driver 'K'",
        role: "Recurring vehicle",
        note: "Logbook gaps align with two of three dates.",
        status: "person of interest",
      },
    ],
    timeline: [
      {
        id: "t1",
        time: "16:20",
        date: "10.12.11",
        title: "First disappearance",
        detail: "Last seen boarding a light-coloured sedan.",
        verified: true,
      },
      {
        id: "t2",
        time: "19:05",
        date: "08.03.13",
        title: "Second disappearance",
        detail: "Backpack recovered 400m from the pull-out.",
        verified: true,
      },
      {
        id: "t3",
        time: "11:44",
        date: "05.21.15",
        title: "Third disappearance",
        detail: "Marked map found folded in a bus station locker.",
        verified: false,
      },
    ],
    evidence: [
      {
        id: "e1",
        label: "Annotated road map",
        type: "document",
        note: "Same pen, same pressure, three copies.",
        image: img("road-map", 640, 480),
      },
      {
        id: "e2",
        label: "Pull-out survey photos",
        type: "photo",
        note: "Taken by volunteers, March 2016.",
        image: img("pullout", 640, 480),
      },
    ],
  },
  {
    id: "CB-028",
    slug: "the-lantern-street-fire",
    title: "The Lantern Street Fire",
    location: "Portsmouth, New Hampshire",
    date: "February 09, 2005",
    status: "solved",
    progress: 100,
    summary:
      "A row-house fire ruled accidental for fourteen years was reopened after a community member matched an insurance signature to a second claim.",
    image: img("lantern-street"),
    tags: ["arson", "solved", "archive"],
    followers: 1783,
    suspects: [
      {
        id: "s1",
        name: "Claims Adjuster",
        role: "Convicted 2019",
        note: "Signature match confirmed by forensic document examiner.",
        status: "person of interest",
      },
    ],
    timeline: [
      {
        id: "t1",
        time: "03:12",
        date: "02.09.05",
        title: "Fire reported",
        detail: "Two alarms within nine minutes.",
        verified: true,
      },
      {
        id: "t2",
        time: "—",
        date: "07.18.19",
        title: "Case reopened",
        detail: "Community submission flags duplicate paperwork.",
        verified: true,
      },
    ],
    evidence: [
      {
        id: "e1",
        label: "Duplicate claim form",
        type: "document",
        note: "Filed eleven days apart.",
        image: img("claim-form", 640, 480),
      },
    ],
  },
  {
    id: "CB-025",
    slug: "the-ferry-terminal-locker",
    title: "The Ferry Terminal Locker",
    location: "Tacoma, Washington",
    date: "April 27, 2016",
    status: "cold",
    progress: 31,
    summary:
      "Locker 114 was paid in cash for six years by an anonymous depositor. Its contents: a child's coat, a ledger, and a key to nothing yet found.",
    image: img("ferry-terminal"),
    tags: ["unsolved", "objects", "archive"],
    followers: 3055,
    suspects: [
      {
        id: "s1",
        name: "The Depositor",
        role: "Unknown",
        note: "Always paid on the first Tuesday, always in twenties.",
        status: "unidentified",
      },
    ],
    timeline: [
      {
        id: "t1",
        time: "—",
        date: "04.27.16",
        title: "Locker opened",
        detail: "Terminal staff cut the lock after six months of non-payment.",
        verified: true,
      },
      {
        id: "t2",
        time: "—",
        date: "09.14.21",
        title: "Ledger digitised",
        detail: "Community transcribes 212 handwritten lines.",
        verified: false,
      },
    ],
    evidence: [
      {
        id: "e1",
        label: "Ledger page 88",
        type: "document",
        note: "Column of initials, no dates.",
        image: img("ledger", 640, 480),
      },
    ],
  },
  {
    id: "CB-019",
    slug: "signal-from-mill-ridge",
    title: "Signal from Mill Ridge",
    location: "Mill Ridge, Pennsylvania",
    date: "December 03, 1988",
    status: "cold",
    progress: 17,
    summary:
      "For eleven nights a shortwave frequency broadcast a list of names from a valley with no registered transmitter. Four of the names belonged to missing persons.",
    image: img("mill-ridge"),
    tags: ["shortwave", "cold case", "names"],
    followers: 4402,
    suspects: [
      {
        id: "s1",
        name: "The Broadcaster",
        role: "Unknown operator",
        note: "Same voice on all eleven recordings.",
        status: "unidentified",
      },
    ],
    timeline: [
      {
        id: "t1",
        time: "23:00",
        date: "12.03.88",
        title: "First broadcast",
        detail: "Recorded by two amateur operators independently.",
        verified: true,
      },
      {
        id: "t2",
        time: "23:00",
        date: "12.14.88",
        title: "Final broadcast",
        detail: "Ends mid-list. Frequency silent since.",
        verified: true,
      },
    ],
    evidence: [
      {
        id: "e1",
        label: "Reel-to-reel transfer",
        type: "audio",
        note: "11 nights, 4h 22m total.",
      },
    ],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);

export interface Discussion {
  id: string;
  title: string;
  body: string;
  author: string;
  initials: string;
  caseId: string;
  caseSlug: string;
  replies: number;
  lastActive: string;
  tag: "theory" | "evidence" | "question" | "update";
}

export const discussions: Discussion[] = [
  {
    id: "184",
    title: "Could the timeline be off by one day?",
    body: "There's a gap between the gas station footage and the phone ping that doesn't line up with the official report. If the tower log is in UTC, everything shifts.",
    author: "Alex R.",
    initials: "AR",
    caseId: "CB-042",
    caseSlug: "the-vanishing-at-blackwater",
    replies: 24,
    lastActive: "18m ago",
    tag: "theory",
  },
  {
    id: "183",
    title: "Second voice on Tape 07 is not background noise",
    body: "Ran the isolated track through a spectral view. There's speech under the hum at 04:11 and it answers a question asked forty seconds earlier.",
    author: "Mira K.",
    initials: "MK",
    caseId: "CB-039",
    caseSlug: "the-orchard-house-tapes",
    replies: 61,
    lastActive: "1h ago",
    tag: "evidence",
  },
  {
    id: "182",
    title: "Mapping every pull-out on the twelve-mile stretch",
    body: "Started a shared overlay with satellite imagery from 2009 through 2021. Three of the turnouts were paved over between incidents.",
    author: "Devin O.",
    initials: "DO",
    caseId: "CB-031",
    caseSlug: "highway-17-disappearances",
    replies: 37,
    lastActive: "3h ago",
    tag: "update",
  },
  {
    id: "181",
    title: "Does anyone have the unredacted register scan?",
    body: "The copy in the file cuts off at entry #06. I've seen a longer version referenced in a 2021 thread but the link is dead.",
    author: "Sam P.",
    initials: "SP",
    caseId: "CB-042",
    caseSlug: "the-vanishing-at-blackwater",
    replies: 12,
    lastActive: "5h ago",
    tag: "question",
  },
  {
    id: "180",
    title: "Ledger initials cross-reference — 41 matches so far",
    body: "Compared the locker ledger against public ferry manifests. Forty-one initial pairs recur, nine of them on the same weekday.",
    author: "Rae T.",
    initials: "RT",
    caseId: "CB-025",
    caseSlug: "the-ferry-terminal-locker",
    replies: 48,
    lastActive: "9h ago",
    tag: "evidence",
  },
  {
    id: "179",
    title: "Reminder: sourcing rules for name lists",
    body: "If you're posting names from the Mill Ridge broadcasts, link the archival recording. No screenshots of screenshots.",
    author: "Casebook Team",
    initials: "CB",
    caseId: "CB-019",
    caseSlug: "signal-from-mill-ridge",
    replies: 8,
    lastActive: "1d ago",
    tag: "update",
  },
];

export interface MediaItem {
  id: string;
  title: string;
  kind: "podcast" | "documentary" | "series";
  source: string;
  duration: string;
  caseId: string;
  image: string;
}

export const media: MediaItem[] = [
  {
    id: "m1",
    title: "Blackwater: The First 72 Hours",
    kind: "podcast",
    source: "Casebook Audio",
    duration: "42 min",
    caseId: "CB-042",
    image: img("podcast-mic", 800, 500),
  },
  {
    id: "m2",
    title: "What Happened in Marrow?",
    kind: "documentary",
    source: "Field Notes",
    duration: "58 min",
    caseId: "CB-039",
    image: img("documentary-field", 800, 500),
  },
  {
    id: "m3",
    title: "Twelve Miles",
    kind: "series",
    source: "Longform Collective",
    duration: "6 episodes",
    caseId: "CB-031",
    image: img("highway-series", 800, 500),
  },
  {
    id: "m4",
    title: "Locker 114",
    kind: "podcast",
    source: "Casebook Audio",
    duration: "35 min",
    caseId: "CB-025",
    image: img("locker-audio", 800, 500),
  },
  {
    id: "m5",
    title: "Numbers in the Valley",
    kind: "documentary",
    source: "Shortwave Archive",
    duration: "71 min",
    caseId: "CB-019",
    image: img("valley-doc", 800, 500),
  },
  {
    id: "m6",
    title: "The Adjuster's Signature",
    kind: "podcast",
    source: "Casebook Audio",
    duration: "29 min",
    caseId: "CB-028",
    image: img("signature-audio", 800, 500),
  },
];

export const notes = [
  {
    id: "n1",
    title: "Tower 4 coverage radius",
    body: "Need to confirm whether tower 4 could reach the recovered vehicle at all. If not, the truck moved after 02:07.",
    updated: "2h ago",
    caseId: "CB-042",
  },
  {
    id: "n2",
    title: "Register handwriting",
    body: "Entries 01-05 slant right, 06-08 slant left. Two hands or one tired one?",
    updated: "Yesterday",
    caseId: "CB-042",
  },
  {
    id: "n3",
    title: "Map vendor licence records",
    body: "County licensing office holds vendor permits back to 2008. Request by mail.",
    updated: "3d ago",
    caseId: "CB-031",
  },
];

export const stats = [
  { label: "Case files", value: "248" },
  { label: "Active researchers", value: "12.4k" },
  { label: "Evidence items", value: "9,180" },
  { label: "Cases reopened", value: "17" },
];
