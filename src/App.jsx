import React, { useEffect, useState } from "react";
import { supabase } from "./lib.js";

const sections = [
  { id: "about", number: "01", title: "About me", eyebrow: "THE PERSON BEHIND THE NAME", description: "A little about who I am, what I value, and the ideas that keep me moving.", link: "Explore about", image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1400&q=85", alt: "Minimal light and shadow on a plant" },
  { id: "travel", number: "02", title: "Travel", eyebrow: "PLACES & PERSPECTIVES", description: "A growing collection of places, journeys, streets and stories from around the world.", link: "Explore journeys", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=85", alt: "Quiet mountain lake" },
  { id: "collections", number: "03", title: "Collections", eyebrow: "THINGS WORTH KEEPING", description: "Coins, banknotes, fragrances, watches and the small details behind each collection.", link: "View collections", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1400&q=85", alt: "Carefully arranged objects" },
  { id: "achievements", number: "04", title: "Achievements", eyebrow: "MILESTONES & PROGRESS", description: "Certificates, milestones and moments that mark the work behind the progress.", link: "See achievements", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85", alt: "Notebook and desk" },
  { id: "memories", number: "05", title: "Memories", eyebrow: "MOMENTS, PRESERVED", description: "Photographs, videos and albums from the moments I want to remember.", link: "Open memories", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85", alt: "Open landscape" },
  { id: "journal", number: "06", title: "Journal", eyebrow: "NOTES FROM MY WORLD", description: "Thoughts, reflections, observations and stories — written in my own time.", link: "Read the journal", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85", alt: "Writing desk" }
];

function Arrow({ diagonal = false }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function Header({ active, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <a className="wordmark" href="#home" onClick={(e) => { e.preventDefault(); navigate("home"); }}>AM<span>.</span></a>
    <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? "CLOSE" : "MENU"} <span>{menuOpen ? "−" : "+"}</span></button>
    <nav className={menuOpen ? "main-nav open" : "main-nav"}>
      <a className={active === "home" ? "nav-active" : ""} href="#home" onClick={(e) => { e.preventDefault(); navigate("home"); setMenuOpen(false); }}>Home</a>
      <a href="#about" onClick={(e) => { e.preventDefault(); navigate("about"); setMenuOpen(false); }}>About</a>
      <a href="#travel" onClick={(e) => { e.preventDefault(); navigate("travel"); setMenuOpen(false); }}>Explore</a>
      <a href="#contact" onClick={(e) => { e.preventDefault(); navigate("contact"); setMenuOpen(false); }}>Contact</a>
    </nav>
    <span className="header-note">PERSONAL DIGITAL WORLD</span>
  </header>;
}

function SectionPreview({ item, index, navigate }) {
  return <section className={`preview preview-${index % 2 === 0 ? "image-left" : "image-right"}`} id={item.id}>
    <div className="preview-image-wrap">
      <img src={item.image} alt={item.alt} className="preview-image" loading="lazy" />
      <span className="image-index">{item.number} / 06</span>
    </div>
    <div className="preview-copy">
      <p className="eyebrow">{item.eyebrow}</p>
      <h2>{item.title}<span>.</span></h2>
      <p className="preview-description">{item.description}</p>
      <button className="text-link" onClick={() => navigate(item.id)}>{item.link} <Arrow diagonal /></button>
    </div>
  </section>;
}

function Home({ navigate }) {
  return <main id="home">
    <section className="hero">
      <div className="hero-topline">
        <span>INDEPENDENTLY CURATED</span>
        <span>DHAKA, BANGLADESH</span>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2200&q=90"
          alt="Quiet landscape at sunrise"
        />

        <div className="hero-title-wrap">
          <p className="eyebrow">WELCOME TO MY WORLD</p>
          <h1>AL MUBIN<span>.</span></h1>

          <div className="hero-bottom">
            <p>
              A collection of places, passions, memories<br className="desktop-break" />
              and moments that shape my journey.
            </p>
            <a className="circle-link" href="#about" aria-label="Scroll to discover">
              <span>SCROLL<br />TO EXPLORE</span>
              <b>↓</b>
            </a>
          </div>
        </div>

        <div className="hero-image-caption">
          <span>01 — A WORLD IN PROGRESS</span>
          <span>SCROLL TO DISCOVER</span>
        </div>
      </div>
    </section>

    <section className="intro section-pad">
      <p className="eyebrow">A PERSONAL ARCHIVE</p>
      <div className="intro-grid">
        <h2>Not just a website.<br/><span>A little world of my own.</span></h2>
        <p>This is where I bring together the things I experience, the things I collect, the places I discover and the thoughts I want to keep. Take a look around.</p>
      </div>
    </section>

    <div className="section-heading section-pad">
      <span>EXPLORE MY WORLD</span>
      <span>SCROLL TO DISCOVER ↓</span>
    </div>

    {sections.map((item, index) => (
      <SectionPreview key={item.id} item={item} index={index} navigate={navigate} />
    ))}

    <section className="contact-band section-pad" id="contact">
      <p className="eyebrow">HAVE SOMETHING TO SAY?</p>
      <div className="contact-row">
        <h2>Let's connect<span>.</span></h2>
        <button className="round-arrow" onClick={() => navigate("contact")} aria-label="Open contact page">
          <Arrow diagonal />
        </button>
      </div>
      <p className="contact-small">For conversations, collaborations or simply saying hello.</p>
    </section>
  </main>;
}

function DetailPage({ page, navigate }) {
  const item = sections.find(s => s.id === page);
  if (page === "contact") return <ContactPage navigate={navigate} />;
  if (!item) return <Home navigate={navigate} />;
  return <main className="detail-page">
    <button className="back-link" onClick={() => navigate("home")}>← BACK TO HOME</button>
    <p className="eyebrow">{item.number} — {item.eyebrow}</p>
    <h1>{item.title}<span>.</span></h1>
    <p className="detail-lead">{item.description}</p>
    <div className="detail-image"><img src={item.image} alt={item.alt}/></div>
    <div className="detail-placeholder">
      <p className="eyebrow">THIS SPACE IS BEING BUILT</p>
      <h2>{page === "about" ? "The story starts here." : `More ${item.title.toLowerCase()}, coming soon.`}</h2>
      <p>This page is ready for your own writing, photographs and content. The next step is connecting the editing dashboard so you can manage everything yourself.</p>
      <button className="text-link" onClick={() => navigate("home")}>Return to homepage <Arrow /></button>
    </div>
  </main>;
}

function ContactPage({ navigate }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  async function submit(e) {
    e.preventDefault();
    if (!supabase) { setStatus("Contact form will be activated when the Supabase connection is configured."); return; }
    setSending(true); setStatus("");
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: form.name, email: form.email, message: form.message
      });
      if (error) throw error;
      setStatus("Thank you. Your message has been sent.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) { setStatus("Message could not be sent. Please try again later."); }
    finally { setSending(false); }
  }
  return <main className="detail-page contact-page">
    <button className="back-link" onClick={() => navigate("home")}>← BACK TO HOME</button>
    <p className="eyebrow">LET'S START A CONVERSATION</p>
    <h1>Contact<span>.</span></h1>
    <p className="detail-lead">Have a question, an idea or just want to say hello? Leave a message.</p>
    <form className="contact-form" onSubmit={submit}>
      <label>Your name<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Name"/></label>
      <label>Email address<input required type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="you@example.com"/></label>
      <label>Your message<textarea required rows="5" value={form.message} onChange={e => setForm({...form, message:e.target.value})} placeholder="Write something..."/></label>
      <button className="submit-button" disabled={sending}>{sending ? "SENDING..." : "SEND MESSAGE"} <Arrow diagonal /></button>
      {status && <p className="form-status">{status}</p>}
    </form>
  </main>;
}
function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if (!supabase) {
      setStatus("Supabase connection is not configured.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      const { data: isOwner, error: ownerError } =
        await supabase.rpc("is_site_owner");

      if (ownerError) throw ownerError;

      if (!isOwner) {
        await supabase.auth.signOut();
        throw new Error("You are not authorized to access this dashboard.");
      }

      onLogin(data.session);
    } catch (error) {
      setStatus(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="detail-page">
      <p className="eyebrow">PRIVATE ACCESS</p>
      <h1>Admin<span>.</span></h1>
      <p className="detail-lead">Sign in to manage your personal website.</p>

      <form className="contact-form" onSubmit={submit}>
        <label>
          Email address
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your admin email"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </label>

        <button className="submit-button" disabled={loading}>
          {loading ? "VERIFYING..." : "SIGN IN"}
          <Arrow diagonal />
        </button>

        {status && <p className="form-status">{status}</p>}
      </form>
    </main>
  );
}

function AdminDashboard({ onLogout }) {
  return (
    <main className="detail-page">
      <p className="eyebrow">PRIVATE ADMINISTRATION</p>
      <h1>Dashboard<span>.</span></h1>
      <p className="detail-lead">
        Welcome. Your website management space is ready.
      </p>

      <button className="submit-button" onClick={onLogout}>
        SIGN OUT <Arrow diagonal />
      </button>
    </main>
  );
}
function ResetPassword({ onDone }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const { error } = await supabase.auth.updateUser({
      password
    });

    setLoading(false);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Password updated successfully!");
    onDone();
  }

  return (
    <main className="detail-page">
      <p className="eyebrow">SECURE ACCESS</p>
      <h1>New Password<span>.</span></h1>
      <form className="contact-form" onSubmit={submit}>
        <label>
          New Password
          <input
            type="password"
            minLength={8}
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </label>
        <button className="submit-button" disabled={loading}>
          {loading ? "UPDATING..." : "UPDATE PASSWORD"}
        </button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </main>
  );
}
export default function App() {
  const [page, setPage] = useState(
    () => window.location.hash.replace("#", "") || "home"
  );

  const [adminSession, setAdminSession] = useState(null);
  const [adminAuthorized, setAdminAuthorized] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);

  function navigate(next) {
    setPage(next);

    if (next === "home") {
      history.pushState(null, "", window.location.pathname);
    } else {
      history.pushState(null, "", `#${next}`);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    if (!supabase) {
      setAdminChecked(true);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active) setAdminSession(data.session);
    });

    const {
      data } = supabase.auth.onAuthStateChange((event, session) => {
  setAdminSession(session);

  if (event === "PASSWORD_RECOVERY") {
    setPage("reset-password");
  }
});

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function verifyOwner() {
      if (!adminSession || !supabase) {
        setAdminAuthorized(false);
        setAdminChecked(true);
        return;
      }

      setAdminChecked(false);

      const { data, error } = await supabase.rpc("is_site_owner");

      if (!active) return;

      if (error || data !== true) {
        setAdminAuthorized(false);
        await supabase.auth.signOut();
      } else {
        setAdminAuthorized(true);
      }

      setAdminChecked(true);
    }

    verifyOwner();

    return () => {
      active = false;
    };
  }, [adminSession]);

  useEffect(() => {
    const onPop = () => {
      setPage(window.location.hash.replace("#", "") || "home");
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", onPop);

    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.title =
      page === "home"
        ? "AL MUBIN — Personal Digital World"
        : page === "admin"
        ? "Admin — AL MUBIN"
        : `${page[0].toUpperCase() + page.slice(1)} — AL MUBIN`;
  }, [page]);

  async function logout() {
    await supabase.auth.signOut();
    setAdminSession(null);
    setAdminAuthorized(false);
    navigate("admin");
  }

  return (
    <>
      <Header active={page} navigate={navigate} />

   {page === "reset-password" ? (
  <ResetPassword onDone={() => navigate("admin")} />
) : page === "admin" ? (
        !adminChecked ? (
          <main className="detail-page">
            <p className="eyebrow">SECURE ACCESS</p>
            <h1>Verifying<span>.</span></h1>
          </main>
        ) : adminAuthorized && adminSession ? (
          <AdminDashboard onLogout={logout} />
        ) : (
          <AdminLogin onLogin={setAdminSession} />
        )
      ) : page === "home" ? (
        <Home navigate={navigate} />
      ) : (
        <DetailPage page={page} navigate={navigate} />
      )}

      <footer className="site-footer">
        <a
          className="footer-mark"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("home");
          }}
        >
          AM<span>.</span>
        </a>

        <span>© {new Date().getFullYear()} AL MUBIN</span>
        <span>MADE OF MOMENTS & MEANING.</span>

        <button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          BACK TO TOP ↑
        </button>
      </footer>
    </>
  );
}
