import { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';

import { chatScenarios } from '../../data/mockContent';

type Message = {
  id: string;
  role: 'user' | 'ai';
  text: string;
};

const ChatWidget = () => {
  const internalId = useId();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'ai', text: 'Привет! Я Meta Guide. Выбери сценарий, и я помогу.' },
  ]);
  const [queue, setQueue] = useState<Array<{ speaker: 'user' | 'ai'; text: string }>>([]);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const isTyping = queue.length > 0;

  useEffect(() => {
    if (!queue.length) return;
    const timeout = setTimeout(() => {
      const [next, ...rest] = queue;
      setMessages((prev) => [
        ...prev,
        {
          id: `${internalId}-${Date.now()}`,
          role: next.speaker,
          text: next.text,
        },
      ]);
      setQueue(rest);
    }, 700);
    return () => clearTimeout(timeout);
  }, [queue, internalId]);

  const startScenario = (scenarioId: string) => {
    const scenario = chatScenarios.find((item) => item.id === scenarioId);
    if (!scenario) return;
    setActiveScenario(scenarioId);
    setMessages([
      { id: 'welcome', role: 'ai', text: 'Привет! Я Meta Guide. Выбери сценарий, и я помогу.' },
    ]);
    setQueue(scenario.script);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <div className="hidden max-w-xs flex-col gap-2 text-xs text-white sm:flex">
        <p className="rounded-full bg-black/30 px-3 py-1 backdrop-blur">Спроси Meta Guide</p>
      </div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-cta-gradient px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-brand-primary/40"
      >
        <FiMessageCircle />
        Чат с ИИ
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-80 rounded-3xl bg-white p-4 shadow-2xl shadow-brand-primary/20"
          >
            <div className="mb-3 flex flex-wrap gap-2">
              {chatScenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => startScenario(scenario.id)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    activeScenario === scenario.id
                      ? 'border-transparent bg-cta-gradient text-white'
                      : 'border-brand-primary/20 text-brand-dark'
                  }`}
                >
                  {scenario.title}
                </button>
              ))}
            </div>
            <div className="flex max-h-72 flex-col gap-3 overflow-y-auto pr-1 text-sm">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={
                    message.role === 'user'
                      ? 'self-end rounded-2xl rounded-br-sm bg-brand-primary/10 px-4 py-2 text-brand-dark text-right'
                      : 'self-start rounded-2xl rounded-bl-sm bg-brand-dark text-white px-4 py-2'
                  }
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {message.text}
                </motion.div>
              ))}
              {isTyping && (
                <div className="self-start rounded-2xl rounded-bl-sm bg-brand-dark text-white px-4 py-2 text-xs">
                  Meta Guide печатает…
                </div>
              )}
            </div>
            {activeScenario && !queue.length && (
              <div className="mt-3 text-xs text-muted">
                Готово! Попробуй другой сценарий или спроси Meta Guide на демо.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;

