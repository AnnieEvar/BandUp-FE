"use client";

import { Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { useAuthGuard } from "./AuthPromptProvider";

interface Props extends Omit<
  React.ComponentProps<typeof Button>,
  "onClick" | "variant"
> {
  onAction: () => void; // việc cần làm khi ĐÃ đăng nhập
  lockLabel?: string; // câu hiện trong popup, vd: start “Hotel Booking”
}

// Khách: nút xám nét đứt có ổ khóa, bấm → popup. Đã đăng nhập: nút xanh bình thường.
export default function GuardedButton({
  onAction,
  lockLabel,
  children,
  ...props
}: Props) {
  const { user, loading } = useAuth();
  const guard = useAuthGuard();
  const locked = !user && !loading;
  return (
    <Button
      {...props}
      variant={locked ? "locked" : "primary"}
      aria-disabled={locked || undefined}
      title={locked ? "Log in to unlock" : props.title}
      onClick={guard(onAction, lockLabel)}
    >
      {locked && <Lock className="h-4 w-4" aria-hidden />}
      {children}
    </Button>
  );
}
