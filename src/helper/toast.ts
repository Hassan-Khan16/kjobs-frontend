import { toast } from "sonner";

export const handleOpenToast = (
  title: string,
  status: "success" | "error" | "info" | "warning"
): void => {
  switch (status) {
    case "success":
      toast.success(title, {
        style: {
          backgroundColor: "#4BB543",
          color: "white",
          fontSize: "17px",
          gap: "4px",
          fontWeight: "bold",
        },
      });
      break;
    case "error":
      toast.error(title, {
        style: {
          backgroundColor: "#dc2626",
          color: "white",
          fontSize: "17px",
          gap: "4px",
          fontWeight: "bold",
        },
      });
      break;
  }
};


export const getDuplicateUsers = (data: { name: string }[]) => {
  const counts: Record<string, number> = {};
  data.forEach((item) => {
    counts[item.name] = (counts[item.name] || 0) + 1;
  });

  return new Set(Object.keys(counts).filter((name) => counts[name] > 1));
};
