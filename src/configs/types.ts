export interface IEnvironmentModel {
  readonly NODE_ENV : string
  readonly APP_ENV  : string

  readonly SERVER_PROTOCOL: string
  readonly SERVER_HOST : string
  readonly SERVER_PORT : number

  readonly DB_NAME  : string
  readonly DB_HOST  : string
  readonly DB_PORT  : number
  readonly DB_USER? : string
  readonly DB_PASS? : string

  readonly TTL : number
  readonly CACHE_LIMIT : number
}

export interface IConfigModel {
  readonly env     : IEnvironmentModel
  readonly baseURL : string
}
