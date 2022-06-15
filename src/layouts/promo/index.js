import './style.scss'
import LandingHeader from 'src/components/LandingHeader/index'

export default function PromoLayout({ children }) {
  return (
    <div className="layout-promo">
      <div className="layout-promo__header">
        <LandingHeader />
      </div>
      <div className="layout-promo__content">
        <div className="layout-promo__content-wrapper">{children}</div>
      </div>
    </div>
  )
}
