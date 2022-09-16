import { ObjectId } from 'mongodb'

export interface GenericUser {
    _id: ObjectId,
    name: string,
    icon: string
}

export type AuthSourceType = `saml2` | `oauth1` | `oauth2`
export type AuthSourceIdentifier = `rnd_uuid` | `cstm_uuid` | `email`

export type AuthSourceIdentifierPersistenceType = `permanent` | `editable`
export type AuthSourceIdentifierData = {
    persistence: AuthSourceIdentifierPersistenceType
}

export const AuthSourceIdentifierData: { [key in AuthSourceIdentifier]: AuthSourceIdentifierData } = {
    rnd_uuid: {
        persistence: `permanent`
    },
    cstm_uuid: {
        persistence: `permanent`
    },
    email: {
        persistence: `editable`
    }
}

export interface GenericAuthSource {
    name: string,
    icon: string
}