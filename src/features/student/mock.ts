import type { StudentDashboard } from "./types";

export const mockDashboard: StudentDashboard = {
  profile: { fullName: "My Dear" },
  stats: {
    currentBand: 8.0, bandDelta: 0.5, targetBand: 8.5, daysToExam: 45,
    studyStreak: 12, dailyGoalDone: 45, dailyGoalTotal: 60,
  },
  todayTasks: [
    { id: "2", title: "Reading Passage 2", subject: "Reading", href: "/student/practice/reading" },
    { id: "3", title: "Writing Task 2 essay", subject: "Writing", href: "/student/practice/writing" },
  ],
  recommendations: [
    { id: "r1", category: "Reading", title: "Mastering True/False/Not Given", href: "/student/practice/reading" },
    { id: "r2", category: "Flashcards", title: "Environment & Climate Change", href: "/student/flashcards" },
  ],
  planHighlightDay: new Date().getDate(),
};