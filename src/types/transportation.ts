export type TransportCategory = 'land' | 'water' | 'air' | 'space';

export type TransportPurpose = 'commute' | 'emergency' | 'cargo' | 'recreation';

export type VehicleSoundType =
  | 'car'
  | 'train'
  | 'boat'
  | 'plane'
  | 'helicopter'
  | 'bike'
  | 'siren'
  | 'rocket';

export interface Vehicle {
  id: string;
  name: string;
  emoji: string;
  category: TransportCategory;
  purpose: TransportPurpose;
  whereItTravels: string;
  wheelsDescription: string;
  soundType: VehicleSoundType;
  soundText: string;
  kidFunFact: string;
  voicePrompt: string;
}

export interface TransportBadge {
  id: string;
  title: string;
  emoji: string;
  badgeName: string;
  requirement: string;
  unlocked: boolean;
}

export interface TeacherLessonPlan {
  id: string;
  title: string;
  ageGroup: string;
  coreObjective: string;
  keyVocabulary: string[];
  circleTimeQuestion: string;
  handsOnClassroomActivity: string;
  scientificObservation: string;
  materialsNeeded: string[];
}

export interface HandsOnStep {
  stepNumber: number;
  title: string;
  titleId: string;
  instruction: string;
  instructionId: string;
  emoji: string;
  stepType?:
    | 'sorting-1'
    | 'sorting-2'
    | 'sorting-3'
    | 'sorting-4'
    | 'sound-1'
    | 'sound-2'
    | 'sound-3'
    | 'sound-4'
    | 'rescue-1'
    | 'rescue-2'
    | 'rescue-3'
    | 'rescue-4'
    | 'drive-1'
    | 'drive-2'
    | 'drive-3'
    | 'drive-4'
    | 'car-craft-1'
    | 'car-craft-2'
    | 'car-craft-3'
    | 'car-craft-4'
    | 'car-craft-5';
  imageAlt?: string;
  imageAltId?: string;
}

export interface HandsOnActivity {
  id: string;
  labId: 'sorting' | 'car-craft' | 'sound-quiz' | 'rescue' | 'drive';
  title: string;
  titleId: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  materials: { name: string; nameId: string; emoji: string }[];
  steps: HandsOnStep[];
  reflectionQuestions: string[];
  reflectionQuestionsId: string[];
  learningBenefit: string;
  learningBenefitId: string;
}

