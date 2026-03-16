<template>
  <div>
    <div class="topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="topbar-menu" @click="toggleSidebar?.()">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="2" y1="5" x2="18" y2="5"/><line x1="2" y1="10" x2="18" y2="10"/><line x1="2" y1="15" x2="18" y2="15"/></svg>
        </button>
        <h1 class="topbar-title">Registrations</h1>
      </div>
      <div class="topbar-right">
        <button class="btn btn-crimson btn-sm" @click="showAdd=true">+ New Member</button>
      </div>
    </div>

    <div class="page-body">
      <div class="tabs">
        <button v-for="t in tabs" :key="t.k" class="tab" :class="{ active: tab === t.k }" @click="tab = t.k; load()">
          {{ t.l }}
          <span v-if="t.k === 'pending' && (pendingCount > 0)" class="tab-badge">{{ pendingCount }}</span>
        </button>
      </div>

      <div class="card">
        <div class="table-ctrl">
          <div class="search-wrap" style="flex:1;max-width:280px;">
            <span class="search-icon">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="5.5"/><line x1="12.5" y1="12.5" x2="17" y2="17"/></svg>
            </span>
            <input type="search" class="f-input" placeholder="Search name, email or ID…" v-model="search" @input="load" />
          </div>
        </div>

        <div v-if="loading" class="reg-loading">
          <div class="reg-spinner" />Loading…
        </div>

        <div v-else style="overflow-x:auto;">
          <table class="data-table">
            <thead><tr>
              <th>Applicant</th><th>Type</th><th>Country</th><th>Applied</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              <tr v-for="(m, i) in rows" :key="m.id">
                <td data-label="Applicant">
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
                <td data-label="Type"><span class="badge badge-type">{{ m.membershipType }}</span></td>
                <td data-label="Country" class="td-muted">{{ m.country || '—' }}</td>
                <td data-label="Applied" class="td-muted">{{ new Date(m.createdAt).toLocaleDateString('en-GB') }}</td>
                <td data-label="Status">
                  <span :class="`badge badge-${m.status === 'active' ? 'active' : m.status === 'pending' ? 'pending' : 'inactive'}`">
                    <span class="bdot" />{{ m.status === 'active' ? 'Approved' : m.status }}
                  </span>
                </td>
                <td data-label="Actions">
                  <div style="display:flex;gap:6px;flex-wrap:wrap;">
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
        </div>
        <div class="table-foot">Showing {{ rows.length }} of {{ total }}</div>
      </div>
    </div>

    <!-- ADD MODAL -->
    <Teleport to="body">
      <div v-if="showAdd" class="modal-root">
        <div class="modal-bg" @click="showAdd=false" />
        <div class="modal-box modal-box--wide">
          <div class="modal-head">
            <div class="modal-title">Register New Member</div>
            <button class="modal-close" @click="showAdd=false">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="15" y1="5" x2="5" y2="15"/><line x1="5" y1="5" x2="15" y2="15"/></svg>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="addError" class="notice notice-err" style="margin-bottom:14px;"><span>✕</span><span>{{ addError }}</span></div>
            <div class="form-grid" style="margin-bottom:16px;">
              <div class="field"><label>First Name <span class="req">*</span></label><input type="text" class="f-input" v-model="addForm.firstName" /></div>
              <div class="field"><label>Last Name <span class="req">*</span></label><input type="text" class="f-input" v-model="addForm.lastName" /></div>
              <div class="field"><label>Email <span class="req">*</span></label><input type="email" class="f-input" v-model="addForm.email" /></div>
              <div class="field"><label>Phone <span class="req">*</span></label><input type="tel" class="f-input" v-model="addForm.phone" /></div>
              <div class="field"><label>Country <span class="req">*</span></label><input type="text" class="f-input" v-model="addForm.country" /></div>
              <div class="field"><label>City</label><input type="text" class="f-input" v-model="addForm.city" /></div>
              <div class="field"><label>Membership Type</label>
                <select class="f-select" v-model="addForm.membershipType">
                  <option value="advocate">Advocate</option><option value="supporter">Supporter</option><option value="volunteer">Volunteer</option>
                </select>
              </div>
              <div class="field"><label>Position</label>
                <select class="f-select" v-model="addForm.position">
                  <option value="advocate">Advocate</option><option value="coordinator">Coordinator</option><option value="volunteer">Volunteer</option><option value="ambassador">Ambassador</option><option value="supporter">Supporter</option>
                </select>
              </div>
              <div class="field col-span-2"><label>Password <span class="req">*</span></label><input type="password" class="f-input" placeholder="Min. 8 characters" v-model="addForm.password" /></div>
            </div>
            <div style="display:flex;gap:10px;justify-content:flex-end;">
              <button class="btn btn-outline" @click="showAdd=false">Cancel</button>
              <button class="btn btn-crimson" :disabled="addLoading" @click="submitAdd">
                {{ addLoading ? 'Registering…' : 'Register Member' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: ['auth','admin'] })
const toggleSidebar = inject<() => void>('toggleSidebar')
const tabs = [{ k:'', l:'All' },{ k:'pending', l:'Pending' },{ k:'active', l:'Approved' },{ k:'inactive', l:'Rejected' }]
const tab = ref(''), search = ref(''), loading = ref(false), acting = ref<number|null>(null)
const rows = ref<any[]>([]), total = ref(0), pendingCount = ref(0)
const bgColors = ['#f0d9e0','#fdf3dc','#e0edd5','#dde9f9','#e9dff5']
const txColors  = ['#6B0F1A','#8B5E00','#2D6A4F','#1a4f8a','#5E2D8A']
const showAdd = ref(false), addLoading = ref(false), addError = ref('')
const addForm = reactive({ firstName:'', lastName:'', email:'', phone:'', country:'', city:'', membershipType:'advocate', position:'advocate', password:'' })

async function load() {
  loading.value = true
  try {
    const params: any = { page:1, limit:50 }
    if (tab.value)    params.status = tab.value
    if (search.value) params.search = search.value
    const d: any = await $fetch('/api/admin/members', { params })
    rows.value = d.data; total.value = d.total
    if (!tab.value) {
      const pd: any = await $fetch('/api/admin/members', { params: { status:'pending', limit:1 } })
      pendingCount.value = pd.total
    }
  } finally { loading.value = false }
}
async function approve(m: any) {
  acting.value = m.id
  try { await $fetch(`/api/admin/members/${m.id}/approve`, { method:'POST' }); m.status = 'active' }
  catch (e: any) { alert(e?.data?.message || 'Error approving member') }
  finally { acting.value = null }
}
async function reject(m: any) {
  if (!confirm(`Reject ${m.firstName} ${m.lastName}?`)) return
  acting.value = m.id
  try { await $fetch(`/api/admin/members/${m.id}/reject`, { method:'POST' }); m.status = 'inactive' }
  catch (e: any) { alert(e?.data?.message || 'Error rejecting member') }
  finally { acting.value = null }
}
async function submitAdd() {
  addError.value = ''
  if (!addForm.firstName || !addForm.lastName || !addForm.email || !addForm.phone || !addForm.country) { addError.value = 'Please fill in all required fields.'; return }
  if (!addForm.password || addForm.password.length < 8) { addError.value = 'Password must be at least 8 characters.'; return }
  addLoading.value = true
  try {
    await $fetch('/api/auth/register', { method:'POST', body: { ...addForm } })
    showAdd.value = false
    Object.assign(addForm, { firstName:'', lastName:'', email:'', phone:'', country:'', city:'', membershipType:'advocate', position:'advocate', password:'' })
    await load()
  } catch (e: any) { addError.value = e?.data?.message || 'Registration failed.' }
  finally { addLoading.value = false }
}
onMounted(load)
</script>

<style scoped>
.tab-badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 18px; height: 18px; padding: 0 5px;
  background: var(--crimson); color: var(--cream);
  border-radius: 9px; font-size: 10px; font-weight: 700;
  margin-left: 6px; line-height: 1;
}
.reg-loading { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 48px; color: var(--muted); font-size: 15px; }
.reg-spinner { width: 22px; height: 22px; border: 2.5px solid var(--border); border-top-color: var(--crimson); border-radius: 50%; animation: regSpin .7s linear infinite; }
@keyframes regSpin { to { transform: rotate(360deg); } }

/* Modal */
.modal-root { position: fixed; inset: 0; z-index: 400; display: flex; align-items: center; justify-content: center; padding: 16px; }
.modal-bg   { position: absolute; inset: 0; background: rgba(26,0,5,.55); backdrop-filter: blur(4px); }
.modal-box  { position: relative; background: var(--white); border-radius: 18px; width: 100%; max-width: 500px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 80px rgba(61,0,0,.22); }
.modal-box--wide { max-width: 560px; }
.modal-head { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid var(--border-light); background: var(--parchment); border-radius: 18px 18px 0 0; }
.modal-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--crimson); }
.modal-close { background: none; border: none; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; color: var(--muted2); cursor: pointer; transition: background .15s; }
.modal-close svg { width: 15px; height: 15px; }
.modal-close:hover { background: var(--border-light); }
.modal-body { padding: 22px 24px; }

/* Search icon override */
.search-icon { display: flex; align-items: center; }
.search-icon svg { width: 16px; height: 16px; }

@media (max-width: 640px) {
  .table-ctrl { flex-direction: column; gap: 10px; }
  .table-ctrl .search-wrap { max-width: none !important; }
}
</style>