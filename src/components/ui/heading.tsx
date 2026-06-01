import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("", {
  variants: {
    variant: {
      h1: "font-inter font-extrabold lg:text-[22px] text-[26px] text-foreground-20",
      h2: "font-inter font-extrabold lg:text-[21px] text-[22px] text-foreground-20",
      h3: "font-inter font-extrabold text-[29px] text-foreground-20",
      h4: "font-anton font-[400] text-center  lg:text-left text-[21px] xs:text-[27px] sm:text-[30px] lg:text-[33px] text-background  ",
      h5: "font-inter font-bold text-[18px] text-foreground-20",
      h6: "text-[13px] font-inter font-bold text-dark-blue-4 leading-tight",
      h7: "font-inter font-extrabold lg:text-[28px] text-[33px] text-foreground-20",
      h8: "text-[26px] sm:text-[28px] lg:text-[34px] font-anton font-[400]  text-foreground-10 leading-[36px]",
      h9: "text-center text-[28px] lg:text-[30px] font-inter font-[800]  text-foreground-10 lg:leading-[36px] leading-[35px]",
      h10: "text-[12px] leading-4 text-gray-116 font-normal",
      //
      h11: " font-[700] font-inter text-[20px] lg:text-[24px] text-foreground-10",
      h12: " font-[700] font-inter text-[20px] lg:text-[16px] text-foreground-10",

      h13: " font-[700] font-inter text-[20px] lg:text-[20px] text-foreground-10",
      h14: " font-[700] font-inter text-[16px] lg:text-[18px] text-foreground-10",
      h15: " font-[700] font-inter text-[13px] lg:text-[15px] text-foreground-10",
      h16: " font-bold font-inter text-[18px] leading-7 text-foreground-10",
      h17: " font-[700] font-inter text-[18px] lg:text-[18px] text-foreground-10",

      curriculumPageTitle:
        "font-inter font-bold text-[30px] leading-[36px] text-foreground-10 lg:text-[24px] lg:leading-[30px]",
      curriculumCardTitle:
        "font-inter font-bold text-[24px] leading-[32px] text-foreground-10 lg:text-[20px] lg:leading-[28px]",
    },
    weight: {
      extrabold: "font-extrabold",
      bold: "font-bold",
      semibold: "font-semibold",
      medium: "font-medium",
    },
    font: {
      inter: "font-inter",
      poppins: "font-poppins",
      arial: "font-arial",
      anton: "font-anton",
    },
  },
});

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingElement;
  asChild?: boolean;
}

function Heading({
  className,
  variant,
  weight,
  font,
  as: Tag = "h2",
  asChild = false,
  ...props
}: HeadingProps) {
  const Comp = asChild ? Slot : Tag;

  return (
    <Comp
      className={cn(headingVariants({ variant, weight, font, className }))}
      {...props}
    />
  );
}

export { Heading, headingVariants };
