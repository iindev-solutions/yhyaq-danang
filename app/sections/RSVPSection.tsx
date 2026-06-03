import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { RSVP } from '../types/rsvp';

const DEFAULT_RSVPS: RSVP[] = [
  { id: '1', name: 'Айсен Николаев', guestsCount: 2, contact: '@aisen_nik', willDanceOsuokhay: true, willPlaySports: true, dietaryNote: 'Без ограничений', createdAt: '2026-06-01T10:30:00Z' },
  { id: '2', name: 'Сардана Егорова', guestsCount: 1, contact: '+84901234567', willDanceOsuokhay: true, willPlaySports: false, dietaryNote: 'Вегетарианка', createdAt: '2026-06-01T12:15:00Z' },
  { id: '3', name: 'Михаил Торохов (Mytona)', guestsCount: 3, contact: '@mikhail_mytona', willDanceOsuokhay: true, willPlaySports: true, dietaryNote: 'Аллергия на арахис', createdAt: '2026-06-02T08:44:00Z' },
  { id: '4', name: 'Надежда Федорова', guestsCount: 4, contact: '@nadya_f', willDanceOsuokhay: true, willPlaySports: false, dietaryNote: 'С детьми, без ограничений', createdAt: '2026-06-02T14:20:00Z' },
];

export default function RSVPSection() {
  const [rsvpList, setRsvpList] = useState<RSVP[]>(DEFAULT_RSVPS);
  const [formName, setFormName] = useState('');
  const [formGuests, setFormGuests] = useState(1);
  const [formContact, setFormContact] = useState('');
  const [dietary, setDietary] = useState('');
  const [danceOsuokhay, setDanceOsuokhay] = useState(true);
  const [playSports, setPlaySports] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const totalGuests = rsvpList.reduce((sum, r) => sum + r.guestsCount, 0);
  const totalDance = rsvpList.filter(r => r.willDanceOsuokhay).length;
  const totalSport = rsvpList.filter(r => r.willPlaySports).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContact.trim()) return;
    const newAttendee: RSVP = {
      id: Math.random().toString(36).substr(2, 9),
      name: formName.trim(),
      guestsCount: formGuests,
      contact: formContact.trim(),
      willDanceOsuokhay: danceOsuokhay,
      willPlaySports: playSports,
      dietaryNote: dietary.trim() || 'Без ограничений',
      createdAt: new Date().toISOString(),
    };
    setRsvpList([newAttendee, ...rsvpList]);
    setIsSubmitSuccess(true);
    setTimeout(() => {
      setFormName('');
      setFormGuests(1);
      setFormContact('');
      setDietary('');
      setIsSubmitSuccess(false);
    }, 3000);
  };

  return (
    <section id="form-section" className="py-24 px-6 bg-white border-b border-[#D0D0FB]/50">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="font-body text-xs uppercase tracking-widest text-[#03402C] bg-[#CEFDDE] px-3.5 py-1.5 rounded-full font-bold">Будем Рады Вам!</span>
          <h3 className="font-display text-3xl sm:text-5xl font-black text-[#0B0B26] tracking-tight">Будете ли Вы с нами?</h3>
          <p className="text-[#0B0B26]/50 text-xs sm:text-sm max-w-sm mx-auto font-body">Заполните быструю анкету, чтобы организаторы и повара могли рассчитать количество оладий, кумыса и призов!</p>
        </div>

        {/* Counters */}
        <div className="bg-[#FFF3EB] border border-[#D0D0FB]/50 rounded-[2.5rem] p-6 text-center shadow-inner flex flex-col sm:flex-row items-center justify-around gap-4">
          <div className="flex flex-col">
            <span className="font-display text-4xl font-extrabold text-[#03402C]">{totalGuests}</span>
            <span className="font-body text-[10px] text-[#0B0B26]/50 uppercase tracking-widest mt-1">подтвержденных гостей</span>
          </div>
          <div className="hidden sm:block w-px h-12 bg-[#D0D0FB]" />
          <div className="flex flex-col">
            <span className="font-display text-4xl font-extrabold text-[#FC440F]">{totalDance}</span>
            <span className="font-body text-[10px] text-[#0B0B26]/50 uppercase tracking-widest mt-1">будут танцевать Осуохай</span>
          </div>
          <div className="hidden sm:block w-px h-12 bg-[#D0D0FB]" />
          <div className="flex flex-col">
            <span className="font-display text-4xl font-extrabold text-[#4242F0]">{totalSport}</span>
            <span className="font-body text-[10px] text-[#0B0B26]/50 uppercase tracking-widest mt-1">участников пляжных игр</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] border border-[#D0D0FB]/50 shadow-lg relative">
          {isSubmitSuccess ? (
            <motion.div className="flex flex-col items-center justify-center p-8 text-center space-y-4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <div className="w-16 h-16 bg-[#CEFDDE] rounded-full flex items-center justify-center text-[#03402C] text-3xl">✓</div>
              <h4 className="font-display text-2xl font-black text-[#0B0B26]">Вы успешно записаны!</h4>
              <p className="text-sm text-[#0B0B26]/50 max-w-xs leading-relaxed font-body">Спасибо за подтверждение! Ваше теплое присутствие украсит Ысыах в Дананге.</p>
              <p className="text-xs text-[#FC440F] font-body">Оладьи и призы для вас зарезервированы</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="form-name" className="block text-xs font-body font-bold tracking-wider text-[#0B0B26]/60 uppercase">Ваше Имя и Фамилия *</label>
                  <input id="form-name" type="text" required value={formName} onChange={e => setFormName(e.target.value)} placeholder="Например, Саргылана"
                    className="w-full px-5 py-3.5 rounded-2xl bg-[#FFF3EB] border border-[#D0D0FB]/50 focus:bg-white focus:border-[#03402C] focus:ring-1 focus:ring-[#03402C] outline-none text-sm transition font-body" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="form-guests" className="block text-xs font-body font-bold tracking-wider text-[#0B0B26]/60 uppercase">Количество гостей (включая вас) *</label>
                  <div className="relative flex items-center bg-[#FFF3EB] border border-[#D0D0FB]/50 rounded-2xl">
                    <button type="button" onClick={() => setFormGuests(Math.max(1, formGuests - 1))} className="px-4 py-3.5 hover:bg-[#D0D0FB]/20 text-[#0B0B26]/50 transition text-lg font-bold rounded-l-2xl">-</button>
                    <input id="form-guests" type="number" required min={1} max={10} value={formGuests} onChange={e => setFormGuests(parseInt(e.target.value) || 1)}
                      className="w-full py-3.5 bg-transparent outline-none text-center text-sm font-bold font-body" />
                    <button type="button" onClick={() => setFormGuests(Math.min(10, formGuests + 1))} className="px-4 py-3.5 hover:bg-[#D0D0FB]/20 text-[#0B0B26]/50 transition text-lg font-bold rounded-r-2xl">+</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="form-contact" className="block text-xs font-body font-bold tracking-wider text-[#0B0B26]/60 uppercase">Telegram @username или телефон *</label>
                  <input id="form-contact" type="text" required value={formContact} onChange={e => setFormContact(e.target.value)} placeholder="@yhyaq_friend"
                    className="w-full px-5 py-3.5 rounded-2xl bg-[#FFF3EB] border border-[#D0D0FB]/50 focus:bg-white focus:border-[#03402C] focus:ring-1 focus:ring-[#03402C] outline-none text-sm transition font-body" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="form-diet" className="block text-xs font-body font-bold tracking-wider text-[#0B0B26]/60 uppercase">Пожелания по еде или аллергии</label>
                  <input id="form-diet" type="text" value={dietary} onChange={e => setDietary(e.target.value)} placeholder="Вегетарианец, без лактозы, веган"
                    className="w-full px-5 py-3.5 rounded-2xl bg-[#FFF3EB] border border-[#D0D0FB]/50 focus:bg-white focus:border-[#03402C] focus:ring-1 focus:ring-[#03402C] outline-none text-sm transition font-body" />
                </div>
              </div>

              <div className="p-4 bg-[#FFF3EB] rounded-2xl space-y-4 border border-[#D0D0FB]/30">
                <div className="flex items-center gap-3">
                  <input id="form-dance" type="checkbox" checked={danceOsuokhay} onChange={e => setDanceOsuokhay(e.target.checked)} className="w-4.5 h-4.5 rounded border-[#D0D0FB] text-[#03402C] focus:ring-[#03402C] accent-[#03402C]" />
                  <label htmlFor="form-dance" className="text-xs sm:text-sm text-[#0B0B26]/70 select-none cursor-pointer leading-none font-body">Да, я с удовольствием поучаствую в хороводе Осуохай!</label>
                </div>
                <div className="flex items-center gap-3">
                  <input id="form-sports" type="checkbox" checked={playSports} onChange={e => setPlaySports(e.target.checked)} className="w-4.5 h-4.5 rounded border-[#D0D0FB] text-[#03402C] focus:ring-[#03402C] accent-[#03402C]" />
                  <label htmlFor="form-sports" className="text-xs sm:text-sm text-[#0B0B26]/70 select-none cursor-pointer leading-none font-body">Хочу соревноваться в пляжном мас-рестлинге и народных играх!</label>
                </div>
              </div>

              <button id="form-submit-btn" type="submit" className="w-full py-4 bg-[#03402C] hover:bg-[#045c3f] text-white font-display uppercase tracking-widest text-sm font-bold rounded-2xl shadow-md transition">
                Подтвердить Мое Участие
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
