import { toDateKey } from "@/lib/utils";
import type {
  HistoryItem,
  OriginalPaper,
  StudentDashboard,
  StudentNote,
  StudentWeekSummary,
} from "./types";

const DAY_MS = 86_400_000;
const daysAgo = (n: number) => new Date(Date.now() - n * DAY_MS).toISOString();

// Monday -> Sunday of this week. Every elapsed day is active, which matches the 12-day streak below.
function buildMockWeek(): StudentWeekSummary {
  const today = new Date();
  const offset = (today.getDay() + 6) % 7; // Monday = 0
  const days = Array.from({ length: 7 }, (_, i) => ({
    date: toDateKey(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - offset + i,
      ),
    ),
    active: i <= offset,
  }));
  return { tasksDone: 9, studyMinutes: 285, bestStreak: 21, days };
}

// Titles match the papers in MOCK_ORIGINAL_PAPERS so history and notes talk about the same attempts
const buildMockHistory = (): HistoryItem[] => [
  {
    id: "attempt-p3",
    title: "Cambridge-style Reading · Test 4",
    scoreLabel: "31/40",
    occurredAt: daysAgo(2),
    href: "/student/history",
  },
  {
    id: "attempt-t4",
    title: "Writing Task 2 · Technology and the Wealth Gap",
    scoreLabel: "Band 6.5",
    occurredAt: daysAgo(4),
    href: "/student/history",
  },
  {
    id: "attempt-t5",
    title: "Speaking Part 1 · Hometown",
    scoreLabel: "In review",
    occurredAt: daysAgo(5),
    href: "/student/history",
  },
  {
    id: "attempt-p6",
    title: "Cambridge-style Reading · Test 3",
    scoreLabel: "27/40",
    occurredAt: daysAgo(8),
    href: "/student/history",
  },
];

// Là hàm (không phải hằng số) để ngày luôn đúng và tên theo người đang đăng nhập
export const buildMockDashboard = (fullName = "Hien"): StudentDashboard => ({
  profile: { fullName },
  stats: {
    currentBand: 8.0,
    bandDelta: 0.5,
    targetBand: 8.5,
    daysToExam: 45,
    studyStreak: 12,
    dailyGoalDone: 45,
    dailyGoalTotal: 60,
  },
  todayTasks: [
    {
      id: "1",
      title: "Vocabulary: 20 cards",
      subject: "Flashcards",
      minutes: 15,
      href: "/student/flashcards",
      done: true,
    },
    {
      id: "2",
      title: "Reading Passage 2",
      subject: "Reading",
      minutes: 20,
      href: "/student/practice/reading",
      done: false,
    },
    {
      id: "3",
      title: "Writing Task 2 essay",
      subject: "Writing",
      minutes: 40,
      href: "/student/practice/writing",
      done: false,
    },
  ],
  recommendations: [
    {
      id: "r1",
      category: "Reading",
      title: "Mastering True/False/Not Given",
      href: "/student/practice/reading",
    },
    {
      id: "r2",
      category: "Flashcards",
      title: "Environment & Climate Change",
      href: "/student/flashcards",
    },
  ],
  planHighlightDay: new Date().getDate(),
  week: buildMockWeek(),
  recentHistory: buildMockHistory(),
});

// ---- Traceable notes (seed data; the notes API copies it per signed-in user) ----
export const buildMockNotes = (): StudentNote[] => [
  {
    id: "note-1",
    type: "Vocabulary",
    heading: "mitigate",
    meaning: "to make something less harmful or serious",
    example: "Governments must act to mitigate the effects of climate change.",
    source: "Reading · Question 19",
    createdAt: daysAgo(2),
    reference: {
      kind: "Reading",
      token: "p3",
      title: "Cambridge-style Reading · Test 4",
      questionNumber: 19,
    },
  },
  {
    id: "note-2",
    type: "Grammar",
    heading: "Present perfect vs. past simple",
    meaning:
      "Use the past simple with finished times such as “last year”. Use the present perfect when the time is not stated or still continues.",
    example:
      "I studied this topic last year. / I have studied this topic for two years.",
    source: "Writing Task 2 · Feedback",
    createdAt: daysAgo(4),
    reference: {
      kind: "Writing",
      token: "t4",
      title: "Technology and the Wealth Gap",
      taskId: "w2",
    },
  },
  {
    id: "note-3",
    type: "Mistake",
    heading: "I go there last summer.",
    meaning: "Use the past simple for a finished action in the past.",
    example: "I went there last summer.",
    source: "Speaking Part 1 · Hometown",
    createdAt: daysAgo(5),
    reference: {
      kind: "Speaking",
      token: "t5",
      title: "Hometown",
      taskId: "s2",
    },
  },
  {
    id: "note-4",
    type: "Vocabulary",
    heading: "sedentary",
    meaning: "involving little physical activity; sitting for most of the day",
    example: "A sedentary lifestyle increases the risk of heart disease.",
    source: "Reading · Question 23",
    createdAt: daysAgo(8),
    reference: {
      kind: "Reading",
      token: "p6",
      title: "Cambridge-style Reading · Test 3",
      questionNumber: 23,
    },
  },
  {
    // Written by hand: no reference, so no "View Original Paper" action
    id: "note-5",
    type: "Grammar",
    heading: "Used to vs. would",
    meaning:
      "Use “used to” for past states and habits. Use “would” only for repeated past actions.",
    example:
      "I used to live in Hue. / We would visit the citadel every Sunday.",
    source: "My own note",
    createdAt: daysAgo(10),
  },
  {
    // Points at a paper that is not in MOCK_ORIGINAL_PAPERS, to exercise the "unavailable record" state
    id: "note-6",
    type: "Vocabulary",
    heading: "ubiquitous",
    meaning: "present or found everywhere",
    example: "Smartphones are now ubiquitous in classrooms.",
    source: "Listening · Section 3 · Question 27",
    createdAt: daysAgo(14),
    reference: {
      kind: "Listening",
      token: "l9",
      title: "Cambridge-style Listening · Test 2",
      questionNumber: 27,
    },
  },
];

export const MOCK_ORIGINAL_PAPERS: OriginalPaper[] = [
  {
    token: "p3",
    kind: "Reading",
    title: "Cambridge-style Reading · Test 4",
    attemptedAt: daysAgo(2),
    heading: "Passage 3 · Adapting to a warmer world",
    body: [
      "Coastal cities have always lived with the sea, but rising temperatures are forcing planners to rethink how far that relationship can be stretched. Sea walls and drainage tunnels, once seen as expensive luxuries, are now treated as basic infrastructure.",
      "Researchers distinguish between two broad responses. Adaptation means adjusting to changes that are already unavoidable, while mitigation means reducing their causes and limiting how severe they become. Most experts argue that governments cannot afford to choose one over the other.",
      "Critics point out that the costs fall unevenly. Wealthier regions can fund flood defences and cooling systems, whereas poorer communities often rely on emergency aid after each disaster.",
    ],
    questions: [
      {
        number: 18,
        text: "Sea walls and drainage tunnels were once regarded as luxuries. (True / False / Not Given)",
        yourAnswer: "True",
        correctAnswer: "True",
      },
      {
        number: 19,
        text: "The writer believes governments must act to mitigate the effects of climate change. (True / False / Not Given)",
        yourAnswer: "Not Given",
        correctAnswer: "True",
      },
      {
        number: 20,
        text: "Wealthier regions experience smaller temperature rises than poorer ones. (True / False / Not Given)",
        yourAnswer: "True",
        correctAnswer: "Not Given",
      },
    ],
    submission: null,
  },
  {
    token: "p6",
    kind: "Reading",
    title: "Cambridge-style Reading · Test 3",
    attemptedAt: daysAgo(8),
    heading: "Passage 3 · The cost of sitting",
    body: [
      "Office workers in many countries now spend more than eight hours a day seated, a pattern that would have seemed strange to earlier generations whose jobs demanded constant movement.",
      "Medical researchers have linked this sedentary lifestyle to a higher risk of heart disease, diabetes and some cancers, even among people who exercise regularly after work.",
      "Some companies have responded with standing desks and walking meetings, though early studies suggest the benefits depend on how consistently employees use them.",
    ],
    questions: [
      {
        number: 22,
        text: "Earlier generations spent less time seated at work. (True / False / Not Given)",
        yourAnswer: "True",
        correctAnswer: "True",
      },
      {
        number: 23,
        text: "According to the passage, what is true of a sedentary lifestyle?",
        options: [
          "A. It is harmless if people exercise after work.",
          "B. It can raise health risks even for people who exercise.",
          "C. It is limited to office workers.",
          "D. It has been eliminated by standing desks.",
        ],
        yourAnswer: "A",
        correctAnswer: "B",
      },
    ],
    submission: null,
  },
  {
    token: "t4",
    kind: "Writing",
    title: "Technology and the Wealth Gap",
    attemptedAt: daysAgo(4),
    heading: "Task 2 · Discussion essay",
    body: [
      "Some people think that technology is increasing the gap between rich and poor. Others think it has the opposite effect. Discuss both views and give your opinion.",
    ],
    questions: [],
    submission:
      "Some people believe technology widens the gap between rich and poor. I have studied this topic last year, and I think both views contain some truth. Expensive devices help wealthy families first, but free online courses also give poorer students new chances.",
  },
  {
    token: "t5",
    kind: "Speaking",
    title: "Hometown",
    attemptedAt: daysAgo(5),
    heading: "Part 1 · Interview",
    body: [
      "Where is your hometown?",
      "What do you like most about it?",
      "Has it changed much in recent years?",
    ],
    questions: [],
    submission:
      "I come from Hue, a peaceful city in central Vietnam. I go there last summer with my family and the food was wonderful. It has changed a lot because there are more cafés now.",
  },
];

export const findMockOriginalPaper = (token: string) =>
  MOCK_ORIGINAL_PAPERS.find((p) => p.token === token);
