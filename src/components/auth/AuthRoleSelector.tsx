export type AccountRole = "job-seeker" | "employer";

type AuthRoleSelectorProps = {
  value: AccountRole;
  onChange: (role: AccountRole) => void;
  label?: string;
};

const roles: Array<{
  value: AccountRole;
  title: string;
  description: string;
}> = [
  {
    value: "job-seeker",
    title: "Job seeker",
    description: "Find your next opportunity",
  },
  {
    value: "employer",
    title: "Employer",
    description: "Hire exceptional talent",
  },
];

function RoleIcon({ role }: { role: AccountRole }) {
  if (role === "employer") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M4 20h16V8H4v12Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 8V5h6v3M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function AuthRoleSelector({
  value,
  onChange,
  label = "I'm joining as",
}: AuthRoleSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-3 font-ui text-sm font-semibold text-brand-navy">
        {label}
      </legend>
      <div className="grid grid-cols-2 gap-3">
        {roles.map((role) => {
          const selected = value === role.value;
          return (
            <button
              key={role.value}
              type="button"
              onClick={() => onChange(role.value)}
              aria-pressed={selected}
              className={`relative flex min-h-24 flex-col items-start rounded-xl border p-4 text-left transition-all duration-200 ${
                selected
                  ? "border-[#2F5BDE] bg-[#E0EDFF] shadow-[0_8px_24px_rgba(47,91,222,0.12)]"
                  : "border-border-default bg-white hover:border-brand-royal/50 hover:bg-surface"
              }`}
            >
              <span
                className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${
                  selected ? "bg-[#2F5BDE] text-white" : "bg-[#E8EEF9] text-[#2F5BDE]"
                }`}
              >
                <RoleIcon role={role.value} />
              </span>
              <span className="font-ui text-sm font-semibold text-brand-navy">{role.title}</span>
              <span className="mt-1 text-xs leading-relaxed text-text-secondary">
                {role.description}
              </span>
              <span
                className={`absolute top-3 right-3 flex h-4 w-4 items-center justify-center rounded-full border ${
                  selected ? "border-brand-royal bg-brand-royal" : "border-border-light"
                }`}
              >
                {selected ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
