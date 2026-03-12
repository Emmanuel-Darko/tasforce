<template>
  <div>
    <div class="topbar">
      <button class="topbar-menu" @click="toggleSidebar?.()">☰</button>
      <h1 class="topbar-title">Reports</h1>
      <div class="topbar-right">
        <button class="btn btn-outline btn-sm">⬇ Export CSV</button>
      </div>
    </div>
    <div class="page-body">
      <div class="stats-grid" style="margin-bottom:28px;">
        <div v-for="s in cards" :key="s.label" class="stat-card" :style="`border-top-color:${s.color}`">
          <div class="stat-label">{{ s.label }}</div>
          <div class="stat-value" :style="`color:${s.color}`">{{ s.value }}</div>
          <div class="stat-note">{{ s.note }}</div>
        </div>
      </div>
      <div class="two-col">
        <div class="card">
          <div class="card-header"><h3 class="card-title">By Membership Type</h3></div>
          <div class="card-body">
            <div v-for="r in byType" :key="r.label" style="margin-bottom:16px;">
              <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:5px;">
                <span>{{ r.label }}</span><span><strong>{{ r.n }}</strong> ({{ r.pct }}%)</span>
              </div>
              <div class="prog-bg"><div class="prog-fill" :style="`width:${r.pct}%;background:${r.color}`" /></div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">By Status</h3></div>
          <div class="card-body">
            <div v-for="r in byStatus" :key="r.label" style="margin-bottom:16px;">
              <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:5px;">
                <span>{{ r.label }}</span><span><strong>{{ r.n }}</strong> ({{ r.pct }}%)</span>
              </div>
              <div class="prog-bg"><div class="prog-fill" :style="`width:${r.pct}%;background:${r.color}`" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: ['auth','admin'] })
const toggleSidebar = inject<() => void>('toggleSidebar')
const { data: stats } = await useFetch<any>('/api/admin/stats')
const t = computed(() => (stats.value as any)?.total || 1)
const pct = (n: number) => Math.round((n / t.value) * 100)

const cards    = computed(() => [
  { label:'Total',    value:(stats.value as any)?.total   ??'—', note:'All registrations',   color:'var(--crimson)'  },
  { label:'Active',   value:(stats.value as any)?.active  ??'—', note:'Cards issued',         color:'var(--success)'  },
  { label:'Pending',  value:(stats.value as any)?.pending ??'—', note:'Awaiting approval',    color:'var(--warning)'  },
  { label:'Inactive', value:(stats.value as any)?.inactive??'—', note:'Rejected/deactivated', color:'var(--muted)'    },
])
const byType   = computed(() => [
  { label:'Advocate',  n:(stats.value as any)?.advocate ??0, pct:pct((stats.value as any)?.advocate ??0), color:'var(--crimson)'  },
  { label:'Supporter', n:(stats.value as any)?.supporter??0, pct:pct((stats.value as any)?.supporter??0), color:'var(--gold)'     },
  { label:'Volunteer', n:(stats.value as any)?.volunteer??0, pct:pct((stats.value as any)?.volunteer??0), color:'var(--success)'  },
])
const byStatus = computed(() => [
  { label:'Active',   n:(stats.value as any)?.active  ??0, pct:pct((stats.value as any)?.active  ??0), color:'var(--success)' },
  { label:'Pending',  n:(stats.value as any)?.pending ??0, pct:pct((stats.value as any)?.pending ??0), color:'var(--warning)' },
  { label:'Inactive', n:(stats.value as any)?.inactive??0, pct:pct((stats.value as any)?.inactive??0), color:'var(--muted)'   },
])
</script>
