import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import MemberAvatar from '../components/MemberAvatar';
import { teamMembers, categoryColors } from '../data/teamData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: i => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function TeamPage() {
  return (
    <div className="min-h-screen hex-bg relative">
      {/* Header */}
      <div className="relative pt-32 pb-16 px-6 text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.1) 0%, transparent 60%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="section-tag mb-3">/ THE TEAM</div>
          <h1 className="font-display text-5xl md:text-7xl font-black text-white mb-4">
            Our Operatives
          </h1>
          <p className="text-cyber-muted max-w-2xl mx-auto">
            Four specialists, each a master of their domain. Together,
            unstoppable.
          </p>
        </motion.div>
      </div>

      {/* Members */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.id}
            custom={i}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <Link to={`/team/${member.id}`} className="block">
              <div
                className="relative overflow-hidden rounded-xl border transition-all duration-500 group cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${member.secondaryColor}40 0%, rgba(10,15,30,0.95) 60%)`,
                  borderColor: `${member.color}30`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${member.color}80`;
                  e.currentTarget.style.boxShadow = `0 0 40px ${member.color}15, 0 25px 60px rgba(0,0,0,0.4)`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${member.color}30`;
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Top accent bar */}
                <div
                  className="h-0.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${member.color}, transparent)`,
                  }}
                />

                <div className="p-8 flex gap-8">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <MemberAvatar
                      handle={member.handle}
                      color={member.color}
                      size={110}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3
                          className="font-display text-2xl font-bold mb-0.5"
                          style={{
                            color: member.color,
                            textShadow: `0 0 20px ${member.color}50`,
                          }}
                        >
                          {member.handle}
                        </h3>
                        <div className="text-sm text-white/70 font-body">
                          {member.realName}
                        </div>
                      </div>
                      <div className="font-display text-lg font-black text-white/30">
                        {member.rank}
                      </div>
                    </div>

                    <div
                      className="font-mono text-xs tracking-wider mb-4"
                      style={{ color: `${member.color}90` }}
                    >
                      {member.role}
                    </div>

                    <p className="text-sm text-cyber-muted leading-relaxed mb-4 line-clamp-2">
                      {member.bio}
                    </p>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.favoriteCategories.map(cat => (
                        <span
                          key={cat}
                          className={`text-[11px] font-mono px-2 py-1 rounded border ${categoryColors[cat]?.bg || 'bg-white/5'} ${categoryColors[cat]?.text || 'text-white'} ${categoryColors[cat]?.border || 'border-white/10'}`}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Skills preview */}
                    <div className="space-y-1.5">
                      {member.skills.slice(0, 3).map(skill => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-3"
                        >
                          <div className="text-xs font-mono text-cyber-muted w-28 truncate">
                            {skill.name}
                          </div>
                          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${skill.level}%`,
                                background: `linear-gradient(90deg, ${member.color}60, ${member.color})`,
                              }}
                            />
                          </div>
                          <div
                            className="text-xs font-mono"
                            style={{ color: member.color }}
                          >
                            {skill.level}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="px-8 pb-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="font-display text-xl font-bold text-white">
                        {member.totalSolves}
                      </div>
                      <div className="text-xs font-mono text-cyber-muted">
                        Solves
                      </div>
                    </div>
                    <div>
                      <div className="font-display text-xl font-bold text-white">
                        {member.joined}
                      </div>
                      <div className="text-xs font-mono text-cyber-muted">
                        Joined
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-1">
                        {member.badges.slice(0, 2).map((badge, bi) => (
                          <span key={bi} className="text-sm">
                            {badge.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs font-mono text-cyber-muted">
                        Badges
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2 font-mono text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                    style={{ color: member.color }}
                  >
                    View Profile
                    <FiArrowRight size={12} />
                  </div>
                </div>

                {/* Corner hex decoration */}
                <svg
                  className="absolute bottom-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                  width="150"
                  height="150"
                  viewBox="0 0 120 120"
                  style={{ color: member.color }}
                >
                  <polygon
                    points="60,5 115,32 115,88 60,115 5,88 5,32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <polygon
                    points="60,20 100,40 100,80 60,100 20,80 20,40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
