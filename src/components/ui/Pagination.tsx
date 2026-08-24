 "use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
 
 type PaginationItem = number | "...";
 
 export const getPaginationItems = (
   currentPage: number,
   totalPages: number
 ): PaginationItem[] => {
   if (totalPages <= 5) {
     return Array.from({ length: totalPages }, (_, i) => i + 1);
   }
 
   if (currentPage <= 3) {
     return [1, 2, 3, "...", totalPages];
   }
 
   if (currentPage >= totalPages - 2) {
     return [1, "...", totalPages - 2, totalPages - 1, totalPages];
   }
 
   return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
 };
 
 export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  useArrowtheme?: boolean;
  buttonClassName?: string;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
  useArrowtheme = true,
  buttonClassName,
}: PaginationProps) {
   if (totalPages <= 1) return null;
 
   return (
     <div className={["flex items-center justify-end gap-2", className].filter(Boolean).join(" ")}>
       <button
         type="button"
         aria-label="Previous page"
         className={cn(
           `h-8 cursor-pointer ${useArrowtheme ? "w-8" : "w-24"} inline-flex items-center justify-center rounded-md border border-gray-20 text-dark-gray hover:bg-gray-102 disabled:opacity-50 disabled:cursor-not-allowed`,
          //  buttonClassName
           
         )}
         onClick={() => onPageChange(Math.max(1, page - 1))}
         disabled={page <= 1}
       >
         {useArrowtheme ? <ChevronLeft className="h-4 w-4" /> : 'Previous'}
       </button>
 
       <div className="flex items-center gap-1">
         {getPaginationItems(page, totalPages).map((item, idx) => {
           if (item === "...") {
             return (
               <span
                 key={`ellipsis-${idx}`}
                 className="px-2 text-sm font-inter text-dark-gray"
               >
                 ...
               </span>
             );
           }
 
           const isActive = item === page;
           return (
             <button
               key={`page-${item}`}
               type="button"
               onClick={() => onPageChange(item)}
               className={cn(
                "min-w-8 cursor-pointer h-8 px-2 rounded-md text-sm font-inter border",
                isActive &&
                  !buttonClassName &&
                  (useArrowtheme
                    ? "bg-(image:--gradient-orange-3) text-white border-orange-80"
                    : "bg-dark-blue-3 text-white border-dark-blue-3"),
                !isActive && "bg-background text-dark-gray border-gray-20 hover:bg-gray-102",
                isActive && buttonClassName
              )}
              //  className={cn(
              //    "min-w-8 cursor-pointer h-8 px-2 rounded-md text-sm font-inter border",
              //    isActive
              //      ? `  ${useArrowtheme ?  `bg-(image:--gradient-orange-3) ${buttonClassName}`  : "bg-dark-blue-3"} text-white ${useArrowtheme ? "border-orange-80" : "border-dark-blue-3"}`
              //      : "bg-background text-dark-gray border-gray-20 hover:bg-gray-102",
              //    buttonClassName,
              //  )}
             >
               {item}
             </button>
           );
         })}
       </div>
 
       <button
         type="button"
         aria-label="Next page"
         className={cn(
           `h-8 cursor-pointer ${useArrowtheme ? "w-8" : "w-24"} inline-flex items-center justify-center rounded-md border border-gray-20 text-dark-gray hover:bg-gray-102 disabled:opacity-50 disabled:cursor-not-allowed`,
          //  buttonClassName,
         )}
         onClick={() => onPageChange(Math.min(totalPages, page + 1))}
         disabled={page >= totalPages}
       >
         {useArrowtheme ? <ChevronRight className="h-4 w-4" /> : 'Next'}
       </button>
     </div>
   );
 }

