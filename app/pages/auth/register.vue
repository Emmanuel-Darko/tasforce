<template>
  <div class="aw">

    <!-- ── SUCCESS ── -->
    <div v-if="submitted" class="aw-success">
      <div class="aw-success-check">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2 class="aw-title">Application Submitted!</h2>
      <p class="aw-sub">Thank you, <strong>{{ f.firstName }}</strong>. Your application has been received. We'll email <strong>{{ f.email }}</strong> once approved.</p>

      <div class="aw-next-steps">
        <div class="aw-next-label">What happens next?</div>
        <div v-for="(s, i) in nextSteps" :key="i" class="aw-next-item">
          <div class="aw-next-num">{{ i + 1 }}</div>
          <span>{{ s }}</span>
        </div>
      </div>

      <NuxtLink to="/auth/login" class="aw-btn-primary" style="text-decoration:none;display:flex;">
        Sign In to My Account
      </NuxtLink>
      <p class="aw-footer-text" style="margin-top:14px;">Questions? <a href="mailto:info@tas-force.org" class="aw-link">info@tas-force.org</a></p>
    </div>

    <!-- ── FORM ── -->
    <template v-else>
      <h2 class="aw-title">Join TAS-FORCE</h2>
      <p class="aw-sub">Complete the form to apply for membership. Fields marked * are required.</p>

      <!-- Stepper -->
      <div class="aw-stepper">
        <div v-for="(l, i) in ['Personal','Membership','Security']" :key="l" class="aw-step">
          <div class="aw-step-circle" :class="{ done: step > i+1, active: step === i+1 }">
            <svg v-if="step > i+1" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 4 6.5 11 3 7.5"/></svg>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span class="aw-step-label" :class="{ 'aw-step-label--active': step === i+1 }">{{ l }}</span>
          <div v-if="i < 2" class="aw-step-connector" :class="{ done: step > i+1 }" />
        </div>
      </div>

      <div v-if="error" class="aw-error">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><line x1="10" y1="7" x2="10" y2="10"/><circle cx="10" cy="13.5" r=".5" fill="currentColor"/></svg>
        {{ error }}
      </div>

      <!-- Step 1 -->
      <template v-if="step === 1">
        <div class="aw-grid">
          <div class="aw-field"><label class="aw-label">First Name <span class="aw-req">*</span></label><input type="text" class="aw-input" placeholder="e.g. Akosua" v-model="f.firstName" /></div>
          <div class="aw-field"><label class="aw-label">Last Name <span class="aw-req">*</span></label><input type="text" class="aw-input" placeholder="e.g. Serwah" v-model="f.lastName" /></div>
          <div class="aw-field"><label class="aw-label">Email Address <span class="aw-req">*</span></label><input type="email" class="aw-input" placeholder="you@email.com" v-model="f.email" /></div>
          <div class="aw-field"><label class="aw-label">Phone Number <span class="aw-req">*</span></label><input type="tel" class="aw-input" placeholder="+123-456-7890" v-model="f.phone" /></div>
          <div class="aw-field"><label class="aw-label">Country <span class="aw-req">*</span></label><input type="text" class="aw-input" placeholder="e.g. Ghana" v-model="f.country" /></div>
          <div class="aw-field"><label class="aw-label">City / Town</label><input type="text" class="aw-input" placeholder="e.g. Accra" v-model="f.city" /></div>
          <div class="aw-field"><label class="aw-label">Date of Birth</label><input type="date" class="aw-input" v-model="f.dateOfBirth" /></div>
          <div class="aw-field"><label class="aw-label">Gender</label>
            <select class="aw-select" v-model="f.gender">
              <option value="">— Select —</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          <div class="aw-field aw-col-2"><label class="aw-label">Occupation</label><input type="text" class="aw-input" placeholder="e.g. Teacher, Lawyer, Student" v-model="f.occupation" /></div>
        </div>
        <div class="aw-form-actions">
          <button class="aw-btn-primary" @click="nextStep">Continue →</button>
        </div>
      </template>

      <!-- Step 2 -->
      <template v-if="step === 2">
        <div class="aw-grid">
          <div class="aw-field"><label class="aw-label">Membership Type <span class="aw-req">*</span></label>
            <select class="aw-select" v-model="f.membershipType">
              <option value="advocate">Advocate</option>
              <option value="supporter">Supporter</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>
          <div class="aw-field"><label class="aw-label">Position / Role <span class="aw-req">*</span></label>
            <select class="aw-select" v-model="f.position">
              <option value="advocate">Advocate</option>
              <option value="coordinator">Coordinator</option>
              <option value="volunteer">Volunteer</option>
              <option value="ambassador">Ambassador</option>
              <option value="supporter">Supporter</option>
            </select>
          </div>
          <div class="aw-field aw-col-2"><label class="aw-label">Why do you want to join? <span class="aw-req">*</span></label>
            <textarea class="aw-input aw-textarea" rows="4" placeholder="Tell us your motivation for joining TAS-FORCE…" v-model="f.motivation" />
          </div>
          <div class="aw-field"><label class="aw-label">Referred By (Member ID)</label><input type="text" class="aw-input" placeholder="TF-XXXX-XXXX" v-model="f.referredBy" /></div>
          <div class="aw-field aw-col-2">
            <label class="aw-label">Profile Photo</label>
            <div class="aw-photo-tabs">
              <button type="button" class="aw-photo-tab" :class="{ active: photoMode==='url' }"    @click="photoMode='url'">Paste URL</button>
              <button type="button" class="aw-photo-tab" :class="{ active: photoMode==='upload' }" @click="photoMode='upload'">Upload Photo</button>
            </div>
            <input v-if="photoMode==='url'" type="url" class="aw-input" placeholder="https://…" v-model="f.photoUrl" />
            <input v-else type="file" accept="image/*" class="aw-input" @change="handleFileUpload" style="padding:10px;" />
            <div v-if="f.photoUrl" class="aw-photo-preview">
              <img :src="f.photoUrl" alt="Preview" />
              <span class="aw-photo-preview-label">Photo preview</span>
              <button type="button" class="aw-photo-remove" @click="f.photoUrl=''">Remove</button>
            </div>
            <span class="aw-hint">Optional — used on your membership card</span>
          </div>
        </div>
        <div class="aw-form-actions">
          <button class="aw-btn-outline" @click="step--">← Back</button>
          <button class="aw-btn-primary" @click="nextStep">Continue →</button>
        </div>
      </template>

      <!-- Step 3 -->
      <template v-if="step === 3">
        <div class="aw-grid">
          <div class="aw-field"><label class="aw-label">Password <span class="aw-req">*</span></label><input type="password" class="aw-input" placeholder="Min. 8 characters" v-model="f.password" /></div>
          <div class="aw-field"><label class="aw-label">Confirm Password <span class="aw-req">*</span></label><input type="password" class="aw-input" placeholder="Re-enter password" v-model="f.confirmPassword" /></div>
        </div>
        <div class="aw-info-box">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><line x1="10" y1="9" x2="10" y2="14"/><circle cx="10" cy="6.5" r=".5" fill="currentColor"/></svg>
          Your application will be reviewed by an administrator. You'll receive an email once approved and your membership card is issued.
        </div>
        <div class="aw-form-actions">
          <button class="aw-btn-outline" @click="step--">← Back</button>
          <button class="aw-btn-gold" :disabled="loading" @click="submit">
            <span v-if="loading" class="aw-spinner" />
            {{ loading ? 'Submitting…' : 'Submit Application' }}
          </button>
        </div>
      </template>

      <p class="aw-footer-text" style="margin-top:20px;">
        Already a member? <NuxtLink to="/auth/login" class="aw-link">Sign in here</NuxtLink>
      </p>
    </template>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'guest' })
const step = ref(1), loading = ref(false), error = ref(''), submitted = ref(false)
const photoMode = ref<'url'|'upload'>('url')
const f = reactive({
  firstName:'', lastName:'', email:'', phone:'', country:'', city:'',
  dateOfBirth:'', gender:'', occupation:'',
  membershipType:'advocate', position:'advocate',
  motivation:'', referredBy:'', photoUrl:'',
  password:'', confirmPassword:'',
})
function handleFileUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) { error.value = 'Photo must be under 2MB.'; return }
  const reader = new FileReader()
  reader.onload = () => { f.photoUrl = reader.result as string }
  reader.readAsDataURL(file)
}
const nextSteps = [
  'Admin reviews your application (usually within 24–48 hours).',
  'You receive an approval email with your Member ID.',
  'Log in to download and print your official membership card.',
]
function nextStep() {
  error.value = ''
  if (step.value === 1 && (!f.firstName || !f.lastName || !f.email || !f.phone || !f.country)) {
    error.value = 'Please fill in all required fields.'; return
  }
  if (step.value === 2 && !f.motivation) {
    error.value = 'Please tell us your motivation for joining.'; return
  }
  step.value++
}
async function submit() {
  error.value = ''
  if (!f.password || f.password.length < 8) { error.value = 'Password must be at least 8 characters.'; return }
  if (f.password !== f.confirmPassword)      { error.value = 'Passwords do not match.'; return }
  loading.value = true
  try {
    const { confirmPassword: _, ...body } = f
    await $fetch('/api/auth/register', { method: 'POST', body })
    submitted.value = true
  } catch (e: any) {
    error.value = e?.data?.message || 'Registration failed. Please try again.'
  } finally { loading.value = false }
}
</script>

<style scoped>
.aw { width: 100%; max-width: 580px; }
.aw-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.aw-sub   { font-size: 15px; color: var(--muted); margin-bottom: 22px; line-height: 1.6; }
.aw-req   { color: var(--danger, #8b0000); }
.aw-hint  { font-size: 12px; color: var(--muted2); margin-top: 4px; display: block; }

/* Error */
.aw-error { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: #fdf2f2; border: 1.5px solid #f5c0c0; border-radius: 10px; font-size: 14px; color: #7a0000; margin-bottom: 18px; }
.aw-error svg { width: 18px; height: 18px; flex-shrink: 0; color: #c0392b; }

/* Stepper */
.aw-stepper { display: flex; align-items: center; gap: 0; margin-bottom: 28px; position: relative; }
.aw-step   { display: flex; flex-direction: column; align-items: center; gap: 6px; position: relative; flex: 1; }
.aw-step-circle {
  width: 30px; height: 30px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-size: 13px; font-weight: 700;
  background: var(--parchment2, #f3eeea); color: var(--muted2);
  border: 2px solid var(--border, #ddd5e0);
  transition: all .2s; z-index: 1; position: relative;
}
.aw-step-circle.active { background: var(--crimson, #2D1B69); color: var(--cream, #f5e6d0); border-color: var(--crimson, #2D1B69); box-shadow: 0 0 0 3px rgba(45,27,105,.18); }
.aw-step-circle.done   { background: var(--gold, #c9a84c); color: var(--crimson-deep, #1A0F3D); border-color: var(--gold, #c9a84c); }
.aw-step-circle svg    { width: 14px; height: 14px; }
.aw-step-label         { font-size: 10px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--muted2); white-space: nowrap; }
.aw-step-label--active { color: var(--crimson, #2D1B69); }
.aw-step-connector     { position: absolute; top: 15px; left: 50%; right: -50%; height: 2px; background: var(--border, #ddd5e0); z-index: 0; }
.aw-step-connector.done { background: var(--gold, #c9a84c); }

/* Form grid */
.aw-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
.aw-col-2 { grid-column: span 2; }
.aw-field { display: flex; flex-direction: column; gap: 5px; }
.aw-label { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--text-mid, #3d2e4a); }
.aw-input, .aw-select {
  background: var(--white); border: 1.5px solid var(--border, #ddd5e0);
  border-radius: 10px; padding: 11px 14px;
  font-family: 'Crimson Pro', serif; font-size: 15px; color: var(--text);
  outline: none; width: 100%;
  transition: border-color .18s, box-shadow .18s;
  -webkit-appearance: none; appearance: none;
}
.aw-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; cursor: pointer; }
.aw-input::placeholder { color: var(--muted2, #9a8fa8); }
.aw-input:focus, .aw-select:focus { border-color: var(--crimson, #2D1B69); box-shadow: 0 0 0 3px rgba(45,27,105,.1); }
.aw-textarea { resize: vertical; min-height: 100px; line-height: 1.6; }

/* Photo */
.aw-photo-tabs  { display: flex; gap: 6px; margin-bottom: 8px; }
.aw-photo-tab   { padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: 1.5px solid var(--border, #ddd5e0); background: transparent; color: var(--muted); transition: all .18s; font-family: 'Crimson Pro', serif; }
.aw-photo-tab.active { background: var(--crimson, #2D1B69); color: var(--cream, #f5e6d0); border-color: var(--crimson, #2D1B69); }
.aw-photo-preview { display: flex; align-items: center; gap: 12px; margin-top: 10px; padding: 10px 12px; background: var(--parchment, #faf8f5); border: 1px solid var(--border-light, #eae4ee); border-radius: 10px; }
.aw-photo-preview img { width: 52px; height: 52px; border-radius: 8px; object-fit: cover; border: 2px solid var(--border); flex-shrink: 0; }
.aw-photo-preview-label { font-size: 12px; color: var(--muted); flex: 1; }
.aw-photo-remove { background: none; border: none; color: var(--danger, #8b0000); font-size: 13px; cursor: pointer; font-family: 'Crimson Pro', serif; }

/* Info box */
.aw-info-box { display: flex; align-items: flex-start; gap: 10px; padding: 13px 16px; background: #f0f4ff; border: 1.5px solid #c0d0f8; border-radius: 10px; font-size: 14px; color: #1a3a80; line-height: 1.6; margin-bottom: 16px; }
.aw-info-box svg { width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px; }

/* Buttons */
.aw-form-actions { display: flex; justify-content: flex-end; gap: 10px; }
.aw-btn-primary {
  padding: 12px 28px; border-radius: 10px;
  background: linear-gradient(135deg, var(--crimson, #2D1B69), var(--crimson2, #3E2A82));
  color: var(--cream, #f5e6d0); font-family: 'Crimson Pro', serif;
  font-size: 15px; font-weight: 700; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  box-shadow: 0 2px 12px rgba(45,27,105,.28);
  transition: transform .22s, box-shadow .22s, opacity .2s;
}
.aw-btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 5px 20px rgba(45,27,105,.38); }
.aw-btn-primary:disabled { opacity: .65; cursor: not-allowed; }

.aw-btn-gold {
  padding: 12px 28px; border-radius: 10px;
  background: linear-gradient(135deg, var(--gold, #c9a84c), var(--gold2, #e0c06a));
  color: var(--crimson-deep, #1A0F3D); font-family: 'Crimson Pro', serif;
  font-size: 15px; font-weight: 700; border: none; cursor: pointer;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 2px 12px rgba(201,168,76,.3);
  transition: transform .22s, box-shadow .22s, opacity .2s;
}
.aw-btn-gold:hover:not(:disabled) { transform: translateY(-1px); }
.aw-btn-gold:disabled { opacity: .65; cursor: not-allowed; }

.aw-btn-outline {
  padding: 12px 24px; border-radius: 10px; background: transparent;
  color: var(--crimson, #2D1B69); border: 1.5px solid var(--crimson, #2D1B69);
  font-family: 'Crimson Pro', serif; font-size: 15px; font-weight: 600; cursor: pointer;
  transition: background .18s;
}
.aw-btn-outline:hover { background: rgba(45,27,105,.06); }

.aw-spinner { width: 15px; height: 15px; border: 2px solid rgba(245,230,208,.3); border-top-color: var(--cream, #f5e6d0); border-radius: 50%; animation: spin .7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.aw-footer-text { font-size: 15px; color: var(--muted); }
.aw-link { color: var(--crimson, #2D1B69); font-weight: 600; text-decoration: none; }
.aw-link:hover { text-decoration: underline; }

/* Success */
.aw-success      { text-align: center; }
.aw-success-check { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #1f6644, #2D6A4F); display: flex; align-items: center; justify-content: center; margin: 0 auto 22px; box-shadow: 0 4px 20px rgba(31,102,68,.35); }
.aw-success-check svg { width: 28px; height: 28px; color: #fff; }
.aw-next-steps   { background: var(--parchment2, #f3eeea); border: 1px solid var(--border, #ddd5e0); border-radius: 14px; padding: 20px 24px; margin: 20px 0; text-align: left; }
.aw-next-label   { font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--muted2); margin-bottom: 14px; }
.aw-next-item    { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 10px; font-size: 14px; color: var(--text-mid); line-height: 1.55; }
.aw-next-num     { width: 22px; height: 22px; border-radius: 50%; background: var(--crimson, #2D1B69); color: var(--cream, #f5e6d0); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; font-family: 'Playfair Display', serif; }

@media (max-width: 520px) {
  .aw-grid { grid-template-columns: 1fr; }
  .aw-col-2 { grid-column: span 1; }
  .aw-form-actions { flex-direction: column-reverse; }
  .aw-btn-primary, .aw-btn-gold, .aw-btn-outline { width: 100%; justify-content: center; }
  .aw-step-label { display: none; }
}
</style>