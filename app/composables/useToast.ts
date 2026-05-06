// Sistema simples de notificações
export const useToast = () => {
  const toasts = ref<Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>>([])

  function addToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = Date.now().toString()
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3000)
  }

  function success(message: string) {
    addToast(message, 'success')
  }

  function error(message: string) {
    addToast(message, 'error')
  }

  function info(message: string) {
    addToast(message, 'info')
  }

  return {
    toasts,
    success,
    error,
    info,
  }
}
