import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { PropertyForm } from '../components/PropertyForm'
import { createProperty, deleteProperty, fetchProperties, updateProperty } from '../services/propertiesService'
import './PropertyListPage.css'

export function PropertyListPage() {
  const { user, signOut } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  // フォームの表示状態: null(非表示) / 'create'(新規登録) / 'edit'(編集)
  const [formMode, setFormMode] = useState(null)
  const [editingProperty, setEditingProperty] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const loadProperties = async () => {
    setLoading(true)
    try {
      const data = await fetchProperties()
      setProperties(data)
      setErrorMessage('')
    } catch {
      setErrorMessage('物件情報の取得に失敗しました。')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [])

  const handleCreateClick = () => {
    setEditingProperty(null)
    setFormMode('create')
  }

  const handleEditClick = (property) => {
    setEditingProperty(property)
    setFormMode('edit')
  }

  const handleCancel = () => {
    setFormMode(null)
    setEditingProperty(null)
  }

  const handleSubmit = async (values) => {
    setSubmitting(true)
    try {
      if (formMode === 'edit' && editingProperty) {
        await updateProperty(editingProperty.id, values)
      } else {
        await createProperty(values, user.id)
      }
      setFormMode(null)
      setEditingProperty(null)
      await loadProperties()
    } catch {
      setErrorMessage('物件情報の保存に失敗しました。')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか？')) return

    try {
      await deleteProperty(id)
      await loadProperties()
    } catch {
      setErrorMessage('物件の削除に失敗しました。')
    }
  }

  return (
    <div className="property-page">
      <header className="property-header">
        <div>
          <h1>物件一覧</h1>
          <p className="property-user">{user?.email}</p>
        </div>
        <div className="property-header-actions">
          <button type="button" onClick={handleCreateClick}>
            新規登録
          </button>
          <button type="button" className="logout-button" onClick={() => signOut()}>
            ログアウト
          </button>
        </div>
      </header>

      {errorMessage && <p className="auth-error">{errorMessage}</p>}

      {formMode && (
        <div className="property-form-panel">
          <h2>{formMode === 'edit' ? '物件情報を編集' : '物件を新規登録'}</h2>
          <PropertyForm
            initialValues={editingProperty}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitting={submitting}
          />
        </div>
      )}

      {loading ? (
        <p>読み込み中...</p>
      ) : properties.length === 0 ? (
        <p>登録されている物件はありません。「新規登録」から追加してください。</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <div className="property-card" key={property.id}>
              <h2>{property.name}</h2>
              <p className="property-rent">家賃 {property.rent.toLocaleString()}円 / 月</p>
              <p className="property-area">{property.area}</p>
              <p className="property-layout">{property.layout}</p>
              <div className="property-card-actions">
                <button type="button" onClick={() => handleEditClick(property)}>
                  編集
                </button>
                <button type="button" onClick={() => handleDelete(property.id)}>
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
