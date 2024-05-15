export default function({store, redirect}) {
  if (!store.getters['auth/isAuthenticated'] || store.getters['auth/banned']) {
    redirect('/auth?message=login')
  }
}