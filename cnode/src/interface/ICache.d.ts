// 这里不用写default
export interface IValue {
  accesstoken?: string,    // 限定可以有accesstoken
  [propName: string]:any
}