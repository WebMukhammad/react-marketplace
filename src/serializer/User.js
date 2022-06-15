export default function User(el = {}) {
  return {
    id: el.id,
    name: el.store?.name,
    email: el.email,
    phone: el.phone,
    status: {
      id: el.store?.status?.id,
      title: el.store?.status?.title,
      name: el.store?.status?.name
    },
    unreadNotificationCount: el.unreadNotificationsCount || null,
    balance: +el.store?.balance || null
  }
}
