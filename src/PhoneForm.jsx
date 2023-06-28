import { useEffect, useState } from "react"

import { useMutation } from "@apollo/client"

import { EDIT_PHONE } from "./graphql/person/gql-mutations"


export function PhoneForm({ notifyError }) {

    const [editPhone, result] = useMutation(EDIT_PHONE)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        if (result?.data?.editNumber === null) {
            notifyError('Person not found')
        }
    }, [notifyError, result?.data])

    const handleSubmit = (event) => {
        event.preventDefault()

        editPhone({
            variables: {
                name,
                phone
            }
        })
        setName('')
        setPhone('')
    }

    return (
        <div>
            <h2>Edit Phone</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name"></label>
                    <input type="text" name="name" placeholder="Name" value={name} onChange={evt => setName(evt.target.value)} />

                </div>
                <div>
                    <label htmlFor="phone"></label>
                    <input type="text" name="phone" placeholder="Phone" value={phone} onChange={evt => setPhone(evt.target.value)} />

                </div>
                {/* <label htmlFor=""></label> */}
                <button>Edit phone</button>
            </form>
        </div>
    )
}