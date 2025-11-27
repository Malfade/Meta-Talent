import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiExternalLink,
  FiRefreshCcw,
  FiTrendingUp,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import GradientButton from '../components/common/GradientButton';
import Modal from '../components/common/Modal';
import SectionHeading from '../components/common/SectionHeading';
import CoachTipCard from '../components/cards/CoachTipCard';
import { useRoadmapProgress } from '../hooks/useRoadmapProgress';
import { careers, clubs, roadmaps } from '../data/mockContent';
import type { CareerId, RoadmapStep } from '../types/content';

const Roadmap = () => {
  const [activeCareer, setActiveCareer] = useState<CareerId>('developer');
  const [openStep, setOpenStep] = useState<RoadmapStep | null>(null);
  const navigate = useNavigate();
  const { progress, toggleItem, resetProgress } = useRoadmapProgress();

  const steps = useMemo(
    () => roadmaps.find((roadmap) => roadmap.careerId === activeCareer)?.steps ?? [],
    [activeCareer],
  );
  const allSteps = useMemo(() => roadmaps.flatMap((roadmap) => roadmap.steps), []);
  const completedCount = useMemo(
    () =>
      allSteps.filter((step) =>
        step.checklist.every((item) => (progress[step.id] ?? []).includes(item)),
      ).length,
    [allSteps, progress],
  );
  const streak = Math.min(7, completedCount);
  const nextStep = steps.find(
    (step) => !step.checklist.every((item) => (progress[step.id] ?? []).includes(item)),
  );
  const recommendedClub = clubs[0];

  return (
    <section className="space-y-12">
      <div className="flex items-center justify-between">
        <SectionHeading
          eyebrow="План действий"
          title="Листай шаги и открывай материалы"
          description="Карточки адаптированы под горизонтальный скролл на мобильных: snap эффект, анимация, быстрый доступ к модалкам с ресурсами."
        />
        <GradientButton soft className="hidden text-brand-dark md:inline-flex" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Назад
        </GradientButton>
      </div>

      <div className="flex flex-wrap gap-3">
        {careers.map((career) => (
          <button
            key={career.id}
            onClick={() => setActiveCareer(career.id)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeCareer === career.id
                ? 'border-transparent bg-cta-gradient text-white'
                : 'border-brand-primary/30 text-brand-dark'
            }`}
          >
            {career.title}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-brand-primary/10 bg-white/90 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">Прогресс</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-surface text-3xl">
              🔥
            </div>
            <div>
              <p className="text-sm text-muted">Streak</p>
              <p className="text-2xl font-semibold text-brand-dark">{streak} дней</p>
            </div>
            <div>
              <p className="text-sm text-muted">Завершено</p>
              <p className="text-2xl font-semibold text-brand-dark">{completedCount}/15</p>
            </div>
          </div>
          <GradientButton soft className="mt-6 text-brand-dark" onClick={resetProgress}>
            <FiRefreshCcw /> Сбросить прогресс
          </GradientButton>
        </div>
        <div className="rounded-[28px] border border-brand-primary/10 bg-brand-surface/70 p-6 shadow-inner">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">Ближайший шаг</p>
          {nextStep ? (
            <div className="mt-4 space-y-2">
              <p className="text-lg font-semibold text-brand-dark">{nextStep.title}</p>
              <p className="text-sm text-muted">{nextStep.description}</p>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
                <FiTrendingUp /> {nextStep.level === 'starter' ? 'Старт' : 'Продвинутый'}
              </div>
              <GradientButton className="mt-3" onClick={() => setOpenStep(nextStep)}>
                Открыть чек-лист <FiArrowRight />
              </GradientButton>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">Все шаги в этом треке выполнены! Выбери новый трек.</p>
          )}
        </div>
      </div>

      <div className="rounded-[28px] border border-brand-primary/10 bg-white/90 p-6 shadow-lg">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">AI Coach Tips</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <CoachTipCard
            badge="Следующий шаг"
            title={nextStep ? nextStep.title : 'Все задачи выполнены'}
            description={
              nextStep
                ? 'Выдели два тайм-бокса и после завершения покажи прогресс ментору или команде.'
                : 'Можно выбрать новый трек или перейти в инсайты.'
            }
            emphasis="primary"
          />
          <CoachTipCard
            badge="Комьюнити"
            title={recommendedClub.name}
            description={`AI советует показать прогресс на ${recommendedClub.name.split(' ')[0]} — там ревью и команда.`}
          />
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between pb-2 text-xs uppercase tracking-[0.3em] text-muted">
          <span>Swipe</span>
          <span>0{steps.length} шагов</span>
        </div>
        <div className="flex snap-x gap-6 overflow-x-auto pb-4">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="relative min-w-[260px] snap-start rounded-[28px] border border-brand-primary/20 bg-white/90 p-6 shadow-lg"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between">
                <div className="text-3xl">{step.icon}</div>
                <span className="text-xs uppercase tracking-[0.3em] text-muted">{step.duration}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-brand-dark">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                <span
                  className={
                    step.level === 'starter'
                      ? 'rounded-full bg-brand-surface px-2 py-1 text-brand-dark'
                      : 'rounded-full bg-brand-primary/10 px-2 py-1 text-brand-primary'
                  }
                >
                  {step.level === 'starter' ? 'Start' : 'Pro'}
                </span>
                {step.checklist.every((item) => (progress[step.id] ?? []).includes(item)) && (
                  <span className="inline-flex items-center gap-1 text-brand-primary">
                    <FiCheckCircle /> Done
                  </span>
                )}
              </div>
              <GradientButton
                soft
                className="mt-6 w-full text-brand-dark"
                onClick={() => setOpenStep(step)}
              >
                Подробнее <FiArrowRight />
              </GradientButton>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-[32px] bg-brand-dark text-white">
        <div className="grid gap-8 p-8 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Материалы</p>
            <h3 className="mt-2 text-2xl font-display">Модалки под статьи, видео и чек-листы</h3>
            <p className="mt-4 text-sm text-white/70">
              Мы заранее подгружаем мок-данные, поэтому можно открыть любой шаг и показать, как пользователь сразу
              получает полезный контент.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Фокус на мобильность</p>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>• Snap-scroll карточек и кастомные индикаторы.</li>
              <li>• Модалки с плавным scale/fade через Framer Motion.</li>
              <li>• Адаптив от 320px, hover-состояния для десктопа.</li>
            </ul>
          </div>
        </div>
      </div>

      <Modal
        open={Boolean(openStep)}
        onClose={() => setOpenStep(null)}
        title={openStep ? `${openStep.title}: материалы` : ''}
      >
        {openStep?.resources.map((resource) => (
          <div key={resource.id} className="rounded-2xl border border-brand-primary/15 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{resource.type}</p>
            <p className="text-base font-semibold text-brand-dark">{resource.title}</p>
            <p className="text-sm text-muted">{resource.description}</p>
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary"
            >
              Перейти <FiExternalLink />
            </a>
          </div>
        ))}
        {openStep && (
          <div className="rounded-2xl border border-brand-primary/15 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Чек-лист</p>
            <div className="mt-3 space-y-3">
              {openStep.checklist.map((item) => {
                const done = (progress[openStep.id] ?? []).includes(item);
                return (
                  <button
                    key={item}
                    className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left text-sm transition ${
                      done
                        ? 'border-brand-primary/40 bg-brand-primary/10 text-brand-primary'
                        : 'border-brand-primary/15 text-brand-dark hover:border-brand-primary/40'
                    }`}
                    onClick={() => toggleItem(openStep.id, item)}
                  >
                    <span>{item}</span>
                    {done && <FiCheckCircle />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Roadmap;

