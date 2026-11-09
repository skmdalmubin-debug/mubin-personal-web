import { useState } from 'react'
import { ArrowUpRight, Menu, X, Github, Instagram, Mail, Sparkles } from 'lucide-react'

const sections = [
  ['About', 'A little about who I am, what I value, and what I am working towards.'],
  ['Projects', 'Selected work, experiments, and things I am building.'],
  ['Journal', 'Notes, ideas, reflections, and lessons worth keeping.'],
  ['Travel', 'Places, experiences, and stories from the road.'],
  ['Collections', 'Things I find interesting, useful, or worth collecting.'],
  ['Memories', 'A personal archive of moments and milestones.']
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return <main>
    <nav className="nav wrap">
      <a className="brand" href="#"><span className="brand-mark">M</span> MUBIN<span className="brand-dot">.</span></a>
      <div className={`nav-links ${menuOpen ? 'show' : ''}`}>
        {['About','Projects','Journal','Travel','Collections','Memories'].map(x => <a key={x} href={`#${x.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{x}</a>)}
        <a className="nav-contact" href="#contact">Let’s talk <ArrowUpRight size={15}/></a>
      </div>
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
    </nav>

    <section className="hero wrap">
      <div className="eyebrow"><span className="pulse"/> PERSONAL SPACE / 2026</div>
      <h1>Curious mind.<br/><em>Building</em> my own path.</h1>
      <p className="hero-copy">A home for my work, ideas, experiences, and the things I want to remember.</p>
      <div className="hero-actions"><a className="primary-btn" href="#projects">Explore my world <ArrowUpRight size={17}/></a><a className="text-link" href="#about">A little about me <span>↓</span></a></div>
      <div className="hero-index"><span>01 — 06</span><span>SCROLL TO EXPLORE</span></div>
      <div className="hero-orb"><div className="orb-inner">M<span>.</span></div></div>
    </section>

    <section className="intro wrap" id="about">
      <div className="section-kicker">01 / INTRODUCTION</div>
      <div><h2>Not just a portfolio.<br/><span>A living archive.</span></h2><p className="body-copy">This is my corner of the internet — a place to document the journey, share what I create, collect inspiration, and connect with interesting people. More chapters coming soon.</p></div>
    </section>

    <section className="content-section wrap" id="projects">
      <div className="section-heading"><div><div className="section-kicker">02 / THE UNIVERSE</div><h2>Explore the <span>chapters.</span></h2></div><span className="muted">A work in progress, always.</span></div>
      <div className="chapter-grid">{sections.map((s,i)=><a className="chapter" id={s[0].toLowerCase()} href="#contact" key={s[0]}><div className="chapter-top"><span>0{i+1}</span><ArrowUpRight size={18}/></div><h3>{s[0]}</h3><p>{s[1]}</p><div className="chapter-line"/></a>)}</div>
    </section>

    <section className="quote-band"><div className="wrap"><Sparkles size={19}/><p>“The best way to predict the future is to <em>build it.</em>”</p><span>— A reminder to myself</span></div></section>

    <section className="contact wrap" id="contact">
      <div className="section-kicker">03 / GET IN TOUCH</div>
      <h2>Have something<br/>in <span>mind?</span></h2>
      <p className="body-copy">For collaborations, conversations, or just to say hello.</p>
      <form onSubmit={e=>{e.preventDefault();setSent(true)}} className="email-form"><input type="email" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} required/><button type="submit"><ArrowUpRight/></button></form>
      {sent && <small className="success">Thanks — the contact form will be connected to the backend in the next build step.</small>}
    </section>

    <footer className="footer wrap"><a className="brand" href="#"><span className="brand-mark">M</span> MUBIN<span className="brand-dot">.</span></a><span>© 2026 Mubin. Built with intention.</span><div className="socials"><a href="mailto:hello@example.com" aria-label="Email"><Mail size={17}/></a><a href="#" aria-label="Github"><Github size={17}/></a><a href="#" aria-label="Instagram"><Instagram size={17}/></a></div></footer>
  </main>
}