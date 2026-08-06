import * as React from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertTone = "success" | "warning" | "danger" | "info";

const config: Record<AlertTone, { icon: React.ElementType; classes: string }> = {
  success: { icon: CheckCircle2, classes: "bg-success/10 text-success border-success/20" },
  warning: { icon: AlertTriangle, classes: "bg-warning/10 text-warning border-warning/20" },
  danger: { icon: AlertCircle, classes: "bg-danger/10 text-danger border-danger/20" },
  info: { icon: Info, classes: "bg-navy/5 text-navy border-navy/10" },
};

export function Alert({
  tone = "info",
  title,
  children,
  role,
}: {
  tone?: AlertTone;
  title?: string;
  children: React.ReactNode;
  role?: "status" | "alert";
}) {
  const { icon: Icon, classes } = config[tone];
  return (
    <div
      role={role ?? (tone === "danger" ? "alert" : "status")}
      className={cn("flex items-start gap-3 rounded-input border p-4 text-small", classes)}
    >
      <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}
