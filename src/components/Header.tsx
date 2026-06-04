interface HeaderProps {
  onOpenAbout: () => void;
  compact?: boolean;
}

export const Header = ({ onOpenAbout, compact = false }: HeaderProps) => (
  <header className="rounded-b-[2rem] bg-gradient-to-br from-ocean-800 via-ocean-700 to-reef-700 px-5 py-8 text-white shadow-soft md:px-8">
    <div className="mx-auto flex max-w-7xl flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold tracking-[0.2em] text-ocean-100">Dave the Diver Farm Planner</p>
        <nav className="flex flex-wrap items-center gap-2">
          <a
            href="/"
            className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-white/20"
          >
            Planner
          </a>
          <a
            href="/guide"
            className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-white/20"
          >
            Guide
          </a>
          <button
            type="button"
            onClick={onOpenAbout}
            className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-white/20"
          >
            关于本站
          </button>
        </nav>
      </div>
      {!compact && (
        <div>
        <h1 className="text-3xl font-bold md:text-5xl">潜水员戴夫养殖规划器</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ocean-100 md:text-lg">
          选择目标菜谱，自动生成鱼场、农场、海底农场规划
        </p>
        </div>
      )}
    </div>
  </header>
);
