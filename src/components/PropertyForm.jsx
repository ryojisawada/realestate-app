import { useState } from 'react'
import './PropertyForm.css'

// 物件の新規登録・編集で共用するフォーム
export function PropertyForm({ initialValues, onSubmit, onCancel, submitting }) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [rent, setRent] = useState(initialValues?.rent ?? '')
  const [area, setArea] = useState(initialValues?.area ?? '')
  const [layout, setLayout] = useState(initialValues?.layout ?? '')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ name, rent: Number(rent), area, layout })
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <label htmlFor="name">物件名</label>
      <input id="name" value={name} onChange={(event) => setName(event.target.value)} required />

      <label htmlFor="rent">家賃（円）</label>
      <input
        id="rent"
        type="number"
        min="0"
        value={rent}
        onChange={(event) => setRent(event.target.value)}
        required
      />

      <label htmlFor="area">エリア名</label>
      <input id="area" value={area} onChange={(event) => setArea(event.target.value)} required />

      <label htmlFor="layout">間取り</label>
      <input
        id="layout"
        placeholder="例: 1LDK"
        value={layout}
        onChange={(event) => setLayout(event.target.value)}
        required
      />

      <div className="property-form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? '保存中...' : '保存'}
        </button>
        <button type="button" onClick={onCancel} disabled={submitting}>
          キャンセル
        </button>
      </div>
    </form>
  )
}
