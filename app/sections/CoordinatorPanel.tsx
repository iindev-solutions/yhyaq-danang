import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Lock, Unlock } from 'lucide-react';
import { RSVP } from '../types/rsvp';

const DEFAULT_RSVPS: RSVP[] = [
  { id: '1', name: 'Айсен Николаев', guestsCount: 2, contact: '@aisen_nik', willDanceOsuokhay: true, willPlaySports: true, dietaryNote: 'Без ограничений', createdAt: '2026-06-01T10:30:00Z' },
  { id: '2', name: 'Сардана Егорова', guestsCount: 1, contact: '+84901234567', willDanceOsuokhay: true, willPlaySports: false, dietaryNote: 'Вегетарианка', createdAt: '2026-06-01T12:15:00Z' },
  { id: '3', name: 'Михаил Торохов (Mytona)', guestsCount: 3, contact: '@mikhail_mytona', willDanceOsuokhay: true, willPlaySports: true, dietaryNote: 'Аллергия на арахис', createdAt: '2026-06-02T08:44:00Z' },
  { id: '4', name: 'Надежда Федорова', guestsCount: 4, contact: '@nadya_f', willDanceOsuokhay: true, willPlaySports: false, dietaryNote: 'С детьми, без ограничений', createdAt: '2026-06-02T14:20:00Z' },
];

export default function CoordinatorPanel() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');
  const [rsvpList, setRsvpList] = useState<RSVP[]>(DEFAULT_RSVPS);

  const totalGuests = rsvpList.reduce((sum, r) => sum + r.guestsCount, 0);
  const totalDance = rsvpList.filter(r => r.willDanceOsuokhay).length;
  const totalSport = rsvpList.filter(r => r.willPlaySports).length;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'yhyaq2026') {
      setIsAuthorized(true);
      setAuthError('');
    } else {
      setAuthError('Неверный код доступа. Попробуйте "yhyaq2026"');
    }
  };

  const handleDelete = (id: string) => {
    setRsvpList(rsvpList.filter(r => r.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pb-12">
      <div className="flex justify-center pt-4">
        <button
          onClick={() => setShow(!show)}
          className="text-[10px] font-body text-[#0B0B26]/40 hover:text-[#0B0B26]/60 uppercase tracking-widest flex items-center gap-1 transition"
        >
          {show ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          <span>Панель Координатора (Администрирование)</span>
        </button>
      </div>

      <AnimatePresence>
        {show && (
          <motion.div
            id="coordinator-panel"
            className="bg-[#0B0B26] border border-white/10 rounded-[2.5rem] p-6 sm:p-8 text-white space-y-6 shadow-xl mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#E3FF00]" />
                <h4 className="font-display text-lg sm:text-xl font-black uppercase tracking-wider">Панель Учета Ысыах 2026</h4>
              </div>
              <span className="text-[9px] font-body bg-[#E3FF00]/10 text-[#E3FF00] px-3 py-1 rounded-full border border-[#E3FF00]/20">Административный доступ</span>
            </div>

            {!isAuthorized ? (
              <form onSubmit={handleAuth} className="space-y-4 max-w-sm mx-auto p-4 text-center">
                <p className="text-xs text-[#CEFDDE]/60 font-body">Для просмотра списка гостей введите пароль координатора. Пароль: <strong className="text-[#E3FF00]">yhyaq2026</strong></p>
                <div className="space-y-1">
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Введите пароль..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-center text-sm outline-none focus:border-[#E3FF00] text-white font-body" />
                  {authError && <p className="text-[10px] text-[#FC440F] font-body">{authError}</p>}
                </div>
                <button type="submit" className="px-6 py-2 bg-[#E3FF00] hover:bg-[#d4e600] text-[#0B0B26] font-body text-xs font-bold uppercase rounded-lg transition">Войти в панель</button>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span className="block text-2xl font-black text-[#E3FF00]">{rsvpList.length}</span>
                    <span className="text-[9px] font-body text-[#CEFDDE]/50 uppercase tracking-widest">Анкет всего</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span className="block text-2xl font-black text-[#0BDA51]">{totalGuests}</span>
                    <span className="text-[9px] font-body text-[#CEFDDE]/50 uppercase tracking-widest">Людей приедет</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span className="block text-2xl font-black text-[#FF80AA]">{Math.round((totalDance / Math.max(1, rsvpList.length)) * 100)}%</span>
                    <span className="text-[9px] font-body text-[#CEFDDE]/50 uppercase tracking-widest">Танцуют Осуохай</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span className="block text-2xl font-black text-[#4242F0]">{totalSport} чел.</span>
                    <span className="text-[9px] font-body text-[#CEFDDE]/50 uppercase tracking-widest">Записаны на спорт</span>
                  </div>
                </div>

                {/* List */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-body text-[#CEFDDE]/40">
                    <span>Зарегистрированные участники ({rsvpList.length})</span>
                    <span>Действия</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-2.5 pr-2">
                    {rsvpList.map((attendee) => (
                      <div key={attendee.id} className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                        <div>
                          <div className="font-bold flex items-center gap-2">
                            <span className="text-white text-sm font-body">{attendee.name}</span>
                            <span className="px-1.5 py-0.5 bg-[#0BDA51]/10 text-[#0BDA51] font-body text-[9px] rounded-md font-bold">{attendee.guestsCount} чел.</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#CEFDDE]/50 text-[10px] font-body mt-1">
                            <span>Связь: <strong className="text-white">{attendee.contact}</strong></span>
                            <span>•</span>
                            <span>Диета: <strong className="text-[#E3FF00]">{attendee.dietaryNote}</strong></span>
                          </div>
                          <div className="flex gap-2 mt-1.5">
                            {attendee.willDanceOsuokhay && <span className="px-1.5 py-0.2 bg-[#FF80AA]/15 text-[#FF80AA] text-[8px] font-body rounded">Осуохай</span>}
                            {attendee.willPlaySports && <span className="px-1.5 py-0.2 bg-[#4242F0]/15 text-[#4242F0] text-[8px] font-body rounded">Спорт игры</span>}
                          </div>
                        </div>
                        <button onClick={() => handleDelete(attendee.id)} className="text-[#CEFDDE]/40 hover:text-[#FC440F] transition text-[10px] font-body uppercase bg-[#FC440F]/10 px-2 py-1 rounded">Удалить</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
