import React, { useState } from 'react';
import { X, BookOpen, Printer, Award, Sparkles, Check, CheckCircle2, ChevronRight } from 'lucide-react';
import { TEACHER_GUIDES } from '../data/scienceContent';
import { TeacherLessonGuide, LabId } from '../types/science';
import { soundManager } from '../utils/soundEffects';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLabId?: LabId;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({
  isOpen,
  onClose,
  activeLabId = 'float-sink',
}) => {
  const [selectedGuideId, setSelectedGuideId] = useState<LabId>(activeLabId);
  const [activeTab, setActiveTab] = useState<'guides' | 'certificate'>('guides');

  // Certificate Generator State
  const [studentName, setStudentName] = useState<string>('');
  const [teacherName, setTeacherName] = useState<string>('Ms. Rosita');
  const [awardTitle, setAwardTitle] = useState<string>('Junior Science Explorer');
  const [certificateDate, setCertificateDate] = useState<string>(
    new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  );

  if (!isOpen) return null;

  const currentGuide = TEACHER_GUIDES.find((g) => g.labId === selectedGuideId) || TEACHER_GUIDES[0];

  const handlePrint = () => {
    soundManager.playPop(520);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-amber-200 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none">
        
        {/* Modal Top Header (Hidden on Print) */}
        <div className="bg-amber-600 text-white px-6 py-4 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display">Teacher Resource & Circle Time Hub</h2>
              <p className="text-xs text-amber-100">Preschool Science Curriculum (Ages 3–4)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch between guides and printable certificate */}
            <div className="flex items-center bg-amber-700/60 p-1 rounded-xl">
              <button
                onClick={() => {
                  soundManager.playPop(480);
                  setActiveTab('guides');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'guides' ? 'bg-white text-amber-950 shadow-xs' : 'text-amber-100 hover:text-white'
                }`}
              >
                Lesson Plans
              </button>
              <button
                onClick={() => {
                  soundManager.playPop(520);
                  setActiveTab('certificate');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'certificate' ? 'bg-white text-amber-950 shadow-xs' : 'text-amber-100 hover:text-white'
                }`}
              >
                Award Certificate
              </button>
            </div>

            <button
              onClick={() => {
                soundManager.playPop(300);
                onClose();
              }}
              className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors ml-2"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          
          {/* TAB 1: LESSON PLANS */}
          {activeTab === 'guides' && (
            <div className="space-y-6">
              
              {/* Unit Selector Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {TEACHER_GUIDES.map((guide) => (
                  <button
                    key={guide.labId}
                    onClick={() => {
                      soundManager.playPop(450);
                      setSelectedGuideId(guide.labId);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                      selectedGuideId === guide.labId
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-amber-50 text-amber-950 hover:bg-amber-100 border border-amber-200/80'
                    }`}
                  >
                    {guide.title.split('(')[0].trim()}
                  </button>
                ))}
              </div>

              {/* Guide Detailed Card */}
              <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-200/70 space-y-5">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                    Preschool Core Unit
                  </span>
                  <h3 className="text-xl font-extrabold text-amber-950 font-display mt-0.5">
                    {currentGuide.title}
                  </h3>
                  <p className="text-xs text-amber-900/80 mt-1">
                    Target Development Level: <span className="font-semibold">{currentGuide.ageGroup}</span>
                  </p>
                </div>

                {/* Big Learning Concept */}
                <div className="bg-white rounded-xl p-4 border border-amber-200/60 shadow-2xs">
                  <h4 className="text-xs font-extrabold text-amber-950 uppercase tracking-wider mb-1">
                    🎯 Core Science Concept
                  </h4>
                  <p className="text-sm text-slate-800 font-medium leading-relaxed">
                    {currentGuide.coreConcept}
                  </p>
                </div>

                {/* Vocabulary for Age 3-4 */}
                <div className="bg-white rounded-xl p-4 border border-amber-200/60 shadow-2xs">
                  <h4 className="text-xs font-extrabold text-amber-950 uppercase tracking-wider mb-2">
                    🗣️ Key Vocabulary for 3–4 Year Olds
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentGuide.keyVocabulary.map((word) => (
                      <span
                        key={word}
                        className="px-2.5 py-1 bg-amber-100 text-amber-950 font-bold text-xs rounded-lg border border-amber-200"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Circle Time Conversation Starter */}
                <div className="bg-sky-50 rounded-xl p-4 border border-sky-200 shadow-2xs">
                  <h4 className="text-xs font-extrabold text-sky-950 uppercase tracking-wider mb-1">
                    💬 Circle Time Discussion Starter
                  </h4>
                  <p className="text-sm text-sky-900 font-medium italic">
                    "{currentGuide.circleTimePrompt}"
                  </p>
                </div>

                {/* Hands-On Classroom Extension Activity */}
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 shadow-2xs">
                  <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider mb-1">
                    🧪 Hands-On Classroom Sensory Activity
                  </h4>
                  <p className="text-sm text-emerald-950 font-medium mb-3">
                    {currentGuide.handsOnClassroomActivity}
                  </p>
                  
                  <div className="text-xs text-emerald-900/80">
                    <span className="font-bold">Materials Needed:</span>{' '}
                    {currentGuide.materialsNeeded.join(', ')}
                  </div>
                </div>

                {/* Scientific Observation Tip */}
                <div className="text-xs text-amber-900/70 border-t border-amber-200/60 pt-3">
                  <span className="font-bold">Pedagogical Insight:</span> {currentGuide.scientificObservation}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CERTIFICATE GENERATOR */}
          {activeTab === 'certificate' && (
            <div className="space-y-6">
              
              {/* Form Controls (Hidden on print) */}
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 print:hidden grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-amber-950 block mb-1">
                    Student Name:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maya, Leo, Oliver"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-amber-950 block mb-1">
                    Teacher Name:
                  </label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-amber-950 block mb-1">
                    Award Specialty:
                  </label>
                  <select
                    value={awardTitle}
                    onChange={(e) => setAwardTitle(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                  >
                    <option value="Junior Science Explorer">Junior Science Explorer</option>
                    <option value="Master Water Detective">Master Water Detective</option>
                    <option value="Curious Little Botanist">Curious Little Botanist</option>
                    <option value="Rainbow Color Chemist">Rainbow Color Chemist</option>
                    <option value="Super Magnet Master">Super Magnet Master</option>
                    <option value="Sky Weather Watcher">Sky Weather Watcher</option>
                  </select>
                </div>
              </div>

              {/* Printable Certificate Sheet */}
              <div className="bg-white p-8 rounded-3xl border-8 border-double border-amber-500 text-center relative shadow-md print:shadow-none print:border-8 print:p-10">
                {/* Decorative corner stars */}
                <div className="absolute top-4 left-4 text-2xl text-amber-400">⭐</div>
                <div className="absolute top-4 right-4 text-2xl text-amber-400">⭐</div>
                <div className="absolute bottom-4 left-4 text-2xl text-amber-400">⭐</div>
                <div className="absolute bottom-4 right-4 text-2xl text-amber-400">⭐</div>

                <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-3xl mb-3">
                  🎓
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-950 font-display tracking-tight uppercase">
                  Certificate of Wonder
                </h1>
                <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mt-1">
                  WonderLab Preschool Science Adventure
                </p>

                <p className="text-sm text-slate-600 mt-6 italic">
                  This official award is joyfully presented to:
                </p>

                <div className="my-4 pb-2 border-b-2 border-amber-300 max-w-md mx-auto">
                  <span className="text-2xl sm:text-3xl font-black text-amber-900 font-display">
                    {studentName.trim() || 'Our Star Little Scientist'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
                  For showing boundless curiosity, brilliant observation skills, and asking wonderful questions about the world!
                </p>

                <div className="inline-block my-4 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 font-black text-sm">
                  🏆 {awardTitle} 🏆
                </div>

                <div className="mt-8 pt-4 flex items-center justify-between max-w-lg mx-auto text-xs text-slate-600">
                  <div className="text-center">
                    <div className="w-36 border-b border-slate-400 pb-1 font-semibold text-slate-900">
                      {teacherName}
                    </div>
                    <span className="text-[10px] uppercase text-slate-400 mt-0.5 block">
                      Preschool Teacher
                    </span>
                  </div>

                  <div className="text-center">
                    <div className="w-36 border-b border-slate-400 pb-1 font-semibold text-slate-900">
                      {certificateDate}
                    </div>
                    <span className="text-[10px] uppercase text-slate-400 mt-0.5 block">
                      Date of Exploration
                    </span>
                  </div>
                </div>
              </div>

              {/* Print Button (Hidden on print) */}
              <div className="flex justify-end print:hidden">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Certificate</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
