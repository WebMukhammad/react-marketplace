import PromoLayout from 'src/layouts/promo/index'
import DefaultLayout from 'src/layouts/default/index'
import MainPage from 'src/pages/main/index'
import SignInPage from 'src/pages/auth/sign-in/index'
import SignUpPage from 'src/pages/auth/sign-up/index'
import ForgotPage from 'src/pages/auth/forgot/index'
import ResetPage from 'src/pages/auth/reset/index'
import BillPage from 'src/pages/bill/index'
import ProductPage from 'src/pages/product'
import RefundPage from 'src/pages/refund'
import OrderPage from 'src/pages/order'
import CompanyPage from 'src/pages/company'

function promoLayout(route) {
  const Route = route

  return () => (
    <PromoLayout>
      <Route />
    </PromoLayout>
  )
}

function defaultLayout(route) {
  const Route = route

  return () => (
    <DefaultLayout>
      <Route />
    </DefaultLayout>
  )
}

export const publicRouters = [
  {
    path: '/',
    exact: true,
    component: promoLayout(MainPage)
  },
  {
    path: '/auth/sign-in/',
    exact: true,
    component: promoLayout(SignInPage)
  },
  {
    path: '/auth/sign-up/',
    exact: true,
    component: promoLayout(SignUpPage)
  },
  {
    path: '/auth/forgot/',
    exact: true,
    component: promoLayout(ForgotPage)
  },
  {
    path: '/auth/reset/',
    exact: true,
    component: promoLayout(ResetPage)
  }
]

export const privateRoutes = [
  {
    path: '/product/',
    exact: true,
    component: defaultLayout(ProductPage)
  },
  {
    path: '/order/',
    exact: true,
    component: defaultLayout(OrderPage)
  },
  {
    path: '/bill/',
    exact: true,
    component: defaultLayout(BillPage)
  },
  {
    path: '/refund/',
    exact: true,
    component: defaultLayout(RefundPage)
  },
  {
    path: '/company/',
    exact: true,
    component: defaultLayout(CompanyPage)
  }
]
