import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

import GradientButton from '../common/GradientButton';

const links = [
  { label: 'Главная', to: '/' },
  { label: 'Тест', to: '/test' },
  { label: 'Роадмап', to: '/roadmap' },
  { label: 'Клубы', to: '/clubs' },
  { label: 'Инсайты', to: '/insights' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={() => handleNavigate('/')}
            role="button"
          >
            <div className="rounded-2xl bg-cta-gradient px-3 py-2 text-xs font-semibold text-white shadow-glass">
              Meta
            </div>
            <div>
              <p className="font-display text-lg text-brand-dark leading-none">Meta Talent</p>
              <p className="text-[11px] uppercase tracking-[0.4em] text-muted">AI карьерный гид</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-brand-dark font-semibold'
                    : 'transition hover:text-brand-dark/80'
                }
              >
                {link.label}
              </NavLink>
            ))}
            <GradientButton onClick={() => handleNavigate('/test')}>Начать тест</GradientButton>
          </nav>

          <button
            className="rounded-full border border-black/10 p-2 text-brand-dark md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Открыть мобильное меню"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-16 z-20 mx-4 rounded-3xl bg-white p-6 shadow-2xl md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex flex-col gap-4 text-sm font-semibold text-brand-dark">
              {links.map((link) => (
                <button
                  key={link.to}
                  onClick={() => handleNavigate(link.to)}
                  className={
                    location.pathname === link.to ? 'text-brand-primary' : 'text-brand-dark/80'
                  }
                >
                  {link.label}
                </button>
              ))}
              <GradientButton className="w-full" onClick={() => handleNavigate('/test')}>
                Начать тест
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

