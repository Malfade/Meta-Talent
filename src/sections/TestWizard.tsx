import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import GradientButton from '../components/common/GradientButton';
import ProgressBar from '../components/common/ProgressBar';
import SectionHeading from '../components/common/SectionHeading';
import { careers, questions } from '../data/mockContent';
import type { CareerId, QuestionOption } from '../types/content';

const initialScore: Record<CareerId, number> = {
  developer: 0,
  designer: 0,
  analyst: 0,
  engineer: 0,
  marketer: 0,
};

const TestWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(initialScore);
  const progress = (step / questions.length) * 100;

  const rankedCareers = useMemo(() => {
    const enriched = careers.map((career) => ({
      ...career,
      match: Math.min(100, Math.round((score[career.id] / (questions.length * 4)) * 100)),
    }));
    return enriched.sort((a, b) => b.match - a.match);
  }, [score]);
  const topCareer = rankedCareers[0] ?? careers[0];
  const topMatches = rankedCareers.slice(0, 3);

  const handleOption = (option: QuestionOption) => {
    setScore((prev) => {
      const clone = { ...prev };
      Object.entries(option.weight).forEach(([key, value]) => {
        clone[key as CareerId] += value ?? 0;
      });
      return clone;
    });
    setStep((prev) => Math.min(prev + 1, questions.length));
  };

  const reset = () => {
    setScore(initialScore);
    setStep(0);
  };

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between">
        <SectionHeading
          eyebrow="Экспресс-тест"
          title="Ответь на 6 вопросов и получи результат"
          description="Карточки адаптированы под мобильный формат: крупные кнопки, свайпы и плавная анимация появления прогресса."
        />
        <GradientButton soft className="hidden text-brand-dark md:inline-flex" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Назад
        </GradientButton>
      </div>

      <div className="rounded-[32px] bg-white p-6 shadow-xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-muted uppercase tracking-[0.3em]">
            <span>Прогресс</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>

        {step < questions.length ? (
          <motion.div
            key={questions[step].id}
            className="mt-8 space-y-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-muted">
              Вопрос {step + 1} / {questions.length}
            </p>
            <h3 className="text-2xl font-semibold text-brand-dark">{questions[step].text}</h3>
            <div className="space-y-3">
              {questions[step].options.map((option) => (
                <button
                  key={option.id}
                  className="w-full rounded-2xl border border-brand-primary/20 bg-brand-surface px-4 py-4 text-left text-brand-dark transition hover:-translate-y-0.5 hover:border-brand-primary/60"
                  onClick={() => handleOption(option)}
                >
                  <span className="font-semibold">{option.label}</span>
                  {option.description && (
                    <p className="mt-1 text-sm text-muted">{option.description}</p>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="mt-10 grid gap-6 md:grid-cols-[1.2fr_1fr]"
            initial={{ opacity: 0.5, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="rounded-3xl border border-brand-primary/20 bg-brand-surface p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Твой матч</p>
              <h3 className="mt-2 text-3xl font-display text-brand-dark">{topCareer.title}</h3>
              <p className="mt-1 text-sm text-muted">{topCareer.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {topCareer.keywords.map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs text-muted">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <GradientButton onClick={() => navigate('/roadmap')}>
                  Посмотреть роадмап <FiArrowRight />
                </GradientButton>
                <GradientButton soft className="text-brand-dark" onClick={reset}>
                  Пройти заново
                </GradientButton>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl bg-gradient-to-br from-brand-primary/15 to-brand-secondary/10 p-6 text-brand-dark">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Что дальше?</p>
                <ul className="mt-4 space-y-4 text-sm">
                  <li>🔔 Получи письмо с чек-листом (мок-нотификация).</li>
                  <li>📱 Свайпни карточки шагов и выбери первый.</li>
                  <li>🤝 Подключись к клубу Meta Talent и заявись на демо.</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-brand-primary/15 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Как распределились результаты</p>
                <div className="mt-4 space-y-4">
                  {topMatches.map((match) => (
                    <div key={match.id}>
                      <div className="flex items-center justify-between text-sm font-medium text-brand-dark">
                        <span>{match.title}</span>
                        <span>{match.match}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-brand-surface">
                        <div
                          className="h-full rounded-full bg-cta-gradient"
                          style={{ width: `${match.match || 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-muted">
                    Алгоритм учитывает силу ответов и повторяемость паттернов по вопросам.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestWizard;

