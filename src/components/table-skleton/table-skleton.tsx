"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableSkeleton() {
  return (
    <Table>
      <TableHeader className="bg-background">
        <TableRow className="border-gray-20">
          <TableHead className="px-4 text-[12px] font-arial font-bold tracking-wide text-gray-116">
          <Skeleton className="h-4 w-32" />
          </TableHead>
          <TableHead className="px-4 text-[12px] font-arial font-bold tracking-wide text-gray-116">
          <Skeleton className="h-4 w-32" />
            
          </TableHead>
          <TableHead className="px-4 text-[12px] font-arial font-bold tracking-wide text-gray-116">
          <Skeleton className="h-4 w-32" />
            
          </TableHead>
          <TableHead className="px-4 text-[12px] font-arial font-bold tracking-wide text-gray-116">
          <Skeleton className="h-4 w-32" />
            
          </TableHead>
          <TableHead className="px-4 text-[12px] font-arial font-bold tracking-wide text-gray-116">
          <Skeleton className="h-4 w-32" />
            
          </TableHead>
          <TableHead className="px-4 text-[12px] font-arial font-bold tracking-wide text-gray-116">
          <Skeleton className="h-4 w-32" />
            
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index} className="border-gray-20">
            <TableCell className="px-4 py-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </TableCell>
            <TableCell className="px-4 py-4">
              <Skeleton className="h-4 w-8" />
            </TableCell>
            <TableCell className="px-4 py-4">
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell className="px-4 py-4">
              <Skeleton className="h-6 w-20 rounded-md" />
            </TableCell>
            <TableCell className="px-4 py-4">
              <div className="flex justify-center">
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </TableCell>
            <TableCell className="px-4 py-4">
              <div className="flex justify-end">
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
