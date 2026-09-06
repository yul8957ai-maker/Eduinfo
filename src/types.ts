export type FactorId = 
  | 'goal'        // 학습목표성
  | 'regulation'  // 자기조절
  | 'persistence' // 학습지속성
  | 'action'      // 실천성
  | 'collaboration' // 협력학습
  | 'help_seeking' // 도움요청성
  | 'confidence'  // 자신감
  | 'reflection'; // 성찰성

export interface FactorMeta {
  id: FactorId;
  name: string;
  nameEn: string;
  definition: string;
  vocationalImportance: string;
  relatedTheory: string;
  mean: number; // 규준 평균
  sd: number;   // 규준 표준편차
}

export interface QuestionItem {
  id: number;
  factorId: FactorId;
  text: string;
  isReverse: boolean; // true = 역문항
  intention: string;  // 측정 의도
}

export interface TraineeInfo {
  name: string;
  courseName: string; // 훈련과정명 (예: 스마트 웹/앱 개발자 양성과정, 기계설계제작, 전기기능사 취득반 등)
  ageGroup: string;   // 20대, 30대, 40대, 50대 이상
  goalType: string;   // 신규취업, 이직/경력전환, 자격증 취득, 역량강화
  testDate: string;
}

export type ScoreLevel = 'very_low' | 'low' | 'average' | 'high' | 'very_high';

export interface FactorScoreResult {
  factorId: FactorId;
  factorName: string;
  rawMean: number;      // 1.0 ~ 6.0
  tScore: number;       // T점수 (평균 50, 표준편차 10)
  percentile: number;   // 백분위 (1 ~ 99)
  level: ScoreLevel;
  levelLabel: string;   // 매우 낮음, 낮음, 보통, 높음, 매우 높음
  characteristics: string;
  strengths: string;
  cautions: string;
  strategies: string[];
  counselorTips: string[];
}

export interface DiagnosticResult {
  traineeInfo: TraineeInfo;
  answers: Record<number, number>; // item id -> score 1~6
  factorScores: Record<FactorId, FactorScoreResult>;
  overallMean: number;
  topStrengths: FactorScoreResult[];
  growthAreas: FactorScoreResult[];
  completedAt: string;
  counselorNotes?: string;
}
