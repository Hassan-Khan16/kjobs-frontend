import dayjs from "dayjs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import { AdminHeaderActionButton } from "@/components/admin-page-header/AdminHeaderActionButton";
import type { AdminEmployer } from "@/types/employer";

type AdminEmployerDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  employer: AdminEmployer | null;
};

export default function AdminEmployerDetailsModal({
  open,
  onOpenChange,
  loading,
  employer,
}: AdminEmployerDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto sm:rounded-lg">
        <DialogHeader>
          <DialogTitle>Employer Details</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="py-8 text-center text-sm text-gray-500">Loading...</div>
        ) : employer ? (
          <div className="space-y-5">
            <dl className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <div className="min-w-0">
                <dt className="text-sm text-gray-500">Company Name</dt>
                <dd className="break-words font-medium">{employer.company_name}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-sm text-gray-500">Contact Person</dt>
                <dd className="break-words font-medium">{employer.contact_person_name}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-sm text-gray-500">Email</dt>
                <dd className="break-all font-medium">{employer.user.email}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-sm text-gray-500">Phone</dt>
                <dd className="font-medium">{employer.phone || "—"}</dd>
              </div>
              <div className="min-w-0 sm:col-span-2">
                <dt className="text-sm text-gray-500">Company Description</dt>
                <dd className="whitespace-pre-wrap break-words font-medium">
                  {employer.company_description || "—"}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-sm text-gray-500">Website</dt>
                <dd className="font-medium">
                  {employer.website ? (
                    <a
                      href={employer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-blue-600 hover:underline"
                    >
                      {employer.website}
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-sm text-gray-500">Status</dt>
                <dd className="mt-1">
                  <StatusBadge status={employer.user.is_active ? "active" : "inactive"} />
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-sm text-gray-500">Created</dt>
                <dd className="break-words font-medium">
                  {dayjs(employer.created_at).format("MMMM D, YYYY") || "—"}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-sm text-gray-500">Updated</dt>
                <dd className="break-words font-medium">
                  {dayjs(employer.updated_at).format("MMMM D, YYYY") || "—"}
                </dd>
              </div>
            </dl>
            <div className="flex justify-end border-t border-gray-200 pt-4">
              <AdminHeaderActionButton href={`/admin/employers/${employer.id}/edit`}>
                Edit Employer
              </AdminHeaderActionButton>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}