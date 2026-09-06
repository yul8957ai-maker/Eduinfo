import { FactorId, FactorMeta, QuestionItem, FactorScoreResult, DiagnosticResult, TraineeInfo, ScoreLevel } from '../types';

export const FACTORS: FactorMeta[] = [
  {
    id: 'goal',
    name: '학습목표성',
    nameEn: 'Goal Orientation',
    definition: '직업훈련 참여를 통해 달성하고자 하는 취업, 자격증 취득, 직무역량 습득 목표의 명확성과 성취 열망 수준',
    vocationalImportance: '국비지원 단기집중 과정 특성상 훈련 초기에 뚜렷한 목표의식을 갖춘 훈련생이 중도탈락 없이 성공적으로 수료하고 조기 취업으로 연결됨',
    relatedTheory: '목표지향성이론(Achievement Goal Theory), 성인학습이론(Andragogy)',
    mean: 4.15,
    sd: 0.78
  },
  {
    id: 'regulation',
    name: '자기조절',
    nameEn: 'Self-Regulated Learning',
    definition: '일일 훈련 일정과 과제를 주도적으로 계획하고 학습 진도를 관리하며 시간 및 환경을 통제하는 역량',
    vocationalImportance: '매일 7~8시간 진행되는 고밀도 실습 및 출결 규정을 준수하고 방대한 실무 커리큘럼을 주도적으로 소화하는 데 필수적임',
    relatedTheory: '자기조절학습이론(Pintrich & Zimmerman), 자기결정성이론(Deci & Ryan)',
    mean: 3.82,
    sd: 0.85
  },
  {
    id: 'persistence',
    name: '학습지속성',
    nameEn: 'Grit & Persistence',
    definition: '실습 실패, 코드/회로 에러, 자격증 모의평가 불합격 등 기술적 난관에 부딪혔을 때 포기하지 않고 훈련을 끝까지 지속하는 끈기',
    vocationalImportance: '생소한 기술 분야로 진입하는 경력전환자와 비전공자 훈련생이 훈련 중반 이후 번아웃과 슬럼프를 극복하는 원동력',
    relatedTheory: '성장마인드셋(Dweck), 그릿(Duckworth)',
    mean: 3.90,
    sd: 0.82
  },
  {
    id: 'action',
    name: '실천성',
    nameEn: 'Hands-on Action',
    definition: '단순 이론 청취에 머무르지 않고 직접 실습 장비나 개발 툴을 조작하고 오류를 몸소 해결하려는 능동적 실무 지향성',
    vocationalImportance: '현대직업전문학교의 핵심인 현장 맞춤형 기자재 실습과 프로젝트 제작에서 빠른 실무 적응력을 결정짓는 척도',
    relatedTheory: '경험학습이론(Kolb), 사회인지이론(Bandura)',
    mean: 4.05,
    sd: 0.80
  },
  {
    id: 'collaboration',
    name: '협력학습',
    nameEn: 'Collaborative Learning',
    definition: '팀 프로젝트와 조별 실습에서 동료 훈련생들과 역할을 분담하고 의사소통하며 상호 배려를 통해 시너지를 내는 태도',
    vocationalImportance: '기업 현장에서 요구하는 팀워크 역량을 검증하고 조별 캡스톤 디자인 및 포트폴리오 제작 성공의 핵심 요소',
    relatedTheory: '사회구성주의(Vygotsky), 상황학습이론(Lave & Wenger)',
    mean: 3.95,
    sd: 0.88
  },
  {
    id: 'help_seeking',
    name: '도움요청성',
    nameEn: 'Adaptive Help-Seeking',
    definition: '실습 중 해결하기 어려운 난관에 직면했을 때 훈련교사나 동료 훈련생에게 주저하지 않고 적절한 시점에 질문하고 조언을 구하는 능력',
    vocationalImportance: '혼자 끙끙 앓다 진도를 놓치는 중장년층이나 초보 훈련생의 학습 정체를 방지하고 훈련 안전사고를 사전 예방함',
    relatedTheory: '적응적 도움요청이론(Newman & Karabenick), 사회인지이론(Bandura)',
    mean: 3.75,
    sd: 0.92
  },
  {
    id: 'confidence',
    name: '자신감',
    nameEn: 'Vocational Self-Efficacy',
    definition: '내가 선택한 직종의 실무 기술을 성공적으로 습득하고 자격증 취득 및 취업에 성공할 수 있다는 내적 확신',
    vocationalImportance: '장기간 미취업 또는 경력단절을 겪은 구직자 훈련생이 불안감을 떨치고 당당하게 면접과 현장에 도전하게 만드는 심리적 자본',
    relatedTheory: '자기효능감이론(Bandura), 성장마인드셋(Dweck)',
    mean: 3.70,
    sd: 0.95
  },
  {
    id: 'reflection',
    name: '성찰성',
    nameEn: 'Reflective Practice',
    definition: '오늘 배운 훈련 내용을 복습하고 실습 결과물을 스스로 점검하며 잘된 점과 부족한 점을 분석하여 개선하는 성찰적 사고',
    vocationalImportance: '단순 기술 테크니션을 넘어 현장 문제를 창의적으로 해결하는 전문 기술 인력으로 성장하도록 돕는 메타인지 능력',
    relatedTheory: '성찰적 실천이론(Schön), 메타인지이론(Flavell)',
    mean: 3.88,
    sd: 0.84
  }
];

export const LIKERT_OPTIONS = [
  { score: 1, label: '전혀 그렇지 않다', shortLabel: '전혀 아님' },
  { score: 2, label: '그렇지 않다', shortLabel: '아님' },
  { score: 3, label: '다소 그렇지 않다', shortLabel: '다소 아님' },
  { score: 4, label: '다소 그렇다', shortLabel: '다소 그러함' },
  { score: 5, label: '그렇다', shortLabel: '그러함' },
  { score: 6, label: '매우 그렇다', shortLabel: '매우 그러함' },
];

export const QUESTIONS: QuestionItem[] = [
  // 1. 학습목표성 (Goal Orientation) - 6문항 (4 정방향, 2 역방향)
  {
    id: 1,
    factorId: 'goal',
    text: '나는 이번 직업훈련 과정을 수료한 후 취업하고 싶은 직무나 목표 기업이 뚜렷하다.',
    isReverse: false,
    intention: '훈련 수료 후 명확한 취업 진로 목표 보유 여부 측정'
  },
  {
    id: 2,
    factorId: 'goal',
    text: '훈련 과정에서 취득해야 할 국가기술자격증이나 자격 요건을 구체적으로 파악하고 있다.',
    isReverse: false,
    intention: '자격증 취득에 대한 구체적 계획 및 목표성 평가'
  },
  {
    id: 3,
    factorId: 'goal',
    text: '매일 훈련원에 등교할 때 오늘 반드시 마스터해야 할 핵심 실습 내용을 염두에 둔다.',
    isReverse: false,
    intention: '일일 단위 훈련 학습목표 설정 습관 측정'
  },
  {
    id: 4,
    factorId: 'goal',
    text: '솔직히 내가 이 훈련과정을 왜 듣고 있는지 구체적인 목표를 잘 모르겠다.',
    isReverse: true,
    intention: '훈련 동기 및 목표 부재성 역방향 감지'
  },
  {
    id: 5,
    factorId: 'goal',
    text: '단순히 출석 일수만 채워 수당을 받기보다는, 실제 현장 실무 기술을 내 것으로 만들고 싶다.',
    isReverse: false,
    intention: '내재적 숙달목표 지향성 및 기술 습득 열망 확인'
  },
  {
    id: 6,
    factorId: 'goal',
    text: '훈련 과정이 끝난 뒤 내 진로나 취업 계획에 대해 진지하게 생각해본 적이 별로 없다.',
    isReverse: true,
    intention: '장기 커리어 목표 설정 부재성 역방향 평가'
  },

  // 2. 자기조절 (Self-Regulation) - 6문항 (4 정방향, 2 역방향)
  {
    id: 7,
    factorId: 'regulation',
    text: '훈련 시작 전날이나 아침에 그날의 학습 일정과 실습 과제를 미리 점검한다.',
    isReverse: false,
    intention: '선제적 훈련 계획 수립 역량 측정'
  },
  {
    id: 8,
    factorId: 'regulation',
    text: '실습 과제를 수행할 때 스마트폰이나 인터넷 검색 등 딴짓에 쉽게 주의를 빼앗긴다.',
    isReverse: true,
    intention: '주의 통제 및 충동 조절 실패 요인 역방향 평가'
  },
  {
    id: 9,
    factorId: 'regulation',
    text: '과제가 밀리지 않도록 스스로 마감 기한보다 여유 있게 일정을 나누어 완성한다.',
    isReverse: false,
    intention: '시간 관리 및 과제 분할 실행 역량 확인'
  },
  {
    id: 10,
    factorId: 'regulation',
    text: '훈련 수업 중에 이해가 안 되는 부분이 생기면 표시해 두었다가 쉬는 시간이나 복습 시간에 챙긴다.',
    isReverse: false,
    intention: '학습 결손에 대한 능동적 사후 조절 역량 측정'
  },
  {
    id: 11,
    factorId: 'regulation',
    text: '정해진 훈련 계획표가 있어도 기분에 따라 즉흥적으로 공부하거나 미루는 편이다.',
    isReverse: true,
    intention: '계획 준수 실패 및 미루기 성향 역방향 감지'
  },
  {
    id: 12,
    factorId: 'regulation',
    text: '장시간 실습에서도 집중력이 흐트러지지 않도록 휴식과 작업 리듬을 스스로 잘 조율한다.',
    isReverse: false,
    intention: '신체적·심리적 집중 리듬 조절 역량 확인'
  },

  // 3. 학습지속성 (Persistence) - 6문항 (4 정방향, 2 역방향)
  {
    id: 13,
    factorId: 'persistence',
    text: '실습 장비 작동 중 에러가 나거나 코드가 막혀도 해결될 때까지 끝까지 매달린다.',
    isReverse: false,
    intention: '실습 기술적 난관 앞에서의 문제해결 집념 측정'
  },
  {
    id: 14,
    factorId: 'persistence',
    text: '모의 테스트나 평가 점수가 기대에 못 미치면 쉽게 풀이 죽고 훈련 의욕이 꺾인다.',
    isReverse: true,
    intention: '부정적 피드백에 취약한 좌절 성향 역방향 평가'
  },
  {
    id: 15,
    factorId: 'persistence',
    text: '이해하기 어려운 복잡한 전문 이론이라도 몇 번이고 반복해서 보며 이해하려고 한다.',
    isReverse: false,
    intention: '반복 학습 및 인지적 끈기 발휘 수준 확인'
  },
  {
    id: 16,
    factorId: 'persistence',
    text: '훈련 과정이 중반을 넘어가 체력적으로 힘들어도 처음에 가졌던 열정을 유지하고 있다.',
    isReverse: false,
    intention: '장기 단기집중 과정에서의 마라톤형 학습 지속력 측정'
  },
  {
    id: 17,
    factorId: 'persistence',
    text: '과제가 어렵거나 한 번에 되지 않으면 그냥 대충 넘어가거나 포기하고 싶어진다.',
    isReverse: true,
    intention: '어려운 과제 회피 성향 역방향 감지'
  },
  {
    id: 18,
    factorId: 'persistence',
    text: '남들보다 습득이 다소 느리더라도 꾸준히 하면 결국 내 것으로 만들 수 있다고 믿는다.',
    isReverse: false,
    intention: '노력의 가치를 신뢰하는 성장마인드셋 기반 지속성 측정'
  },

  // 4. 실천성 (Action-Oriented Practice) - 6문항 (4 정방향, 2 역방향)
  {
    id: 19,
    factorId: 'action',
    text: '훈련교사의 시연을 보고 난 뒤 바로 내 손으로 직접 기자재를 다루며 실습해보는 것을 좋아한다.',
    isReverse: false,
    intention: '능동적 손동작/기자재 실습 착수 선호도 측정'
  },
  {
    id: 20,
    factorId: 'action',
    text: '직접 실습해보기보다는 교재를 읽거나 교사의 설명을 눈으로만 지켜보는 것이 편하다.',
    isReverse: true,
    intention: '수동적 관찰 선호 및 실습 기피 역방향 평가'
  },
  {
    id: 21,
    factorId: 'action',
    text: '배운 기술을 응용하여 나만의 독창적인 포트폴리오나 실습 결과물을 만들어보려 시도한다.',
    isReverse: false,
    intention: '배운 지식의 실제 적용 및 제작 실천력 확인'
  },
  {
    id: 22,
    factorId: 'action',
    text: '자격증 기출문제를 풀 때 머리로만 생각하지 않고 손으로 직접 풀고 오답을 바로 수정한다.',
    isReverse: false,
    intention: '체득 중심의 학습 실행 태도 측정'
  },
  {
    id: 23,
    factorId: 'action',
    text: '실습 과제를 완벽히 이해하기 전까지는 망설여져서 손을 대지 못하는 경우가 많다.',
    isReverse: true,
    intention: '과도한 완벽주의로 인한 실습 착수 지연 역방향 감지'
  },
  {
    id: 24,
    factorId: 'action',
    text: '실제 산업 현장에서 발생하는 돌발 상황이나 불량 원인을 가상으로 재현하며 실습해본다.',
    isReverse: false,
    intention: '현장 실무 중심의 응용 실천 행동 측정'
  },

  // 5. 협력학습 (Collaborative Learning) - 6문항 (4 정방향, 2 역방향)
  {
    id: 25,
    factorId: 'collaboration',
    text: '조별 프로젝트나 팀 실습을 할 때 동료들과 아이디어를 나누는 과정에서 많은 것을 배운다.',
    isReverse: false,
    intention: '팀 기반 상호작용을 통한 학습 효과 인식 측정'
  },
  {
    id: 26,
    factorId: 'collaboration',
    text: '다른 훈련생들과 팀을 짜서 함께 작업하는 것보다 혼자서 모든 것을 하는 게 훨씬 편하다.',
    isReverse: true,
    intention: '고립 학습 선호 및 협업 회피 성향 역방향 평가'
  },
  {
    id: 27,
    factorId: 'collaboration',
    text: '팀 과제에서 내 몫의 역할을 책임감 있게 완수하고 팀원의 어려움을 기꺼이 돕는다.',
    isReverse: false,
    intention: '팀 프로젝트 기여도 및 이타적 협력 행동 확인'
  },
  {
    id: 28,
    factorId: 'collaboration',
    text: '조별 의견이 엇갈릴 때 감정적으로 맞서지 않고 합리적인 절충안을 찾으려 노력한다.',
    isReverse: false,
    intention: '팀 내 갈등 조율 및 건설적 의사소통 역량 측정'
  },
  {
    id: 29,
    factorId: 'collaboration',
    text: '동료 훈련생이 도움을 요청하면 내 작업 시간이 뺏기는 것 같아 솔직히 부담스럽다.',
    isReverse: true,
    intention: '동료 학습 배려 결여 및 폐쇄성 역방향 감지'
  },
  {
    id: 30,
    factorId: 'collaboration',
    text: '내가 새로 터득한 노하우나 유용한 단축키·팁을 같은 반 훈련생들에게 아낌없이 공유한다.',
    isReverse: false,
    intention: '동료 상호 학습 촉진 및 지식 공유 태도 확인'
  },

  // 6. 도움요청성 (Help-Seeking) - 6문항 (4 정방향, 2 역방향)
  {
    id: 31,
    factorId: 'help_seeking',
    text: '실습 장비 오류나 이해되지 않는 공식이 나오면 훈련교사에게 스스럼없이 질문한다.',
    isReverse: false,
    intention: '교사에 대한 적응적 질문 행동 및 소통 개방성 측정'
  },
  {
    id: 32,
    factorId: 'help_seeking',
    text: '모르는 것을 질문하면 남들이 나를 무능하게 볼까 봐 부끄러워 혼자 끙끙 앓는다.',
    isReverse: true,
    intention: '체면 의식 및 평가 불안으로 인한 도움 요청 차단 역방향 평가'
  },
  {
    id: 33,
    factorId: 'help_seeking',
    text: '스스로 충분히 고민해본 후에도 해결되지 않을 때 정확한 문제 지점을 짚어 조언을 구한다.',
    isReverse: false,
    intention: '전략적이고 효과적인 고차원 도움요청 역량 확인'
  },
  {
    id: 34,
    factorId: 'help_seeking',
    text: '주변 동료 훈련생들에게 실습 요령이나 풀이법을 편안하게 물어보고 배운다.',
    isReverse: false,
    intention: '동료 자원을 활용한 수평적 도움요청 태도 측정'
  },
  {
    id: 35,
    factorId: 'help_seeking',
    text: '수업 진도를 따라가지 못해도 훈련교사에게 그 사실을 솔직하게 털어놓지 못한다.',
    isReverse: true,
    intention: '학습 결손 은폐 및 소극적 상담 기피 역방향 감지'
  },
  {
    id: 36,
    factorId: 'help_seeking',
    text: '취업 준비나 이력서·포트폴리오 작성 시 취업지원실이나 담임교사에게 적극적으로 피드백을 청한다.',
    isReverse: false,
    intention: '진로·취업 분야에서의 전문가 조언 수용성 확인'
  },

  // 7. 자신감 (Vocational Self-Efficacy) - 6문항 (4 정방향, 2 역방향)
  {
    id: 37,
    factorId: 'confidence',
    text: '나는 이번 훈련과정에서 배운 실무 기술을 산업 현장에서 능숙하게 활용할 자신이 있다.',
    isReverse: false,
    intention: '직무 수행 능력에 대한 자기효능감 측정'
  },
  {
    id: 38,
    factorId: 'confidence',
    text: '나이, 전공 차이 등으로 인해 다른 젊거나 전공자인 훈련생에 비해 뒤처질까 봐 자주 불안하다.',
    isReverse: true,
    intention: '연령/배경 차이에서 기인한 비교 불안 및 위축감 역방향 평가'
  },
  {
    id: 39,
    factorId: 'confidence',
    text: '훈련 기간 동안 열심히 노력한다면 목표한 국가자격증을 반드시 합격할 수 있다고 확신한다.',
    isReverse: false,
    intention: '자격증 시험 성공 기대감 및 성취 확신 측정'
  },
  {
    id: 40,
    factorId: 'confidence',
    text: '실습 과제를 처음 접했을 때 ‘내가 해낼 수 있을까’ 하는 두려움이 먼저 앞선다.',
    isReverse: true,
    intention: '새로운 기술 습득 시 직면하는 초기 과제 회피 불안 역방향 감지'
  },
  {
    id: 41,
    factorId: 'confidence',
    text: '기업 면접관 앞에서 내가 이곳에서 완성한 프로젝트 결과물을 당당하게 설명할 수 있다.',
    isReverse: false,
    intention: '취업 시장에서의 경쟁력 및 결과물에 대한 긍정적 자부심 확인'
  },
  {
    id: 42,
    factorId: 'confidence',
    text: '어려운 신기술이라도 체계적인 훈련을 거치면 내 것으로 마스터할 수 있는 잠재력이 있다.',
    isReverse: false,
    intention: '직무 학습 역량에 대한 근원적 신뢰 측정'
  },

  // 8. 성찰성 (Reflective Thinking) - 6문항 (4 정방향, 2 역방향)
  {
    id: 43,
    factorId: 'reflection',
    text: '오늘 실습한 내용 중 잘된 부분과 실수한 부분을 메모하거나 머릿속으로 되짚어본다.',
    isReverse: false,
    intention: '일일 실습 수행에 대한 메타인지적 사후 검토 습관 측정'
  },
  {
    id: 44,
    factorId: 'reflection',
    text: '실습 평가나 과제 채점이 끝나고 나면 점수만 볼 뿐, 오답이나 감점 원인을 다시 들여다보지 않는다.',
    isReverse: true,
    intention: '피드백 무시 및 오답 분석 부재 역방향 평가'
  },
  {
    id: 45,
    factorId: 'reflection',
    text: '훈련교사가 지적해준 피드백을 다음 날 실습이나 작업 방식에 바로 반영하여 고친다.',
    isReverse: false,
    intention: '교사 피드백의 적극적 수용 및 개선 행동 실천력 확인'
  },
  {
    id: 46,
    factorId: 'reflection',
    text: '‘내가 오늘 사용한 작업 방식보다 더 안전하고 효율적인 방법은 없을까?’ 하고 고민해본다.',
    isReverse: false,
    intention: '공정 개선 및 자기 주도적 방법론 탐색 성향 측정'
  },
  {
    id: 47,
    factorId: 'reflection',
    text: '기존에 하던 방식이 익숙하면 굳이 더 나은 작업 요령을 찾아보려 하지 않는다.',
    isReverse: true,
    intention: '관성적 타성 및 성찰 기피 역방향 감지'
  },
  {
    id: 48,
    factorId: 'reflection',
    text: '매주 주말이나 단위 기간이 끝날 때 나의 기술 성취도를 종합적으로 점검하고 보완 계획을 세운다.',
    isReverse: false,
    intention: '주기적 학습 메타인지 점검 및 자기성찰 계획성 확인'
  }
];

export const PROFILE_INTERPRETATIONS: Record<FactorId, {
  high: {
    traits: string;
    strengths: string;
    cautions: string;
    strategies: string[];
    counselorTips: string[];
  };
  average: {
    traits: string;
    strengths: string;
    cautions: string;
    strategies: string[];
    counselorTips: string[];
  };
  low: {
    traits: string;
    strengths: string;
    cautions: string;
    strategies: string[];
    counselorTips: string[];
  };
}> = {
  goal: {
    high: {
      traits: '자신의 취업 직무와 자격증 취득 목적이 매우 뚜렷하며, 매일의 훈련을 미래 커리어와 긴밀히 연결하여 생각합니다.',
      strengths: '강한 내적 동기와 높은 출석률, 훈련 몰입도가 뛰어나며 스스로 도전적인 과제를 찾아 수행합니다.',
      cautions: '목표가 지나치게 경직될 경우 희망 직무 외의 기초 이론이나 협업 과제를 비효율적인 것으로 치부할 위험이 있습니다.',
      strategies: [
        '목표 기업의 채용 공고와 우대 기술 스택을 분석하여 포트폴리오를 맞춤형으로 특화하세요.',
        '취업 목표를 주 단위, 월 단위 실습 완성물 마일스톤으로 세분화하여 달성감을 누적하세요.'
      ],
      counselorTips: [
        '훈련생의 희망 취업 기업 수준과 채용 시장 눈높이를 조율해주고 우수 포트폴리오 사례를 매칭해주세요.',
        '폭넓은 기초 기술이 향후 현장에서 응용 문제 해결에 필수적임을 짚어주어 편식을 막아주세요.'
      ]
    },
    average: {
      traits: '취업이나 자격증 필요성을 인식하고 있으나, 구체적인 목표 기업이나 직무 전문성에 대한 청사진은 탐색 중입니다.',
      strengths: '유연한 사고를 가지고 있어 다양한 진로 기회와 훈련 과정의 변화에 순응할 수 있습니다.',
      cautions: '훈련 중반 이후 동기부여가 약화되거나 수료 시점에 임박하여 진로 불안을 겪을 수 있습니다.',
      strategies: [
        '담임교사 및 취업지원실 상담을 통해 1~2개 타깃 직무를 훈련 전반기에 조기 확정하세요.',
        '직전 기수 선배 수료생의 취업 후기를 검토하여 구체적인 롤모델을 설정해보세요.'
      ],
      counselorTips: [
        '1:1 진로 상담을 통해 훈련생의 이전 경력이나 관심사와 연계된 맞춤형 취업 루트를 명확히 제시해주세요.'
      ]
    },
    low: {
      traits: '훈련 참가 목적이 수당 수령이나 주변 권유에 머물러 있어, 수료 후 무엇을 할지에 대한 방향성이 모호합니다.',
      strengths: '틀에 갇히지 않아 훈련 중 적성에 맞는 새로운 영역을 발견할 잠재성이 열려 있습니다.',
      cautions: '작은 슬럼프나 과제 지연에도 중도 포기하거나 무단결석할 위험이 매우 높습니다.',
      strategies: [
        '거창한 목표 대신 "이번 주 자격증 실기 1과제 완성"과 같은 단기 눈앞의 목표부터 수립하세요.',
        '취업지원 전담 교사와 즉시 1차 진로 탐색 면담을 진행하여 최소 취업 가이드를 잡으세요.'
      ],
      counselorTips: [
        '중도탈락 고위험군으로 분류하여 입과 초기 밀착 상담을 진행하세요.',
        '‘왜 이 기술을 배워야 하는지’ 산업 현장의 실제 급여와 일자리 현실을 체감할 수 있도록 안내하세요.'
      ]
    }
  },
  regulation: {
    high: {
      traits: '스스로 학습 스케줄을 철저히 계획하고, 방해 요소를 통제하며 꾸준히 학습 진도를 관리합니다.',
      strengths: '마감 기한 준수율이 100%에 달하며 시간 낭비가 적어 단기간에 많은 양의 기술을 습득합니다.',
      cautions: '과도한 완벽주의와 엄격함으로 인해 계획에 차질이 생기면 극심한 스트레스나 번아웃을 겪을 수 있습니다.',
      strategies: [
        '완벽한 결과물보다 "80% 완성 후 반복적 개선" 방식을 도입하여 심리적 유연성을 기르세요.',
        '주 1회 이상 완전한 휴식 시간을 계획표에 의무적으로 편성하세요.'
      ],
      counselorTips: [
        '계획이 조금 틀어져도 현장에서는 언제든 플랜 B가 존재함을 강조하며 심리적 안도감을 제공하세요.',
        '완벽주의 성향 훈련생에게는 조별 프로젝트 조장 역할을 부여해 리더십을 발휘하게 하되 과부하를 점검하세요.'
      ]
    },
    average: {
      traits: '정해진 학원 시간표와 과제 마감은 대체로 따르나, 돌발 과제나 자율 학습 시간 관리는 다소 기복이 있습니다.',
      strengths: '환경의 강제성이 주어지면 안정적으로 실습을 따라가며 교사의 지도를 잘 수용합니다.',
      cautions: '주말이나 연휴 이후 집중력이 흐트러져 월요일 훈련 진도에 적응하기 어려울 수 있습니다.',
      strategies: [
        '매일 퇴실 전 "내일 훈련원에서 가장 먼저 할 일 3가지"를 포스트잇에 적어 실습대에 부착하세요.',
        '스마트폰 집중 모드 앱을 활용해 실습 시간 중 알림을 차단하세요.'
      ],
      counselorTips: [
        '일일 출석 체크와 더불어 과제 진행도를 중간 점검해주는 정기적인 마일스톤 피드백을 제공하세요.'
      ]
    },
    low: {
      traits: '계획 수립을 번거로워하며 당일 기분이나 주변 분위기에 휩쓸려 과제를 마감 직전까지 미루는 경향이 있습니다.',
      strengths: '임기응변 능력이 있고 순발력이 좋아 즉각적인 위기 상황에서 순간 집중력을 발휘하기도 합니다.',
      cautions: '실습 과제 미제출이 누적되어 단위평가에서 과락을 맞거나 출결 점수가 깎일 위험이 큽니다.',
      strategies: [
        '훈련 시작 후 첫 25분 동안 한 가지 실습에만 몰두하는 "뽀모도로 훈련법"을 적용해보세요.',
        '혼자 공부하지 말고 학습 관리가 철저한 동료와 스터디 메이트를 맺어 함께 움직이세요.'
      ],
      counselorTips: [
        '과제를 잘게 쪼개어(Chunking) 매시간 작은 제출물을 확인하는 마이크로 체크 방식을 적용하세요.',
        '지각 및 과제 지연이 3회 이상 반복되기 전에 조기 면담을 시행하세요.'
      ]
    }
  },
  persistence: {
    high: {
      traits: '기자재 고장, 소프트웨어 버그, 자격증 낙방 등 반복되는 실패에도 굴하지 않고 끈기 있게 문제를 파고듭니다.',
      strengths: '어려운 복합 실무 과제를 끝까지 완성해내며, 현장 적응력과 문제 해결 뚝심이 탁월합니다.',
      cautions: '틀린 방식이나 막다른 길에 집착하여 비효율적인 방식으로 혼자 너무 많은 시간을 허비할 수 있습니다.',
      strategies: [
        '한 문제에 30분 이상 막히면 잠시 자리를 떠나 환기하거나 교사에게 힌트를 요청하는 "30분 룰"을 두세요.',
        '성공 경험뿐 아니라 디버깅/문제해결 과정 자체를 트러블슈팅 일지에 기록해 자산화하세요.'
      ],
      counselorTips: [
        '훈련생의 집념을 칭찬하되, 방향이 맞지 않는 고집이 되지 않도록 적시에 올바른 기술적 가이드를 투입하세요.'
      ]
    },
    average: {
      traits: '일반적인 수준의 난관은 참아내나, 며칠 동안 해결되지 않는 깊은 기술적 오류나 성적 하락에는 의욕이 저하됩니다.',
      strengths: '동료의 격려나 교사의 적절한 힌트가 주어지면 금방 슬럼프를 털고 일어납니다.',
      cautions: '과정 3~4개월 차에 찾아오는 "중간 슬럼프(Plateau 현상)" 시기에 흥미를 잃을 수 있습니다.',
      strategies: [
        '"지금 겪는 정체기는 뇌가 기술을 내재화하는 자연스러운 훈련 과정"임을 상기하세요.',
        '자격증 기출문제를 풀 때 쉬운 문제부터 성공률을 높여 효능감을 회복하세요.'
      ],
      counselorTips: [
        '중간 평가 시점에 모든 훈련생이 겪는 정상적인 정체 곡선임을 설명하며 심리적 지지를 제공하세요.'
      ]
    },
    low: {
      traits: '실습 중 한두 번 에러가 발생하거나 과제가 막히면 쉽게 좌절하고 자포자기하는 경향을 보입니다.',
      strengths: '어려움에 대한 회피 반응이 빨라 심각한 장비 파손이나 극단적 스트레스를 피하려는 본능이 있습니다.',
      cautions: '자격증 1차 모의평가 불합격 시 훈련 포기 및 조기 퇴교로 이어질 위험이 매우 큽니다.',
      strategies: [
        '실패를 "무능력의 증거"가 아니라 "현장 엔지니어가 거쳐야 할 당연한 테스트"로 프레임을 전환하세요.',
        '단번에 완벽한 작품을 만들려 하지 말고 1단계 기초 기능만 작동시키는 것부터 단계별로 시도하세요.'
      ],
      counselorTips: [
        '학습된 무기력 상태인지 확인하고, 아주 작은 성공 경험(Small Win)을 교사가 직접 개입해 만들어주세요.',
        '실패했을 때 야단치기보다 "여기까지 온 것도 좋은 시도였다"는 과정 중심 칭찬을 건네세요.'
      ]
    }
  },
  action: {
    high: {
      traits: '이론보다 실습 기자재를 직접 만지고 실물을 조작하며 체험을 통해 가장 빠르게 배우는 현장형 학습자입니다.',
      strengths: '실기 작업 속도가 매우 빠르고 현장 감각과 손기술 습득력이 뛰어나며 프로젝트 결과물이 풍성합니다.',
      cautions: '원리나 안전 수칙, 이론적 배경을 건너뛰고 주먹구구식으로 작업하다가 장비 손상이나 안전사고를 낼 위험이 있습니다.',
      strategies: [
        '기자재를 가동하기 전 반드시 "안전 체크리스트 3단계"를 육안으로 확인하는 절차를 습관화하세요.',
        '실습 전 10분간 관련 회로도나 설계 공식의 원리를 가볍게 메모한 후 작업에 돌입하세요.'
      ],
      counselorTips: [
        '에너지가 넘치는 현장형 인재이므로 실습 조교나 장비 관리 반장 역할을 맡기면 큰 동기부여를 받습니다.',
        '다만 안전 규정 준수에 대해서는 엄격한 기준을 적용하여 위험을 미연에 방지하세요.'
      ]
    },
    average: {
      traits: '교사의 시연과 이론 설명을 충분히 들은 후 표준 작업 지침서에 따라 안정적으로 실습을 진행합니다.',
      strengths: '사고 위험이 적고 지침을 충실히 준수하며 규격에 맞는 표준 결과물을 성실히 도출합니다.',
      cautions: '새로운 장비나 예외 상황이 닥쳤을 때 스스로 손을 대지 못하고 주저할 수 있습니다.',
      strategies: [
        '기존 예제 매뉴얼을 그대로 따라 한 뒤, 수치나 파라미터를 살짝 바꾸어 독자적으로 구동해보세요.'
      ],
      counselorTips: [
        '안전한 시뮬레이션 환경을 마련해주고 틀려도 장비가 망가지지 않음을 확인시켜주며 실천을 독려하세요.'
      ]
    },
    low: {
      traits: '실습 기자재 조작을 두려워하거나 이론 책만 파고들며 실제 손작업 착수를 극도로 망설입니다.',
      strengths: '교재와 이론 지식의 이해도가 높고 문서 작성이나 계획서 검토에 꼼꼼합니다.',
      cautions: '국가기술자격증 실기 시험에서 제한 시간 내 작업을 완료하지 못해 시간 초과 불합격할 위험이 큽니다.',
      strategies: [
        '실습 과정을 1단계(전원 켜기), 2단계(세팅), 3단계(가동)로 세분화하여 아주 작은 단위부터 손으로 직접 만져보세요.',
        '실기 시험 타이머를 켜두고 손놀림 속도를 점진적으로 단축하는 훈련을 하세요.'
      ],
      counselorTips: [
        '기자재 조작에 대한 불안(파손에 대한 두려움, 조작 미숙)의 원인을 1:1로 확인하고 교사가 옆에서 손을 잡아주며 1회 완주를 지원하세요.'
      ]
    }
  },
  collaboration: {
    high: {
      traits: '동료 훈련생들과 교류하며 함께 실습하는 것을 즐기고, 팀 내에서 의견을 모으고 역할을 나누는 데 탁월합니다.',
      strengths: '우수한 팀워크, 원활한 의사소통, 팀 분위기 메이커 역할을 수행하며 협업 포트폴리오 완성도가 높습니다.',
      cautions: '개별 단독 자격증 시험이나 혼자 해결해야 할 기초 기술 평가에서 개인 역량이 팀 역량에 가려질 수 있습니다.',
      strategies: [
        '팀 작업과 별도로 개인 실습 과제는 완전히 본인의 힘만으로 100% 독립 수행해보는 시간을 확보하세요.',
        '팀 프로젝트 시 기여한 본인만의 파트와 직무 역할을 포트폴리오에 명확히 기술하세요.'
      ],
      counselorTips: [
        '조별 프로젝트의 조장이나 소통 창구로 위임하되, 팀 내 무임승차자가 발생하지 않도록 공정한 업무 분담 룰을 제시해주세요.'
      ]
    },
    average: {
      traits: '조별 과제가 주어지면 맡은 바 몫을 성실히 수행하나, 굳이 먼저 팀을 주도하거나 갈등에 적극 개입하지는 않습니다.',
      strengths: '팀 내 마찰을 일으키지 않는 훌륭한 팔로워십을 발휘하며 묵묵히 지원합니다.',
      cautions: '조장의 리더십이나 팀원 역량에 따라 프로젝트 성과의 편차가 크게 나타납니다.',
      strategies: [
        '팀 회의 때 매번 최소 1개 이상의 대안 아이디어를 제안하는 적극성을 훈련해보세요.'
      ],
      counselorTips: [
        '소외되지 않도록 조별 진행 회의 시 발언 기회를 고루 부여하고 훈련생의 의견을 경청해주세요.'
      ]
    },
    low: {
      traits: '모든 실습을 혼자 진행하는 것을 훨씬 편안해하며, 타인과의 조별 과제나 역할 분담에 상당한 피로감을 느낍니다.',
      strengths: '개인 독립 실습 과제에서 놀라운 집중력을 보이며 주체적인 사고력이 뛰어납니다.',
      cautions: '기업 현장에서 필수적인 협업 커뮤니케이션 면접에서 부정적 평가를 받거나 조별 프로젝트에서 고립될 수 있습니다.',
      strategies: [
        '대규모 팀 작업 대신 2인 1조 짝 프로그래밍(Pair Practice)과 같은 소규모 협업부터 연습하세요.',
        '동료의 코딩/회로 작업에 대해 긍정적인 피드백 한마디를 건네는 작은 라포 형성을 시도해보세요.'
      ],
      counselorTips: [
        '내성적이거나 연령 차이(중장년 vs 20대)로 인한 소통 단절인지 파악하고, 성향이 원만하고 배려심 있는 동료와 짝을 맺어주세요.'
      ]
    }
  },
  help_seeking: {
    high: {
      traits: '질문을 부끄러워하지 않고, 실습 중 막히는 지점을 명확히 파악하여 교사와 동료에게 적시에 도움을 청합니다.',
      strengths: '학습 결손이 발생하지 않아 훈련 진도를 놓치지 않으며 교사와의 유대감이 돈독합니다.',
      cautions: '스스로 충분히 고민해보지 않고 사소한 오류마다 즉각 교사를 부르는 "과잉 의존"으로 변질될 수 있습니다.',
      strategies: [
        '교사를 부르기 전 "에러 원인 추정 1가지", "내가 시도해본 해결책 1가지"를 정리한 후 질문하는 습관을 들이세요.'
      ],
      counselorTips: [
        '질문하는 태도를 칭찬하되, 즉각 답을 주기보다는 "자네는 어떻게 생각하나?"라는 역질문으로 자립적 문제해결력을 키워주세요.'
      ]
    },
    average: {
      traits: '정말 심각한 문제가 터졌을 때는 질문하나, 일상적인 궁금증이나 사소한 애매함은 대충 넘기는 편입니다.',
      strengths: '교사의 시간을 과도하게 빼앗지 않으며 스스로 해결해보려는 건강한 자립심을 갖추고 있습니다.',
      cautions: '초기에 쉽게 잡을 수 있었던 개념 오류가 누적되어 나중에 큰 실습 실패로 번질 수 있습니다.',
      strategies: [
        '궁금한 점을 실습 노트 여백에 적어두었다가 수업 종료 전 질의응답 시간에 일괄 질문하세요.'
      ],
      counselorTips: [
        '교사가 실습실을 순회할 때 먼저 다가가 "어디 막히는 부분 없나요?"라고 라운딩 지도를 펼쳐주세요.'
      ]
    },
    low: {
      traits: '남에게 아쉬운 소리를 하거나 무식해 보일까 봐 극도로 두려워하여, 실습이 멈춰도 끝까지 도움을 청하지 못합니다.',
      strengths: '극도의 자기 통제와 독립성을 지향하며 남에게 폐를 끼치지 않으려 합니다.',
      cautions: '장비 결함이나 소프트웨어 오류를 혼자 끙끙 앓다 수업 전체를 날려버리거나 중도 포기할 위험이 높습니다.',
      strategies: [
        '교사에게 질문하는 것은 "학생의 당연한 권리이자 교사가 가장 바라는 피드백"임을 기억하세요.',
        '직접 대면 질문이 부담스럽다면 교내 온라인 메신저나 질의응답 게시판을 활용해보세요.'
      ],
      counselorTips: [
        '이 질문 장벽을 깨는 것이 이 훈련생의 성공 열쇠입니다. 교사가 비공개 1:1 상담을 통해 질문에 대한 심리적 안전감을 구축해주세요.'
      ]
    }
  },
  confidence: {
    high: {
      traits: '자신의 기술 습득 능력과 미래 취업 가능성에 대한 확고한 신념과 긍정적 기대를 가지고 있습니다.',
      strengths: '새로운 고난도 실습에 당당히 도전하며 면접이나 발표 자리에서 위축되지 않고 실력을 발휘합니다.',
      cautions: '과도한 근거 없는 낙관으로 인해 자격증 필기 기초 이론 암기를 소홀히 하거나 방심할 수 있습니다.',
      strategies: [
        '높은 자신감을 바탕으로 국가공인 자격증 외에 민간 전문 자격이나 경진대회 출품에 도전해보세요.'
      ],
      counselorTips: [
        '열정을 지지하되 실전 평가의 엄격한 채점 기준을 제시하여 디테일한 기술 완성도를 다듬도록 이끌어주세요.'
      ]
    },
    average: {
      traits: '자신의 역량을 현실적으로 인식하고 있으며, 노력한 만큼 결과가 나올 것이라는 무난한 효능감을 갖추고 있습니다.',
      strengths: '자만하지 않고 착실하게 정규 커리큘럼을 이수하며 꾸준한 페이스를 유지합니다.',
      cautions: '까다로운 면접 질문이나 낯선 실기 시험장에서 긴장으로 인해 평소 실력을 온전히 발휘하지 못할 수 있습니다.',
      strategies: [
        '실전과 동일한 제한 시간 모의테스트를 3회 이상 거쳐 시험장 공포증을 둔감화시키세요.'
      ],
      counselorTips: [
        '모의면접과 1분 스피치 훈련을 지원하여 본인의 강점을 언어로 유려하게 표현하는 연습을 시켜주세요.'
      ]
    },
    low: {
      traits: '이전의 실패 경험, 긴 공백기, 비전공이라는 핸디캡으로 인해 ‘내가 과연 취업할 수 있을까’ 깊이 불안해합니다.',
      strengths: '자신을 낮추고 매우 겸손하며 교사의 지도 사항을 한 글자도 놓치지 않고 경청하려 합니다.',
      cautions: '사소한 실수에도 자책하며 심리적 위축으로 인해 면접이나 실기 시험장에서 손을 떠는 등 과도한 불안을 겪습니다.',
      strategies: [
        '타인과의 비교를 멈추고 "어제의 나"보다 오늘 한 가지 더 알게 된 기술에 집중하는 성장 일기를 쓰세요.',
        '자격증 모의고사에서 틀린 문제보다 "맞힌 문제"의 비중을 확인하며 기초 역량을 확인하세요.'
      ],
      counselorTips: [
        '과거 경력단절이나 퇴직 트라우마를 보듬어주고, 유사한 비전공 배경에서 취업에 성공한 선배들의 데이터를 제시해주세요.'
      ]
    }
  },
  reflection: {
    high: {
      traits: '실습 후 결과물을 냉철히 분석하고 교사의 피드백을 스펀지처럼 흡수하여 지속적으로 작업 방식을 개선합니다.',
      strengths: '메타인지가 탁월하여 같은 실수를 두 번 반복하지 않으며 실무 테크니션에서 엔지니어로 급성장합니다.',
      cautions: '지나치게 자가 반성에 몰입하여 본인의 잘한 점을 인정하지 못하고 자존감이 낮아질 수 있습니다.',
      strategies: [
        '개선점(KPT의 Problem)만 보지 말고, 잘한 점(Keep)도 반드시 동등한 비율로 기록하세요.'
      ],
      counselorTips: [
        '높은 성찰력을 인정해주고, 훈련생이 도출한 개선 아이디어를 전체 학급의 우수 개선 사례로 소개해 자긍심을 고취하세요.'
      ]
    },
    average: {
      traits: '교사가 지적한 오답이나 감점 요인은 수용하여 고치나, 스스로 새로운 개선안을 능동적으로 찾아내지는 않습니다.',
      strengths: '지도 교사의 기술적 피드백에 대한 수용 태도가 양호하고 무리 없는 안정적 성장을 보입니다.',
      cautions: '시험이 끝난 후 오답 노트를 만들지 않아 유사한 변형 문제에서 다시 감점될 여지가 있습니다.',
      strategies: [
        '실습 실패 사례를 버리지 말고 "오류 발생 원인 - 조치 사항 - 재발 방지책" 3줄 오답 노트를 작성하세요.'
      ],
      counselorTips: [
        '단순히 정답을 고쳐주기보다 "왜 이 회로가 단락되었을까?" 질문을 던져 스스로 인과관계를 설명하게 유도하세요.'
      ]
    },
    low: {
      traits: '점수나 결과물의 합격 여부에만 관심을 두고, 왜 실패했는지나 어떻게 고쳐야 할지에 대한 복습을 기피합니다.',
      strengths: '과거의 실수에 연연하지 않고 빠르게 다음 실습으로 훌훌 털고 넘어가는 쿨한 태도가 있습니다.',
      cautions: '잘못된 작업 습관이나 버그 패턴이 고착화되어 실전 현장에서 치명적인 불량을 유발할 위험이 있습니다.',
      strategies: [
        '과제 제출 전 반드시 "3분 셀프 검수 타임"을 갖고 규격 미달 항목이 없는지 확인 후 서명하세요.'
      ],
      counselorTips: [
        '오답 정리나 실습 복기 보고서 제출을 정규 평가 점수에 일부 반영하여 최소한의 성찰을 유도하세요.'
      ]
    }
  }
};

export function calculateDiagnosticResults(traineeInfo: TraineeInfo, answers: Record<number, number>): DiagnosticResult {
  const factorScores: Record<FactorId, FactorScoreResult> = {} as any;

  let totalRawScoreSum = 0;
  let totalItemCount = 0;

  for (const factor of FACTORS) {
    const factorQuestions = QUESTIONS.filter(q => q.factorId === factor.id);
    let factorScoreSum = 0;

    for (const q of factorQuestions) {
      const raw = answers[q.id] || 3; // 기본값
      const scored = q.isReverse ? (7 - raw) : raw;
      factorScoreSum += scored;
      totalRawScoreSum += scored;
      totalItemCount++;
    }

    const rawMean = Number((factorScoreSum / factorQuestions.length).toFixed(2));
    
    // T-Score = 50 + 10 * ((rawMean - normMean) / normSD)
    const zScore = (rawMean - factor.mean) / factor.sd;
    const tScore = Math.round(50 + 10 * zScore);

    // Percentile approximation
    // standard normal CDF approximation
    const p = Math.max(1, Math.min(99, Math.round(normalCDF(zScore) * 100)));

    // Level determination
    let level: ScoreLevel = 'average';
    let levelLabel = '보통';

    if (tScore < 35 || rawMean < 2.5) {
      level = 'very_low';
      levelLabel = '매우 낮음';
    } else if (tScore < 45 || rawMean < 3.5) {
      level = 'low';
      levelLabel = '낮음';
    } else if (tScore < 55 || rawMean < 4.5) {
      level = 'average';
      levelLabel = '보통';
    } else if (tScore < 65 || rawMean < 5.4) {
      level = 'high';
      levelLabel = '높음';
    } else {
      level = 'very_high';
      levelLabel = '매우 높음';
    }

    const interpCategory = (level === 'high' || level === 'very_high') ? 'high' : (level === 'low' || level === 'very_low') ? 'low' : 'average';
    const interpData = PROFILE_INTERPRETATIONS[factor.id][interpCategory];

    factorScores[factor.id] = {
      factorId: factor.id,
      factorName: factor.name,
      rawMean,
      tScore,
      percentile: p,
      level,
      levelLabel,
      characteristics: interpData.traits,
      strengths: interpData.strengths,
      cautions: interpData.cautions,
      strategies: interpData.strategies,
      counselorTips: interpData.counselorTips
    };
  }

  const overallMean = Number((totalRawScoreSum / totalItemCount).toFixed(2));

  // Sort factors by tScore descending
  const factorList = Object.values(factorScores);
  const sortedDesc = [...factorList].sort((a, b) => b.tScore - a.tScore);
  const topStrengths = sortedDesc.slice(0, 3);
  const growthAreas = sortedDesc.slice(-3).reverse();

  return {
    traineeInfo,
    answers,
    factorScores,
    overallMean,
    topStrengths,
    growthAreas,
    completedAt: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
  };
}

function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (x > 0) prob = 1 - prob;
  return prob;
}

// Sample pre-populated profiles for counselor quick testing and demonstration
export const SAMPLE_PROFILES: { id: string; name: string; title: string; trainee: TraineeInfo; answers: Record<number, number> }[] = [
  {
    id: 'sample-1',
    name: '김민수 (34세)',
    title: '스마트 기계설계·CAD 실무과정 | 자격증 취득 & 취업 목표형',
    trainee: {
      name: '김민수',
      courseName: '스마트 기계설계 및 3D CAD/CAM 실무',
      ageGroup: '30대',
      goalType: '신규취업',
      testDate: '2026. 09. 06'
    },
    answers: {
      1: 6, 2: 6, 3: 5, 4: 1, 5: 6, 6: 1, // goal high
      7: 5, 8: 2, 9: 5, 10: 5, 11: 2, 12: 5, // reg high
      13: 6, 14: 2, 15: 5, 16: 6, 17: 1, 18: 6, // pers high
      19: 6, 20: 1, 21: 5, 22: 6, 23: 2, 24: 5, // action high
      25: 3, 26: 5, 27: 4, 28: 3, 29: 4, 30: 3, // collab low
      31: 4, 32: 3, 33: 4, 34: 3, 35: 2, 36: 4, // help avg
      37: 5, 38: 2, 39: 6, 40: 2, 41: 5, 42: 6, // conf high
      43: 5, 44: 2, 45: 5, 46: 4, 47: 2, 48: 5  // refl high
    }
  },
  {
    id: 'sample-2',
    name: '이영희 (48세)',
    title: '스마트 웹&앱 풀스택 개발과정 | 40대 중장년 경력전환형',
    trainee: {
      name: '이영희',
      courseName: '스마트 풀스택 웹&클라우드 개발자 과정',
      ageGroup: '40대',
      goalType: '이직/경력전환',
      testDate: '2026. 09. 06'
    },
    answers: {
      1: 6, 2: 5, 3: 6, 4: 1, 5: 6, 6: 1, // goal high
      7: 6, 8: 1, 9: 6, 10: 6, 11: 1, 12: 4, // reg high
      13: 5, 14: 3, 15: 5, 16: 4, 17: 2, 18: 5, // pers high/avg
      19: 4, 20: 3, 21: 3, 22: 4, 23: 4, 24: 3, // action avg/low
      25: 5, 26: 2, 27: 6, 28: 5, 29: 2, 30: 5, // collab high
      31: 3, 32: 5, 33: 4, 34: 3, 35: 5, 36: 4, // help low (체면, 불안)
      37: 3, 38: 6, 39: 4, 40: 5, 41: 3, 42: 4, // conf low (연령 불안)
      43: 6, 44: 1, 45: 6, 46: 5, 47: 1, 48: 6  // refl high
    }
  },
  {
    id: 'sample-3',
    name: '박철호 (27세)',
    title: '전기설비 및 자동제어 국기과정 | 팀워크 우수 & 목표 탐색형',
    trainee: {
      name: '박철호',
      courseName: '스마트 전기설비 및 PLC 자동제어 실무',
      ageGroup: '20대',
      goalType: '역량강화',
      testDate: '2026. 09. 06'
    },
    answers: {
      1: 3, 2: 3, 3: 4, 4: 4, 5: 4, 6: 4, // goal avg/low
      7: 4, 8: 3, 9: 4, 10: 4, 11: 3, 12: 4, // reg avg
      13: 4, 14: 3, 15: 4, 16: 4, 17: 3, 18: 4, // pers avg
      19: 5, 20: 2, 21: 4, 22: 5, 23: 2, 24: 4, // action high
      25: 6, 26: 1, 27: 6, 28: 6, 29: 1, 30: 6, // collab very high
      31: 5, 32: 2, 33: 5, 34: 6, 35: 2, 36: 5, // help high
      37: 4, 38: 3, 39: 5, 40: 3, 41: 4, 42: 5, // conf avg
      43: 4, 44: 3, 45: 4, 46: 4, 47: 3, 48: 3  // refl avg
    }
  }
];
