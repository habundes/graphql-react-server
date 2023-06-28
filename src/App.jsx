import { People } from './People'
import { PersonForm } from './PersonForm'
import { usePerson } from './hooks/use-person'

import './App.css'
import { useState } from 'react'
import { Notify } from './Notify'
import { PhoneForm } from './PhoneForm'
import { LoginForm } from './LoginForm'
import { useApolloClient } from '@apollo/client'


function App() {
  const { error, loading, data } = usePerson()
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(() => window.localStorage.getItem('user-token'))
  const aClient = useApolloClient()

  if (error) return <span style={{ color: 'red' }}>{error}</span>
  
  const handleErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 4000);
  }

  const handleLogout = () => {
    setToken(null)
    window.localStorage.removeItem('user-token')
    aClient.resetStore()
  }
  
  return (
    <>
      <Notify errorMessage={errorMessage} />
      {/* <div>
        <a href="https://vitejs.dev" target="_blank" rel='noreferrer'>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel='noreferrer'>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}

      {loading
        ? <h1>Loading...</h1>
        : (
          <>
            <h1>GraphQL + React</h1>
            <People people={data?.allPersons} />
          </>
        )
      }
      { token 
        ? <button onClick={handleLogout}>Logout</button> 
        : <LoginForm notifyError={handleErrorMessage} setToken={setToken} />}
      <PhoneForm notifyError={handleErrorMessage} />
      <PersonForm notifyError={handleErrorMessage} />
    </>
  )
}

export default App
