export type AccountModel = {
    account_id: string
    email?: string
    username: string
    password?: string
    token?: string | null
    token_expire?: string | null
    is_active?: boolean
    is_private?: boolean
}

export type AccountHashedTable = {
    [id:string]: AccountModel
}