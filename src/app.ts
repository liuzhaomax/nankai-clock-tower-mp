import { useEffect } from 'react'
import { getRoutes } from '@/config/api'
import './app.scss'

interface AppProps {
  children?: React.ReactNode
}

const App = (props: AppProps) => {
  const ROUTES = getRoutes()

  useEffect(() => {
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
    console.log(`BASE_URL: ${ROUTES.BASE_URL}`)
  }, [])

  return props.children
}

export default App
