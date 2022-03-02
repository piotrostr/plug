
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Proxy {
    id: number;
    username?: Nullable<string>;
    password?: Nullable<string>;
    host?: Nullable<string>;
    port?: Nullable<number>;
    protocol?: Nullable<string>;
}

export interface Token {
    id: number;
    token?: Nullable<string>;
    proxy?: Nullable<Proxy>;
}

type Nullable<T> = T | null;
