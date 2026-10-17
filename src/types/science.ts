export type LabId =
  | 'float-sink'
  | 'plant-garden'
  | 'color-mixing'
  | 'magnet-lab'
  | 'weather-seasons';

export interface FloatSinkItem {
  id: string;
  name: string;
  emoji: string;
  floats: boolean;
  material: string;
  childDescription: string;
  voicePrompt: string;
}

export interface MagnetItem {
  id: string;
  name: string;
  emoji: string;
  isMagnetic: boolean;
  material: string;
  funFact: string;
}

export interface ScienceSticker {
  id: string;
  labId: LabId;
  title: string;
  emoji: string;
  badgeName: string;
  unlocked: boolean;
}

export interface TeacherLessonGuide {
  labId: LabId;
  title: string;
  ageGroup: string;
  coreConcept: string;
  keyVocabulary: string[];
  circleTimePrompt: string;
  handsOnClassroomActivity: string;
  scientificObservation: string;
  materialsNeeded: string[];
}
