import type { BillingInvoice } from "@/types/billing-invoice";
import { formatHistoryDate } from "@/lib/subscription-history";

export const BILLING_INVOICE_PREVIEW_COUNT = 3;

export function formatBillingInvoiceDate(value?: string | null): string {
  return formatHistoryDate(value);
}

export function formatBillingInvoiceAmount(invoice: BillingInvoice): string {
  const symbol = invoice.currency === "USD" ? "$" : `${invoice.currency} `;
  return `${symbol}${invoice.amount}`;
}

export function sortBillingInvoicesNewestFirst(
  invoices: BillingInvoice[],
): BillingInvoice[] {
  return [...invoices].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
