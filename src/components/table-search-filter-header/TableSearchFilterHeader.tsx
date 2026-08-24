"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { TableSearchFilterHeaderProps, TableSearchFilterOption } from "@/types/school";



/** Sensible defaults for status-style filters above admin tables. */
export const DEFAULT_TABLE_STATUS_FILTER_OPTIONS: TableSearchFilterOption[] = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export function TableSearchFilterHeader({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterValue,
  onFilterChange,
  filterOptions,
  filterPlaceholder = "All Status",
  filterAriaLabel = "Filter by status",
  filterLoadMoreValue,
  onFilterLoadMore,
  className,
}: TableSearchFilterHeaderProps) {
  const handleFilterChange = (value: string) => {
    if (
      onFilterLoadMore &&
      filterLoadMoreValue &&
      value === filterLoadMoreValue
    ) {
      onFilterLoadMore();
      return;
    }
    onFilterChange(value);
  };
  return (
    <div
      className={cn(
        "w-full rounded-[10px] border border-gray-105 bg-background p-4",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1 sm:max-w-[70%]">
          <Input
            leftIcon={
              <Search className="h-4 w-4 shrink-0 text-gray-103" aria-hidden />
            }
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-[41px] w-full rounded-[10px] border border-gray-118 text-dark-gray-7 bg-white pl-11 text-[14px]! placeholder:text-[14px]!"
          />
        </div>
        <div className="w-full shrink-0 sm:w-auto ">
          <Select value={filterValue} onValueChange={handleFilterChange}>
            <SelectTrigger
              aria-label={filterAriaLabel}
              className="h-[41px] w-full rounded-[10px] border border-gray-118 bg-white px-3 text-[14px] text-gray-900 [&_svg]:!text-foreground-20"
            >
              <SelectValue placeholder={filterPlaceholder} />
            </SelectTrigger>
            <SelectContent
              className="max-h-[240px] border border-gray-105 bg-background"
              onScroll={(e) => {
                if (!onFilterLoadMore) return;
                const el = e.currentTarget;
                const nearBottom =
                  el.scrollHeight - el.scrollTop - el.clientHeight < 48;
                if (nearBottom) onFilterLoadMore();
              }}
            >
              {filterOptions.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="font-inter text-[13px] font-[400] text-foreground-20"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default TableSearchFilterHeader;
