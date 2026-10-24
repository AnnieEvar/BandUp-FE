export interface StudyTask {
  id: string;
  title: string;
  subject: "Flashcards" | "Reading" | "Writing" | "Listening" | "Speaking";
  minutes: number;
  href: string;
  done?: boolean; // optional until the backend confirms it
}

export interface Recommendation {
  id: string;
  category: string; // "Reading", "Flashcards"...
  title: string;
  href: string;
}



export interface WeekDay {
  date: string; // local calendar day, YYYY-MM-DD
  active: boolean; // the student studied that day
}

// Monday -> Sunday of the current week
export interface StudentWeekSummary {
  tasksDone: number;
  studyMinutes: number;
  bestStreak: number;
  days: WeekDay[];
}

export interface HistoryItem {
  id: string;
  title: string;
  scoreLabel: string; // "31/40", "Band 6.5", "In review"
  occurredAt: string; // ISO date-time
  href: string;
}

// ---- Traceable notes ----
export type NoteType = "Vocabulary" | "Grammar" | "Mistake";
export type TaskKind = "Reading" | "Listening" | "Writing" | "Speaking" | "Mock Test";

// Where a note was saved from. `token` identifies the original paper/task.
export interface NoteReference {
  kind: TaskKind;
  token: string;
  title: string;
  questionNumber?: number;
  taskId?: string;
}

export interface StudentNote {
  id: string;
  type: NoteType;
  heading: string;
  meaning: string;
  example?: string;
  source: string; // human-readable origin, e.g. "Reading · Question 19"
  createdAt: string; // ISO date-time
  reference?: NoteReference; // absent for notes the student wrote by hand
}

export interface NoteDraft {
  type: NoteType;
  heading: string;
  meaning: string;
  example?: string;
  source?: string;
}

export interface OriginalPaperQuestion {
  number: number;
  text: string;
  options?: string[];
  yourAnswer?: string;
  correctAnswer?: string;
}

// The source record a note points back to
export interface OriginalPaper {
  token: string;
  kind: TaskKind;
  title: string;
  attemptedAt: string | null; // null = the attempt was never submitted
  heading: string;
  body: string[]; // passage paragraphs or task prompt lines
  questions: OriginalPaperQuestion[]; // empty for Writing / Speaking
  submission: string | null; // the student's essay or speaking transcript
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
  week?: StudentWeekSummary;
  recentHistory?: HistoryItem[];
  planHighlightDay: number;  // ngày trong tháng cần tô sáng trên lịch
}