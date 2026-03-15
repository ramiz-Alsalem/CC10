import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiMapPin,
  FiCalendar,
  FiGithub,
  FiTwitter,
  FiExternalLink,
  FiTarget,
  FiAward,
  FiZap,
} from 'react-icons/fi';
import MemberAvatar from '../components/MemberAvatar';
import { teamMembers, categoryColors, writeups } from '../data/teamData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
};

function SkillBar({ skill, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
      className="space-y-1.5"
    >
      <div className="flex justify-between">
        <span className="text-sm font-mono text-white/70">{skill.name}</span>
        <span className="text-sm font-mono font-bold" style={{ color }}>
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{
            delay: 0.5 + index * 0.1,
            duration: 1.2,
            ease: 'easeOut',
          }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${color}50, ${color})` }}
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              animation: 'shimmer 2s infinite',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function MemberPage() {
  const { memberId } = useParams();
  const member = teamMembers.find(m => m.id === memberId);

  if (!member) return <Navigate to="/team" replace />;

  const memberWriteups = writeups.filter(w => w.authorId === member.id);

  const allMembers = teamMembers;
  const currentIdx = allMembers.findIndex(m => m.id === member.id);
  const nextMember = allMembers[(currentIdx + 1) % allMembers.length];

  return (
    <div className="min-h-screen relative" style={{ background: '#050810' }}>
      {/* Ambient background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 70% 20%, ${member.color}08 0%, transparent 60%)`,
        }}
      />

      {/* Animated grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `linear-gradient(${member.color}08 1px, transparent 1px), linear-gradient(90deg, ${member.color}08 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Back button */}
      <div className="relative z-10 pt-24 px-6 max-w-6xl mx-auto">
        <Link
          to="/team"
          className="inline-flex items-center gap-2 font-mono text-sm text-cyber-muted hover:text-white transition-colors group mb-12"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Team
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative p-8 rounded-xl border text-center overflow-hidden"
              style={{
                background: `linear-gradient(160deg, ${member.secondaryColor}50 0%, rgba(10,15,30,0.95) 100%)`,
                borderColor: `${member.color}40`,
                boxShadow: `0 0 40px ${member.color}15`,
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background: `linear-gradient(90deg, transparent, ${member.color}, transparent)`,
                }}
              />

              <div className="flex justify-center mb-6">
                <MemberAvatar
                  handle={member.handle}
                  color={member.color}
                  size={130}
                  animated
                />
              </div>

              <h1
                className="font-display text-3xl font-black mb-1"
                style={{
                  color: member.color,
                  textShadow: `0 0 25px ${member.color}60`,
                }}
              >
                {member.handle}
              </h1>
              <div className="text-white/60 font-body mb-1">
                {member.realName}
              </div>
              <div
                className="font-mono text-xs tracking-wider mb-6"
                style={{ color: `${member.color}80` }}
              >
                {member.role}
              </div>

              <blockquote
                className="text-sm text-cyber-muted italic border-l-2 pl-3 text-left mb-6"
                style={{ borderColor: member.color }}
              >
                "{member.quote}"
              </blockquote>

              {/* Meta */}
              <div className="space-y-2 text-left text-sm font-mono text-cyber-muted mb-6">
                <div className="flex items-center gap-2">
                  <FiMapPin size={13} style={{ color: member.color }} />
                  {member.location}
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar size={13} style={{ color: member.color }} />
                  Member since {member.joined}
                </div>
              </div>

              {/* Social links */}
              <div className="flex justify-center gap-3">
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg border border-white/10 text-cyber-muted hover:text-white hover:border-white/30 transition-all"
                  >
                    <FiGithub size={16} />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg border border-white/10 text-cyber-muted hover:text-white hover:border-white/30 transition-all"
                  >
                    <FiTwitter size={16} />
                  </a>
                )}
                {member.social.ctftime && (
                  <a
                    href={member.social.ctftime}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg border border-white/10 text-cyber-muted hover:text-white hover:border-white/30 transition-all"
                  >
                    <FiExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { label: 'Solves', value: member.totalSolves, icon: FiZap },
                { label: 'Rank', value: member.rank, icon: FiAward },
                { label: 'WUs', value: memberWriteups.length, icon: FiTarget },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="p-4 rounded-lg border border-white/5 bg-cyber-dark/60 text-center"
                >
                  <Icon
                    size={14}
                    className="mx-auto mb-1"
                    style={{ color: member.color }}
                  />
                  <div className="font-display text-xl font-bold text-white">
                    {value}
                  </div>
                  <div className="text-xs font-mono text-cyber-muted">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="p-5 rounded-xl border border-white/5 bg-cyber-dark/60"
            >
              <div className="font-mono text-xs tracking-widest text-cyber-muted/60 mb-4 uppercase">
                Badges
              </div>
              <div className="flex flex-wrap gap-2">
                {member.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 hover:border-white/20 transition-colors"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="p-6 rounded-xl border border-white/5 bg-cyber-dark/60"
            >
              <div
                className="font-mono text-xs tracking-widest mb-4"
                style={{ color: member.color }}
              >
                // ABOUT
              </div>
              <p className="text-white/70 leading-relaxed">{member.bio}</p>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-6 rounded-xl border border-white/5 bg-cyber-dark/60"
            >
              <div
                className="font-mono text-xs tracking-widest mb-6"
                style={{ color: member.color }}
              >
                // SKILLS
              </div>
              <div className="space-y-4">
                {member.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={member.color}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="p-6 rounded-xl border border-white/5 bg-cyber-dark/60"
            >
              <div
                className="font-mono text-xs tracking-widest mb-6"
                style={{ color: member.color }}
              >
                // ACHIEVEMENTS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {member.achievements.map((ach, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg border border-white/5 bg-white/2 hover:border-white/10 transition-colors"
                  >
                    <div className="text-2xl mb-2">{ach.icon}</div>
                    <div className="font-body font-semibold text-white text-sm mb-1">
                      {ach.title}
                    </div>
                    <div className="text-xs text-cyber-muted">{ach.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Writeups by this member */}
            {memberWriteups.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="p-6 rounded-xl border border-white/5 bg-cyber-dark/60"
              >
                <div
                  className="font-mono text-xs tracking-widest mb-6 flex items-center justify-between"
                  style={{ color: member.color }}
                >
                  // WRITEUPS
                  <Link
                    to="/writeups"
                    className="text-cyber-muted hover:text-white transition-colors flex items-center gap-1"
                  >
                    View all <FiArrowLeft className="rotate-180" size={11} />
                  </Link>
                </div>
                <div className="space-y-3">
                  {memberWriteups.map(wu => (
                    <div
                      key={wu.id}
                      className="flex items-center gap-4 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="text-lg">
                        {wu.firstBlood ? '🩸' : '🚩'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-body font-medium text-white truncate">
                          {wu.title}
                        </div>
                        <div className="text-xs font-mono text-cyber-muted">
                          {wu.ctfName}
                        </div>
                      </div>
                      <div className="text-xs font-mono text-cyber-muted">
                        {wu.category}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Next member teaser */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link
                to={`/team/${nextMember.id}`}
                className="flex items-center justify-between p-5 rounded-xl border border-white/5 bg-cyber-dark/40 hover:border-white/10 transition-all group"
              >
                <div className="font-mono text-xs text-cyber-muted">
                  Next Operative
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div
                      className="font-display font-bold text-white"
                      style={{ color: nextMember.color }}
                    >
                      {nextMember.handle}
                    </div>
                    <div className="text-xs font-mono text-cyber-muted">
                      {nextMember.role}
                    </div>
                  </div>
                  <MemberAvatar
                    handle={nextMember.handle}
                    color={nextMember.color}
                    size={50}
                    animated={false}
                  />
                  <FiArrowLeft className="rotate-180 text-cyber-muted group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
}
