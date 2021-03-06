import { path, toLower } from 'ramda'

interface ProfileFields {
  document?: string
  email?: string
  firstName?: string
  id?: string
  isAuthenticatedAsCustomer?: boolean
  lastName?: string
  phone?: string
}

export interface SessionFields {
  adminUserEmail?: string
  adminUserId?: string
  id?: string
  impersonable?: boolean
  impersonate?: { profile: ProfileFields }
  orderFormId?: string
  address?: any
  profile?: ProfileFields
}

const convertToBool = (str: any) => !!str && toLower(str) === 'true'

const profileFields = (profile: any, user: any): ProfileFields => ({
  document: path(['document', 'value'], profile),
  email:
    path(['email', 'value'], profile) ||
    path(['storeUserEmail', 'value'], user),
  firstName: path(['firstName', 'value'], profile),
  id: path(['id', 'value'], profile),
  isAuthenticatedAsCustomer: convertToBool(
    path(['isAuthenticated', 'value'], profile)
  ),
  lastName: path(['lastName', 'value'], profile),
  phone: path(['phone', 'value'], profile),
})

const setProfileData = (profile: any, user: any) =>
  path(['storeUserId', 'value'], user) && {
    profile: {
      ...profileFields(profile, user),
    },
  }

export const sessionFields = (session: any): SessionFields | {} => {
  const { namespaces } = session
  return namespaces
    ? {
        address: path(['public', 'address', 'value'], namespaces),
        adminUserEmail: path(
          ['authentication', 'adminUserEmail', 'value'],
          namespaces
        ),
        adminUserId: path(
          ['authentication', 'adminUserId', 'value'],
          namespaces
        ),
        id: session.id,
        impersonable: convertToBool(
          path(['impersonate', 'canImpersonate', 'value'], namespaces)
        ),
        impersonate: {
          ...setProfileData(namespaces.profile, namespaces.impersonate),
        },
        orderFormId: path(['public', 'orderFormId', 'value'], namespaces),
        ...setProfileData(namespaces.profile, namespaces.authentication),
      }
    : {}
}
