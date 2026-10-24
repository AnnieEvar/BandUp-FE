export type Skill = "listening" | "reading" | "writing" | "speaking";
export const SKILLS: Skill[] = ["listening", "reading", "writing", "speaking"];

export interface Exercise {
  id: string; skill: Skill; title: string; description: string;
  tag: string; questions: number; duration: string;
  sampleId: string; // mỗi thẻ bài có đúng 1 bài mẫu tương ứng
}

// Nội dung xem trước của "View sample" (KHÔNG phải trang feedback của volunteer)
export interface Sample {
  id: string; skill: Skill; title: string; format: string; duration: string;
  prompt?: string | string[];                          // Writing / Speaking
  transcript?: { speaker: string; text: string }[];    // Listening
  paragraphs?: string[];                               // Reading / bài mẫu Writing / trả lời Speaking
  questions?: { q: string; a: string }[];              // Listening / Reading
  criteria?: { name: string; note: string }[];         // Writing
  language?: string[];                                 // Speaking
  tips: string[];
}