import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UploadCSV from './pages/UploadCSV'
import AnalysisResults from './pages/AnalysisResults'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadCSV />} />
        <Route path="/results" element={<AnalysisResults />} />
      </Routes>
    </Router>
  )
}

export default App
