import { motion } from 'framer-motion';
import { FiDownload, FiShare2, FiZap } from 'react-icons/fi';

import GradientButton from '../components/common/GradientButton';
import SectionHeading from '../components/common/SectionHeading';
import InsightStatCard from '../components/cards/InsightStatCard';
import {
  actionCards,
  eventHighlights,
  personaInsights,
  teamProfiles,
  testimonials,
} from '../data/mockContent';

const Insights = () => (
  <section className="space-y-12">
    <div className="rounded-[32px] bg-white/90 p-8 shadow-xl">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Meta Talent Card"
            title="Персональные инсайты и карта действий"
            description="Собираем выводы из теста и выдаём набор шагов, чтобы можно было показать жюри или ментору."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {personaInsights.map((item) => (
              <InsightStatCard
                key={item.id}
                label={item.label}
                value={item.value}
                description={item.description}
                trend={item.trend}
              />
            ))}
          </div>
        </div>
        <motion.div
          className="rounded-[32px] border border-dashed border-brand-primary/40 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 p-6 text-brand-dark"
          initial={{ rotate: -1, opacity: 0.9 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Meta Talent Card</p>
          <h3 className="mt-3 text-2xl font-display">Digital ID + QR</h3>
          <p className="mt-2 text-sm text-muted">
            Карточка, которую можно показать жюри. Содержит QR с ссылкой на роадмап и прогресс.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <GradientButton>
              <FiDownload /> Скачать
            </GradientButton>
            <GradientButton soft className="text-brand-dark">
              <FiShare2 /> Поделиться
            </GradientButton>
          </div>
          <div className="mt-8 rounded-2xl bg-white/80 p-4 text-sm shadow-lg">
            <p className="font-semibold text-brand-dark">Meta Talent Score · 87%</p>
            <p className="text-muted">AI Developer · Storyteller · Community Builder</p>
          </div>
        </motion.div>
      </div>
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      {actionCards.map((card) => (
        <motion.div
          key={card.id}
          className="rounded-[28px] border border-brand-primary/15 bg-white/90 p-6 shadow-lg"
          whileHover={{ y: -4 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted">{card.subtitle}</p>
          <h4 className="mt-3 text-xl font-semibold text-brand-dark">{card.title}</h4>
          <p className="mt-1 text-sm text-muted">{card.nextStep}</p>
          <GradientButton className="mt-4">
            <FiZap /> {card.linkLabel}
          </GradientButton>
        </motion.div>
      ))}
    </div>

    <div className="rounded-[32px] bg-brand-dark text-white">
      <div className="grid gap-6 p-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">События</p>
          <h3 className="mt-3 text-2xl font-display">Следующие 3 недели</h3>
          <p className="mt-2 text-sm text-white/70">
            Показываем, куда пойти после получения рекомендаций: митапы, хакатоны, комьюнити.
          </p>
        </div>
        <div className="space-y-4">
          {eventHighlights.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/70">
                <span>{event.date}</span>
                <span>{event.format}</span>
              </div>
              <p className="mt-2 text-lg font-semibold">{event.title}</p>
              <p className="text-sm text-white/80">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[32px] border border-brand-primary/15 bg-white/90 p-6 shadow-lg">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Отзывы</p>
        <h3 className="mt-2 text-2xl font-display text-brand-dark">Социальное доказательство</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {testimonials.map((item) => (
            <div key={item.id} className="rounded-3xl border border-brand-primary/10 p-4">
              <div
                className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-brand-dark"
                style={{ background: item.avatarColor }}
              >
                {item.name[0]}
              </div>
              <p className="text-sm italic text-muted">“{item.quote}”</p>
              <p className="mt-3 text-sm font-semibold text-brand-dark">{item.name}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[32px] border border-brand-primary/15 bg-brand-surface p-6 shadow-lg">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Матчинг</p>
        <h3 className="mt-2 text-xl font-semibold text-brand-dark">Команды и роли</h3>
        <div className="mt-4 space-y-4">
          {teamProfiles.map((team) => (
            <div key={team.id} className="rounded-2xl border border-brand-primary/15 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-brand-dark">{team.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">{team.focus}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    team.status === 'Ищет команду'
                      ? 'bg-brand-primary/10 text-brand-primary'
                      : 'bg-brand-dark text-white'
                  }`}
                >
                  {team.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted">Навыки: {team.skills.join(', ')}</p>
              <GradientButton soft className="mt-3 text-brand-dark">
                Связаться
              </GradientButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Insights;

