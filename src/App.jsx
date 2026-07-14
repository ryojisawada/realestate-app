import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { PropertyListPage } from './pages/PropertyListPage'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="centered-message">読み込み中...</div>
  }

  return (
    <Routes>
      {/* ログイン済みの場合はログイン・会員登録画面から物件一覧へ戻す */}
      <Route path="/login" element={user ? <Navigate to="/properties" replace /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/properties" replace /> : <SignupPage />} />
      <Route
        path="/properties"
        element={
          <ProtectedRoute>
            <PropertyListPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={user ? '/properties' : '/login'} replace />} />
    </Routes>
  )
}

export default App
