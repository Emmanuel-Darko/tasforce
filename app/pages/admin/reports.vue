<template>
  <div>
    <div class="topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="topbar-menu" @click="toggleSidebar?.()">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="2" y1="5" x2="18" y2="5"/><line x1="2" y1="10" x2="18" y2="10"/><line x1="2" y1="15" x2="18" y2="15"/></svg>
        </button>
        <h1 class="topbar-title">Reports</h1>
      </div>
      <div class="topbar-right">
        <button class="btn btn-outline btn-sm">⬇ Export CSV</button>
      </div>
    </div>

    <div class="page-body">

      <!-- Summary stat cards with inline colour bars -->
      <div class="stats-grid" style="margin-bottom:28px;">
        <div v-for="s in cards" :key="s.label" class="stat-card rp-stat-card">
          <div class="rp-stat-bar" :style="`background:${s.color}`" />
          <div class="stat-label">{{ s.label }}</div>
          <div class="stat-value" :style="`color:${s.color}`">{{ s.value }}</div>
          <div class="stat-note">{{ s.note }}</div>
        </div>
      </div>

      <div class="two-col">
        <!-- By type -->
        <div class="card">
          <div class="card-header"><h3 class="card-title">By Membership Type</h3></div>
          <div class="card-body">
            <div v-for="r in byType" :key="r.label" class="rp-bar-row">
              <div class="rp-bar-header">
                <span class="rp-bar-label">{{ r.label }}</span>
                <span class="rp-bar-count"><strong>{{ r.n }}</strong> <span class="rp-bar-pct">({{ r.pct }}%)</span></span>
              </div>
              <div class="rp-bar-track">
                <div class="rp-bar-fill" :style="`width:${r.pct}%;background:${r.color}`" />
              </div>
            </div>
          </div>
        </div>

        <!-- By status -->
        <div class="card">
          <div class="card-header"><h3 class="card-title">By Status</h3></div>
          <div class="card-body">
            <div v-for="r in byStatus" :key="r.label" class="rp-bar-row">
              <div class="rp-bar-header">
                <span class="rp-bar-label">{{ r.label }}</span>
                <span class="rp-bar-count"><strong>{{ r.n }}</strong> <span class="rp-bar-pct">({{ r.pct }}%)</span></span>
              </div>
              <div class="rp-bar-track">
                <div class="rp-bar-fill" :style="`width:${r.pct}%;background:${r.color}`" />
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

<style scoped>
.rp-stat-card { position: relative; overflow: hidden; }
.rp-stat-bar  { position: absolute; top: 0; left: 0; right: 0; height: 3px; }

.rp-bar-row    { margin-bottom: 20px; }
.rp-bar-row:last-child { margin-bottom: 0; }
.rp-bar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; font-size: 14px; }
.rp-bar-label  { color: var(--text); font-weight: 500; }
.rp-bar-count  { color: var(--text); }
.rp-bar-pct    { color: var(--muted2); font-size: 12px; }
.rp-bar-track  { background: var(--parchment2); border-radius: 6px; height: 8px; overflow: hidden; }
.rp-bar-fill   { height: 100%; border-radius: 6px; transition: width .6s cubic-bezier(.4,0,.2,1); min-width: 2px; }
</style>