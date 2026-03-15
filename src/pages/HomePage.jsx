import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  FiZap,
  FiShield,
  FiCode,
  FiCpu,
  FiTarget,
  FiAward,
  FiChevronRight,
  FiArrowRight,
} from 'react-icons/fi';
import MatrixBackground from '../components/MatrixBackground';
import AnimatedCounter from '../components/AnimatedCounter';
import MemberAvatar from '../components/MemberAvatar';
import { teamMembers, teamStats, categoryColors } from '../data/teamData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function TypingText({ texts }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = texts[idx];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          60,
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else {
        setIdx(prev => (prev + 1) % texts.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, idx, texts]);

  return (
    <span className="text-cyber-accent font-mono typing-cursor">
      {displayed}
    </span>
  );
}

function StatCard({ label, value, suffix, icon: Icon, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="relative p-6 bg-cyber-dark/60 border border-white/5 rounded-lg overflow-hidden group hover:border-cyber-accent/30 transition-all duration-300"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${color}08 0%, transparent 60%)`,
        }}
      />
      <div className="flex items-start justify-between mb-3">
        <div
          className="p-2 rounded-md"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <div
          className="w-2 h-2 rounded-full mt-1"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
      <div className="font-display text-3xl font-bold text-white mb-1">
        {inView ? <AnimatedCounter value={value} suffix={suffix} /> : '0'}
      </div>
      <div className="text-xs font-mono text-cyber-muted tracking-wider uppercase">
        {label}
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen hex-bg relative">
      <MatrixBackground density={0.25} />
      <div className="scan-line" />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.12) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-cyber-accent/30 rounded-full bg-cyber-accent/5 mb-8">
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <span className="font-mono text-xs text-cyber-accent/80 tracking-widest">
                ACTIVE — CTFtime Ranked Team
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 tracking-tight leading-none"
          >
            <span
              className="glitch-text"
              data-text="CC10"
              style={{ textShadow: '0 0 40px rgba(0,212,255,0.4)' }}
            >
              CC10
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-body text-cyber-muted mb-4 h-8"
          >
            <TypingText
              texts={[
                'Elite CTF Team',
                'Web Exploitation Specialists',
                'Binary Ninjas',
                'Crypto Breakers',
                'Flag Hunters',
              ]}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-cyber-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A team of four elite hackers competing at the top level of Capture
            the Flag competitions worldwide. We break systems, write exploits,
            and share knowledge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/team" className="btn-cyber group">
              <span className="flex items-center gap-2">
                Meet The Team
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/writeups"
              className="font-mono text-sm tracking-wider uppercase px-6 py-3 border border-white/10 text-cyber-muted hover:text-white hover:border-white/30 transition-all duration-300 rounded-none"
            >
              <span className="flex items-center gap-2">
                <FiTarget size={14} /> View Writeups
              </span>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs text-cyber-muted/50 tracking-widest">
              SCROLL
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-cyber-accent/50 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            <StatCard
              label="CTFs Entered"
              value={teamStats.totalCTFs}
              suffix="+"
              icon={FiShield}
              color="#00d4ff"
            />
            <StatCard
              label="Total Solves"
              value={teamStats.totalSolves}
              suffix=""
              icon={FiZap}
              color="#00ff88"
            />
            <StatCard
              label="Total Points"
              value={teamStats.totalPoints}
              suffix=""
              icon={FiTarget}
              color="#7c3aed"
            />
            <StatCard
              label="Global Rank"
              value={teamStats.globalRank}
              suffix=""
              icon={FiAward}
              color="#ff0080"
            />
            <StatCard
              label="First Bloods"
              value={teamStats.firstBloods}
              suffix=""
              icon={FiCode}
              color="#ffe600"
            />
            <StatCard
              label="Team Members"
              value={4}
              suffix=""
              icon={FiCpu}
              color="#00d4ff"
            />
          </motion.div>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12"
          >
            <motion.div variants={fadeUp} className="section-tag mb-3">
              / 01 — TEAM
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
            >
              The Operatives
            </motion.h2>
            <motion.p variants={fadeUp} className="text-cyber-muted max-w-xl">
              Four specialists. One objective. Take every flag.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teamMembers.map(member => (
              <motion.div key={member.id} variants={fadeUp}>
                <Link
                  to={`/team/${member.id}`}
                  className="block member-card p-6"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <MemberAvatar
                      handle={member.handle}
                      color={member.color}
                      size={100}
                    />
                    <div>
                      <div
                        className="font-display text-lg font-bold mb-1"
                        style={{
                          color: member.color,
                          textShadow: `0 0 15px ${member.color}60`,
                        }}
                      >
                        {member.handle}
                      </div>
                      <div className="text-xs font-mono text-cyber-muted mb-3">
                        {member.role}
                      </div>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {member.favoriteCategories.map(cat => (
                          <span
                            key={cat}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded border ${categoryColors[cat]?.bg || 'bg-white/5'} ${categoryColors[cat]?.text || 'text-white'} ${categoryColors[cat]?.border || 'border-white/10'}`}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="w-full pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs font-mono text-cyber-muted">
                        {member.totalSolves} solves
                      </span>
                      <span
                        className="font-display text-xs font-bold"
                        style={{ color: member.color }}
                      >
                        {member.rank}
                      </span>
                    </div>
                  </div>
                  {/* Hover corner accent */}
                  <div
                    className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                      borderTopColor: `${member.color}40`,
                      borderRightColor: 'transparent',
                    }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Link
              to="/team"
              className="inline-flex items-center gap-2 font-mono text-sm text-cyber-accent hover:text-white transition-colors group"
            >
              View Full Profiles
              <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TOP FINISHES */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12"
          >
            <motion.div variants={fadeUp} className="section-tag mb-3">
              / 02 — ACHIEVEMENTS
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Recent Finishes
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {teamStats.topFinishes.map((finish, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center gap-4 p-4 bg-cyber-dark/60 border border-white/5 rounded-lg hover:border-cyber-accent/20 transition-all duration-300 group"
              >
                <div
                  className="font-display text-2xl font-black w-14 text-right"
                  style={{
                    color:
                      finish.place <= 3
                        ? '#ffe600'
                        : finish.place <= 10
                          ? '#00d4ff'
                          : '#8892a4',
                    textShadow:
                      finish.place <= 3 ? '0 0 15px #ffe60060' : 'none',
                  }}
                >
                  #{finish.place}
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex-1">
                  <div className="font-body font-semibold text-white group-hover:text-cyber-accent transition-colors">
                    {finish.ctf}
                  </div>
                  <div className="text-xs font-mono text-cyber-muted">
                    out of {finish.total.toLocaleString()} teams
                  </div>
                </div>
                <div className="text-xs font-mono text-cyber-muted px-3 py-1 border border-white/10 rounded">
                  Top {((finish.place / finish.total) * 100).toFixed(1)}%
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 bg-cyber-dark/80 border border-cyber-accent/20 rounded-lg overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(0,212,255,0.07) 0%, transparent 70%)',
              }}
            />
            <div className="relative z-10">
              <div className="font-mono text-cyber-accent/60 text-xs tracking-widest mb-4">
                // KNOWLEDGE SHARING
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Read Our Writeups
              </h3>
              <p className="text-cyber-muted mb-8">
                Detailed write-ups for every challenge we've solved. From
                beginner-friendly to expert-level analysis.
              </p>
              <Link to="/writeups" className="btn-cyber inline-block">
                <span className="flex items-center gap-2">
                  <FiTarget size={14} /> Browse Writeups
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-cyber-muted">
            <span className="text-cyber-accent">CC10</span> CTF Team © 2024 —
            Amman, Jordan
          </div>
          <div className="font-mono text-xs text-cyber-muted/50">
            root@cc10:~${' '}
            <span className="text-cyber-accent/70 typing-cursor">_</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
