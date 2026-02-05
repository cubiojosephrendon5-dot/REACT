// src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
import heroImg from "./assets/hero.jpg";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import logo from "./assets/logo.png"; // ✅ put your logo here: src/assets/logo.png

const NAV_OFFSET = 110; // fixed navbar height buffer

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
};

// ✅ Navbar embedded inside App.jsx
const Navbar = () => {
  const [openKey, setOpenKey] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenKey(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpenKey(null);
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-paper/90 backdrop-blur border-b border-forest/10">
      <div className="mx-auto max-w-6xl px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-center" onClick={go("top")}>
            <img
              src={logo}
              alt="Logo"
              className="h-20 md:h-24 w-auto object-contain"
            />
          </a>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-forest font-semibold text-[16px] relative">
            {/* SOLUTIONS */}
            <DropDown
              label="Solutions"
              open={openKey === "solutions"}
              onOpen={() => setOpenKey("solutions")}
              onClose={() => setOpenKey(null)}
              onToggle={() =>
                setOpenKey((v) => (v === "solutions" ? null : "solutions"))
              }
              panelTopClass="top-[104px]"
            >
              <MegaSolutions onNavigate={go} />
            </DropDown>

            {/* HOW IT WORKS */}
            <DropDown
              label={<span style={{ color: "#2D5D46" }}>How it Works</span>}
              open={openKey === "how"}
              onOpen={() => setOpenKey("how")}
              onClose={() => setOpenKey(null)}
              onToggle={() => setOpenKey((v) => (v === "how" ? null : "how"))}
              panelTopClass="top-[104px]"
            >
              <MegaHowItWorks onNavigate={go} />
            </DropDown>

            <a href="#pricing" onClick={go("pricing")} className="hover:opacity-80">
              Pricing
            </a>
            <a href="#team" onClick={go("team")} className="hover:opacity-80">
              Team
            </a>
            <a href="#blog" onClick={go("blog")} className="hover:opacity-80">
              Blog
            </a>

            {/* CAREERS */}
            <DropDown
              label="Careers"
              open={openKey === "careers"}
              onOpen={() => setOpenKey("careers")}
              onClose={() => setOpenKey(null)}
              onToggle={() =>
                setOpenKey((v) => (v === "careers" ? null : "careers"))
              }
              panelTopClass="top-[104px]"
            >
              <MegaCareers onNavigate={go} />
            </DropDown>
          </nav>

          {/* CTA */}
          <a
            href="#get-started"
            onClick={go("get-started")}
            className="rounded-md px-6 py-3 font-semibold text-white text-[16px] hover:opacity-90 transition"
            style={{ backgroundColor: "#2D5D46" }}
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};

const DropDown = ({
  label,
  open,
  onToggle,
  onOpen,
  onClose,
  children,
  panelTopClass = "top-[72px]",
}) => {
  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-1 hover:opacity-80"
        onMouseEnter={onOpen}
        onClick={onToggle}
      >
        <span>{label}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/20" onClick={onClose} />

          <div className={`absolute left-0 right-0 ${panelTopClass} w-screen`}>
            <div className="mx-auto max-w-6xl px-6">
              <div
                className="animate-drop mt-3 rounded-xl border border-forest/10 bg-paper shadow-2xl p-6"
                onMouseLeave={onClose}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Title = ({ children }) => (
  <div className="text-[15px] font-semibold mb-3" style={{ color: "#2D5D46" }}>
    {children}
  </div>
);

const Box = ({
  title,
  desc,
  cta,
  href = "#",
  onClick,
  ctaColor = "text-[#2D5D46]",
}) => (
  <div className="rounded-xl border border-forest/10 p-4 bg-paper">
    <div className="text-sm font-semibold text-forest">{title}</div>
    {desc && <p className="mt-1 text-xs text-forest/70">{desc}</p>}
    {cta && (
      <a
        href={href}
        onClick={onClick}
        className={`mt-3 inline-flex items-center gap-1 text-sm font-medium ${ctaColor} hover:opacity-80`}
      >
        {cta} <span>↗</span>
      </a>
    )}
  </div>
);

const MegaSolutions = ({ onNavigate }) => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3">
        <Title>Free resources</Title>
        <Box
          title="ROI Calculator"
          desc="Calculate your potential savings with a VA."
          cta="Access Free"
          ctaColor="text-forest"
          href="#"
        />
      </div>

      <div className="col-span-5">
        <Title>Our Virtual Assistants</Title>
        <div className="space-y-4">
          <Box
            title="Business Virtual Assistant®"
            desc="Reclaim your time with a reliable VA for admin + ops."
            cta="Learn More"
            href="#assistants"
            onClick={onNavigate("assistants")}
          />
          <Box
            title="Multimedia Virtual Assistant®"
            desc="Level up creative output with dedicated multimedia support."
            cta="Learn More"
            href="#assistants"
            onClick={onNavigate("assistants")}
          />
          <Box
            title="Legal Virtual Assistant®"
            desc="Free your firm from admin legal work with specialist support."
            cta="Learn More"
            href="#assistants"
            onClick={onNavigate("assistants")}
          />
        </div>
      </div>

      <div className="col-span-4">
        <Title>Related Articles</Title>
        <div className="space-y-4">
          <Box
            title="How to Choose the Right Virtual Assistant"
            desc="Essential tips for finding the perfect VA."
            cta="Read Article"
            href="#blog"
            onClick={onNavigate("blog")}
          />
          <Box
            title="Challenges Working with Filipino VAs — and fixes"
            desc="Avoid pitfalls and maximize your VA partnership."
            cta="Read Article"
            href="#blog"
            onClick={onNavigate("blog")}
          />
        </div>

        <a
          href="#blog"
          onClick={onNavigate("blog")}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-forest/10 px-4 py-3 text-sm font-medium hover:bg-cream/60"
          style={{ color: "#2D5D46" }}
        >
          View All Blogs <span>↗</span>
        </a>
      </div>
    </div>
  );
};

const MegaHowItWorks = ({ onNavigate }) => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3">
        <Title>Simple Pricing</Title>

        <div className="rounded-xl border border-forest/10 overflow-hidden bg-cream/70">
          <div className="p-4">
            <div className="text-lg font-bold text-forest">$8 USD per hour</div>
            <p className="mt-1 text-xs text-forest/70">
              No contracts and no setup fees. Cancel anytime.
            </p>
            <a
              href="#pricing"
              onClick={onNavigate("pricing")}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-forest/10 bg-paper px-4 py-3 text-sm font-medium hover:bg-cream/60"
              style={{ color: "#2D5D46" }}
            >
              More Details <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="col-span-5">
        <Title>Easy Process</Title>
        <div className="space-y-4">
          <Box
            title="Getting Started Guide"
            desc="Step-by-step onboarding to get you live fast."
            cta="Learn More"
            href="#how-it-works"
            onClick={onNavigate("how-it-works")}
          />
          <Box
            title="VA Matching Process"
            desc="How we find the right VA for your workflow."
            cta="Learn More"
            href="#how-it-works"
            onClick={onNavigate("how-it-works")}
          />
          <Box
            title="Onboarding Timeline"
            desc="What your first week looks like."
            cta="Learn More"
            href="#how-it-works"
            onClick={onNavigate("how-it-works")}
          />
        </div>
      </div>

      <div className="col-span-4">
        <Title>Common Questions</Title>
        <div className="space-y-4">
          <Box title="Need specialized skills?" desc="We have VAs across many skill areas." />
          <Box title="Can I scale my team?" desc="Add or remove hours anytime." />
          <Box title="What about time zones?" desc="We match your preferred schedule." />
        </div>

        <a
          href="#how-it-works"
          onClick={onNavigate("how-it-works")}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-forest/10 px-4 py-3 text-sm font-medium hover:bg-cream/60"
          style={{ color: "#2D5D46" }}
        >
          See FAQs <span>↗</span>
        </a>
      </div>
    </div>
  );
};

const MegaCareers = ({ onNavigate }) => {
  const cards = [
    {
      title: "Be a Business Virtual Assistant®",
      tags: ["Full-time Remote", "Part-time Remote"],
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=70",
    },
    {
      title: "Be a Multimedia Virtual Assistant®",
      tags: ["Full-time Remote", "Part-time Remote"],
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=70",
    },
    {
      title: "Be a Legal Virtual Assistant®",
      tags: ["Full-time Remote"],
      img: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=900&q=70",
    },
  ];

  return (
    <div>
      <Title>Open Roles</Title>

      <div className="grid grid-cols-3 gap-6">
        {cards.map((c) => (
          <div
            key={c.title}
            className="rounded-xl border border-forest/10 overflow-hidden bg-cream/70"
          >
            <div className="h-28 bg-gray-100 overflow-hidden">
              <img src={c.img} alt={c.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <div className="text-sm font-semibold text-forest">{c.title}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-cream px-2 py-1 text-[12px] font-medium text-forest"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="#careers"
                onClick={onNavigate("careers")}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-forest/10 bg-paper px-4 py-3 text-sm font-medium hover:bg-cream/60"
                style={{ color: "#2D5D46" }}
              >
                Apply Now <span>↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- PAGE UI BELOW ----------

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Button({ children, variant = "primary", className, ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-bronze/40";
  const styles = {
    primary:
      "bg-forest text-paper shadow-soft hover:-translate-y-0.5 hover:shadow-soft2 active:translate-y-0",
    ghost: "bg-transparent text-forest border border-forest/20 hover:bg-cream/60",
    light: "bg-paper text-forest border border-forest/15 hover:bg-cream",
  };
  return (
    <button className={cn(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto max-w-3xl text-center"
    >
      {eyebrow ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-forest/15 bg-paper px-4 py-2 text-xs font-semibold text-forest/80">
          <Sparkles className="h-4 w-4 text-bronze" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
      {desc ? (
        <p className="mt-4 text-base leading-relaxed text-forest/75 md:text-lg">
          {desc}
        </p>
      ) : null}
    </motion.div>
  );
}

function ServiceCard({ item }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="group overflow-hidden rounded-2xl border border-forest/10 bg-paper shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft2"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-paper/90 px-3 py-1 text-xs font-semibold text-forest shadow-soft">
          <Icon className="h-4 w-4 text-bronze" />
          Service
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-extrabold tracking-tight">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-forest/75">{item.benefit}</p>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-bronze">
          Learn more <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  );
}

function Step({ i, title, desc }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative rounded-2xl border border-forest/10 bg-paper p-5 shadow-soft"
    >
      <div className="absolute -left-3 -top-3 grid h-10 w-10 place-items-center rounded-2xl bg-forest text-paper shadow-soft">
        <span className="text-sm font-black">{i}</span>
      </div>
      <div className="pl-6">
        <h4 className="text-base font-extrabold">{title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-forest/75">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function App() {
  const DATA = {
    hero: {
      headline: "Reliable Virtual Assistants for Growing Businesses",
      subheadline:
        "We provide trained, dependable virtual assistants to help business owners save time and scale operations.",
      highlights: "9+ Years Proven Track Record and Hundreds of Businesses Served",
     imageUrl: heroImg,
    },
    whoWeHelp: {
      title: "Who we help",
      logos: [
        { name: "Logo A", src: "https://dummyimage.com/220x88/ffffff/111111&text=Logo+A" },
        { name: "Logo B", src: "https://dummyimage.com/220x88/ffffff/111111&text=Logo+B" },
        { name: "Logo C", src: "https://dummyimage.com/220x88/ffffff/111111&text=Logo+C" },
        { name: "Logo D", src: "https://dummyimage.com/220x88/ffffff/111111&text=Logo+D" },
        { name: "Logo E", src: "https://dummyimage.com/220x88/ffffff/111111&text=Logo+E" },
        { name: "Logo F", src: "https://dummyimage.com/220x88/ffffff/111111&text=Logo+F" },
      ],
    },
    services: {
      title: "Our Virtual Assistant Services",
      items: [
        {
          title: "Executive Virtual staff",
          benefit: "Inbox, calendar, and admin handled consistently.",
          imageUrl:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
          icon: Users,
        },
        {
          title: "Entrepreneurs and start-up virtual staff",
          benefit: "Free your time to focus on growth and strategy.",
          imageUrl:
            "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80",
          icon: Sparkles,
        },
        {
          title: "Lead Generation Specialist",
          benefit: "Keep your pipeline moving with steady outreach.",
          imageUrl:
            "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=1400&q=80",
          icon: CheckCircle2,
        },
        {
          title: "Sales Representative",
          benefit: "Qualification, follow-ups, booking—done right.",
          imageUrl:
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1400&q=80",
          icon: ArrowRight,
        },
        {
          title: "E-commerce",
          benefit: "Listings, support, ops—streamlined end-to-end.",
          imageUrl:
            "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1400&q=80",
          icon: ShieldCheck,
        },
      ],
    },
    how: {
      title: "How It Works",
      steps: [
        { title: "Book a Discovery Call", desc: "Tell us your goals, tasks, and timeline." },
        { title: "Needs Assessment", desc: "We define scope, tools, and success metrics." },
        { title: "VA Matching", desc: "We match you with the right VA for your workflow." },
        { title: "Onboarding", desc: "Smooth handover with SOPs, access, and training." },
        { title: "Ongoing Support", desc: "We check in, optimize, and scale with you." },
      ],
    },
    testimonials: {
      title: "What Our Clients Say",
      items: [
        {
          name: "Client Name",
          role: "Founder",
          quote:
            "RCreate helped us reclaim hours every week. The VA was proactive, reliable, and quickly became part of the team.",
        },
        {
          name: "Client Name",
          role: "Operations Lead",
          quote:
            "The onboarding was fast and structured. Communication stayed clear, and we finally got consistent follow-through.",
        },
        {
          name: "Client Name",
          role: "E-commerce Owner",
          quote:
            "Support scaled with our needs. It felt like we added a skilled teammate without the usual hiring friction.",
        },
      ],
    },
    contact: {
      title: "Contact Us",
      email: "hello@rcreate.com",
    },
  };

  const duplicatedLogos = useMemo(() => {
    const arr = DATA.whoWeHelp.logos;
    return [...arr, ...arr];
  }, []);

  return (
    <div className="relative min-h-screen bg-paper text-forest">
      <Navbar />

      {/* offset for fixed navbar */}
      <div className="pt-[104px]">
        <div id="top" />

        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12 md:px-6">
          <div className="overflow-hidden rounded-[2rem] border border-forest/10 bg-paper shadow-soft2">
            <div className="grid gap-10 p-6 md:grid-cols-2 md:gap-12 md:p-10">
              <div className="flex flex-col justify-center">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-forest/15 bg-cream/70 px-4 py-2 text-xs font-semibold text-forest">
                  <ShieldCheck className="h-4 w-4 text-bronze" />
                  Trusted virtual assistant staffing
                </div>

                <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-5xl">
                  {DATA.hero.headline}
                </h1>

                <p className="mt-4 text-base leading-relaxed text-forest/75 md:text-lg">
                  {DATA.hero.subheadline}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a href="#get-started" onClick={(e) => (e.preventDefault(), scrollToId("get-started"))}>
                    <Button className="w-full sm:w-auto">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href="#assistants" onClick={(e) => (e.preventDefault(), scrollToId("assistants"))}>
                    <Button variant="ghost" className="w-full sm:w-auto">
                      View Services <ChevronDown className="h-4 w-4" />
                    </Button>
                  </a>
                </div>

                <div className="mt-6 rounded-2xl border border-forest/10 bg-cream/60 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 grid h-9 w-9 place-items-center rounded-xl bg-forest text-paper shadow-soft">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold">Highlights</div>
                      <div className="mt-1 text-sm text-forest/75">
                        {DATA.hero.highlights}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
<div className="relative h-[320px] md:h-[420px] overflow-hidden rounded-2xl border border-forest/10 shadow-soft2">
  <img
    src={DATA.hero.imageUrl}
    alt="Professional virtual assistant"
    className="absolute inset-0 h-full w-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-forest/35 via-transparent to-transparent" />
</div>

              </div>
            </div>

            {/* LOGOS */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-forest/10 to-transparent" />
            <div className="px-6 py-8 md:px-10">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="text-sm font-extrabold">{DATA.whoWeHelp.title}</div>
                <div className="text-xs font-semibold text-forest/60">
                  Swipe on mobile • auto-scroll on desktop
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-forest/10 bg-cream/35 p-4">
                <div className="flex gap-6 marquee will-change-transform">
                  {duplicatedLogos.map((l, idx) => (
                    <div
                      key={`${l.name}-${idx}`}
                      className="flex min-w-[160px] items-center justify-center rounded-xl bg-paper px-4 py-3 shadow-soft"
                    >
                      <img
                        src={l.src}
                        alt={l.name}
                        className="h-8 w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-3 overflow-x-auto pb-2 md:hidden">
                {DATA.whoWeHelp.logos.map((l) => (
                  <div
                    key={l.name}
                    className="flex min-w-[180px] items-center justify-center rounded-xl border border-forest/10 bg-paper px-4 py-3 shadow-soft"
                  >
                    <img src={l.src} alt={l.name} className="h-8 w-auto object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="assistants" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <SectionTitle
            eyebrow="Services"
            title="Our Virtual Assistant Services"
            desc="Choose the support you need now—and scale up anytime."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DATA.services.items.map((item) => (
              <ServiceCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <SectionTitle
            eyebrow="Process"
            title={DATA.how.title}
            desc="A clear, proven workflow to get you matched fast and supported long-term."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {DATA.how.steps.map((s, idx) => (
              <Step key={s.title} i={idx + 1} title={s.title} desc={s.desc} />
            ))}
          </div>
        </section>

        {/* PLACEHOLDER SECTIONS FOR NAVBAR */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <SectionTitle eyebrow="Pricing" title="Simple pricing" desc="Placeholder section." />
          <div className="mt-6 rounded-2xl border border-forest/10 bg-paper p-6 shadow-soft">
            Add your pricing content here.
          </div>
        </section>

        <section id="team" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <SectionTitle eyebrow="Team" title="Meet the team" desc="Placeholder section." />
          <div className="mt-6 rounded-2xl border border-forest/10 bg-paper p-6 shadow-soft">
            Add your team content here.
          </div>
        </section>

        <section id="blog" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <SectionTitle eyebrow="Blog" title="Insights" desc="Placeholder section." />
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {DATA.testimonials.items.map((t) => (
              <div
                key={t.name + t.role}
                className="rounded-2xl border border-forest/10 bg-paper p-6 shadow-soft"
              >
                <p className="text-sm text-forest/75">{t.quote}</p>
                <div className="mt-4 text-sm font-bold">{t.name}</div>
                <div className="text-xs text-forest/60">{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="careers" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <SectionTitle eyebrow="Careers" title="Join us" desc="Placeholder section." />
          <div className="mt-6 rounded-2xl border border-forest/10 bg-paper p-6 shadow-soft">
            Add careers content here.
          </div>
        </section>

        {/* CONTACT */}
        <section id="get-started" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <SectionTitle
            eyebrow="Contact"
            title={DATA.contact.title}
            desc="Hook this form to your email/booking tool."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-forest/10 bg-cream/40 p-6 shadow-soft2">
              <div className="rounded-2xl bg-paper p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-forest text-paper">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-base font-extrabold">Reach us directly</div>
                    <div className="text-sm text-forest/70">{DATA.contact.email}</div>
                  </div>
                </div>
              </div>
            </div>

            <form
              className="rounded-[2rem] border border-forest/10 bg-paper p-6 shadow-soft2"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submitted! Connect this to your email/booking tool.");
              }}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold">Name</label>
                  <input className="w-full rounded-xl border border-forest/15 bg-paper px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-bronze/30" required />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold">Email</label>
                  <input type="email" className="w-full rounded-xl border border-forest/15 bg-paper px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-bronze/30" required />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold">Business Name</label>
                  <input className="w-full rounded-xl border border-forest/15 bg-paper px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-bronze/30" required />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold">Message</label>
                  <textarea rows={5} className="w-full resize-none rounded-xl border border-forest/15 bg-paper px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-bronze/30" required />
                </div>
                <button className="rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-paper hover:opacity-90">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

        <footer className="border-t border-forest/10 bg-paper">
          <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-base font-extrabold">RCreate</div>
              <div className="text-sm text-forest/70">{DATA.contact.email}</div>
            </div>
            <div className="mt-6 text-xs text-forest/50">© {new Date().getFullYear()} RCreate</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
