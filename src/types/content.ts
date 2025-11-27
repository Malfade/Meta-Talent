export type CareerId = 'developer' | 'designer' | 'analyst' | 'engineer' | 'marketer';

export type Career = {
  id: CareerId;
  title: string;
  match: number;
  description: string;
  keywords: string[];
};

export type QuestionOption = {
  id: string;
  label: string;
  description?: string;
  weight: Partial<Record<CareerId, number>>;
};

export type Question = {
  id: string;
  text: string;
  options: QuestionOption[];
};

export type Resource = {
  id: string;
  type: 'article' | 'video' | 'course';
  title: string;
  url: string;
  description: string;
};

export type RoadmapStep = {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  resources: Resource[];
  level: 'starter' | 'pro';
  checklist: string[];
};

export type Roadmap = {
  careerId: CareerId;
  steps: RoadmapStep[];
};

export type Club = {
  id: string;
  name: string;
  location: string;
  format: 'Онлайн' | 'Офлайн';
  description: string;
  tags: string[];
  schedule: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export type ChatSeed = {
  id: string;
  question: string;
  answer: string;
  mood: 'positive' | 'encouraging' | 'neutral';
};

export type PersonaInsight = {
  id: string;
  label: string;
  value: string;
  trend: 'up' | 'steady';
  description: string;
};

export type ActionCard = {
  id: string;
  title: string;
  subtitle: string;
  nextStep: string;
  linkLabel: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarColor: string;
};

export type TeamProfile = {
  id: string;
  name: string;
  focus: string;
  skills: string[];
  status: 'Ищет команду' | 'Команда набрана';
};

export type EventHighlight = {
  id: string;
  title: string;
  date: string;
  format: string;
  description: string;
};

export type ChatScenario = {
  id: string;
  title: string;
  summary: string;
  script: Array<{
    speaker: 'user' | 'ai';
    text: string;
  }>;
};

