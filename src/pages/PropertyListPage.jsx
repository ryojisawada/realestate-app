import { useAuth } from '../contexts/AuthContext'
import { dummyProperties } from '../data/dummyProperties'
import './PropertyListPage.css'

export function PropertyListPage() {
  const { user, signOut } = useAuth()

  return (
    <div className="property-page">
      <header className="property-header">
        <div>
          <h1>物件一覧</h1>
          <p className="property-user">{user?.email}</p>
        </div>
        <button type="button" className="logout-button" onClick={() => signOut()}>
          ログアウト
        </button>
      </header>

      <div className="property-grid">
        {dummyProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <h2>{property.name}</h2>
            <p className="property-rent">家賃 {property.rent.toLocaleString()}円 / 月</p>
            <p className="property-area">{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
