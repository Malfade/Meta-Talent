import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlayCircle } from 'react-icons/fi';

import GradientButton from '../components/common/GradientButton';
import SectionHeading from '../components/common/SectionHeading';
import { careers, clubs, teamProfiles, testimonials } from '../data/mockContent';

const highlights = [
  { label: '5 ролей', value: 'AI карьер-гайд' },
  { label: 'Роадмапы', value: 'с интерактивом' },
  { label: 'Комьюнити', value: 'клубы Бишкек' },
];

const onboardingSteps = [
  {
    title: 'Пройди мини-тест',
    description: 'Ответь на 6 вопросов и посмотри процент попадания в роль.',
  },
  {
    title: 'Получай персональный план',
    description: 'Листай карточки, открывай модалки с материалами и стартуй обучение.',
  },
  {
    title: 'Запишись в клуб',
    description: 'Выбери клуб в Бишкеке или онлайн. Кнопка “Присоединиться” показывает анимацию.',
  },
];

const Landing = () => {
  const [activeUsers, setActiveUsers] = useState(432);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mx-auto max-w-6xl space-y-16 px-4 pb-20 pt-10 sm:px-6 lg:px-0">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-8">
          <p className="rounded-full bg-white/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-muted">
            Meta Talent · MVP
          </p>
          <motion.h1
            className="font-display text-4xl leading-tight text-brand-dark md:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Найди свою профессию с ИИ
          </motion.h1>
          <p className="text-lg text-muted">
            Пройди экспресс-тест, получи персональный роадмап и присоединяйся к offline/online клубам Meta Talent. Всё
            в одном мобильном интерфейсе.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/test">
              <GradientButton>
                Начать тест <FiArrowRight />
              </GradientButton>
            </Link>
            <Link to="/roadmap">
              <GradientButton soft className="text-brand-dark">
                Смотреть роадмап <FiPlayCircle />
              </GradientButton>
            </Link>
          </div>
          <div className="flex snap-x gap-4 overflow-x-auto sm:grid sm:grid-cols-2 sm:overflow-visible">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="min-w-[220px] rounded-2xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur sm:min-w-0"
              >
                <p className="text-xs text-muted">{item.label}</p>
                <p className="text-sm font-semibold text-brand-dark">{item.value}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-brand-primary/10 bg-brand-surface px-4 py-3">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Live online</p>
              <p className="text-2xl font-semibold text-brand-dark">{activeUsers}+ участников</p>
              <p className="text-xs text-muted">сейчас в Meta Talent</p>
            </div>
          </div>
        </div>

        <motion.div
          className="relative rounded-[32px] border border-white/20 bg-gradient-to-br from-brand-dark/90 via-brand-dark/70 to-brand-primary/70 p-6 text-white shadow-glass backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute -right-4 top-10 hidden rounded-full bg-white/20 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/80 sm:block">
            Mobile First
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">Онбординг</p>
              <p className="text-2xl font-semibold">Meta Talent Test</p>
            </div>
            <div className="space-y-4">
              {careers.slice(0, 3).map((career) => (
                <motion.div
                  key={career.id}
                  className="rounded-2xl bg-white/15 p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">{career.title}</p>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs">{career.match}% match</span>
                  </div>
                  <p className="mt-2 text-sm text-white/80">{career.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/20 p-4">
              <p className="text-xs uppercase text-white/60">Клубы в Бишкеке</p>
              <p className="text-lg font-semibold">{clubs.length} событий каждую неделю</p>
              <p className="text-sm text-white/80">Врывайся в комьюнити Meta Talent.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="rounded-[32px] bg-white/80 p-6 shadow-lg md:p-10">
        <SectionHeading
          align="center"
          eyebrow="онбординг за 3 шага"
          title="Тест · Роадмап · Комьюнити"
          description="Мобильный UX с плавными свайпами, поясняющими карточками и живыми анимациями дает ощущение настоящего приложения."
        />
        <div className="mt-10 flex snap-x gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {onboardingSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="min-w-[240px] rounded-3xl border border-brand-primary/10 bg-brand-surface p-5 md:min-w-0"
              whileHover={{ y: -4 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cta-gradient text-white shadow-lg">
                0{index + 1}
              </div>
              <p className="text-base font-semibold text-brand-dark">{step.title}</p>
              <p className="text-sm text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-brand-primary/15 bg-white/90 p-6 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Отзывы</p>
            <div className="mt-4 flex snap-x gap-4 overflow-x-auto">
              {testimonials.map((item) => (
                <motion.div
                  key={item.id}
                  className="min-w-[240px] rounded-3xl border border-brand-primary/10 bg-brand-surface p-4"
                  whileHover={{ y: -4 }}
                >
                  <div
                    className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-brand-dark"
                    style={{ background: item.avatarColor }}
                  >
                    {item.name[0]}
                  </div>
                  <p className="text-sm italic text-muted">“{item.quote}”</p>
                  <p className="mt-3 text-sm font-semibold text-brand-dark">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-brand-primary/15 bg-brand-surface p-6 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Команды</p>
            <div className="mt-4 space-y-4">
              {teamProfiles.slice(0, 2).map((team) => (
                <div key={team.id} className="rounded-2xl border border-brand-primary/10 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-semibold text-brand-dark">{team.name}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted">{team.focus}</p>
                    </div>
                    <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
                      {team.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted">Навыки: {team.skills.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;

