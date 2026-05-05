import type { UserAccount } from '~/types/signature'

const DEMO_ACCOUNTS: Record<string, { password: string; account: UserAccount }> = {
  'joao@exemplo.com': {
    password: '123456',
    account: { email: 'joao@exemplo.com', name: 'João Silva', plan: 'free' },
  },
  'maria@exemplo.com': {
    password: '123456',
    account: { email: 'maria@exemplo.com', name: 'Maria Santos', plan: 'premium' },
  },
}

const AUTH_KEY = 'sig-auth-user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserAccount | null>(null)

  function hydrate() {
    if (import.meta.client) {
      const raw = localStorage.getItem(AUTH_KEY)
      if (raw) user.value = JSON.parse(raw)
    }
  }

  function login(email: string, password: string): UserAccount | null {
    const demo = DEMO_ACCOUNTS[email]
    let account: UserAccount

    if (demo && demo.password === password) {
      account = { ...demo.account }
    } else {
      account = { email, name: email.split('@')[0], plan: 'free' }
    }

    if (import.meta.client) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(account))
    }
    user.value = account
    return account
  }

  function logout() {
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem(AUTH_KEY)
    }
  }

  function upgradePlan() {
    if (user.value) {
      user.value = { ...user.value, plan: 'premium' }
      if (import.meta.client) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user.value))
      }
    }
  }

  function isPremium(): boolean {
    return user.value?.plan === 'premium'
  }

  return {
    user,
    login,
    logout,
    upgradePlan,
    isPremium,
    hydrate,
  }
})
