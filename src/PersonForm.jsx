import { useState } from "react"

import { useMutation } from "@apollo/client"
import { ALL_PEOPLE } from "./graphql/person/gql-queries"
import { ADD_PERSON } from "./graphql/person/gql-mutations"

export function PersonForm({ notifyError }) {
  const [createPerson] = useMutation(ADD_PERSON, {
    // refetchQueries: [{ query: ALL_PEOPLE }],
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      const data = store.readQuery({ query: ALL_PEOPLE })
      store.writeQuery({
        query: ALL_PEOPLE,
        data: {
          ...data,
          allPersons: [...data.allPersons, response.data.addPerson]
        }
      })
      setName('')
      setPhone('')
      setStreet('')
      setCity('')
    }
  })
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    createPerson({
      variables: {
        name,
        phone,
        street,
        city
      }
    })
  }

  return (
    <div>
      <h2>Create Person</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name"></label>
          <input type="text" name="name" placeholder="Name" value={name} onChange={evt => setName(evt.target.value)} />

        </div>
        <div>
          <label htmlFor="phone"></label>
          <input type="text" name="phone" placeholder="Phone" value={phone} onChange={evt => setPhone(evt.target.value)} />

        </div>
        <div>
          <label htmlFor="street"></label>
          <input type="text" name="street" placeholder="Street" value={street} onChange={evt => setStreet(evt.target.value)} />

        </div>
        <div>
          <label htmlFor="city"></label>
          <input type="text" name="city" placeholder="City" value={city} onChange={evt => setCity(evt.target.value)} />

        </div>
        {/* <label htmlFor=""></label> */}
        <button>Add person</button>
      </form>
    </div>
  )
}