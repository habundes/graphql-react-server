import { gql } from "@apollo/client";

export const ADD_PERSON = gql`
  mutation addPerson($name: String!, $street: String!, $city: String!, $phone: String) {
      addPerson(name: $name, street: $street, city: $city, phone: $phone) {
        name
        phone
        address {
          street
          city
        }
      }
  }
`

export const EDIT_PHONE = gql`
mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
        name
        phone
        id
    }
}
`