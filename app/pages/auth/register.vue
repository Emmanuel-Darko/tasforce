<template>
  <div style="width:100%;max-width:620px;">

    <!-- ── SUCCESS STATE ── -->
    <div v-if="submitted" style="text-align:center;padding:20px 0;">
      <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#1f6644,#2D6A4F);display:flex;align-items:center;justify-content:center;margin:0 auto 22px;box-shadow:0 4px 20px rgba(31,102,68,0.35);">
        <span style="color:#fff;font-size:30px;line-height:1;">✓</span>
      </div>
      <h2 style="font-family:'Playfair Display',serif;font-size:26px;color:var(--crimson);margin-bottom:10px;">Application Submitted!</h2>
      <p style="font-size:16px;color:var(--muted);line-height:1.75;margin-bottom:8px;">
        Thank you, <strong style="color:var(--crimson);">{{ f.firstName }}</strong>. Your membership application has been received.
      </p>
      <p style="font-size:15px;color:var(--muted);line-height:1.75;margin-bottom:28px;">
        An administrator will review your application shortly. You'll receive an email at
        <strong style="color:var(--text);">{{ f.email }}</strong> once your card is issued.
      </p>
      <div style="background:var(--parchment2);border:1px solid var(--border);border-radius:12px;padding:20px 24px;margin-bottom:28px;text-align:left;">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted2);margin-bottom:12px;">What happens next?</div>
        <div v-for="(step, i) in nextSteps" :key="i" style="display:flex;gap:12px;margin-bottom:10px;align-items:flex-start;">
          <div style="width:22px;height:22px;border-radius:50%;background:var(--crimson);color:var(--cream);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;font-family:'Playfair Display',serif;">{{ i+1 }}</div>
          <span style="font-size:14px;color:var(--text-mid);line-height:1.5;">{{ step }}</span>
        </div>
      </div>
      <NuxtLink to="/auth/login" class="btn btn-gold btn-lg btn-block">Sign In to My Account</NuxtLink>
      <p style="margin-top:16px;font-size:13px;color:var(--muted2);">Questions? <a href="mailto:info@tas-force.org" style="color:var(--crimson);">info@tas-force.org</a></p>
    </div>

    <!-- ── FORM STATE ── -->
    <template v-else>
      <h2 style="font-family:'Playfair Display',serif;font-size:24px;color:var(--crimson);margin-bottom:5px;">Join TAS-FORCE</h2>
      <p style="font-size:15px;color:var(--muted);margin-bottom:22px;">Complete the form to apply for membership. Fields marked * are required.</p>

      <div class="steps" style="margin-bottom:24px;">
        <div v-for="(l, i) in ['Personal','Membership','Security']" :key="l" class="step"
          :class="{ 'step-done': step > i+1, 'step-current': step === i+1 }">
          <div class="step-num" :class="{ done: step > i+1, current: step === i+1 }">
            {{ step > i+1 ? '✓' : i+1 }}
          </div>
          <span class="step-label">{{ l }}</span>
        </div>
      </div>

      <div v-if="error" class="notice notice-err" style="margin-bottom:16px;">
        <span>✕</span><span>{{ error }}</span>
      </div>

      <!-- Step 1 -->
      <template v-if="step === 1">
        <div class="form-grid" style="margin-bottom:18px;">
          <div class="field"><label>First Name <span class="req">*</span></label><input type="text" class="f-input" placeholder="e.g. Akosua" v-model="f.firstName" /></div>
          <div class="field"><label>Last Name <span class="req">*</span></label><input type="text" class="f-input" placeholder="e.g. Serwah" v-model="f.lastName" /></div>
          <div class="field"><label>Email Address <span class="req">*</span></label><input type="email" class="f-input" placeholder="you@email.com" v-model="f.email" /></div>
          <div class="field"><label>Phone Number <span class="req">*</span></label><input type="tel" class="f-input" placeholder="+123-456-7890" v-model="f.phone" /></div>
          <div class="field"><label>Country <span class="req">*</span></label><input type="text" class="f-input" placeholder="e.g. Ghana" v-model="f.country" /></div>
          <div class="field"><label>City / Town</label><input type="text" class="f-input" placeholder="e.g. Accra" v-model="f.city" /></div>
          <div class="field"><label>Date of Birth</label><input type="date" class="f-input" v-model="f.dateOfBirth" /></div>
          <div class="field"><label>Gender</label>
            <select class="f-select" v-model="f.gender">
              <option value="">— Select —</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          <div class="field col-span-2"><label>Occupation</label><input type="text" class="f-input" placeholder="e.g. Teacher, Lawyer, Student" v-model="f.occupation" /></div>
        </div>
        <div style="display:flex;justify-content:flex-end;">
          <button class="btn btn-crimson" @click="nextStep">Continue →</button>
        </div>
      </template>

      <!-- Step 2 -->
      <template v-if="step === 2">
        <div class="form-grid" style="margin-bottom:18px;">
          <div class="field"><label>Membership Type <span class="req">*</span></label>
            <select class="f-select" v-model="f.membershipType">
              <option value="advocate">Advocate</option>
              <option value="supporter">Supporter</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>
          <div class="field"><label>Position / Role <span class="req">*</span></label>
            <select class="f-select" v-model="f.position">
              <option value="advocate">Advocate</option>
              <option value="coordinator">Coordinator</option>
              <option value="volunteer">Volunteer</option>
              <option value="ambassador">Ambassador</option>
              <option value="supporter">Supporter</option>
            </select>
          </div>
          <div class="field col-span-2">
            <label>Why do you want to join? <span class="req">*</span></label>
            <textarea class="f-textarea" rows="4" placeholder="Tell us your motivation for joining TAS-FORCE…" v-model="f.motivation" />
          </div>
          <div class="field"><label>Referred By (Member ID)</label><input type="text" class="f-input" placeholder="TF-XXXX-XXXX" v-model="f.referredBy" /></div>
          <div class="field col-span-2">
            <label>Profile Photo</label>
            <div style="display:flex;gap:8px;margin-bottom:10px;">
              <button type="button" class="btn btn-sm" :class="photoMode==='url'?'btn-crimson':'btn-outline'" @click="photoMode='url'">Paste URL</button>
              <button type="button" class="btn btn-sm" :class="photoMode==='upload'?'btn-crimson':'btn-outline'" @click="photoMode='upload'">Upload Photo</button>
            </div>
            <template v-if="photoMode==='url'">
              <input type="url" class="f-input" placeholder="https://…" v-model="f.photoUrl" />
            </template>
            <template v-else>
              <div style="position:relative;">
                <input type="file" accept="image/*" class="f-input" @change="handleFileUpload" style="padding:10px;" />
              </div>
            </template>
            <div v-if="f.photoUrl" style="margin-top:10px;display:flex;align-items:center;gap:12px;">
              <img :src="f.photoUrl" alt="Preview" style="width:56px;height:56px;border-radius:10px;object-fit:cover;border:2px solid var(--border);" />
              <span style="font-size:12px;color:var(--muted);">Photo preview</span>
              <button type="button" style="margin-left:auto;background:none;border:none;color:var(--danger);cursor:pointer;font-size:13px;" @click="f.photoUrl=''">Remove</button>
            </div>
            <span class="hint">Optional — used on your membership card</span>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:10px;">
          <button class="btn btn-outline" @click="step--">← Back</button>
          <button class="btn btn-crimson" @click="nextStep">Continue →</button>
        </div>
      </template>

      <!-- Step 3 -->
      <template v-if="step === 3">
        <div class="form-grid" style="margin-bottom:18px;">
          <div class="field"><label>Password <span class="req">*</span></label><input type="password" class="f-input" placeholder="Min. 8 characters" v-model="f.password" /></div>
          <div class="field"><label>Confirm Password <span class="req">*</span></label><input type="password" class="f-input" placeholder="Re-enter password" v-model="f.confirmPassword" /></div>
        </div>
        <div class="notice notice-info">
          <span>ℹ</span>
          <span>Your application will be reviewed by an administrator. You'll receive an email once approved and your membership card is issued.</span>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:14px;">
          <button class="btn btn-outline" @click="step--">← Back</button>
          <button class="btn btn-gold" :disabled="loading" @click="submit">
            <span v-if="loading" style="display:flex;align-items:center;gap:8px;">
              <span style="width:14px;height:14px;border:2px solid rgba(61,0,0,0.3);border-top-color:var(--crimson-deep);border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block;"></span>
              Submitting…
            </span>
            <span v-else>Submit Application</span>
          </button>
        </div>
      </template>

      <p style="margin-top:20px;font-size:15px;color:var(--muted);">
        Already a member? <NuxtLink to="/auth/login" style="color:var(--crimson);font-weight:600;">Sign in here</NuxtLink>
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

<style>
@keyframes spin { to { transform: rotate(360deg); } }
</style>