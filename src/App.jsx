import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Produtos from './pages/Produtos'
import Linha from './pages/Linha'
import Servicos from './pages/Servicos'
import Marcas from './pages/Marcas'
import Marca from './pages/Marca'
import Aplicacoes from './pages/Aplicacoes'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Contato from './pages/Contato'
import Faq from './pages/Faq'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre/" element={<Sobre />} />
        <Route path="/produtos/" element={<Produtos />} />
        <Route path="/produtos/:linha/" element={<Linha />} />
        <Route path="/servicos/" element={<Servicos />} />
        <Route path="/marcas/" element={<Marcas />} />
        <Route path="/marcas/:marca/" element={<Marca />} />
        <Route path="/aplicacoes/" element={<Aplicacoes />} />
        <Route path="/blog/" element={<Blog />} />
        <Route path="/blog/:slug/" element={<Post />} />
        <Route path="/contato/" element={<Contato />} />
        <Route path="/faq/" element={<Faq />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
