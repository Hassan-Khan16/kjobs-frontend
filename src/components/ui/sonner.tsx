// "use client";

// import {
//   CircleCheckIcon,
//   InfoIcon,
//   Loader2Icon,
//   OctagonXIcon,
//   TriangleAlertIcon,
// } from "lucide-react";
// import { useTheme } from "next-themes";
// import { Toaster as Sonner, type ToasterProps } from "sonner";

// const Toaster = ({ ...props }: ToasterProps) => {
//   const { theme = "system" } = useTheme();

//   return (
//     <Sonner
//       theme={theme as ToasterProps["theme"]}
//       className="toaster group"
//       icons={{
//         success: <CircleCheckIcon className="size-5" />,
//         info: <InfoIcon className="size-5" />,
//         warning: <TriangleAlertIcon className="size-5" />,
//         error: <OctagonXIcon className="size-5" />,
//         loading: <Loader2Icon className="size-4 animate-spin" />,
//       }}
//       {...props}
//     />
//   );
// };

// export { Toaster };

"use client";

import { X } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton={true}
      icons={{
        success: <CircleCheckIcon className="size-5" />,
        info: <InfoIcon className="size-5" />,
        warning: <TriangleAlertIcon className="size-5" />,
        error: <OctagonXIcon className="size-5" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
        close: <X className="size-5" />,
      }}
      toastOptions={{
        classNames: {
          closeButton:
            "absolute right-3 top-1/2 -translate-y-1/2 bg-background hover:opacity-60 focus:opacity-100 transition-opacity",
          success:
            "!bg-gradient-to-r !from-[#2F5BDE] !to-[#191C33] !text-white !border-0 !shadow-lg !rounded-xl",
          error:
            "!bg-gradient-to-r !from-[#ef4444] !to-[#dc2626] !text-white !border-0 !shadow-lg !rounded-xl [&_button]:text-white/80 hover:[&_button]:text-white",
          info: "!bg-gradient-to-r !from-[#38BDF8] !to-[#2F5BDE] !text-white !border-0 !shadow-lg !rounded-xl",
          warning:
            "!bg-gradient-to-r !from-[#6366F1] !to-[#243B6B] !text-white !border-0 !shadow-lg !rounded-xl",
          toast:
            "!p-4 !gap-3 !backdrop-blur-sm !font-medium !text-sm md:!text-base",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
