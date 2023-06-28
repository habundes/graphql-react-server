import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "./graphql/login/gql-queries"

export function LoginForm({ notifyError, setToken }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLogged, setIsLogged] = useState(() => !!window.localStorage.getItem('user-token'))


    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            notifyError(error.graphQLErrors[0].message)
        }
    })
    useEffect(() => {
        if (result.data) {
            const { value: token } = result.data.login
            setToken(token)
            localStorage.setItem('user-token', token)
        }
    }, [result.data, setToken])

    const handleSubmit = (e) => {
        e.preventDefault()
        login({ variables: { username, password } })
    }

    return (
        <div>
        {
            
        }
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Username" value={username} onChange={({ target }) => setUsername(target.value)} />

                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Passwonrd" value={password} onChange={({ target }) => setPassword(target.value)} />

                </div>
                {/* <label htmlFor=""></label> */}
                <button>Login</button>
            </form>
        </div>
    )
}
