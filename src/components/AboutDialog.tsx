interface AboutDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AboutDialog = ({ open, onClose }: AboutDialogProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ocean-950/50 px-4">
      <section className="max-w-xl rounded-lg border border-ocean-100 bg-white p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold text-ocean-950">关于本站</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-ocean-50 px-3 py-1 text-sm font-bold text-ocean-800 transition hover:bg-ocean-100"
          >
            关闭
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm leading-7 text-ocean-800">
          <p>
            潜水员戴夫养殖规划器是一个非官方粉丝工具，旨在帮助玩家根据目标菜谱，快速生成鱼场、农场和鲛人村海底农场的养殖规划。
          </p>
          <p>本站目前基于公开资料和玩家整理数据构建，数据仅供参考。实际游戏内容请以游戏内版本为准。</p>
          <p>本站不隶属于 MINTROCKET、NEXON 或 Dave the Diver 官方团队。</p>
          <p className="rounded-lg bg-ocean-50 p-3 text-ocean-700">
            This is an unofficial fan-made tool for Dave the Diver. It is not affiliated with MINTROCKET, NEXON, or
            the official Dave the Diver team.
          </p>
        </div>
      </section>
    </div>
  );
};
