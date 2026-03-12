<template>
  <div>
    <div class="topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="topbar-menu" @click="toggleSidebar?.()">☰</button>
        <h1 class="topbar-title">Dashboard</h1>
      </div>
      <div class="topbar-right">
        <span style="font-size:12px;color:var(--muted2);display:none;" class="hide-mobile">{{ today }}</span>
        <NuxtLink to="/admin/registrations" class="btn btn-crimson btn-sm">Review Pending</NuxtLink>
      </div>
    </div>
    <div class="page-body">
      <div v-if="(stats as any)?.pending > 0" class="notice notice-warn">
        <span>⚠</span>
        <span><strong>{{ (stats as any)?.pending }} application{{ (stats as any)?.pending > 1 ? 's' : '' }}</strong> awaiting review.</span>
        <NuxtLink to="/admin/registrations" style="margin-left:auto;color:var(--crimson);font-weight:600;font-size:13px;white-space:nowrap;">Review →</NuxtLink>
      </div>

      <div class="stats-grid">
        <div class="stat-card"><div class="stat-label">Total Members</div><div class="stat-value">{{ (stats as any)?.total ?? '—' }}</div><div class="stat-note">All registrations</div></div>
        <div class="stat-card green"><div class="stat-label">Active</div><div class="stat-value">{{ (stats as any)?.active ?? '—' }}</div><div class="stat-note">Cards issued</div></div>
        <div class="stat-card amber"><div class="stat-label">Pending</div><div class="stat-value">{{ (stats as any)?.pending ?? '—' }}</div><div class="stat-note">Awaiting approval</div></div>
        <div class="stat-card gold"><div class="stat-label">Cards Issued</div><div class="stat-value">{{ (stats as any)?.active ?? '—' }}</div><div class="stat-note">Active members</div></div>
      </div>

      <div class="content-grid">
        <div>
          <div class="card" style="margin-bottom:18px;">
            <div class="card-header"><h3 class="card-title">Quick Actions</h3></div>
            <div>
              <NuxtLink v-for="a in actions" :key="a.to" :to="a.to"
                style="display:flex;align-items:center;gap:14px;padding:14px 18px;border-bottom:1px solid var(--border-light);text-decoration:none;transition:background 0.12s;"
                onmouseover="this.style.background='var(--parchment)'" onmouseout="this.style.background=''">
                <div style="width:38px;height:38px;background:rgba(107,15,26,0.08);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;border:1px solid rgba(107,15,26,0.1);">{{ a.icon }}</div>
                <div style="flex:1;min-width:0;">
                  <div style="font-size:14px;font-weight:600;color:var(--crimson);">{{ a.name }}</div>
                  <div style="font-size:12px;color:var(--muted2);">{{ a.desc }}</div>
                </div>
                <span style="color:var(--muted2);font-size:14px;">›</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Recent Activity</h3>
            <span style="font-size:11px;color:var(--success);display:flex;align-items:center;gap:5px;">
              <span style="width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block;" />Live
            </span>
          </div>
          <div class="card-body" style="padding-top:8px;padding-bottom:8px;">
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
              <div v-if="!(stats as any)?.recent?.length" style="font-size:14px;color:var(--muted2);padding:12px 0;">No recent activity.</div>
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
  { icon:'☰', name:'Review Registrations', desc:'Approve or reject pending applications', to:'/admin/registrations' },
  { icon:'◉', name:'Browse Members',        desc:'View all member profiles and details',   to:'/admin/members'       },
  { icon:'▣', name:'Membership Cards',      desc:'View and manage issued member cards',    to:'/admin/cards'         },
  { icon:'▤', name:'Reports',               desc:'Stats, breakdowns and analytics',         to:'/admin/reports'       },
]
</script>
