<template>
  <div>
    <div class="topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="topbar-menu" @click="toggleSidebar?.()">☰</button>
        <h1 class="topbar-title">Registrations</h1>
      </div>
      <div class="topbar-right">
        <button class="btn btn-crimson btn-sm" @click="showAdd=true">+ New</button>
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
        <div v-else style="overflow-x:auto;">
          <table class="data-table">
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
                    <button class="btn btn-outline btn-sm" @click="openView(m)">View</button>
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

    <!-- ── ADD MEMBER MODAL ── -->
    <div v-if="showAdd" style="position:fixed;inset:0;z-index:400;display:flex;align-items:center;justify-content:center;padding:16px;">
      <div style="position:absolute;inset:0;background:rgba(45,0,8,0.6);backdrop-filter:blur(4px);" @click="showAdd=false" />
      <div style="position:relative;background:var(--white);border-radius:16px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 80px rgba(61,0,0,0.3);">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border-light);background:var(--parchment);border-radius:16px 16px 0 0;">
          <div style="font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--crimson);">Register New Member</div>
          <button @click="showAdd=false" style="background:none;border:none;font-size:20px;color:var(--muted2);cursor:pointer;padding:4px;line-height:1;">✕</button>
        </div>
        <div style="padding:22px 24px;">
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
                <option value="advocate">Advocate</option>
                <option value="supporter">Supporter</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>
            <div class="field"><label>Position</label>
              <select class="f-select" v-model="addForm.position">
                <option value="advocate">Advocate</option>
                <option value="coordinator">Coordinator</option>
                <option value="volunteer">Volunteer</option>
                <option value="ambassador">Ambassador</option>
                <option value="supporter">Supporter</option>
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: ['auth','admin'] })
const toggleSidebar = inject<() => void>('toggleSidebar')

const tabs = [{ k:'', l:'All' },{ k:'pending', l:'Pending' },{ k:'active', l:'Approved' },{ k:'inactive', l:'Rejected' }]
const tab = ref(''), search = ref(''), loading = ref(false), acting = ref<number|null>(null)
const rows = ref<any[]>([]), total = ref(0)
const viewing = ref<any>(null)
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

// ── ADD MEMBER ──
const showAdd = ref(false), addLoading = ref(false), addError = ref('')
const addForm = reactive({
  firstName:'', lastName:'', email:'', phone:'', country:'', city:'',
  membershipType:'advocate', position:'advocate', password:'',
})

async function submitAdd() {
  addError.value = ''
  if (!addForm.firstName || !addForm.lastName || !addForm.email || !addForm.phone || !addForm.country) {
    addError.value = 'Please fill in all required fields.'; return
  }
  if (!addForm.password || addForm.password.length < 8) {
    addError.value = 'Password must be at least 8 characters.'; return
  }
  addLoading.value = true
  try {
    await $fetch('/api/auth/register', { method: 'POST', body: { ...addForm } })
    showAdd.value = false
    // Reset form
    Object.assign(addForm, { firstName:'', lastName:'', email:'', phone:'', country:'', city:'', membershipType:'advocate', position:'advocate', password:'' })
    await load()
  } catch (e: any) {
    addError.value = e?.data?.message || 'Registration failed.'
  } finally { addLoading.value = false }
}

onMounted(load)
</script>
