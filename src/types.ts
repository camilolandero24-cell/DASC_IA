export interface SurveyResponse {
  id: number;
  timestamp: string;
  toolsKnownRaw: string;
  toolsList: string[];
  usageRaw: string;
  usageCategory: 'Académico / Tareas' | 'Creatividad / Profesional' | 'Exploración / Ocasional';
  perceivedUtilityRaw: string;
  utilityVerdict: 'Ayuda significativamente' | 'Mixto / Depende del uso' | 'Complica / No ayuda';
  prosAndConsRaw: string;
  mainAdvantage: string;
  mainRisk: string;
  riskCategory: 'Dependencia / Pereza cognitiva' | 'Desinformación / Falsedad' | 'Pérdida de identidad / Creatividad' | 'Privacidad de datos';
  worldFutureRaw: string;
  futureSentiment: 'Optimista / Progreso' | 'Cauteloso / Transformación acelerada' | 'Pesimista / Deshumanización';
  userProfile: 'Pragmático Utilitario' | 'Crítico Escéptico' | 'Explorador Estratégico';
  featuredQuote?: string;
  quoteCategory?: string;
}

export interface StrategicRecommendation {
  id: string;
  pillar: 'Educativo & Pedagógico' | 'Evaluación & Pensamiento Crítico' | 'Alfabetización Algorítmica' | 'Ética & Privacidad';
  title: string;
  problemDetected: string;
  actionPlan: string;
  priority: 'Alta' | 'Media' | 'Inmediata';
  timeframe: string;
  metricsToTrack: string[];
  targetAudience: string;
}
