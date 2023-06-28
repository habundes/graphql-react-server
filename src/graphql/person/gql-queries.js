import { gql } from "@apollo/client";

export const PERSON_DETAILS_FRAGMENT = gql`
    fragment PersonDetails on Person {
        id
        name
        phone
        address {
            street
            city
        }
    }
`

export const ALL_PEOPLE = gql`
    query {
        allPersons {
            ...PersonDetails
        }
    }
    ${PERSON_DETAILS_FRAGMENT}
`

export const FIND_PERSON = gql`
    query findPerson($name: String!) {
        findPerson(name: $name) {
            ...PersonDetails
        }
    }
    ${PERSON_DETAILS_FRAGMENT}
`