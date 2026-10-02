type DashboardHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function DashboardHeader({
  title,
  description,
  action,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl text-brand-navy lg:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-2 text-sm text-text-secondary">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
