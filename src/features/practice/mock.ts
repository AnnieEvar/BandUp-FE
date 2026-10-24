import type { Exercise, Sample } from "./types";

export const EXERCISES: Exercise[] = [
  {
    id: "l1",
    skill: "listening",
    title: "Section 1: Hotel Booking",
    description: "Complete the form while you listen to a phone booking.",
    tag: "Section 1",
    questions: 10,
    duration: "05:30",
    sampleId: "l1",
  },
  {
    id: "r1",
    skill: "reading",
    title: "Passage 1: The Rise of Urban Farming",
    description: "True / False / Not Given and gap filling on a short article.",
    tag: "Passage 1",
    questions: 13,
    duration: "20:00",
    sampleId: "r1",
  },
  {
    id: "w1",
    skill: "writing",
    title: "Rain-shadow Desert Formation",
    description: "Summarise a process diagram (Task 1).",
    tag: "Task 1",
    questions: 1,
    duration: "20:00",
    sampleId: "w1",
  },
  {
    id: "s1",
    skill: "speaking",
    title: "Work or Studies",
    description: "Part 1 interview questions about your daily life.",
    tag: "Part 1",
    questions: 3,
    duration: "04:00",
    sampleId: "s1",
  },
];

export const SAMPLES: Record<string, Sample> = {
  w1: {
    id: "w1",
    skill: "writing",
    title: "Rain-shadow Desert Formation",
    format: "Task 1 · Process diagram",
    duration: "20 min · 150+ words",
    prompt:
      "The diagram below shows how one type of desert, known as a rain-shadow desert, is formed. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    paragraphs: [
      "The diagram illustrates how a rain-shadow desert forms on the inland side of a mountain range.",
      "Overall, the process has seven stages, beginning with winds from the sea and ending with dry air reaching inland areas.",
      "First, winds approach the coast and are pushed upwards by the mountains. As the moist air rises, it cools and clouds form, and rain then falls on the windward side.",
      "After that, the now-dry air continues over the summit and descends the leeward side. Finally, these dry winds reach inland areas, where very little rain falls, creating a desert that stretches for thousands of kilometres.",
    ],
    criteria: [
      {
        name: "Task Achievement",
        note: "Gives a clear overview and describes every stage in order.",
      },
      {
        name: "Coherence & Cohesion",
        note: "Sequencing words (First, As, After that, Finally) guide the reader.",
      },
      {
        name: "Lexical Resource",
        note: "Precise vocabulary: windward, leeward, summit, descends.",
      },
      {
        name: "Grammatical Range",
        note: "Mixes passive forms and complex sentences accurately.",
      },
    ],
    tips: [
      "Write an overview sentence: the reader should know the main trend in the first paragraph.",
    ],
  },
  s1: {
    id: "s1",
    skill: "speaking",
    title: "Work or Studies",
    format: "Part 1 · Interview",
    duration: "4–5 min",
    prompt: [
      "Are you a student or do you work now?",
      "What subjects are you studying?",
      "Do you like your subject?",
    ],
    paragraphs: [
      "I’m currently a second-year university student, majoring in business administration.",
      "This semester I’m studying marketing, statistics and English communication. Marketing is my favourite because it connects theory with real campaigns.",
      "Yes, I really enjoy it. What I like most is that I can apply what I learn to everyday life, for instance when I notice how brands try to attract customers.",
    ],
    language: [
      "I’m currently…",
      "majoring in…",
      "What I like most is…",
      "for instance…",
    ],
    tips: [
      "Answer the question directly, then add a reason or example.",
      "Aim for two to three sentences per answer, not one word.",
    ],
  },
};
