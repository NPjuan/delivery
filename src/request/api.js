import { get,post } from './http'
//banner接口
export const apiBanner = banner => get('api/v1/banner',banner)

//boutique接口
export const apiBoutique = boutique => get('api/v1/boutique',boutique)

//special接口
export const apiSpecial = special => get('api/v1/special',special)