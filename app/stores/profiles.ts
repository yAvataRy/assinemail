import type { SignatureProfile, SignatureData } from '~/types/signature'

const PROFILES_KEY = 'sig-profiles'

export const useProfilesStore = defineStore('profiles', () => {
  const profiles = ref<SignatureProfile[]>([])

  function hydrate() {
    if (import.meta.client) {
      const raw = localStorage.getItem(PROFILES_KEY)
      profiles.value = raw ? JSON.parse(raw) : []
    }
  }

  function getProfiles(): SignatureProfile[] {
    if (import.meta.client) {
      const raw = localStorage.getItem(PROFILES_KEY)
      return raw ? JSON.parse(raw) : []
    }
    return []
  }

  function saveProfile(profile: SignatureProfile) {
    const all = getProfiles()
    const idx = all.findIndex((p) => p.id === profile.id)
    if (idx >= 0) {
      all[idx] = profile
    } else {
      all.push(profile)
    }
    if (import.meta.client) {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(all))
    }
    profiles.value = all
  }

  function deleteProfile(id: string) {
    const all = getProfiles().filter((p) => p.id !== id)
    if (import.meta.client) {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(all))
    }
    profiles.value = all
  }

  function canSaveMore(currentUser: any): boolean {
    if (!currentUser) return false
    if (currentUser.plan === 'premium') return true
    return getProfiles().length < 3
  }

  return {
    profiles,
    hydrate,
    getProfiles,
    saveProfile,
    deleteProfile,
    canSaveMore,
  }
})
