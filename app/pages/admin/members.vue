<template>
  <div>
    <div class="topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="topbar-menu" @click="toggleSidebar?.()">☰</button>
        <h1 class="topbar-title">Members</h1>
      </div>
      <div class="topbar-right">
        <button class="btn btn-outline btn-sm" @click="exportCSV">⬇ Export CSV</button>
      </div>
    </div>

    <div class="page-body">
      <div class="card">
        <div class="table-ctrl">
          <div class="search-wrap" style="flex:1;max-width:300px;">
            <span class="search-icon">🔍</span>
            <input type="search" class="f-input" placeholder="Search name, email or ID…" v-model="search" @input="load" />
          </div>
          <select class="f-select" v-model="statusF" @change="load" style="width:150px;">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div v-if="loading" style="padding:48px;text-align:center;color:var(--muted);">Loading…</div>
        <div v-else style="overflow-x:auto;">
          <table class="data-table">
            <thead><tr>
              <th>Member</th><th>Type</th><th>Country</th><th>Registered</th><th>Status</th><th style="text-align:right;">Action</th>
            </tr></thead>
            <tbody>
              <tr v-for="m in rows" :key="m.id">
                <td data-label="">
                  <div class="member-cell">
                    <div class="member-avatar" :class="m.photoUrl ? '' : 'member-av-init'">
                      <img v-if="m.photoUrl" :src="m.photoUrl" :alt="m.firstName" />
                      <span v-else>{{ m.firstName?.[0] }}{{ m.lastName?.[0] }}</span>
                    </div>
                    <div>
                      <div class="member-name">{{ m.firstName }} {{ m.lastName }}</div>
                      <div class="member-email">{{ m.memberId || m.email }}</div>
                    </div>
                  </div>
                </td>
                <td data-label="Type"><span class="badge badge-type">{{ m.membershipType }}</span></td>
                <td data-label="Country" class="td-muted">{{ m.country || '—' }}</td>
                <td data-label="Registered" class="td-muted">{{ new Date(m.createdAt).toLocaleDateString('en-GB') }}</td>
                <td data-label="Status">
                  <span :class="`badge badge-${m.status}`"><span class="bdot" />{{ m.status }}</span>
                </td>
                <td data-label="Action" style="text-align:right;">
                  <button class="btn btn-outline btn-sm" @click="openView(m)">View</button>
                </td>
              </tr>
              <tr v-if="!rows.length">
                <td colspan="6" style="text-align:center;padding:40px;color:var(--muted);">No members found.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-foot">{{ rows.length }} of {{ total }} members</div>
      </div>
    </div>

    <!-- ── VIEW MEMBER MODAL ── -->
    <div v-if="viewing" style="position:fixed;inset:0;z-index:400;display:flex;align-items:center;justify-content:center;padding:16px;">
      <div style="position:absolute;inset:0;background:rgba(45,0,8,0.6);backdrop-filter:blur(4px);" @click="viewing=null" />
      <div style="position:relative;background:var(--white);border-radius:16px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 80px rgba(61,0,0,0.3);">
        <!-- Modal header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border-light);background:var(--parchment);border-radius:16px 16px 0 0;">
          <div style="display:flex;align-items:center;gap:14px;">
            <div class="member-avatar member-av-init" style="width:46px;height:46px;font-size:17px;border:none;">
              <img v-if="viewing.photoUrl" :src="viewing.photoUrl" :alt="viewing.firstName" style="width:100%;height:100%;object-fit:cover;" />
              <span v-else>{{ viewing.firstName?.[0] }}{{ viewing.lastName?.[0] }}</span>
            </div>
            <div>
              <div style="font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--crimson);">{{ viewing.firstName }} {{ viewing.lastName }}</div>
              <div style="font-size:12px;color:var(--muted2);">{{ viewing.email }}</div>
            </div>
          </div>
          <button @click="viewing=null" style="background:none;border:none;font-size:20px;color:var(--muted2);cursor:pointer;padding:4px;line-height:1;">✕</button>
        </div>

        <!-- Modal body -->
        <div style="padding:22px 24px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;">
            <div v-for="[k,v] in modalFields" :key="k" class="detail-row" style="grid-column:span 1;">
              <span class="detail-key">{{ k }}</span>
              <span class="detail-value">
                <span v-if="k==='Status'" :class="`badge badge-${viewing.status}`"><span class="bdot"/>{{ viewing.status }}</span>
                <span v-else>{{ v || '—' }}</span>
              </span>
            </div>
          </div>

          <div v-if="viewing.motivation" style="margin-top:16px;padding:14px 16px;background:var(--parchment);border-radius:8px;border:1px solid var(--border-light);">
            <div style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted2);margin-bottom:6px;">Motivation</div>
            <p style="font-size:14px;color:var(--text-mid);line-height:1.65;">{{ viewing.motivation }}</p>
          </div>

          <!-- Actions -->
          <div v-if="viewing.status === 'pending'" style="display:flex;gap:10px;margin-top:20px;">
            <button class="btn btn-crimson" style="flex:1;" :disabled="acting === viewing.id" @click="approveFromModal">
              {{ acting === viewing.id ? 'Approving…' : '✓ Approve Member' }}
            </button>
            <button class="btn btn-danger btn-sm" :disabled="acting === viewing.id" @click="rejectFromModal">Reject</button>
          </div>
          <div v-else style="margin-top:16px;text-align:center;">
            <span :class="`badge badge-${viewing.status}`" style="font-size:13px;padding:7px 18px;">
              <span class="bdot"/>Member {{ viewing.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: ['auth','admin'] })
const toggleSidebar = inject<() => void>('toggleSidebar')

const search = ref(''), statusF = ref(''), loading = ref(false)
const rows = ref<any[]>([]), total = ref(0)
const viewing = ref<any>(null), acting = ref<number|null>(null)

async function load() {
  loading.value = true
  try {
    const params: any = { page:1, limit:100 }
    if (statusF.value) params.status = statusF.value
    if (search.value)  params.search = search.value
    const d: any = await $fetch('/api/admin/members', { params })
    rows.value = d.data; total.value = d.total
  } finally { loading.value = false }
}
onMounted(load)

function openView(m: any) { viewing.value = { ...m } }

const modalFields = computed(() => viewing.value ? [
  ['Member ID',    viewing.value.memberId],
  ['Status',       viewing.value.status],
  ['Position',     viewing.value.position],
  ['Type',         viewing.value.membershipType],
  ['Phone',        viewing.value.phone],
  ['Country',      viewing.value.country],
  ['City',         viewing.value.city],
  ['Occupation',   viewing.value.occupation],
  ['Member Since', viewing.value.memberSince],
  ['Registered',   viewing.value.createdAt ? new Date(viewing.value.createdAt).toLocaleDateString('en-GB') : '—'],
] : [])

async function approveFromModal() {
  if (!viewing.value) return
  acting.value = viewing.value.id
  try {
    await $fetch(`/api/admin/members/${viewing.value.id}/approve`, { method: 'POST' })
    viewing.value.status = 'active'
    const r = rows.value.find(x => x.id === viewing.value.id)
    if (r) r.status = 'active'
  } catch (e: any) { alert(e?.data?.message || 'Error approving member') }
  finally { acting.value = null }
}

async function rejectFromModal() {
  if (!viewing.value || !confirm(`Reject ${viewing.value.firstName} ${viewing.value.lastName}?`)) return
  acting.value = viewing.value.id
  try {
    await $fetch(`/api/admin/members/${viewing.value.id}/reject`, { method: 'POST' })
    viewing.value.status = 'inactive'
    const r = rows.value.find(x => x.id === viewing.value.id)
    if (r) r.status = 'inactive'
  } catch (e: any) { alert(e?.data?.message || 'Error rejecting member') }
  finally { acting.value = null }
}

function exportCSV() {
  const headers = ['ID','First Name','Last Name','Email','Phone','Country','City','Position','Type','Status','Member ID','Member Since','Registered']
  const csvRows = [
    headers.join(','),
    ...rows.value.map(m => [
      m.id,
      `"${m.firstName || ''}"`,
      `"${m.lastName || ''}"`,
      `"${m.email || ''}"`,
      `"${m.phone || ''}"`,
      `"${m.country || ''}"`,
      `"${m.city || ''}"`,
      `"${m.position || ''}"`,
      `"${m.membershipType || ''}"`,
      m.status,
      m.memberId || '',
      m.memberSince || '',
      m.createdAt ? new Date(m.createdAt).toLocaleDateString('en-GB') : '',
    ].join(','))
  ]
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `tasforce-members-${new Date().toISOString().slice(0,10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
</script>