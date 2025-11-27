import type { PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

type ModalProps = PropsWithChildren<{
  open: boolean;
  title: string;
  onClose: () => void;
}>;

const Modal = ({ open, title, onClose, children }: ModalProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-glass"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button onClick={onClose} aria-label="Закрыть модалку" className="absolute right-5 top-5 rounded-full bg-brand-surface text-brand-dark/70">
            <FiX size={20} />
          </button>
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-semibold text-brand-dark">{title}</h3>
            <div className="space-y-3 text-sm text-brand-dark/80">{children}</div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;

