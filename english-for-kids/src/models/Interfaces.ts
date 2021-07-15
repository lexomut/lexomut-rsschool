export interface Interfaces {
  word: string;
  translation:string;
  image: string;
  audioSrc: string;

}
export interface AdminCategoryCardInterface {
  index:number
  edit:boolean
  isNew:boolean
}
export interface AdminWordCardInterface {
  index:number
  edit:boolean
  isNew:boolean
}

interface FetchConfig {
  method: string
  headers?: { 'Content-Type': string }
  body?: string|FormData
  signal?:AbortSignal
}

export interface RequestApiConfig{
  url:string
  fetchConfig: FetchConfig;

}
