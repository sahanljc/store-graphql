import { IOClients, IOContext, MetricsAccumulator, SegmentData, ServiceContext } from '@vtex/api'

import { CallcenterOperatorDataSource } from './dataSources/callcenterOperator'
import { CatalogDataSource } from './dataSources/catalog'
import { CheckoutDataSource } from './dataSources/checkout'
import { DocumentDataSource } from './dataSources/document'
import { IdentityDataSource } from './dataSources/identity'
import { LicenseManagerDataSource } from './dataSources/licenseManager'
import { LogisticsDataSource } from './dataSources/logistics'
import { OMSDataSource } from './dataSources/oms'
import { ProfileDataSource } from './dataSources/profile'
import { SessionDataSource } from './dataSources/session'

if (!global.metrics) {
  console.error('No global.metrics at require time')
  global.metrics = new MetricsAccumulator()
}

declare global {
  type Context = ServiceContext<IOClients, void, CustomContext>

  interface CustomContext {
    cookie: string
    dataSources: StoreGraphQLDataSources
    originalPath: string
    vtex: CustomIOContext
  }

  interface CustomIOContext extends IOContext {
    currentProfile: CurrentProfile
    segment?: SegmentData
  }

  interface StoreGraphQLDataSources {
    catalog: CatalogDataSource
    checkout: CheckoutDataSource
    document: DocumentDataSource
    identity: IdentityDataSource
    licenseManager: LicenseManagerDataSource
    logistics: LogisticsDataSource
    profile: ProfileDataSource
    session: SessionDataSource
    callcenterOperator: CallcenterOperatorDataSource
    oms: OMSDataSource
  }

  interface OrderFormItem {
    id: string
    name: string
    detailUrl: string
    imageUrl: string
    skuName: string
    quantity: number
    uniqueId: string
    productId: string
    refId: string
    ean: string
    priceValidUntil: string
    price: number
    tax: number
    listPrice: number
    sellingPrice: number
    rewardValue: number
    isGift: boolean
    parentItemIndex: number
    parentAssemblyBinding: string
  }

  interface UserAddress {
    id: string
    addressName: string
  }

  interface UserProfile {
    id: string
  }

  interface CurrentProfile {
    email: string
    userId: string
  }

  interface Item {
    thumb: string
    name: string
    href: string
    criteria: string
    slug: string
  }

  interface Address {
    id: string
    userId: string
    receiverName?: string
    complement?: string
    neighborhood?: string
    country?: string
    state?: string
    number?: string
    street?: string
    postalCode?: string
    city?: string
    reference?: string
    addressName?: string
    addressType?: string
    geoCoordinate?: string
  }

  interface Profile {
    firstName?: string
    lastName?: string
    profilePicture?: string
    email: string
    document?: string
    userId: string
    birthDate?: string
    gender?: string
    homePhone?: string
    businessPhone?: string
    isCorporate?: boolean
    corporateName?: string
    corporateDocument?: string
    stateRegistration?: string
    addresses?: Address[]
    payments?: PaymentProfile[]
    customFields?: ProfileCustomField[]
  }

  interface PersonalPreferences {
    isNewsletterOptIn?: 'True' | 'False'
  }

  interface ProfileCustomField {
    key: string
    value: string
  }

  interface PaymentProfile {
    id: string
    paymentSystem: string
    paymentSystemName: string
    carNumber: string
    address: Address
  }
}
