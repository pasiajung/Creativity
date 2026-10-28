import { Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout'
import AboutPage from './pages/AboutPage'
import DiscussionPage from './pages/DiscussionPage'
import HomePage from './pages/HomePage'
import NewThreadPage from './pages/NewThreadPage'
import NotFoundPage from './pages/NotFoundPage'
import ResearchDetailPage from './pages/ResearchDetailPage'
import ResearchListPage from './pages/ResearchListPage'
import TeachingDetailPage from './pages/TeachingDetailPage'
import TeachingListPage from './pages/TeachingListPage'
import ThreadDetailPage from './pages/ThreadDetailPage'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="research" element={<ResearchListPage />} />
        <Route path="research/:slug" element={<ResearchDetailPage />} />
        <Route path="teaching" element={<TeachingListPage />} />
        <Route path="teaching/:slug" element={<TeachingDetailPage />} />
        <Route path="discussion" element={<DiscussionPage />} />
        <Route path="discussion/new" element={<NewThreadPage />} />
        <Route path="discussion/:threadId" element={<ThreadDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
