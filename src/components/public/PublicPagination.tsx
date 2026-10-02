type PublicPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function PublicPagination({
  page,
  totalPages,
  onPageChange,
}: PublicPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-lg border border-border-default bg-white px-4 py-2 font-ui text-sm font-medium text-text-support transition-all disabled:opacity-40"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onPageChange(item)}
          className="h-9 w-9 rounded-lg border font-ui text-sm font-medium transition-all"
          style={{
            background: item === page ? "#2F5BDE" : "#FFFFFF",
            color: item === page ? "#FFFFFF" : "#475569",
            borderColor: item === page ? "#2F5BDE" : "#E5E7EB",
          }}
        >
          {item}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="rounded-lg border border-border-default bg-white px-4 py-2 font-ui text-sm font-medium text-text-support transition-all disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
