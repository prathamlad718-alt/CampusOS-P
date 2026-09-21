import { PluginMarketplace } from '@/components/dashboard/PluginMarketplace';

export default function MarketplacePage() {
  return (
    <div className="w-full">
      {/* Background decorations matching the premium OS aesthetic */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(70,183,255,0.15),transparent_60%)] blur-3xl" />
        <div className="absolute right-[-8%] top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(139,243,230,0.12),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto pt-4">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-tide shadow-sm backdrop-blur-md mb-6">
            <span className="h-2 w-2 rounded-full bg-tide animate-pulse" />
            Ecosystem
          </div>
          <h1 className="display-sm mb-3">Plugin Marketplace</h1>
          <p className="text-base md:text-xl text-mist max-w-2xl">
            Start with the core. Install the rest. Manage your campus modules here.
          </p>
        </div>

        <PluginMarketplace />
      </div>
    </div>
  );
}
