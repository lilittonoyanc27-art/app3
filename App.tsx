/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Volume2, 
  Trophy,
  Lightbulb,
  MessageSquare
} from 'lucide-react';

// --- Types ---

interface QuizItem {
  id: number;
  spanish: string;
  armenian: string;
  correctVowelIndex: number; // Index of the stressed vowel in the string
}

// --- Data ---

const QUIZ_DATA: QuizItem[] = [
  { id: 1, spanish: 'Casa', armenian: 'Տուն', correctVowelIndex: 1 },
  { id: 2, spanish: 'Perro', armenian: 'Շուն', correctVowelIndex: 1 },
  { id: 3, spanish: 'Libro', armenian: 'Գիրք', correctVowelIndex: 1 },
  { id: 4, spanish: 'Mano', armenian: 'Ձեռք', correctVowelIndex: 1 },
  { id: 5, spanish: 'Gato', armenian: 'Կատու', correctVowelIndex: 1 },
  { id: 6, spanish: 'Vino', armenian: 'Գինի', correctVowelIndex: 1 },
  { id: 7, spanish: 'Hijo', armenian: 'Որդի', correctVowelIndex: 1 },
  { id: 8, spanish: 'Calle', armenian: 'Փողոց', correctVowelIndex: 1 },
  { id: 9, spanish: 'Amigo', armenian: 'Ընկեր', correctVowelIndex: 2 },
  { id: 10, spanish: 'Examen', armenian: 'Քննություն', correctVowelIndex: 2 },
  { id: 11, spanish: 'Joven', armenian: 'Երիտասարդ', correctVowelIndex: 1 },
  { id: 12, spanish: 'Crisis', armenian: 'Ճգնաժամ', correctVowelIndex: 2 },
  { id: 13, spanish: 'Lunes', armenian: 'Երկուշաբթի', correctVowelIndex: 1 },
  { id: 14, spanish: 'Papel', armenian: 'Թուղթ', correctVowelIndex: 3 },
  { id: 15, spanish: 'Hablar', armenian: 'Խոսել', correctVowelIndex: 4 },
  { id: 16, spanish: 'Comer', armenian: 'Ուտել', correctVowelIndex: 3 },
  { id: 17, spanish: 'Vivir', armenian: 'Ապրել', correctVowelIndex: 4 },
  { id: 18, spanish: 'Ciudad', armenian: 'Քաղաք', correctVowelIndex: 4 },
  { id: 19, spanish: 'Verdad', armenian: 'Ճշմարտություն', correctVowelIndex: 4 },
  { id: 20, spanish: 'Azul', armenian: 'Կապույտ', correctVowelIndex: 2 },
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedVowelIndex, setSelectedVowelIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = QUIZ_DATA[currentIdx];

  const isVowel = (char: string) => {
    return ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú'].includes(char.toLowerCase());
  };

  const handleLetterClick = (index: number) => {
    if (feedback) return;
    if (!isVowel(currentItem.spanish[index])) return;
    setSelectedVowelIndex(index);
  };

  const handleCheck = () => {
    if (selectedVowelIndex === null || feedback) return;
    if (selectedVowelIndex === currentItem.correctVowelIndex) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_DATA.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedVowelIndex(null);
      setFeedback(null);
    } else {
      setIsFinished(true);
    }
  };

  const progress = ((currentIdx + 1) / QUIZ_DATA.length) * 100;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#38bdf8] bg-gradient-to-b from-[#7dd3fc] to-[#38bdf8] flex items-center justify-center p-6 font-sans text-white">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20 text-center max-w-md w-full shadow-2xl"
        >
          <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-400" />
          <h1 className="text-4xl font-bold mb-4">Գերազանց է!</h1>
          <p className="text-xl opacity-90 mb-8">Դուք հաջողությամբ որոշեցիք բոլոր բառերի շեշտի տեղը:</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-white text-[#1e40af] rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
          >
            Սկսել նորից
          </button>
        </motion.div>
      </div>
    );
  }

  if (lives === 0) {
    return (
      <div className="min-h-screen bg-[#38bdf8] flex items-center justify-center p-6 font-sans text-white">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20 text-center max-w-md w-full"
        >
          <XCircle className="w-24 h-24 mx-auto mb-6 text-red-400" />
          <h1 className="text-4xl font-bold mb-4">Խաղն ավարտվեց</h1>
          <p className="text-xl opacity-90 mb-8">Փորձեք ևս մեկ անգամ սովորել շեշտադրման կանոնները:</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-white text-[#1e40af] rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all"
          >
            Կրկնել
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#38bdf8] bg-gradient-to-b from-[#7dd3fc] to-[#38bdf8] flex flex-col font-sans text-white overflow-hidden">
      {/* Header */}
      <header className="p-6 flex items-center gap-4 max-w-2xl mx-auto w-full">
        <button className="p-2 hover:bg-black/10 rounded-full transition-colors">
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex-1 h-3 bg-white/30 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>

        <div className="relative">
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full border border-white/30">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="font-bold text-lg text-white">{lives}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 py-4 max-w-2xl mx-auto w-full overflow-y-auto custom-scrollbar">
        {/* Theory Box - Matching screenshot style */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-6 mb-8 shadow-xl text-gray-800 text-sm leading-relaxed border-b-4 border-gray-200 w-full"
        >
          <p className="font-bold mb-2 text-[#1e40af] flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Շեշտադրման կանոններ
          </p>
          <p className="text-gray-600">
            Եթե բառը վերջանում է ձայնավորով (a, e, i, o, u) կամ n կամ s բաղաձայններով, ապա շեշտն ընկնում է նախավերջին վանկի ձայնավորի վրա: 
            Եթե բառը վերջանում է ցանկացած այլ բաղաձայնով (բացի n կամ s), ապա շեշտն ընկնում է վերջին վանկի ձայնավորի վրա: 
            Եթե բառը չի հետևում վերոհիշյալ երկու կանոններին, ապա ձայնավորի վրա դրվում է գրավոր շեշտ (´):
          </p>
        </motion.div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white drop-shadow-sm mb-1">
            Որոշիր շեշտի տեղը
          </h2>
          <p className="text-white/70 text-sm">
            Ընտրեք ճիշտ տարբերակը
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
            {/* Word Card - Matching screenshot "Они живут в этой стране" style */}
            <div className="w-full bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl mb-8 relative border-b-4 border-gray-200">
              <div className="text-blue-400 text-xs mb-4 font-bold uppercase tracking-widest">
                {currentItem.armenian}
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {currentItem.spanish.split('').map((char, idx) => {
                  const clickable = isVowel(char);
                  const isSelected = selectedVowelIndex === idx;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => handleLetterClick(idx)}
                      disabled={!clickable || !!feedback}
                      className={`text-4xl font-bold transition-all duration-200 px-3 py-2 rounded-2xl border-b-4
                        ${clickable 
                          ? isSelected 
                            ? 'bg-[#1e40af] text-white border-[#1e3a8a] scale-110' 
                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                          : 'bg-transparent text-gray-400 border-transparent cursor-default'
                        }
                      `}
                    >
                      {char}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4">
               <div className="bg-white/10 p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform border border-white/20">
                  <Volume2 className="w-6 h-6 text-white" />
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-6 max-w-2xl mx-auto w-full">
        <button 
          onClick={feedback ? handleNext : handleCheck}
          disabled={selectedVowelIndex === null}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl uppercase tracking-wider border-b-4
            ${selectedVowelIndex === null 
              ? 'bg-white/20 text-white/50 border-transparent cursor-not-allowed' 
              : 'bg-[#1e40af] text-white border-[#1e3a8a] hover:bg-[#1e3a8a] active:scale-[0.98]'
            }`}
        >
          {feedback ? 'Շարունակել' : 'Ստուգել'}
        </button>
      </footer>

      {/* Feedback Overlay - Matching screenshot style */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            className={`fixed bottom-0 left-0 right-0 p-8 pb-10 z-50 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.3)]
              ${feedback === 'correct' ? 'bg-[#22c55e]' : 'bg-[#ef4444]'}`}
          >
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-2xl shadow-inner">
                    {feedback === 'correct' ? (
                      <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />
                    ) : (
                      <XCircle className="w-8 h-8 text-[#ef4444]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {feedback === 'correct' ? 'Ճիշտ է!' : 'Սխալ է'}
                    </h3>
                    <p className="text-white/90 font-medium">
                      {currentItem.spanish} — {currentItem.armenian}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleNext}
                className="w-full bg-[#1e40af] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#1e3a8a] transition-all shadow-lg border-b-4 border-[#1e3a8a]"
              >
                Շարունակել
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
