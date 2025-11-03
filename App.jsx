
// KinoMir360 - Single-file React component
import React, { useState } from 'react';

const TELEGRAM_LINK = 'https://t.me/KinoMir360';
const MOVIES = [
  { id: 1, title: 'Новый Блокбастер', type: 'Новинки', year: 2025, rating: 8.4,
    poster: 'https://via.placeholder.com/400x600/1f2937/ffffff?text=%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80+1', color: '#ff4d6d' },
  { id: 2, title: 'Топовый Триллер', type: 'Топ', year: 2024, rating: 9.1,
    poster: 'https://via.placeholder.com/400x600/0f172a/ffffff?text=%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80+2', color: '#00d3ff' },
  { id: 3, title: 'Сериал: Тёмные Воды', type: 'Сериалы', year: 2023, rating: 8.0,
    poster: 'https://via.placeholder.com/400x600/111827/ffffff?text=%D0%A1%D0%B5%D1%80%D0%B8%D0%B0%D0%BB', color: '#8b5cf6' },
];

export default function KinoMir360() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Все');
  const types = ['Все', 'Новинки', 'Топ', 'Сериалы'];
  const filtered = MOVIES.filter(m => (filter==='Все'?true:m.type===filter) && m.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="min-h-screen bg-[#060606] text-gray-100 antialiased">
      <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/8 to-white/3 flex items-center justify-center shadow-lg">
            <span className="font-bold text-lg text-white">KM</span>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold leading-tight">KinoMir360</h1>
            <p className="text-sm text-gray-400">Киношный онлайн-кинотеатр — новинки, топ, сериалы</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Поиск по названию..." className="bg-[#0b0b0b] placeholder-gray-500 border border-white/6 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/10"/>
          <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" className="text-sm px-4 py-2 bg-white/6 rounded-md hover:bg-white/8">Перейти в Telegram</a>
        </div>
        <button onClick={()=>window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})} className="md:hidden text-sm px-3 py-2 bg-white/6 rounded-md">Смотреть</button>
      </header>
      <main className="max-w-6xl mx-auto px-4 pb-20">
        <section className="relative rounded-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-black/60 to-transparent p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-extrabold">Новинки недели</h2>
              <p className="mt-2 text-gray-400 max-w-xl">Подборка свежих релизов. Нажми на карточку, чтобы увидеть эффект подсветки и перейти к просмотру в Telegram.</p>
              <div className="mt-4 flex gap-2 flex-wrap">{types.map(t=>(<button key={t} onClick={()=>setFilter(t)} className={`text-sm px-3 py-1 rounded-full ${filter===t?'bg-white/10':'bg-white/5'}`}>{t}</button>))}</div>
            </div>
            <div className="w-48 h-72 hidden md:block rounded-lg overflow-hidden shadow-2xl"><img src={MOVIES[0].poster} alt="hero" className="w-full h-full object-cover"/></div>
          </div>
        </section>
        <section><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{filtered.map(movie=><Card key={movie.id} movie={movie}/> )}</div></section>
      </main>
      <footer className="border-t border-white/6 py-6 mt-12"><div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">© {new Date().getFullYear()} KinoMir360 — Ссылка для просмотра ведёт в Telegram-канал.</div></footer>
    </div>
  );
}

function Card({ movie }) {
  const [hover, setHover] = useState(false);
  const gradientStyle={boxShadow:hover?`0 8px 30px ${movie.color}66,inset 0 0 50px ${movie.color}22`:'0 6px 18px rgba(0,0,0,0.6)'};
  return (
    <div className="group rounded-lg overflow-hidden relative transform-gpu transition-all duration-300" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={gradientStyle}>
      <div className="relative">
        <img src={movie.poster} alt={movie.title} className={`w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500`}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
        <div className="absolute left-3 bottom-3 right-3 flex items-end justify-between">
          <div>
            <h3 className="text-lg font-semibold leading-tight">{movie.title}</h3>
            <div className="text-xs text-gray-300">{movie.year} · {movie.rating}⭐</div>
          </div>
          <div className="flex items-center gap-2"><a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" className="px-3 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-md text-sm">Смотреть</a></div>
        </div>
      </div>
      <div className="absolute left-0 top-0 h-full w-1 transition-all duration-500" style={{background:`linear-gradient(180deg, ${movie.color}, rgba(0,0,0,0))`, width:hover?'12px':'6px'}}></div>
      <div className="pointer-events-none"><div className="absolute inset-0" style={{boxShadow:hover?`0 0 60px ${movie.color}55`:'none', transition:'box-shadow 300ms ease'}}></div></div>
    </div>
  );
}
