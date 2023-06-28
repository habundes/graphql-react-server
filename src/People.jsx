import { useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { FIND_PERSON } from "./graphql/person/gql-queries"


export function People({ people }) {
    const [getPeople, result] = useLazyQuery(FIND_PERSON)
    const [person, setPerson] = useState(null)

    const showPerson = (name) => {
        getPeople({ variables: { name } })
    }

    useEffect(() => {
        if (result.data) {
            setPerson(result.data.findPerson)
        }
    }, [result])

    if (person) {
        return (
            <div>
                <h2>{person.name}</h2>
                <div>{person.address.street}, {person.address.city}</div>
                <div>{person.phone}</div>
                <button onClick={() => setPerson(null)}>Cancel</button>
            </div>
        )
    }
    if (people === null) return null


    return (
        <div>
            <h2>People</h2>
            {
                people.map(p => (
                    <div key={p.id} onClick={() => showPerson(p.name)}>
                        {p.name} {p.phone}
                    </div>
                ))
            }
        </div>
    )
}
