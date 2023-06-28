import { useQuery } from "@apollo/client"
import { ALL_PEOPLE } from "../graphql/person/gql-queries"


export function usePerson() {
    const result = useQuery(ALL_PEOPLE)
    
    return result
    
}