import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiFilter, FiMapPin, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import GradientButton from '../components/common/GradientButton';
import SectionHeading from '../components/common/SectionHeading';
import MapFilters from '../components/clubs/MapFilters';
import { clubs, eventHighlights } from '../data/mockContent';

const Clubs = () => {
  const navigate = useNavigate();
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [formatFilter, setFormatFilter] = useState<'Все' | 'Онлайн' | 'Офлайн'>('Все');
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const tags = useMemo(
    () => Array.from(new Set(clubs.flatMap((club) => club.tags))).slice(0, 6),
    [],
  );

  const filteredClubs = useMemo(
    () =>
      clubs.filter((club) => {
        const formatOk = formatFilter === 'Все' || club.format === formatFilter;
        const tagOk = !tagFilter || club.tags.includes(tagFilter);
        return formatOk && tagOk;
      }),
    [formatFilter, tagFilter],
  );

  return (
    <section className="space-y-12">
      <div className="flex items-center justify-between">
        <SectionHeading
          eyebrow="Комьюнити Meta Talent"
          title="Клубы и мероприятия в Бишкеке + онлайн"
          description="Карточки адаптивны: одна колонка на мобильном, четыре — на десктопе. Каждая кнопка “Присоединиться” даёт визуальный отклик."
        />
        <GradientButton soft className="hidden text-brand-dark md:inline-flex" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Назад
        </GradientButton>
      </div>

      <div className="rounded-[28px] border border-brand-primary/15 bg-white/90 p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <FiFilter className="text-brand-primary" />
          <MapFilters
            formats={['Все', 'Онлайн', 'Офлайн']}
            activeFormat={formatFilter}
            onFormatChange={setFormatFilter}
            tags={tags}
            activeTag={tagFilter}
            onTagChange={setTagFilter}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClubs.map((club) => (
          <motion.div
            key={club.id}
            className={`rounded-[28px] border bg-white/90 p-6 shadow-lg transition ${
              selectedClub === club.id ? 'border-brand-primary/60' : 'border-brand-primary/10'
            }`}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted">
              <span>{club.format}</span>
              <span>{club.schedule}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-brand-dark">{club.name}</h3>
            <p className="mt-2 flex items-center gap-1 text-sm text-muted">
              <FiMapPin /> {club.location}
            </p>
            <p className="mt-3 text-sm text-muted">{club.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {club.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-brand-surface px-3 py-1 text-xs text-muted">
                  #{tag}
                </span>
              ))}
            </div>
            <GradientButton className="mt-6 w-full" onClick={() => setSelectedClub(club.id)}>
              Присоединиться
            </GradientButton>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 rounded-[32px] border border-brand-primary/15 bg-white/80 p-6 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Карта мероприятий</p>
          <h3 className="mt-2 text-2xl font-display text-brand-dark">Маркеры клубов + hover-эффект</h3>
          <p className="mt-4 text-sm text-muted">
            Пока карта моковая, но показывает, что мы готовы подключить Google Maps / Mapbox. Каждый маркер подсвечивается при выборе карточки.
          </p>
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-brand-dark/5 p-4 text-sm text-brand-dark">
            <FiUsers />
            {selectedClub
              ? `Вы выбрали ${clubs.find((club) => club.id === selectedClub)?.name}`
              : 'Кликни по клубу, чтобы подсветить маркер.'}
          </div>
        </div>
        <div className="relative h-64 overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20">
          {filteredClubs.map((club) => (
            <motion.div
              key={club.id}
              className="absolute flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-dark shadow-lg"
              style={{
                top: `${50 + (club.coordinates.lat % 10) * 2}%`,
                left: `${40 + (club.coordinates.lng % 10)}%`,
              }}
              animate={{
                scale: selectedClub === club.id ? 1.1 : 1,
                opacity:
                  selectedClub && selectedClub !== club.id
                    ? 0.4
                    : tagFilter && !club.tags.includes(tagFilter)
                      ? 0.5
                      : 1,
              }}
            >
              <FiMapPin /> {club.name.split(' ')[0]}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-[32px] border border-brand-primary/15 bg-white/90 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Лента событий</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {eventHighlights.map((event) => (
            <div key={event.id} className="rounded-3xl border border-brand-primary/10 bg-brand-surface p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">{event.date}</p>
              <h4 className="mt-2 text-lg font-semibold text-brand-dark">{event.title}</h4>
              <p className="text-sm text-muted">{event.description}</p>
              <GradientButton soft className="mt-3 text-brand-dark">
                Забронировать
              </GradientButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clubs;

