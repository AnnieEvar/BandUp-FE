import { redirect } from "next/navigation";

// Khách vào thẳng khu vực xem trước bài tập
export default function Home() {
  redirect("/student/practice/listening");
}