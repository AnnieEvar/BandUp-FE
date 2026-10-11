export interface StudyTask {
  id: string;
  title: string;
  subject: "Flashcards" | "Reading" | "Writing" | "Listening" | "Speaking";
  minutes: number;
  href: string;
}

export interface Recommendation {
  id: string;
  category: string; // "Reading", "Flashcards"...
  title: string;
  href: string;
}

// Hình dạng JSON mà endpoint GET /students/me/dashboard sẽ trả về
export interface StudentDashboard {
  profile: { fullName: string };
  stats: {
    currentBand: number;
    bandDelta: number;       // tăng bao nhiêu so với lần trước
    targetBand: number;
    daysToExam: number;
    studyStreak: number;
    dailyGoalDone: number;   // phút đã học
    dailyGoalTotal: number;  // mục tiêu phút
  };
  todayTasks: StudyTask[];
  recommendations: Recommendation[];
  planHighlightDay: number;  // ngày trong tháng cần tô sáng trên lịch
}