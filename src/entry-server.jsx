import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { getAllPaths, getSeo } from './data/seo'
import { site } from './data/site'

export function renderRoute(url) {
  return renderToStaticMarkup(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}

export { getAllPaths, getSeo, site }