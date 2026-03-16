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
        <h1 class="topbar-title">Dashboard</h1>
      </div>
      <div class="topbar-right">
        <span class="ad-date">{{ today }}</span>
        <NuxtLink to="/admin/registrations" class="btn btn-crimson btn-sm">Review Pending</NuxtLink>
      </div>
    </div>

    <div class="page-body">

      <!-- Alert banner -->
      <div v-if="(stats as any)?.pending > 0" class="ad-alert">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2L2 17h16L10 2z"/><line x1="10" y1="9" x2="10" y2="12"/><circle cx="10" cy="15" r=".5" fill="currentColor"/></svg>
        <span><strong>{{ (stats as any)?.pending }} application{{ (stats as any)?.pending > 1 ? 's' : '' }}</strong> awaiting review.</span>
        <NuxtLink to="/admin/registrations" class="ad-alert-cta">Review now →</NuxtLink>
      </div>

      <!-- Stat cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Total Members</div>
          <div class="stat-value">{{ (stats as any)?.total ?? '—' }}</div>
          <div class="stat-note">All registrations</div>
        </div>
        <div class="stat-card green">
          <div class="stat-label">Active</div>
          <div class="stat-value">{{ (stats as any)?.active ?? '—' }}</div>
          <div class="stat-note">Cards issued</div>
        </div>
        <div class="stat-card amber">
          <div class="stat-label">Pending</div>
          <div class="stat-value">{{ (stats as any)?.pending ?? '—' }}</div>
          <div class="stat-note">Awaiting approval</div>
        </div>
        <div class="stat-card gold">
          <div class="stat-label">Cards Issued</div>
          <div class="stat-value">{{ (stats as any)?.active ?? '—' }}</div>
          <div class="stat-note">Active members</div>
        </div>
      </div>

      <div class="content-grid">
        <!-- Quick actions -->
        <div class="card" style="margin-bottom:0;">
          <div class="card-header"><h3 class="card-title">Quick Actions</h3></div>
          <div>
            <NuxtLink v-for="a in actions" :key="a.to" :to="a.to" class="ad-action-row">
              <div class="ad-action-icon">
                <span v-html="a.svg" />
              </div>
              <div style="flex:1;min-width:0;">
                <div class="ad-action-name">{{ a.name }}</div>
                <div class="ad-action-desc">{{ a.desc }}</div>
              </div>
              <svg class="ad-action-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l5 5-5 5"/></svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Recent activity -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Recent Activity</h3>
            <span class="ad-live">
              <span class="ad-live-dot" />Live
            </span>
          </div>
          <div class="card-body" style="padding-top:6px;padding-bottom:6px;">
            <div class="act-list">
              <div v-for="(a, i) in (stats as any)?.recent" :key="a.id" class="act-item">
                <div class="act-dot-col">
                  <div class="act-dot" />
                  <div v-if="i < ((stats as any)?.recent?.length ?? 0) - 1" class="act-line" />
                </div>
                <div>
                  <div class="act-text"><strong>{{ a.firstName }} {{ a.lastName }}</strong> — {{ a.action }}</div>
                  <div v-if="a.detail" class="act-detail">{{ a.detail }}</div>
                  <div class="act-time">{{ timeAgo(a.createdAt) }}</div>
                </div>
              </div>
              <div v-if="!(stats as any)?.recent?.length" style="font-size:14px;color:var(--muted2);padding:10px 0;">No recent activity.</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: ['auth','admin'] })
const { data: stats } = await useFetch('/api/admin/stats')
const toggleSidebar = inject<() => void>('toggleSidebar')
const today = new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
function timeAgo(d: string) {
  const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000)
  if (m < 1) return 'just now'; if (m < 60) return `${m}m ago`
  const h = Math.floor(m/60); if (h < 24) return `${h}h ago`
  return `${Math.floor(h/24)}d ago`
}
const actions = [
  { name:'Review Registrations', desc:'Approve or reject pending applications', to:'/admin/registrations', svg:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h14M3 10h14M3 15h8"/><circle cx="16" cy="15" r="2.5"/><path d="M16 13.5v1.5l1 1"/></svg>` },
  { name:'Browse Members',        desc:'View all member profiles and details',   to:'/admin/members',       svg:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="6" r="3"/><path d="M2 18c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M14 3a3 3 0 010 6M18 18c0-2.8-1.8-5.1-4-5.8"/></svg>` },
  { name:'Membership Cards',      desc:'View and manage issued member cards',    to:'/admin/cards',         svg:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="16" height="11" rx="2"/><path d="M2 9h16M6 13h2M10 13h4"/></svg>` },
  { name:'Reports',               desc:'Stats, breakdowns and analytics',         to:'/admin/reports',       svg:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15l4-5 3 3 4-6 3 3"/><rect x="2" y="2" width="16" height="16" rx="2"/></svg>` },
]
</script>

<style scoped>
.ad-date { font-size: 12px; color: var(--muted2); white-space: nowrap; }

.ad-alert {
  display: flex; align-items: center; gap: 12px;
  padding: 13px 18px; background: #fffbec;
  border: 1.5px solid var(--gold); border-radius: 12px;
  font-size: 14px; color: var(--warning); margin-bottom: 22px; flex-wrap: wrap;
}
.ad-alert svg { width: 18px; height: 18px; flex-shrink: 0; }
.ad-alert-cta { margin-left: auto; color: var(--crimson); font-weight: 700; font-size: 13px; white-space: nowrap; text-decoration: none; }
.ad-alert-cta:hover { text-decoration: underline; }

.ad-action-row {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 20px; border-bottom: 1px solid var(--border-light);
  text-decoration: none; cursor: pointer; transition: background .14s;
}
.ad-action-row:last-child { border-bottom: none; }
.ad-action-row:hover { background: var(--parchment); }
.ad-action-icon {
  width: 40px; height: 40px; flex-shrink: 0;
  background: rgba(107,15,26,.07); border: 1px solid rgba(107,15,26,.12);
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  color: var(--crimson);
}
.ad-action-icon :deep(svg) { width: 18px; height: 18px; }
.ad-action-name { font-size: 14px; font-weight: 600; color: var(--crimson); margin-bottom: 1px; }
.ad-action-desc { font-size: 12px; color: var(--muted2); }
.ad-action-arrow { width: 16px; height: 16px; color: var(--muted2); flex-shrink: 0; }

.ad-live { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: var(--success); }
.ad-live-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: livePulse 2s ease-in-out infinite; }
@keyframes livePulse { 0%,100% { opacity:1; } 50% { opacity:.3; } }

@media (max-width: 640px) { .ad-date { display: none; } .ad-alert { flex-wrap: wrap; } .ad-alert-cta { margin-left: 0; } }
</style>