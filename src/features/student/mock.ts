import type { StudentDashboard } from "./types";

// Là hàm (không phải hằng số) để ngày luôn đúng và tên theo người đang đăng nhập
export const buildMockDashboard = (fullName = "Hien"): StudentDashboard => ({
  profile: { fullName },
  stats: { currentBand: 8.0, bandDelta: 0.5, targetBand: 8.5, daysToExam: 45, studyStreak: 12, dailyGoalDone: 45, dailyGoalTotal: 60 },
  todayTasks: [
    { id: "1", title: "Vocabulary: 20 cards", subject: "Flashcards", minutes: 15, href: "/student/flashcards" },
    { id: "2", title: "Reading Passage 2", subject: "Reading", minutes: 20, href: "/student/practice/reading" },
    { id: "3", title: "Writing Task 2 essay", subject: "Writing", minutes: 40, href: "/student/practice/writing" },
  ],
  recommendations: [
    { id: "r1", category: "Reading", title: "Mastering True/False/Not Given", href: "/student/practice/reading" },
    { id: "r2", category: "Flashcards", title: "Environment & Climate Change", href: "/student/flashcards" },
  ],
  planHighlightDay: new Date().getDate(),
});