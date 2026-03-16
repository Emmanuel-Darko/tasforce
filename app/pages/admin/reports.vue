<template>
  <div>
    <div class="topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="topbar-menu" @click="toggleSidebar?.()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" width="24" height="24">
            <line x1="2" y1="5" x2="18" y2="5"/>
            <line x1="2" y1="10" x2="18" y2="10"/>
            <line x1="2" y1="15" x2="18" y2="15"/>
          </svg>
        </button>
        <h1 class="topbar-title">Reports</h1>
      </div>
      <div class="topbar-right">
        <button class="btn btn-outline btn-sm">⬇ Export CSV</button>
      </div>
    </div>

    <div class="page-body">

      <!-- Summary cards with coloured top bars -->
      <div class="stats-grid" style="margin-bottom:28px;">
        <div v-for="s in summaryCards" :key="s.label" class="stat-card rp-card">
          <div class="rp-card-bar" :style="`background:${s.barColor}`" />
          <div class="stat-label">{{ s.label }}</div>
          <div class="stat-value" :style="`color:${s.valueColor}`">{{ s.value }}</div>
          <div class="stat-note">{{ s.note }}</div>
        </div>
      </div>

      <!-- Charts row -->
      <div class="two-col">
        <div class="card">
          <div class="card-header"><h3 class="card-title">By Membership Type</h3></div>
          <div class="card-body">
            <div v-for="r in byType" :key="r.label" class="rp-row">
              <div class="rp-row-meta">
                <span class="rp-row-label">{{ r.label }}</span>
                <span class="rp-row-count"><strong>{{ r.n }}</strong> <span class="rp-row-pct">({{ r.pct }}%)</span></span>
              </div>
              <div class="rp-track">
                <div class="rp-fill" :style="`width:${r.pct}%;background:${r.color}`" />
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3 class="card-title">By Status</h3></div>
          <div class="card-body">
            <div v-for="r in byStatus" :key="r.label" class="rp-row">
              <div class="rp-row-meta">
                <span class="rp-row-label">{{ r.label }}</span>
                <span class="rp-row-count"><strong>{{ r.n }}</strong> <span class="rp-row-pct">({{ r.pct }}%)</span></span>
              </div>
              <div class="rp-track">
                <div class="rp-fill" :style="`width:${r.pct}%;background:${r.color}`" />
              </div>
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
const t   = computed(() => (stats.value as any)?.total || 1)
const pct = (n: number) => Math.round((n / t.value) * 100)

const summaryCards = computed(() => [
  { label:'Total',    value:(stats.value as any)?.total   ??'—', note:'All registrations',   barColor:'var(--crimson)', valueColor:'var(--crimson)'  },
  { label:'Active',   value:(stats.value as any)?.active  ??'—', note:'Cards issued',         barColor:'var(--success)', valueColor:'var(--success)'  },
  { label:'Pending',  value:(stats.value as any)?.pending ??'—', note:'Awaiting approval',    barColor:'var(--gold)',    valueColor:'var(--warning)'  },
  { label:'Inactive', value:(stats.value as any)?.inactive??'—', note:'Rejected/deactivated', barColor:'var(--border)',  valueColor:'var(--muted)'    },
])
const byType   = computed(() => [
  { label:'Advocate',  n:(stats.value as any)?.advocate ??0, pct:pct((stats.value as any)?.advocate ??0), color:'var(--crimson)'  },
  { label:'Supporter', n:(stats.value as any)?.supporter??0, pct:pct((stats.value as any)?.supporter??0), color:'var(--gold)'     },
  { label:'Volunteer', n:(stats.value as any)?.volunteer??0, pct:pct((stats.value as any)?.volunteer??0), color:'var(--success)'  },
])
const byStatus = computed(() => [
  { label:'Active',   n:(stats.value as any)?.active  ??0, pct:pct((stats.value as any)?.active  ??0), color:'var(--success)' },
  { label:'Pending',  n:(stats.value as any)?.pending ??0, pct:pct((stats.value as any)?.pending ??0), color:'var(--gold)'    },
  { label:'Inactive', n:(stats.value as any)?.inactive??0, pct:pct((stats.value as any)?.inactive??0), color:'var(--muted)'   },
])
</script>

<style scoped>
/* Stat card override — colour bar replaces ::before */
.rp-card { position: relative; overflow: hidden; }
.rp-card-bar { position: absolute; top: 0; left: 0; right: 0; height: 3px; }

/* Progress rows */
.rp-row      { margin-bottom: 18px; }
.rp-row:last-child { margin-bottom: 0; }
.rp-row-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; font-size: 14px; }
.rp-row-label { font-weight: 500; color: var(--text); }
.rp-row-count { color: var(--text); }
.rp-row-pct   { color: var(--muted2); font-size: 12px; }
.rp-track { background: var(--parchment2); border-radius: 6px; height: 8px; overflow: hidden; }
.rp-fill  { height: 100%; border-radius: 6px; min-width: 4px; transition: width .6s cubic-bezier(.4,0,.2,1); }
</style>