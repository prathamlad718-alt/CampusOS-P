import { API_BASE_URL } from '@campus-os/shared/api-client';
import { DashboardClient } from '@/components/dashboard/DashboardClient';

export default async function Dashboard() {
  let activePlugins: string[] = [];
  try {
    const res = await fetch(`${API_BASE_URL}/system/modules`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      activePlugins = data.modules || [];
    }
  } catch (err: unknown) {
    if (
      err &&
      typeof err === 'object' &&
      'digest' in err &&
      err.digest === 'DYNAMIC_SERVER_USAGE'
    )
      throw err;
    console.error('Failed to fetch active plugins for dashboard:', err);
  }

  return <DashboardClient activePlugins={activePlugins} />;
}
