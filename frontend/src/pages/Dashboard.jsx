
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Layers3,
  Moon,
  Sun,
  LogOut,
  Sparkles,
  CheckCircle2,
  BriefcaseBusiness,
  Database,
  Server,
  Palette,
  Cloud,
  GraduationCap,
  Building2,
  CalendarDays,
  Terminal,
  ShieldCheck,
  Workflow,
  Monitor,
  Send,
  Command,
  Zap,
  Download,
  Menu,
  X,
} from "lucide-react";
import { API } from "../App.jsx";

const PROFILE = {
  name: "Shehroz Khan",
  role: "Full-Stack MERN Developer",
  email: "shery13318@gmail.com",
  github: "https://github.com/shehroz3014",
  linkedin: "https://www.linkedin.com/",
  cvPath: "/Shehroz-Khan-CV.pdf",
  portfolio: "https://shehrozportfoliohere.netlify.app/",
};

const skillGroups = [
  {
    title: "Frontend Engineering",
    subtitle: "Interfaces & user experience",
    icon: Palette,
    skills: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Redux Toolkit",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive UI",
    ],
  },
  {
    title: "Backend Engineering",
    subtitle: "APIs & application logic",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
      "API Integration",
    ],
  },
  {
    title: "Databases & ORM",
    subtitle: "Data & persistence",
    icon: Database,
    skills: [
      "MongoDB",
      "PostgreSQL",
      "Prisma ORM",
      "Data Modeling",
      "CRUD Operations",
    ],
  },
  {
    title: "Cloud & DevOps",
    subtitle: "Infrastructure & workflow",
    icon: Cloud,
    skills: [
      "AWS Fundamentals",
      "Linux",
      "Git",
      "GitHub",
      "Deployment",
      "Environment Configuration",
    ],
  },
];

const experiences = [
  {
    id: "01",
    role: "Web Development Experience",
    company: "Software House",
    type: "Software Development",
    duration: "Add actual dates",
    icon: Code2,
    points: [
      "Gained practical exposure to website development and frontend implementation.",
      "Worked with web technologies to structure, style, and improve website interfaces.",
      "Practiced debugging and responsive design improvements.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Web Development"],
  },
  {
    id: "02",
    role: "Customer Support Representative",
    company: "Mindbridge",
    type: "Customer Support / BPO",
    duration: "6 months",
    icon: Building2,
    points: [
      "Worked in an international customer-support environment.",
      "Strengthened professional communication, active listening, and problem-solving.",
      "Responded to customer queries while following service processes.",
    ],
    tags: [
      "Communication",
      "Problem Solving",
      "Customer Experience",
    ],
  },
];

const projects = [
  {
    number: "01",
    name: "Investora",
    category: "FULL-STACK APPLICATION",
    description:
      "An investment-platform project featuring authentication, wallet workflows, investment plans, transaction requests, and administrative tools.",
    stack: [
      "React Native",
      "Node.js",
      "PostgreSQL",
      "Prisma",
    ],
    icon: BriefcaseBusiness,
    link: PROFILE.github,
    linkLabel: "View GitHub profile",
    details: [
      "Authentication and user-management workflows",
      "Wallet, deposit, and withdrawal flows",
      "Investment plans and admin operations",
    ],
  },
  {
    number: "02",
    name: "MERN Authentication",
    category: "FULL-STACK WEB DEVELOPMENT",
    description:
      "A web application focused on registration, login, protected dashboard access, and API integration.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    icon: ShieldCheck,
    link: PROFILE.github,
    linkLabel: "View GitHub profile",
    details: [
      "Registration and login experience",
      "Protected dashboard routes",
      "Frontend-to-backend authentication",
    ],
  },
  {
    number: "03",
    name: "NovaSpace",
    category: "PERSONAL PORTFOLIO",
    description:
      "A personal portfolio showcasing technical skills, selected work, experience, responsive layouts, and theme switching.",
    stack: ["React", "Vite", "JavaScript", "CSS"],
    icon: Monitor,
    link: PROFILE.portfolio,
    linkLabel: "Live Portfolio",
    details: [
      "Responsive portfolio sections",
      "Light and dark appearance",
      "Project and experience showcases",
    ],
  },
];

const cloudRoadmap = [
  {
    icon: Terminal,
    title: "Linux & Command Line",
    description:
      "Practicing terminal commands, file operations, permissions, and basic system administration.",
  },
  {
    icon: Cloud,
    title: "AWS & Cloud Fundamentals",
    description:
      "Building foundational knowledge of cloud infrastructure, compute, storage, networking, and deployment.",
  },
  {
    icon: Workflow,
    title: "Deployment & DevOps",
    description:
      "Learning application deployment, environment configuration, and repeatable development workflows.",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="pro-section-heading">
      <div>
        <p className="pro-eyebrow">{eyebrow}</p>
        <h2>
          {title}
          <span className="pro-period">.</span>
        </h2>
      </div>

      {description && (
        <p className="pro-section-description">
          {description}
        </p>
      )}
    </div>
  );
}

function SocialLink({ href, icon: Icon, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <Icon size={17} />
      <span>{children}</span>
      <ArrowUpRight size={12} />
    </a>
  );
}

export default function Dashboard({
  user,
  onLogout,
  theme,
  toggleTheme,
}) {
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = theme === "dark";

  const displayName =
    user?.name ||
    user?.fullName ||
    user?.email?.split("@")[0] ||
    PROFILE.name;

  const firstName = displayName.trim().split(/\s+/)[0];
  const contactEmail = user?.email || PROFILE.email;

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#expertise" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#work" },
    { label: "Cloud", href: "#cloud" },
    { label: "Contact", href: "#contact" },
  ];

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await fetch(`${API}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      try {
        onLogout?.();
      } finally {
        setLoggingOut(false);
      }
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main
      className={`pro-dashboard ${
        isDark ? "pro-dark" : "pro-light"
      }`}
    >
      <div className="pro-background-glow pro-glow-one" />
      <div className="pro-background-glow pro-glow-two" />

      {/* NAVIGATION */}
      <header className="pro-navbar">
        <Link
          to="/dashboard"
          className="pro-brand"
          aria-label="NovaSpace home"
          onClick={closeMenu}
        >
          <span className="pro-brand-mark">
            <Command size={19} />
          </span>

          <span className="pro-brand-name">
            nova<span>space</span>
          </span>
        </Link>

        <button
          type="button"
          className="pro-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={
            menuOpen ? "Close navigation" : "Open navigation"
          }
          aria-expanded={menuOpen}
          aria-controls="pro-main-navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav
          id="pro-main-navigation"
          className={`pro-nav-links ${
            menuOpen ? "pro-nav-open" : ""
          }`}
          aria-label="Main navigation"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="pro-nav-actions">
          <button
            type="button"
            className="pro-icon-button"
            onClick={toggleTheme}
            aria-label="Toggle appearance"
          >
            {isDark ? (
              <Sun size={17} />
            ) : (
              <Moon size={17} />
            )}
          </button>

          <button
            type="button"
            className="pro-logout-button"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <LogOut size={15} />
            <span>
              {loggingOut ? "Signing out..." : "Sign out"}
            </span>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="pro-hero" id="about">
        <div className="pro-hero-content">
          <div className="pro-availability">
            <span className="pro-availability-dot" />
            OPEN TO THE RIGHT OPPORTUNITIES
          </div>

          <p className="pro-greeting">
            Hello, {firstName}.{" "}
            <span>Welcome to my portfolio.</span>
          </p>

          <h1>
            Engineering
            <br />
            modern digital
            <br />
            <span className="pro-gradient-text">
              experiences.
            </span>
          </h1>

          <p className="pro-hero-description">
            I'm Shehroz Khan, a full-stack developer focused on
            building responsive web applications, dependable backend
            APIs, and useful digital products. I'm also building my
            foundations in Linux, cloud computing, and AWS.
          </p>

          <div className="pro-hero-actions">
            <a
              className="pro-button pro-button-primary"
              href="#work"
            >
              Explore my projects
              <ArrowUpRight size={17} />
            </a>

            <a
              className="pro-button pro-button-secondary"
              href="#contact"
            >
              Let's talk
              <ArrowRight size={16} />
            </a>

            <a
              className="pro-button pro-button-secondary pro-cv-button"
              href={PROFILE.cvPath}
              download="Shehroz-Khan-CV.pdf"
            >
              <Download size={17} />
              Download CV
            </a>
          </div>

          <div className="pro-social-links">
            <SocialLink href={PROFILE.github} icon={Github}>
              GitHub
            </SocialLink>

            <SocialLink href={PROFILE.linkedin} icon={Linkedin}>
              LinkedIn
            </SocialLink>

            <a href={`mailto:${contactEmail}`}>
              <Mail size={17} />
              <span>Email</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        {/* CODE ILLUSTRATION */}
        <div
          className="pro-hero-art"
          aria-label="Developer code illustration"
        >
          <div className="pro-art-grid" />
          <div className="pro-orbit pro-orbit-large" />
          <div className="pro-orbit pro-orbit-small" />

          <div className="pro-code-window">
            <div className="pro-window-bar">
              <div className="pro-window-dots">
                <i />
                <i />
                <i />
              </div>

              <span>developer.tsx</span>
              <Code2 size={15} />
            </div>

            <div className="pro-code-content">
              <p>
                <span className="pro-code-purple">const</span>{" "}
                <span className="pro-code-blue">developer</span> = {"{"}
              </p>

              <p className="pro-code-indent">
                <span className="pro-code-key">name</span>:{" "}
                <span className="pro-code-green">
                  "{firstName}"
                </span>
                ,
              </p>

              <p className="pro-code-indent">
                <span className="pro-code-key">frontend</span>:{" "}
                <span className="pro-code-green">
                  "React / Next.js"
                </span>
                ,
              </p>

              <p className="pro-code-indent">
                <span className="pro-code-key">backend</span>:{" "}
                <span className="pro-code-green">
                  "Node.js / APIs"
                </span>
                ,
              </p>

              <p className="pro-code-indent">
                <span className="pro-code-key">cloud</span>:{" "}
                <span className="pro-code-green">
                  "Learning AWS"
                </span>
                ,
              </p>

              <p className="pro-code-indent">
                <span className="pro-code-key">mindset</span>:{" "}
                <span className="pro-code-green">
                  "Always improving"
                </span>
                ,
              </p>

              <p>{"};"}</p>

              <p className="pro-code-comment">
                // learn → build → improve
              </p>

              <p className="pro-code-call">
                <span className="pro-code-blue">developer</span>.
                <span className="pro-code-purple">build</span>();
              </p>
            </div>

            <div className="pro-code-footer">
              <span>
                <span />
                Creating with purpose
              </span>
              <span>UTF-8</span>
            </div>
          </div>

          <div className="pro-floating-card pro-floating-top">
            <span className="pro-floating-icon">
              <Zap size={17} />
            </span>

            <span>
              <strong>Full-stack mindset</strong>
              <small>Frontend to backend</small>
            </span>
          </div>

          <div className="pro-floating-card pro-floating-bottom">
            <span className="pro-floating-icon pro-floating-icon-green">
              <Cloud size={18} />
            </span>

            <span>
              <strong>Cloud learning journey</strong>
              <small>Linux · AWS fundamentals</small>
            </span>
          </div>

          <div className="pro-art-label">
            <Sparkles size={13} />
            CODE → PRODUCTS → GROWTH
          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHTS */}
      <section className="pro-metrics">
        <div className="pro-metric">
          <span className="pro-metric-icon">
            <Code2 size={18} />
          </span>

          <div>
            <strong>Full-stack</strong>
            <span>Web application development</span>
          </div>
        </div>

        <div className="pro-metric">
          <span className="pro-metric-icon">
            <Layers3 size={18} />
          </span>

          <div>
            <strong>Modern stack</strong>
            <span>React, Next.js & APIs</span>
          </div>
        </div>

        <div className="pro-metric">
          <span className="pro-metric-icon">
            <Cloud size={18} />
          </span>

          <div>
            <strong>Cloud pathway</strong>
            <span>Linux, AWS & deployment</span>
          </div>
        </div>
      </section>

      {/* ABOUT & EDUCATION */}
      <section className="pro-section" id="journey">
        <SectionHeading
          eyebrow="ABOUT MY JOURNEY"
          title="Developer by practice"
          description="My journey combines practical web development, customer-facing experience, and continuous learning to become a stronger software engineer."
        />

        <div className="pro-about-grid">
          <article className="pro-about-card">
            <span className="pro-about-icon">
              <Code2 size={22} />
            </span>

            <h3>Build practical solutions</h3>

            <p>
              I enjoy turning requirements into usable interfaces,
              connecting frontend experiences to backend services,
              and improving applications through debugging and
              iteration.
            </p>
          </article>

          <article className="pro-about-card">
            <span className="pro-about-icon">
              <GraduationCap size={22} />
            </span>

            <h3>Keep learning</h3>

            <p>
              I continue developing my skills in modern JavaScript,
              databases, Linux, cloud concepts, and application
              deployment.
            </p>

            <p>
              <strong>Education:</strong> BS Computer Science
              <br />
              <span>GCUF · In progress</span>
            </p>
          </article>

          <article className="pro-about-card">
            <span className="pro-about-icon">
              <BriefcaseBusiness size={22} />
            </span>

            <h3>Understand people and products</h3>

            <p>
              Customer-support experience has helped me value clear
              communication, patience, structured problem-solving,
              and user-focused thinking.
            </p>
          </article>
        </div>
      </section>

      {/* SKILLS */}
      <section className="pro-section" id="expertise">
        <SectionHeading
          eyebrow="TECHNICAL CAPABILITIES"
          title="Technology stack"
          description="A practical toolkit across frontend engineering, backend services, databases, and cloud fundamentals."
        />

        <div className="pro-expertise-grid">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;

            return (
              <article
                className="pro-expertise-card"
                key={group.title}
              >
                <div className="pro-expertise-card-top">
                  <span className="pro-expertise-icon">
                    <Icon size={20} />
                  </span>

                  <span className="pro-card-index">
                    0{index + 1}
                  </span>
                </div>

                <h3>{group.title}</h3>

                <p className="pro-skill-subtitle">
                  {group.subtitle}
                </p>

                <div className="pro-skill-list">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="pro-section" id="experience">
        <SectionHeading
          eyebrow="PROFESSIONAL BACKGROUND"
          title="Experience that shaped me"
          description="Software development exposure and international customer-support experience, presented separately and honestly."
        />

        <div className="pro-experience-list">
          {experiences.map((item) => {
            const Icon = item.icon;

            return (
              <article
                className="pro-experience-card"
                key={item.id}
              >
                <div className="pro-experience-side">
                  <span className="pro-experience-index">
                    {item.id}
                  </span>

                  <span className="pro-experience-icon">
                    <Icon size={22} />
                  </span>
                </div>

                <div className="pro-experience-main">
                  <div className="pro-experience-heading">
                    <div>
                      <p className="pro-experience-type">
                        {item.type}
                      </p>

                      <h3>{item.role}</h3>

                      <p className="pro-experience-company">
                        {item.company}
                      </p>
                    </div>

                    <span className="pro-experience-duration">
                      <CalendarDays size={14} />
                      {item.duration}
                    </span>
                  </div>

                  <ul className="pro-experience-points">
                    {item.points.map((point) => (
                      <li key={point}>
                        <CheckCircle2 size={16} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pro-project-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="pro-project-disclaimer">
          Before publishing, replace "Software House" with the
          verified company name and "Add actual dates" with your
          actual dates. Keep duties accurate to your real work.
        </p>
      </section>

      {/* PROJECTS */}
      <section className="pro-section" id="work">
        <SectionHeading
          eyebrow="SELECTED PROJECTS"
          title="Turning ideas into applications"
          description="Project highlights across full-stack applications, authentication workflows, and frontend experiences."
        />

        <div className="pro-project-grid">
          {projects.map((project) => {
            const Icon = project.icon;

            return (
              <article
                className="pro-project-card"
                key={project.number}
              >
                <div className="pro-project-top">
                  <span className="pro-project-number">
                    {project.number} / 03
                  </span>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.name} project`}
                    className="pro-project-open"
                  >
                    <ExternalLink size={17} />
                  </a>
                </div>

                <div className="pro-project-visual">
                  <div className="pro-project-visual-glow" />

                  <div className="pro-project-preview">
                    <div className="pro-preview-header">
                      <span />
                      <span />
                      <span />

                      <small>
                        {project.name
                          .toLowerCase()
                          .replaceAll(" ", "-")}
                      </small>
                    </div>

                    <div className="pro-preview-body">
                      <div className="pro-preview-symbol">
                        <Icon
                          size={28}
                          strokeWidth={1.6}
                        />
                      </div>

                      <div className="pro-preview-line pro-preview-line-long" />
                      <div className="pro-preview-line pro-preview-line-medium" />

                      <div className="pro-preview-mini-grid">
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pro-project-info">
                  <p className="pro-project-category">
                    {project.category}
                  </p>

                  <h3>{project.name}</h3>

                  <p className="pro-project-description">
                    {project.description}
                  </p>

                  <ul className="pro-project-details">
                    {project.details.map((detail) => (
                      <li key={detail}>
                        <CheckCircle2 size={15} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pro-project-tags">
                    {project.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <a
                    className="pro-project-link"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.linkLabel}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="pro-project-disclaimer">
          Update project links to their actual repositories or live
          demos before publishing. List only features you have
          implemented.
        </p>
      </section>

      {/* CLOUD LEARNING */}
      <section className="pro-section" id="cloud">
        <SectionHeading
          eyebrow="LEARNING & DEVELOPMENT"
          title="Cloud and DevOps journey"
          description="Expanding beyond application development by learning the foundations of Linux, cloud infrastructure, and deployment."
        />

        <div className="pro-cloud-banner">
          <div className="pro-cloud-banner-icon">
            <Cloud size={28} />
          </div>

          <div className="pro-cloud-banner-copy"   >
            <span className="pro-cloud-label">
              CURRENT LEARNING PATH
            </span>

            <h3>
              From full-stack applications to cloud deployment
            </h3>

            <p>
              My goal is to understand how applications are
              configured, deployed, secured, and maintained in real
              environments.
            </p>
          </div>

          <span className="pro-cloud-badge">
            <Sparkles size={14} />
            In progress
          </span>
        </div>

        <div className="pro-cloud-grid">
          {cloudRoadmap.map((item) => {
            const Icon = item.icon;

            return (
              <article
                className="pro-cloud-card"
                key={item.title}
              >
                <div className="pro-cloud-card-top">
                  <span className="pro-cloud-card-icon">
                    <Icon size={21} />
                  </span>

                  <span className="pro-cloud-status">
                    Learning
                  </span>
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* CONTACT */}
      <section className="pro-contact-section" id="contact">
        <div className="pro-contact-pattern" />

        <div className="pro-contact-copy">
          <p className="pro-eyebrow">
            LET'S BUILD SOMETHING VALUABLE
          </p>

          <h2>
            Good work starts
            <br />
            with a <span>conversation.</span>
          </h2>

          <p>
            Interested in a role, collaboration, or an exciting
            project? I'd be glad to hear what you're working on.
          </p>
        </div>

        <div className="pro-contact-actions">
          <a
            href={`mailto:${contactEmail}?subject=${encodeURIComponent(
              "Professional Inquiry"
            )}`}
            className="pro-button pro-button-primary"
          >
            <Send size={16} />
            Get in touch
            <ArrowUpRight size={16} />
          </a>

          <span className="pro-contact-email">
            {contactEmail}
          </span>

          <a
            className="pro-contact-linkedin"
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} />
            Explore GitHub
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pro-footer">
        <Link to="/dashboard" className="pro-brand">
          <span className="pro-brand-mark">
            <Command size={17} />
          </span>

          <span className="pro-brand-name">
            nova<span>space</span>
          </span>
        </Link>

        <p>
          Designed to learn <span>·</span> Built to grow
        </p>

        <a className="pro-back-top" href="#about">
          Back to top
          <ArrowUpRight size={15} />
        </a>
      </footer>
    </main>
  );
}
