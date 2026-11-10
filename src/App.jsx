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
  const [settings, setSettings] = useState({
    hero_title: "AL MUBIN",
    hero_subtitle: "SIUUU",
    hero_eyebrow: "WELCOME TO THE WORLD",

    hero_image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2200&q=90",

    eyebrow_size: 14,
    eyebrow_color: "#ffffff",
    eyebrow_font: "DM Sans",
    eyebrow_x: 8,
    eyebrow_y: 30,

    title_size: 150,
    title_color: "#ffffff",
    title_font: "Manrope",
    title_x: 8,
    title_y: 45,

    subtitle_size: 24,
    subtitle_color: "#ffffff",
    subtitle_font: "DM Sans",
    subtitle_x: 8,
    subtitle_y: 70,

    intro_heading:
      "Not just a website.\nA little world of my own.",

    intro_description:
      "This is where I bring together the things I experience, the things I collect, the places I discover and the thoughts I want to keep. Take a look around."
  });
  const [homeDevice, setHomeDevice] = useState("desktop");

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;

      if (width <= 600) {
        setHomeDevice("mobile");
      } else if (width <= 1200) {
        setHomeDevice("ipad");
      } else {
        setHomeDevice("desktop");
      }
    };

    detectDevice();

    window.addEventListener("resize", detectDevice);

    return () => {
      window.removeEventListener("resize", detectDevice);
    };
  }, []);

  const getDeviceSetting = (key, fallback) => {
    return (
      settings[`${homeDevice}_${key}`] ??
      settings[key] ??
      fallback
    );
  };
  useEffect(() => {
    let active = true;

    async function loadSettings() {
      if (!supabase) return;

      const { data, error } = await supabase
        .from("site_settings")
        .select("header")
        .eq("id", 1)
        .single();

      if (!active || error || !data?.header) return;

      setSettings((previous) => ({
        ...previous,
        ...data.header
      }));
    }

    loadSettings();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main id="home" style={{ fontFamily: settings.global_body_font || "DM Sans", fontSize: `${settings.global_body_size || 14}px`, "--site-heading-font": settings.global_heading_font || "Manrope" }}>
      <section className="hero">


        <div className="hero-image">
          <img
            src={settings.hero_image}
            alt="Quiet landscape at sunrise"
          />

          <div className="hero-title-wrap">
            <p
              className="eyebrow"
              style={{
                fontFamily: getDeviceSetting("eyebrow_font", "DM Sans"),
                fontSize: `${getDeviceSetting("eyebrow_size", 14)}px`,
                color: getDeviceSetting("eyebrow_color", "#ffffff"),
                position: "absolute",
                left: `${getDeviceSetting("eyebrow_x", 8)}%`,
                top: `${getDeviceSetting("eyebrow_y", 30)}%`
              }}
            >
              {settings.hero_eyebrow ?? "WELCOME TO THE WORLD"}
            </p>


            <h1
              style={{
                fontFamily: getDeviceSetting("title_font", "Manrope"),
                fontSize: `clamp(40px, ${getDeviceSetting("title_size", 150)}px, 210px)`,
                color: getDeviceSetting("title_color", "#ffffff"),
                position: "absolute",
                left: `${getDeviceSetting("title_x", 8)}%`,
                top: `${getDeviceSetting("title_y", 45)}%`
              }}
            >

              {settings.hero_title}

            </h1>


            <p
              style={{
                whiteSpace: "pre-line",
                fontFamily: getDeviceSetting("subtitle_font", "DM Sans"),
                fontSize: `${getDeviceSetting("subtitle_size", 24)}px`,
                color: getDeviceSetting("subtitle_color", "#ffffff"),
                position: "absolute",
                left: `${getDeviceSetting("subtitle_x", 8)}%`,
                top: `${getDeviceSetting("subtitle_y", 70)}%`
              }}
            >

              {settings.hero_subtitle ?? "SIUUU"}
            </p>
          </div>
        </div>
      </section>

      <section className="intro section-pad">
        <p className="eyebrow">A PERSONAL ARCHIVE</p>

        <div className="intro-grid">
          <h2 style={{ whiteSpace: "pre-line" }}>
            {settings.intro_heading}
          </h2>

          <p>{settings.intro_description}</p>
        </div>
      </section>

      <div className="section-heading section-pad">
        <span>EXPLORE MY WORLD</span>
        <span>SCROLL TO DISCOVER ↓</span>
      </div>

      {(Array.isArray(settings.section_content) ? settings.section_content : sections).map((item, index) => (
        <SectionPreview
          key={item.id}
          item={item}
          index={index}
          navigate={navigate}
        />
      ))}

      <section className="contact-band section-pad" id="contact">

                <p className="eyebrow">HAVE SOMETHING TO SAY?</p>

        <div className="contact-row">
          <h2>
            Let's connect<span>.</span>
          </h2>

          <button
            className="round-arrow"
            onClick={() => navigate("contact")}
            aria-label="Open contact page"
          >
            <Arrow diagonal />
          </button>
        </div>

        <p className="contact-small">
          For conversations, collaborations or simply saying hello.
        </p>
      </section>
    </main>
  );
}




function DetailPage({ page, navigate }) {
  const item = sections.find((s) => s.id === page);

  const [savedPage, setSavedPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadPage() {
      setLoading(true);
      setSavedPage(null);

      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("pages")
        .select("title, content")
        .eq("slug", page)
        .eq("status", "published")
        .maybeSingle();

      if (active) {
        if (!error && data) {
          setSavedPage(data);
        }

        setLoading(false);
      }
    }

    if (page === "contact") {
      setLoading(false);
    } else {
      loadPage();
    }

    return () => {
      active = false;
    };
  }, [page]);

  if (page === "contact") {
    return <ContactPage navigate={navigate} />;
  }

  if (loading) {
    return (
      <main className="detail-page">
        <p className="eyebrow">LOADING PAGE</p>
        <h1>Please wait<span>.</span></h1>
      </main>
    );
  }

  const title = savedPage?.title || item?.title || page;
  const body =
    typeof savedPage?.content === "string"
      ? savedPage.content
      : savedPage?.content?.body || "";

  if (!item && !savedPage) {
    return <Home navigate={navigate} />;
  }

  return (
    <main className="detail-page">
      <button
        className="back-link"
        onClick={() => navigate("home")}
      >
        ← BACK TO HOME
      </button>

      <p className="eyebrow">
        {item ? `${item.number} — ${item.eyebrow}` : "PERSONAL"}
      </p>

      <h1>{title}<span>.</span></h1>

      {item && (
        <>
          <p className="detail-lead">{item.description}</p>

          <div className="detail-image">
            <img src={item.image} alt={item.alt} />
          </div>
        </>
      )}

      {savedPage ? (
        <div className="detail-placeholder">
          <p
            className="detail-lead"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {body}
          </p>
        </div>
      ) : (
        <div className="detail-placeholder">
          <p className="eyebrow">THIS SPACE IS BEING BUILT</p>

          <h2>
            {page === "about"
              ? "The story starts here."
              : `More ${title.toLowerCase()}, coming soon.`}
          </h2>

          <p>
            This page is ready for your own writing,
            photographs and content.
          </p>

          <button
            className="text-link"
            onClick={() => navigate("home")}
          >
            Return to homepage <Arrow />
          </button>
        </div>
      )}
    </main>
  );
}



function ContactPage({ navigate, contactEmail = "" }) {
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
    <p className="detail-lead">Have a question, an idea or just want to say hello? Leave a message.{contactEmail && <> You can also email <a href={`mailto:${contactEmail}`}><u>{contactEmail}</u></a>.</>}</p>
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

  async function forgotPassword() {
    if (!supabase) {
      setStatus("Supabase connection is not configured.");
      return;
    }

    if (!email.trim()) {
      setStatus("Please enter your admin email first.");
      return;
    }

    setLoading(true);
    setStatus("Sending reset email...");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: window.location.origin
        }
      );

      if (error) throw error;

      setStatus("Password reset link sent! Check your email.");
    } catch (error) {
      setStatus(error.message || "Could not send reset email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="detail-page">
      <p className="eyebrow">PRIVATE ACCESS</p>
      <h1>Admin<span>.</span></h1>
      <p className="detail-lead">
        Sign in to manage your personal website.
      </p>

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

        <button
          type="button"
          onClick={forgotPassword}
          disabled={loading}
          className="forgot-password"
        >
          Forgot Password?
        </button>

        <button className="submit-button" disabled={loading}>
          {loading ? "PLEASE WAIT..." : "SIGN IN"}
          <Arrow diagonal />
        </button>

        {status && <p className="form-status">{status}</p>}
      </form>
    </main>
  );
}


function ResetPassword({ onDone }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!supabase) return setStatus("Supabase connection is not configured.");
    if (password.length < 8) return setStatus("Use at least 8 characters for your password.");
    if (password !== confirmPassword) return setStatus("Passwords do not match.");
    setLoading(true);
    setStatus("");
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return setStatus(error.message);
    setStatus("Password updated successfully.");
    setTimeout(onDone, 900);
  }

  return <main className="detail-page">
    <p className="eyebrow">ACCOUNT SECURITY</p>
    <h1>New password<span>.</span></h1>
    <p className="detail-lead">Choose a new password for your admin account.</p>
    <form className="contact-form" onSubmit={submit}>
      <label>New password<input type="password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} /></label>
      <label>Confirm password<input type="password" minLength={8} required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /></label>
      <button className="submit-button" disabled={loading}>{loading ? "UPDATING..." : "UPDATE PASSWORD"} <Arrow diagonal /></button>
      {status && <p className="form-status">{status}</p>}
    </form>
  </main>;
}

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorSlug, setEditorSlug] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [editorStatus, setEditorStatus] = useState("draft");

  const [loadingPages, setLoadingPages] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editorMessage, setEditorMessage] = useState("");

  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaUploading, setMediaUploading] = useState(false);
  const [mediaMessage, setMediaMessage] = useState("");

  const [contactMessages, setContactMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesStatus, setMessagesStatus] = useState("");

const [homeSettings, setHomeSettings] = useState({
  hero_title: "AL MUBIN",
  hero_subtitle: "SIUUU",
  hero_eyebrow: "WELCOME TO THE WORLD",

  hero_image:
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2200&q=90",

  eyebrow_size: 14,
  eyebrow_color: "#ffffff",
  eyebrow_font: "DM Sans",
  eyebrow_x: 8,
  eyebrow_y: 30,

  title_size: 150,
  title_color: "#ffffff",
  title_font: "Manrope",
  title_x: 8,
  title_y: 45,

  subtitle_size: 24,
  subtitle_color: "#ffffff",
  subtitle_font: "DM Sans",
  subtitle_x: 8,
  subtitle_y: 70,

  intro_heading: "Not just a website. A little world of my own.",
  intro_description:
    "This is where I bring together the things I experience, the things I collect, the places I discover and the thoughts I want to keep. Take a look around."
});


const [homeEditorDevice, setHomeEditorDevice] = useState("desktop");



const deviceSpecificHomeSettings = [
  "eyebrow_size",
  "eyebrow_color",
  "eyebrow_font",
  "eyebrow_x",
  "eyebrow_y",
  "title_size",
  "title_color",
  "title_font",
  "title_x",
  "title_y",
  "subtitle_size",
  "subtitle_color",
  "subtitle_font",
  "subtitle_x",
  "subtitle_y"
];

const updateHomeSetting = (key, value) => {
  const deviceSpecific = deviceSpecificHomeSettings.includes(key);
  const settingKey = deviceSpecific
    ? `${homeEditorDevice}_${key}`
    : key;

  setHomeSettings((prev) => ({
    ...prev,
    [settingKey]: value
  }));
};

const getHomeSetting = (key, fallback) => {
  return (
    homeSettings[`${homeEditorDevice}_${key}`] ??
    homeSettings[key] ??
    fallback
  );
};


const [homeLoading, setHomeLoading] = useState(false);
const [homeSaving, setHomeSaving] = useState(false);
const [homeMessage, setHomeMessage] = useState("");


 const menuItems = [
  { name: "Overview", icon: "⌂" },
  { name: "Page Editor", icon: "▤" },
  { name: "Home Page Editor", icon: "⌂" },
  { name: "Typography", icon: "T" },
  { name: "Image Editor", icon: "▧" },
  { name: "Media Library", icon: "▦" },
  { name: "Messages", icon: "✉" },
  { name: "Settings", icon: "⚙" }
];

 async function loadHomeSettings() {
  if (!supabase) {
    setHomeMessage("Supabase connection is not configured.");
    return;
  }

  setHomeLoading(true);
  setHomeMessage("");

  const { data, error } = await supabase
    .from("site_settings")
    .select("header")
    .eq("id", 1)
    .single();

  if (error) {
    setHomeMessage(error.message);
  } else if (data && data.header) {
    setHomeSettings((previous) => ({
      ...previous,
      ...data.header
    }));
  }

  setHomeLoading(false);
}

  async function saveHomeSettings() {
  if (!supabase) {
    setHomeMessage("Supabase connection is not configured.");
    return;
  }

  setHomeSaving(true);
  setHomeMessage("");

  const { error } = await supabase
    .from("site_settings")
    .update({
      header: homeSettings
    })
    .eq("id", 1);

  setHomeSaving(false);

  if (error) {
    setHomeMessage(error.message);
    return;
  }

  setHomeMessage("Home page settings saved successfully.");
}
  async function loadMedia() {
    if (!supabase) return setMediaMessage("Supabase connection is not configured.");
    setMediaLoading(true);
    setMediaMessage("");
    const { data, error } = await supabase.storage.from("site-media").list("", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" }
    });
    setMediaLoading(false);
    if (error) return setMediaMessage(error.message);
    setMediaFiles((data || []).filter(file => file.name !== ".emptyFolderPlaceholder"));
  }

  async function uploadMedia(event) {
    const files = Array.from(event.target.files || []);
    if (!files.length || !supabase) return;
    setMediaUploading(true);
    setMediaMessage("");
    let uploaded = 0;
    for (const file of files) {
      const safeName = file.name.trim().replace(/[^a-zA-Z0-9._-]/g, "-");
      const path = `${Date.now()}-${safeName}`;
      const { error } = await supabase.storage.from("site-media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || undefined
      });
      if (error) {
        setMediaMessage(error.message);
        break;
      }
      uploaded += 1;
    }
    setMediaUploading(false);
    if (uploaded) setMediaMessage(`${uploaded} file(s) uploaded successfully.`);
    event.target.value = "";
    await loadMedia();
  }

  async function deleteMedia(fileName) {
    if (!supabase) return;
    if (!window.confirm(`Delete ${fileName}? This cannot be undone.`)) return;
    const { error } = await supabase.storage.from("site-media").remove([fileName]);
    if (error) return setMediaMessage(error.message);
    setMediaMessage("File deleted.");
    await loadMedia();
  }

  function getMediaUrl(fileName) {
    return supabase?.storage.from("site-media").getPublicUrl(fileName)?.data?.publicUrl || "";
  }

  async function loadMessages() {
    if (!supabase) return setMessagesStatus("Supabase connection is not configured.");
    setMessagesLoading(true);
    setMessagesStatus("");
    const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(100);
    setMessagesLoading(false);
    if (error) return setMessagesStatus(error.message);
    setContactMessages(data || []);
  }

  async function deleteMessage(messageId) {
    if (!supabase || !window.confirm("Delete this message permanently?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", messageId);
    if (error) return setMessagesStatus(error.message);
    setMessagesStatus("Message deleted.");
    await loadMessages();
  }

  function updateSection(index, key, value) {
    setHomeSettings(previous => {
      const current = Array.isArray(previous.section_content) ? [...previous.section_content] : sections.map(item => ({ ...item }));
      current[index] = { ...current[index], [key]: value };
      return { ...previous, section_content: current };
    });
  }

  async function loadPages() {
    if (!supabase) {
      setEditorMessage("Supabase connection is not configured.");
      return;
    }

    setLoadingPages(true);
    setEditorMessage("");

    const { data, error } = await supabase
      .from("pages")
      .select("id, title, slug, content, status, sort_order")
      .order("sort_order", { ascending: true });

    setLoadingPages(false);

    if (error) {
      setEditorMessage(error.message);
      return;
    }

    setPages(data || []);
  }

 useEffect(() => {
  if (activeTab === "Overview" || activeTab === "Page Editor") loadPages();
  if (["Home Page Editor", "Typography", "Image Editor", "Settings"].includes(activeTab)) loadHomeSettings();
  if (activeTab === "Media Library") loadMedia();
  if (activeTab === "Messages") loadMessages();
}, [activeTab]);

  function selectPage(page) {
    setSelectedPage(page);
    setEditorTitle(page.title || "");
    setEditorSlug(page.slug || "");
    setEditorContent(
      typeof page.content?.body === "string"
        ? page.content.body
        : ""
    );
    setEditorStatus(page.status || "draft");
    setEditorMessage("");
  }

  function createNewPage() {
    setSelectedPage(null);
    setEditorTitle("");
    setEditorSlug("");
    setEditorContent("");
    setEditorStatus("draft");
    setEditorMessage("Create a new page.");
  }

                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </label>

                <button
                  className="cms-save-button"
                  onClick={savePage}
                  disabled={saving}
                >
                  {saving ? "SAVING..." : "SAVE PAGE ↗"}
                </button>

                {selectedPage && <button type="button" className="cms-delete-button" onClick={deletePage} disabled={saving}>DELETE PAGE</button>}

                {editorMessage && (
                  <p className="cms-editor-message">{editorMessage}</p>
                )}
              </div>
            </div>
          </section>
        )}


{activeTab === "Home Page Editor" && (
  <section className="cms-content">
    <div className="cms-editor-heading">
      <div>
        <p className="cms-eyebrow">HOMEPAGE MANAGEMENT</p>
        <h2>Edit your homepage.</h2>
        <p>Customise every element of your hero section.</p>
      </div>
    </div>

    <div className="home-device-tabs">
      <button
        type="button"
        className={homeEditorDevice === "desktop" ? "active" : ""}
        onClick={() => setHomeEditorDevice("desktop")}
      >
        Desktop
      </button>

      <button
        type="button"
        className={homeEditorDevice === "ipad" ? "active" : ""}
        onClick={() => setHomeEditorDevice("ipad")}
      >
        iPad
      </button>

      <button
        type="button"
        className={homeEditorDevice === "mobile" ? "active" : ""}
        onClick={() => setHomeEditorDevice("mobile")}
      >
        Mobile
      </button>
    </div>

    <div className="cms-edit-panel">
      <div className="cms-list-heading">
        <strong>Hero Background</strong>
        <span>01</span>
      </div>

      <label className="cms-field">Hero Image URL<input type="url" value={homeSettings.hero_image ?? ""} onChange={e => updateHomeSetting("hero_image", e.target.value)} placeholder="https://..." /></label>
      {homeSettings.hero_image && <img className="cms-image-preview" src={homeSettings.hero_image} alt="Hero preview" />}


      <div className="cms-list-heading">
        <strong>Welcome Text</strong>
        <span>02</span>
      </div>

      <label className="cms-field">
        Text
        <input
          value={homeSettings.hero_eyebrow ?? ""}
          onChange={(e) =>
            updateHomeSetting("hero_eyebrow", e.target.value)
          }
        />
      </label>

      <label className="cms-field">
        Font
        <select
          value={getHomeSetting("eyebrow_font", "DM Sans")}
          onChange={(e) =>
            updateHomeSetting("eyebrow_font", e.target.value)
          }
        >
          <option>DM Sans</option>
          <option>Manrope</option>
          <option>Arial</option>
          <option>Georgia</option>
          <option>Playfair Display</option>
        </select>
      </label>

      <label className="cms-field">
        Font Size: {getHomeSetting("eyebrow_size", 14)}px
        <input
          type="range"
          min="10"
          max="60"
          value={getHomeSetting("eyebrow_size", 14)}
          onChange={(e) =>
            updateHomeSetting("eyebrow_size", Number(e.target.value))
          }
        />
      </label>

      <label className="cms-field">
        Text Colour
        <input
          type="color"
          value={getHomeSetting("eyebrow_color", "#ffffff")}
          onChange={(e) =>
            updateHomeSetting("eyebrow_color", e.target.value)
          }
        />
      </label>

      <label className="cms-field">
        Horizontal Position: {getHomeSetting("eyebrow_x", 8)}%
        <input
          type="range"
          min="0"
          max="90"
          value={getHomeSetting("eyebrow_x", 8)}
          onChange={(e) =>
            updateHomeSetting("eyebrow_x", Number(e.target.value))
          }
        />
      </label>

      <label className="cms-field">
        Vertical Position: {getHomeSetting("eyebrow_y", 30)}%
        <input
          type="range"
          min="0"
          max="90"
          value={getHomeSetting("eyebrow_y", 30)}
          onChange={(e) =>
            updateHomeSetting("eyebrow_y", Number(e.target.value))
          }
        />
      </label>


      <div className="cms-list-heading">
        <strong>AL MUBIN Title</strong>
        <span>03</span>
      </div>

      <label className="cms-field">
        Title
        <input
          value={homeSettings.hero_title ?? ""}
          onChange={(e) =>
            updateHomeSetting("hero_title", e.target.value)
          }
        />
      </label>

      <label className="cms-field">
        Font
        <select
          value={getHomeSetting("title_font", "Manrope")}
          onChange={(e) =>
            updateHomeSetting("title_font", e.target.value)
          }
        >
          <option>Manrope</option>
          <option>DM Sans</option>
          <option>Arial</option>
          <option>Georgia</option>
          <option>Playfair Display</option>
        </select>
      </label>

      <label className="cms-field">
        Font Size: {getHomeSetting("title_size", 150)}px
        <input
          type="range"
          min="40"
          max="210"
          value={getHomeSetting("title_size", 150)}
          onChange={(e) =>
            updateHomeSetting("title_size", Number(e.target.value))
          }
        />
      </label>

      <label className="cms-field">
        Text Colour
        <input
          type="color"
          value={getHomeSetting("title_color", "#ffffff")}
          onChange={(e) =>
            updateHomeSetting("title_color", e.target.value)
          }
        />
      </label>

      <label className="cms-field">
        Horizontal Position: {getHomeSetting("title_x", 8)}%
        <input
          type="range"
          min="0"
          max="90"
          value={getHomeSetting("title_x", 8)}
          onChange={(e) =>
            updateHomeSetting("title_x", Number(e.target.value))
          }
        />
      </label>

      <label className="cms-field">
        Vertical Position: {getHomeSetting("title_y", 45)}%
        <input
          type="range"
          min="0"
          max="90"
          value={getHomeSetting("title_y", 45)}
          onChange={(e) =>
            updateHomeSetting("title_y", Number(e.target.value))
          }
        />
      </label>



      <div className="cms-list-heading">
        <strong>SIUUU Subtitle</strong>
        <span>04</span>
      </div>

      <label className="cms-field">
        Subtitle
        <textarea
          rows={3}
          value={homeSettings.hero_subtitle ?? ""}
          onChange={(e) =>
            updateHomeSetting("hero_subtitle", e.target.value)
          }
        />
      </label>

      <label className="cms-field">
        Font
        <select
          value={getHomeSetting("subtitle_font", "DM Sans")}
          onChange={(e) =>
            updateHomeSetting("subtitle_font", e.target.value)
          }
        >
          <option>DM Sans</option>
          <option>Manrope</option>
          <option>Arial</option>
          <option>Georgia</option>
          <option>Playfair Display</option>
        </select>
      </label>

      <label className="cms-field">
        Font Size: {getHomeSetting("subtitle_size", 24)}px
        <input
          type="range"
          min="10"
          max="100"
          value={getHomeSetting("subtitle_size", 24)}
          onChange={(e) =>
            updateHomeSetting("subtitle_size", Number(e.target.value))
          }
        />
      </label>

      <label className="cms-field">
        Text Colour
        <input
          type="color"
          value={getHomeSetting("subtitle_color", "#ffffff")}
          onChange={(e) =>
            updateHomeSetting("subtitle_color", e.target.value)
          }
        />
      </label>

      <label className="cms-field">
        Horizontal Position: {getHomeSetting("subtitle_x", 8)}%
        <input
          type="range"
          min="0"
          max="90"
          value={getHomeSetting("subtitle_x", 8)}
          onChange={(e) =>
            updateHomeSetting("subtitle_x", Number(e.target.value))
          }
        />
      </label>

      <label className="cms-field">
        Vertical Position: {getHomeSetting("subtitle_y", 70)}%
        <input
          type="range"
          min="0"
          max="90"
          value={getHomeSetting("subtitle_y", 70)}
          onChange={(e) =>
            updateHomeSetting("subtitle_y", Number(e.target.value))
          }
        />
      </label>


      <div className="cms-list-heading">
        <strong>Introduction Section</strong>
        <span>05</span>
      </div>

      <label className="cms-field">
        Intro Heading
        <textarea
          rows={3}
          value={homeSettings.intro_heading ?? ""}
          onChange={(e) =>
            updateHomeSetting("intro_heading", e.target.value)
          }
        />
      </label>

      <label className="cms-field">
        Intro Description
        <textarea
          rows={4}
          value={homeSettings.intro_description ?? ""}
          onChange={(e) =>
            updateHomeSetting("intro_description", e.target.value)
          }
        />
      </label>

      <button
        className="cms-save-button"
        onClick={saveHomeSettings}
        disabled={homeSaving || homeLoading}
      >
        {homeLoading
          ? "LOADING..."
          : homeSaving
          ? "SAVING..."
          : "SAVE HOMEPAGE ↗"}
      </button>

      {homeMessage && (
        <p className="cms-editor-message">{homeMessage}</p>
      )}
    </div>
  </section>
)}

{activeTab === "Typography" && (
  <section className="cms-content">
    <div className="cms-editor-heading"><div><p className="cms-eyebrow">DESIGN SYSTEM</p><h2>Typography settings.</h2><p>Set the site-wide heading and body fonts.</p></div></div>
    <div className="cms-edit-panel">
      <label className="cms-field">Heading font<select value={homeSettings.global_heading_font || "Manrope"} onChange={e => setHomeSettings(p => ({...p,global_heading_font:e.target.value}))}>{["Manrope","DM Sans","Arial","Georgia","Playfair Display"].map(x => <option key={x}>{x}</option>)}</select></label>
      <label className="cms-field">Body font<select value={homeSettings.global_body_font || "DM Sans"} onChange={e => setHomeSettings(p => ({...p,global_body_font:e.target.value}))}>{["DM Sans","Manrope","Arial","Georgia","Playfair Display"].map(x => <option key={x}>{x}</option>)}</select></label>
      <label className="cms-field">Base body size: {homeSettings.global_body_size || 14}px<input type="range" min="12" max="22" value={homeSettings.global_body_size || 14} onChange={e => setHomeSettings(p => ({...p,global_body_size:Number(e.target.value)}))}/></label>
      <button className="cms-save-button" onClick={saveHomeSettings} disabled={homeSaving}>{homeSaving ? "SAVING..." : "SAVE TYPOGRAPHY"}</button>
      {homeMessage && <p className="cms-editor-message">{homeMessage}</p>}
    </div>
  </section>
)}

{activeTab === "Image Editor" && (
  <section className="cms-content">
    <div className="cms-editor-heading"><div><p className="cms-eyebrow">VISUAL CONTENT</p><h2>Edit section images.</h2><p>Change the image and alt text for each homepage section.</p></div></div>
    <div className="cms-edit-panel">
      {(homeSettings.section_content || sections).map((item, index) => <div className="cms-image-editor-row" key={item.id || index}>
        <div className="cms-list-heading"><strong>{item.title || `Section ${index+1}`}</strong><span>{String(index+1).padStart(2,"0")}</span></div>
        <label className="cms-field">Image URL<input type="url" value={item.image || ""} onChange={e => updateSection(index,"image",e.target.value)} /></label>
        <label className="cms-field">Alt text<input value={item.alt || ""} onChange={e => updateSection(index,"alt",e.target.value)} /></label>
        {item.image && <img className="cms-image-preview" src={item.image} alt={item.alt || "Section preview"}/ >}
      </div>)}
      <button className="cms-save-button" onClick={saveHomeSettings} disabled={homeSaving}>{homeSaving ? "SAVING..." : "SAVE IMAGES"}</button>
      {homeMessage && <p className="cms-editor-message">{homeMessage}</p>}
    </div>
  </section>
)}

{activeTab === "Media Library" && (
  <section className="cms-content">
    <div className="cms-editor-heading"><div><p className="cms-eyebrow">SUPABASE STORAGE / SITE-MEDIA</p><h2>Your media library.</h2><p>Upload, preview, copy public URLs and delete stored files.</p></div></div>
    <div className="cms-edit-panel">
      <label className="cms-upload-label">{mediaUploading ? "UPLOADING..." : "+ UPLOAD FILES"}<input type="file" multiple accept="image/*,video/*" onChange={uploadMedia} disabled={mediaUploading}/></label>
      <button type="button" className="cms-secondary-button" onClick={loadMedia} disabled={mediaLoading}>{mediaLoading ? "REFRESHING..." : "REFRESH LIBRARY"}</button>
      {mediaMessage && <p className="cms-editor-message">{mediaMessage}</p>}
      {mediaLoading ? <p className="cms-editor-note">Loading files...</p> : mediaFiles.length === 0 ? <p className="cms-editor-note">No files found in site-media.</p> : <div className="cms-media-grid">{mediaFiles.map(file => {
        const url = getMediaUrl(file.name);
        const isImage = /\.(png|jpe?g|gif|webp|svg|avif)$/i.test(file.name);
        return <article className="cms-media-card" key={file.id || file.name}>
          {isImage ? <img src={url} alt={file.name}/> : <div className="cms-media-file">FILE</div>}
          <strong title={file.name}>{file.name}</strong>
          <small>{file.metadata?.size ? `${Math.round(file.metadata.size/1024)} KB` : "Stored file"}</small>
          <button type="button" onClick={() => { navigator.clipboard?.writeText(url); setMediaMessage("Public URL copied."); }}>COPY URL</button>
          <button type="button" className="cms-delete-button" onClick={() => deleteMedia(file.name)}>DELETE</button>
        </article>;
      })}</div>}
    </div>
  </section>
)}

{activeTab === "Messages" && (
  <section className="cms-content">
    <div className="cms-editor-heading"><div><p className="cms-eyebrow">CONTACT INBOX</p><h2>Website messages.</h2><p>Messages submitted through your contact form.</p></div><button className="cms-secondary-button" onClick={loadMessages}>REFRESH</button></div>
    {messagesStatus && <p className="cms-editor-message">{messagesStatus}</p>}
    {messagesLoading ? <p className="cms-editor-note">Loading messages...</p> : contactMessages.length === 0 ? <p className="cms-editor-note">No messages found.</p> : <div className="cms-message-list">{contactMessages.map(message => <article className="cms-message-card" key={message.id}>
      <div className="cms-list-heading"><strong>{message.name || "No name"}</strong><span>{message.created_at ? new Date(message.created_at).toLocaleString() : ""}</span></div>
      <p><a href={`mailto:${message.email}`}>{message.email}</a></p><p>{message.message}</p>
      <button className="cms-delete-button" onClick={() => deleteMessage(message.id)}>DELETE MESSAGE</button>
    </article>)}</div>}
  </section>
)}

{activeTab === "Settings" && (
  <section className="cms-content">
    <div className="cms-editor-heading"><div><p className="cms-eyebrow">SITE CONFIGURATION</p><h2>Website settings.</h2><p>Manage the site identity and footer text.</p></div></div>
    <div className="cms-edit-panel">
      <label className="cms-field">Website name<input value={homeSettings.site_name || "AL MUBIN"} onChange={e => setHomeSettings(p => ({...p,site_name:e.target.value}))}/></label>
      <label className="cms-field">Browser title<input value={homeSettings.site_title || "AL MUBIN — Personal Digital World"} onChange={e => setHomeSettings(p => ({...p,site_title:e.target.value}))}/></label>
      <label className="cms-field">Footer tagline<input value={homeSettings.footer_tagline || "MADE OF MOMENTS & MEANING."} onChange={e => setHomeSettings(p => ({...p,footer_tagline:e.target.value}))}/></label>
      <label className="cms-field">Contact email<input type="email" value={homeSettings.contact_email || ""} onChange={e => setHomeSettings(p => ({...p,contact_email:e.target.value}))} placeholder="hello@example.com"/></label>
      <button className="cms-save-button" onClick={saveHomeSettings} disabled={homeSaving}>{homeSaving ? "SAVING..." : "SAVE SETTINGS"}</button>
      {homeMessage && <p className="cms-editor-message">{homeMessage}</p>}
    </div>
  </section>
)}

      </main>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(
    () => window.location.hash.replace("#", "") || "home"
  );

  const [adminSession, setAdminSession] = useState(null);
  const [adminAuthorized, setAdminAuthorized] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const [siteConfig, setSiteConfig] = useState({});

  useEffect(() => {
    let active = true;
    async function loadSiteConfig() {
      if (!supabase) return;
      const { data } = await supabase.from("site_settings").select("header").eq("id", 1).single();
      if (active && data?.header) setSiteConfig(data.header);
    }
    loadSiteConfig();
    return () => { active = false; };
  }, []);

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
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setPage("reset-password");
        return;
      }

      setAdminSession(session);
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

      setAdminAuthorized(!error && data === true);

      if (error || data !== true) {
        await supabase.auth.signOut();
        setAdminSession(null);
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
        ? (siteConfig.site_title || "AL MUBIN — Personal Digital World")
        : page === "admin"
        ? "Admin — AL MUBIN"
        : `${page[0].toUpperCase() + page.slice(1)} — AL MUBIN`;
  }, [page, siteConfig.site_title]);

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
      ) : page === "contact" ? (
        <ContactPage navigate={navigate} contactEmail={siteConfig.contact_email || ""} />
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
          {(siteConfig.site_name || "AM")}<span>.</span>
        </a>

        <span>© {new Date().getFullYear()} AL MUBIN</span>
        <span>{siteConfig.footer_tagline || "MADE OF MOMENTS & MEANING."}</span>

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
