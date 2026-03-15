import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiExternalLink } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';

const GITHUB_OWNER = 'ramiz-Alsalem';
const GITHUB_REPO = 'Writeups';
const GITHUB_DIR = 'writeups';

function WriteupCard({ file, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="writeup-card group"
    >
      <div className="p-6">
        <h3 className="font-body font-semibold text-white mb-2 group-hover:text-cyber-accent transition-colors">
          {file.name.replace('.md', '').replace('.pdf', '')}
        </h3>

        <div className="text-xs font-mono text-cyber-muted mb-4">
          {file.path}
        </div>

        <a
          href={file.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs font-mono text-cyber-accent hover:text-white transition-colors"
        >
          Open Writeup <FiExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
}

export default function WriteupsPage() {
  const [search, setSearch] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchWriteups() {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_DIR}`,
        );

        const data = await res.json();

        const filtered = data.filter(
          f =>
            f.type === 'file' &&
            (f.name.endsWith('.md') ||
              f.name.endsWith('.pdf') ||
              f.name.endsWith('.txt')),
        );

        setFiles(filtered);
      } catch (err) {
        console.error('GitHub fetch failed:', err);
      }
    }

    fetchWriteups();
  }, []);

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen hex-bg relative">
      {/* Header */}
      <div className="relative pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="section-tag mb-3">/ WRITEUPS</div>

          <h1 className="font-display text-5xl md:text-7xl font-black text-white mb-3">
            Flag
            <span
              className="text-cyber-green"
              style={{ textShadow: '0 0 30px rgba(0,255,136,0.5)' }}
            >
              Diary
            </span>
          </h1>

          <p className="text-cyber-muted max-w-xl">
            Writeups automatically synced from GitHub.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="sticky top-16 z-30 bg-cyber-black/80 backdrop-blur-lg border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted"
              size={15}
            />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search writeups..."
              className="w-full bg-cyber-dark/60 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white font-mono placeholder:text-white/20 focus:border-cyber-accent/40 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Writeup Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <div className="font-mono text-sm text-cyber-muted mb-6">
          <span className="text-white font-bold">{filteredFiles.length}</span>{' '}
          files found
        </div>

        {filteredFiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredFiles.map((file, i) => (
              <WriteupCard key={file.sha} file={file} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="text-4xl mb-4">🚩</div>
            <div className="font-display text-xl font-bold text-white/30 mb-2">
              No writeups found
            </div>
          </div>
        )}
      </div>

      {/* GitHub Banner */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <div className="p-6 rounded-xl border border-cyber-green/20 bg-cyber-green/5 flex items-center gap-4">
          <SiGithub size={32} className="text-cyber-green flex-shrink-0" />

          <div className="flex-1">
            <div className="font-body font-semibold text-white mb-1">
              Synced with GitHub
            </div>

            <div className="text-sm text-cyber-muted">
              Any file pushed to the repository automatically appears here.
            </div>
          </div>

          <a
            href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-cyber-green border border-cyber-green/30 px-4 py-2 rounded hover:bg-cyber-green/10 transition-colors"
          >
            View Repo <FiExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
