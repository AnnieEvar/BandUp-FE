export const authFormClassName = [
  "space-y-4",
  "[&_label]:mb-1.5 [&_label]:block",
  "[&_label]:text-xs [&_label]:font-medium",
  "[&_label]:text-[#1E293B]",
  "[&_input]:h-11 [&_input]:w-full",
  "[&_input]:rounded-lg [&_input]:border",
  "[&_input]:border-slate-200 [&_input]:bg-white",
  "[&_input]:px-3 [&_input]:py-2",
  "[&_input]:text-sm [&_input]:text-[#1E293B]",
  "[&_input]:shadow-none [&_input]:outline-none",
  "[&_input]:transition-colors",
  "[&_input::placeholder]:text-slate-400",
  "[_input::placeholder]:text-[11px]",
  "[&_input:hover]:border-slate-400",
  "[&_input:focus]:border-[#175CFF]",
  "[&_input:focus]:ring-2",
  "[&_input:focus]:ring-[#175CFF]/10",
].join(" ");

export const authPrimaryButtonClassName =
  "h-11 w-full rounded-lg bg-[#175CFF] px-4 py-2 text-sm font-semibold text-white shadow-[0_3px_8px_rgba(23,92,255,0.12)] transition-colors hover:bg-[#0F47D6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#175CFF]/30 focus-visible:ring-offset-2";

export const authLinkClassName =
  "text-sm font-medium text-[#175CFF] underline-offset-4 transition-colors hover:text-[#0F47D6] hover:underline";