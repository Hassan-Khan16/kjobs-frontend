import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      p1: "text-[11px] font-inter text-gray-109 mt-1 leading-tight ",
      p2: "font-inter font-regular text-[14px] lg:text-[14px] text-dark-gray leading-5",
      p3: "text-indigo-20 text-[12px] font-regular font-inter",
      p4: "text-dark-gray text-sm font-arial font-400",
      p5: "font-poppins text-center font-light text-[10px] xs:text-[15px] sm:text-[15px] lg:text-left lg:text-[16px] text-foreground-70 lg:text-background ",
      p6: "text-dark-gray text-center text-[12px] xs:text-[14px] sm:text-[16px] lg:text-[17px] font-poppins  font-regular",
      p7: "text-[12px] lg:text-[14px] font-inter font-medium text-dark-gray",
      p8: "font-semibold text-[18px] leading-7 text-black-10",
      //
      p9: "font-inter font-[500] text-[14px] leading-5 lg:text-[12px] lg:leading-4 text-background",
      p10: "font-inter font-[500] text-[14px] lg:text-[13px] text-background",
      p11: "font-inter font-[500] text-[14px] lg:text-[11px] text-background",
      p12: "font-[400] text-[14px] text-dark-gray-2",
      p13: "font-[400] text-[16px] text-dark-gray-2",

      curriculumSubtitle:
        "font-inter font-normal text-[16px] leading-[24px] text-dark-gray lg:text-[14px] lg:leading-[20px]",
      curriculumCardBody:
        "font-inter font-normal text-[16px] leading-[24px] text-gray-60 lg:text-[14px] lg:leading-[20px]",

      error: "text-sm lg:text-[12px] font-arial text-red-500",
    },
    weight: {
      bold: "font-bold",
      semibold: "font-semibold",
      medium: "font-medium",
      regular: "font-normal",
    },
    font: {
      inter: "font-inter",
      poppins: "font-poppins",
      arial: "font-arial",
    },
    leading: {
      tight: "leading-tight",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
    },
  },
});

type TextElement = "p" | "span";

interface TextProps
  extends
    React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: TextElement;
  asChild?: boolean;
}

function Text({
  className,
  variant,
  weight,
  font,
  leading,
  as: Tag = "p",
  asChild = false,
  ...props
}: TextProps) {
  const Comp = asChild ? Slot : Tag;

  return (
    <Comp
      className={cn(
        textVariants({ variant, weight, font, leading, className }),
      )}
      {...props}
    />
  );
}

export { Text, textVariants };
