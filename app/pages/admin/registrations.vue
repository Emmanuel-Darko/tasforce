<template>
  <div>
    <div class="topbar"><button class="topbar-menu" @click="toggleSidebar?.()">☰</button>
      <h1 class="topbar-title">Registrations</h1>
      <div class="topbar-right">
        <NuxtLink to="/auth/register" class="btn btn-crimson btn-sm">+ New</NuxtLink>
      </div>
    </div>
    <div class="page-body">
      <div class="tabs">
        <button v-for="t in tabs" :key="t.k" class="tab" :class="{ active: tab === t.k }" @click="tab = t.k; load()">{{ t.l }}</button>
      </div>
      <div class="card">
        <div class="table-ctrl">
          <div class="search-wrap">
            <span class="search-icon">🔍</span>
            <input type="search" class="f-input" placeholder="Search name, email or ID…" v-model="search" @input="load" style="width:280px;" />
          </div>
        </div>
        <div v-if="loading" style="padding:48px;text-align:center;color:var(--muted);">Loading…</div>
        <table v-else class="data-table">
          <thead><tr>
            <th>Applicant</th><th>Type</th><th>Country</th><th>Applied</th><th>Status</th><th>Actions</th>
          </tr></thead>
          <tbody>
            <tr v-for="(m, i) in rows" :key="m.id">
              <td>
                <div class="member-cell">
                  <div class="member-avatar" :class="m.photoUrl ? '' : 'member-av-init'"
                    :style="!m.photoUrl ? `background:${bgColors[i%5]};color:${txColors[i%5]}` : ''">
                    <img v-if="m.photoUrl" :src="m.photoUrl" :alt="m.firstName" />
                    <span v-else>{{ m.firstName?.[0] }}{{ m.lastName?.[0] }}</span>
                  </div>
                  <div>
                    <div class="member-name">{{ m.firstName }} {{ m.lastName }}</div>
                    <div class="member-email">{{ m.email }}</div>
                  </div>
                </div>
              </td>
              <td><span class="badge badge-type">{{ m.membershipType }}</span></td>
              <td class="td-muted">{{ m.country || '—' }}</td>
              <td class="td-muted">{{ new Date(m.createdAt).toLocaleDateString('en-GB') }}</td>
              <td>
                <span :class="`badge badge-${m.status === 'active' ? 'active' : m.status === 'pending' ? 'pending' : 'inactive'}`">
                  <span class="bdot" />{{ m.status === 'active' ? 'Approved' : m.status }}
                </span>
              </td>
              <td>
                <div style="display:flex;gap:6px;">
                  <button v-if="m.status === 'pending'" class="btn btn-crimson btn-sm" :disabled="acting === m.id" @click="approve(m)">
                    {{ acting === m.id ? '…' : 'Approve' }}
                  </button>
                  <button v-if="m.status === 'pending'" class="btn btn-danger btn-sm" :disabled="acting === m.id" @click="reject(m)">Reject</button>
                  <button v-if="m.status !== 'pending'" class="btn btn-outline btn-sm">View</button>
                </div>
              </td>
            </tr>
            <tr v-if="!rows.length">
              <td colspan="6" style="text-align:center;padding:40px;color:var(--muted);">No records found.</td>
            </tr>
          </tbody>
        </table>
        <div class="table-foot">Showing {{ rows.length }} of {{ total }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: ['auth','admin'] })
const tabs = [{ k:'', l:'All' },{ k:'pending', l:'Pending' },{ k:'active', l:'Approved' },{ k:'inactive', l:'Rejected' }]
const tab = ref(''), search = ref(''), loading = ref(false), acting = ref<number|null>(null)
const rows = ref<any[]>([]), total = ref(0)
const bgColors = ['#f0d9e0','#fdf3dc','#e0edd5','#dde9f9','#e9dff5']
const txColors = ['#6B0F1A','#8B5E00','#2D6A4F','#1a4f8a','#5E2D8A']

async function load() {
  loading.value = true
  try {
    const params: any = { page:1, limit:50 }
    if (tab.value)    params.status = tab.value
    if (search.value) params.search = search.value
    const d: any = await $fetch('/api/admin/members', { params })
    rows.value = d.data; total.value = d.total
  } finally { loading.value = false }
}

async function approve(m: any) {
  acting.value = m.id
  try {
    await $fetch(`/api/admin/members/${m.id}/approve`, { method: 'POST' })
    m.status = 'active'
  } catch (e: any) { alert(e?.data?.message || 'Error approving member') }
  finally { acting.value = null }
}

async function reject(m: any) {
  if (!confirm(`Reject ${m.firstName} ${m.lastName}?`)) return
  acting.value = m.id
  try {
    await $fetch(`/api/admin/members/${m.id}/reject`, { method: 'POST' })
    m.status = 'inactive'
  } catch (e: any) { alert(e?.data?.message || 'Error rejecting member') }
  finally { acting.value = null }
}

onMounted(load)
</script>
