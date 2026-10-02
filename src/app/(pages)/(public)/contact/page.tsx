"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  publicInputClass,
  publicLabelClass,
  publicTextareaClass,
} from "@/components/public/form-field";
import { submitContactMessage } from "@/services/contact-service";
import { handleOpenToast } from "@/helper/toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    userType: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const res = await submitContactMessage(form);
    setLoading(false);
    if (!res.success) {
      handleOpenToast(res.message, "error");
      return;
    }
    setSubmitted(true);
    handleOpenToast(res.message, "success");
  };

  return (
    <div className="bg-surface">
      <section className="relative pt-32 pb-16" style={{ background: "linear-gradient(160deg, #243B6B 0%, #191C33 100%)" }}>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 font-ui text-sm font-semibold text-brand-sky">CONTACT US</p>
          <h1 className="mb-4 font-display text-4xl tracking-wide text-white lg:text-5xl">HOW CAN WE HELP?</h1>
          <p className="text-base text-white/65">
            Have a question about KJobs? Want to explore partnerships or enterprise plans? Our team is here and ready to help.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="mb-2 font-display text-2xl text-brand-navy">GET IN TOUCH</h2>
              <p className="text-sm leading-relaxed text-text-secondary">
                Whether you&apos;re a job seeker with a question or an employer looking for a custom solution, we&apos;d love to hear from you.
              </p>
            </div>
            {[
              { icon: Mail, label: "Email", value: "hello@kjobs.io" },
              { icon: Phone, label: "Phone", value: "+1 (555) 820-4000" },
              { icon: MapPin, label: "Office", value: "340 Pine St, Suite 800\nSan Francisco, CA 94104" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 rounded-2xl border border-border-default bg-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(47,91,222,0.08)] text-brand-royal">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="mb-1 font-ui text-xs font-semibold" style={{ color: "#94A3B8" }}>{item.label.toUpperCase()}</div>
                  <div className="font-ui text-sm whitespace-pre-line text-brand-navy">{item.value}</div>
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-border-default bg-white p-5">
              <div className="mb-3 font-ui text-xs font-semibold" style={{ color: "#94A3B8" }}>RESPONSE TIME</div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="font-ui text-sm text-brand-navy">Typically within 24 hours</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border-default bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              {submitted ? (
                <div className="py-16 text-center">
                  <h3 className="mb-3 font-display text-2xl text-brand-navy">MESSAGE SENT!</h3>
                  <p className="text-sm text-text-secondary">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", userType: "", subject: "", message: "" });
                    }}
                    className="mt-6 rounded-lg bg-[rgba(47,91,222,0.08)] px-5 py-2.5 font-ui text-sm font-semibold text-brand-royal"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className={publicLabelClass}>
                        Your name<span className="text-brand-royal"> *</span>
                      </span>
                      <input
                        required
                        placeholder="James Keller"
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                        className={publicInputClass}
                      />
                    </label>
                    <label className="block">
                      <span className={publicLabelClass}>
                        Email address<span className="text-brand-royal"> *</span>
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="james@example.com"
                        value={form.email}
                        onChange={(event) => setForm({ ...form, email: event.target.value })}
                        className={publicInputClass}
                      />
                    </label>
                  </div>
                  <div>
                    <p className={publicLabelClass}>I am a</p>
                    <div className="grid grid-cols-2 gap-3">
                      {["Job Seeker", "Employer"].map((type) => {
                        const selected = form.userType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setForm({ ...form, userType: type })}
                            className="rounded-xl px-4 py-3 text-left font-ui text-sm font-medium transition-all duration-200"
                            style={{
                              border: `1px solid ${selected ? "#2F5BDE" : "#E5E7EB"}`,
                              background: selected ? "rgba(47,91,222,0.06)" : "#F8FAFC",
                              color: selected ? "#2F5BDE" : "#475569",
                            }}
                          >
                            {selected ? <span className="mr-2">✓</span> : null}
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <label className="block">
                    <span className={publicLabelClass}>Subject</span>
                    <input
                      placeholder="How can we help you?"
                      value={form.subject}
                      onChange={(event) => setForm({ ...form, subject: event.target.value })}
                      className={publicInputClass}
                    />
                  </label>
                  <label className="block">
                    <span className={publicLabelClass}>
                      Message<span className="text-brand-royal"> *</span>
                    </span>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us more about what you need..."
                      value={form.message}
                      onChange={(event) => setForm({ ...form, message: event.target.value })}
                      className={publicTextareaClass}
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl py-4 font-ui text-sm font-semibold text-white shadow-[0_4px_16px_rgba(47,91,222,0.3)] disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #2F5BDE, #243B6B)" }}
                  >
                    {loading ? "Sending…" : "Send Message →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
