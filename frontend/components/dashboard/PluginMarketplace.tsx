'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@campus-os/shared/api-client';
import { Button } from '@campusos/design-system';
import { Package, Power, CheckCircle2, Search, XCircle } from 'lucide-react';

interface PluginData {
  name: string;
  version: string;
  enabled: boolean;
  manifest: {
    name: string;
    description?: string;
    defaultEnabled?: boolean;
    dependencies?: Record<string, string>;
  };
}

export function PluginMarketplace() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');

  const { data: plugins, isLoading } = useQuery<PluginData[]>({
    queryKey: ['plugins'],
    queryFn: async () => {
      const response = await apiClient.get<any>('/plugins');
      return response.plugins || [];
    }
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ name, enabled }: { name: string; enabled: boolean }) => {
      return apiClient.put(`/plugins/${name}/toggle`, { enabled });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plugins'] });
      // The dashboard caches activePlugins globally, in a real app we might trigger a server action or hard reload
      // to reflect new plugins in the sidebar immediately.
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-tide border-t-transparent animate-spin" />
      </div>
    );
  }

  const filteredPlugins = plugins?.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-surface border border-line-strong rounded-xl px-4 py-2 w-full max-w-md shadow-sm">
        <Search className="w-4 h-4 text-mist" />
        <input 
          type="text" 
          placeholder="Search modules..." 
          className="bg-transparent border-none outline-none text-sm text-bone w-full placeholder:text-mist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlugins.map(plugin => (
          <div 
            key={plugin.name}
            className={`glass-panel p-6 rounded-2xl flex flex-col relative overflow-hidden transition-all duration-300 ${plugin.enabled ? 'border-tide/50 shadow-[0_0_20px_rgba(70,183,255,0.05)]' : 'border-line bg-ink-2/30 opacity-80'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-surface-raised flex items-center justify-center border border-line shadow-sm">
                <Package className={`w-6 h-6 ${plugin.enabled ? 'text-tide' : 'text-mist'}`} />
              </div>
              <div className="flex items-center gap-2">
                {plugin.enabled ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
                    <CheckCircle2 className="w-3 h-3" /> Enabled
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-mist bg-surface px-2 py-1 rounded-full border border-line">
                    <XCircle className="w-3 h-3" /> Disabled
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-xl font-medium text-bone mb-1 capitalize">{plugin.name}</h3>
            <p className="text-xs text-mist font-mono mb-4">v{plugin.version || '1.0.0'}</p>
            
            <p className="text-sm text-mist/90 mb-6 flex-1">
              Campus OS {plugin.name} module.
            </p>

            <div className="mt-auto pt-4 border-t border-line/50 flex items-center justify-between">
              <Button 
                variant={plugin.enabled ? "outline" : "default"}
                size="sm"
                className={plugin.enabled 
                  ? "bg-transparent border-line hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 transition-colors" 
                  : "bg-tide hover:bg-tide/90 text-white transition-colors"
                }
                onClick={() => toggleMutation.mutate({ name: plugin.name, enabled: !plugin.enabled })}
                disabled={toggleMutation.isPending}
              >
                <Power className="w-3 h-3 mr-2" />
                {plugin.enabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
