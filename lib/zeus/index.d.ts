import { Ops } from './const.js';
import fetch from 'node-fetch';
import WebSocket from 'ws';
export declare const HOST = "http://localhost:8080/";
export declare const HEADERS: {};
export declare const apiSubscription: (options: chainOptions) => (query: string) => {
    ws: WebSocket;
    on: (e: (args: any) => void) => void;
    off: (e: (args: any) => void) => void;
    error: (e: (args: any) => void) => void;
    open: (e: () => void) => void;
};
export declare const apiFetch: (options: [url: URL | import("node-fetch").RequestInfo, init?: import("node-fetch").RequestInit | undefined]) => (query: string, variables?: Record<string, unknown>) => Promise<Record<string, any> | undefined>;
export declare const InternalsBuildQuery: ({ ops, props, returns, options, scalars, }: {
    props: AllTypesPropsType;
    returns: ReturnTypesType;
    ops: Operations;
    options?: OperationOptions | undefined;
    scalars?: ScalarDefinition | undefined;
}) => (k: string, o: InputValueType | VType, p?: string, root?: boolean, vars?: Array<{
    name: string;
    graphQLType: string;
}>) => string;
export declare const Thunder: (fn: FetchFunction) => <O extends "query" | "mutation", SCLR extends ScalarDefinition, R extends keyof ValueTypes = GenericOperation<O>>(operation: O, graphqlOptions?: ThunderGraphQLOptions<SCLR> | undefined) => <Z extends ValueTypes[R]>(o: Z | ValueTypes[R], ops?: OperationOptions & {
    variables?: Record<string, unknown>;
}) => Promise<InputType<GraphQLTypes[R], Z, SCLR>>;
export declare const Chain: (...options: chainOptions) => <O extends "query" | "mutation", SCLR extends ScalarDefinition, R extends keyof ValueTypes = GenericOperation<O>>(operation: O, graphqlOptions?: ThunderGraphQLOptions<SCLR> | undefined) => <Z extends ValueTypes[R]>(o: Z | ValueTypes[R], ops?: OperationOptions & {
    variables?: Record<string, unknown>;
}) => Promise<InputType<GraphQLTypes[R], Z, SCLR>>;
export declare const SubscriptionThunder: (fn: SubscriptionFunction) => <O extends "query" | "mutation", SCLR extends ScalarDefinition, R extends keyof ValueTypes = GenericOperation<O>>(operation: O, graphqlOptions?: ThunderGraphQLOptions<SCLR> | undefined) => <Z extends ValueTypes[R]>(o: Z | ValueTypes[R], ops?: (OperationOptions & {
    variables?: ExtractVariables<Z> | undefined;
}) | undefined) => SubscriptionToGraphQL<Z, GraphQLTypes[R], SCLR>;
export declare const Subscription: (...options: chainOptions) => <O extends "query" | "mutation", SCLR extends ScalarDefinition, R extends keyof ValueTypes = GenericOperation<O>>(operation: O, graphqlOptions?: ThunderGraphQLOptions<SCLR> | undefined) => <Z extends ValueTypes[R]>(o: Z | ValueTypes[R], ops?: (OperationOptions & {
    variables?: ExtractVariables<Z> | undefined;
}) | undefined) => SubscriptionToGraphQL<Z, GraphQLTypes[R], SCLR>;
export declare const Zeus: <Z extends ValueTypes[R], O extends "query" | "mutation", R extends keyof ValueTypes = GenericOperation<O>>(operation: O, o: Z | ValueTypes[R], ops?: {
    operationOptions?: OperationOptions;
    scalars?: ScalarDefinition;
}) => string;
export declare const ZeusSelect: <T>() => SelectionFunction<T>;
export declare const Selector: <T extends keyof ValueTypes>(key: T) => SelectionFunction<ValueTypes[T]>;
export declare const TypeFromSelector: <T extends keyof ValueTypes>(key: T) => SelectionFunction<ValueTypes[T]>;
export declare const Gql: <O extends "query" | "mutation", SCLR extends ScalarDefinition, R extends keyof ValueTypes = GenericOperation<O>>(operation: O, graphqlOptions?: ThunderGraphQLOptions<SCLR> | undefined) => <Z extends ValueTypes[R]>(o: Z | ValueTypes[R], ops?: OperationOptions & {
    variables?: Record<string, unknown>;
}) => Promise<InputType<GraphQLTypes[R], Z, SCLR>>;
export declare const ZeusScalars: SelectionFunction<ScalarCoders>;
export declare const decodeScalarsInResponse: <O extends Operations>({ response, scalars, returns, ops, initialZeusQuery, initialOp, }: {
    ops: O;
    response: any;
    returns: ReturnTypesType;
    scalars?: Record<string, ScalarResolver | undefined> | undefined;
    initialOp: keyof O;
    initialZeusQuery: InputValueType | VType;
}) => any;
export declare const traverseResponse: ({ resolvers, scalarPaths, }: {
    scalarPaths: {
        [x: string]: `scalar.${string}`;
    };
    resolvers: {
        [x: string]: ScalarResolver | undefined;
    };
}) => (k: string, o: InputValueType | VType, p?: string[]) => unknown;
export type AllTypesPropsType = {
    [x: string]: undefined | `scalar.${string}` | 'enum' | {
        [x: string]: undefined | string | {
            [x: string]: string | undefined;
        };
    };
};
export type ReturnTypesType = {
    [x: string]: {
        [x: string]: string | undefined;
    } | `scalar.${string}` | undefined;
};
export type InputValueType = {
    [x: string]: undefined | boolean | string | number | [any, undefined | boolean | InputValueType] | InputValueType;
};
export type VType = undefined | boolean | string | number | [any, undefined | boolean | InputValueType] | InputValueType;
export type PlainType = boolean | number | string | null | undefined;
export type ZeusArgsType = PlainType | {
    [x: string]: ZeusArgsType;
} | Array<ZeusArgsType>;
export type Operations = Record<string, string>;
export type VariableDefinition = {
    [x: string]: unknown;
};
export declare const SEPARATOR = "|";
export type fetchOptions = Parameters<typeof fetch>;
type websocketOptions = typeof WebSocket extends new (...args: infer R) => WebSocket ? R : never;
export type chainOptions = [fetchOptions[0], fetchOptions[1] & {
    websocket?: websocketOptions;
}] | [fetchOptions[0]];
export type FetchFunction = (query: string, variables?: Record<string, unknown>) => Promise<any>;
export type SubscriptionFunction = (query: string) => any;
type NotUndefined<T> = T extends undefined ? never : T;
export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;
export type OperationOptions = {
    operationName?: string;
};
export type ScalarCoder = Record<string, (s: unknown) => string>;
export interface GraphQLResponse {
    data?: Record<string, any>;
    errors?: Array<{
        message: string;
    }>;
}
export declare class GraphQLError extends Error {
    response: GraphQLResponse;
    constructor(response: GraphQLResponse);
    toString(): string;
}
export type GenericOperation<O> = O extends keyof typeof Ops ? typeof Ops[O] : never;
export type ThunderGraphQLOptions<SCLR extends ScalarDefinition> = {
    scalars?: SCLR | ScalarCoders;
};
export declare const PrepareScalarPaths: ({ ops, returns }: {
    returns: ReturnTypesType;
    ops: Operations;
}) => (k: string, originalKey: string, o: InputValueType | VType, p?: string[], pOriginals?: string[], root?: boolean) => {
    [x: string]: `scalar.${string}`;
} | undefined;
export declare const purifyGraphQLKey: (k: string) => string;
export declare const ResolveFromPath: (props: AllTypesPropsType, returns: ReturnTypesType, ops: Operations) => (path: string) => 'enum' | 'not' | `scalar.${string}`;
export declare const InternalArgsBuilt: ({ props, ops, returns, scalars, vars, }: {
    props: AllTypesPropsType;
    returns: ReturnTypesType;
    ops: Operations;
    scalars?: ScalarDefinition | undefined;
    vars: Array<{
        name: string;
        graphQLType: string;
    }>;
}) => (a: ZeusArgsType, p?: string, root?: boolean) => string;
export declare const resolverFor: <X, T extends keyof ResolverInputTypes, Z extends keyof ResolverInputTypes[T]>(type: T, field: Z, fn: (args: Required<ResolverInputTypes[T]>[Z] extends [infer Input, any] ? Input : any, source: any) => Z extends keyof ModelTypes[T] ? X | ModelTypes[T][Z] | Promise<ModelTypes[T][Z]> : never) => (args?: any, source?: any) => Z extends keyof ModelTypes[T] ? X | ModelTypes[T][Z] | Promise<ModelTypes[T][Z]> : never;
export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
export type ZeusState<T extends (...args: any[]) => Promise<any>> = NonNullable<UnwrapPromise<ReturnType<T>>>;
export type ZeusHook<T extends (...args: any[]) => Record<string, (...args: any[]) => Promise<any>>, N extends keyof ReturnType<T>> = ZeusState<ReturnType<T>[N]>;
export type WithTypeNameValue<T> = T & {
    __typename?: boolean;
    __directives?: string;
};
export type AliasType<T> = WithTypeNameValue<T> & {
    __alias?: Record<string, WithTypeNameValue<T>>;
};
type DeepAnify<T> = {
    [P in keyof T]?: any;
};
type IsPayLoad<T> = T extends [any, infer PayLoad] ? PayLoad : T;
export type ScalarDefinition = Record<string, ScalarResolver>;
type IsScalar<S, SCLR extends ScalarDefinition> = S extends 'scalar' & {
    name: infer T;
} ? T extends keyof SCLR ? SCLR[T]['decode'] extends (s: unknown) => unknown ? ReturnType<SCLR[T]['decode']> : unknown : unknown : S;
type IsArray<T, U, SCLR extends ScalarDefinition> = T extends Array<infer R> ? InputType<R, U, SCLR>[] : InputType<T, U, SCLR>;
type FlattenArray<T> = T extends Array<infer R> ? R : T;
type BaseZeusResolver = boolean | 1 | string | Variable<any, string>;
type IsInterfaced<SRC extends DeepAnify<DST>, DST, SCLR extends ScalarDefinition> = FlattenArray<SRC> extends ZEUS_INTERFACES | ZEUS_UNIONS ? {
    [P in keyof SRC]: SRC[P] extends '__union' & infer R ? P extends keyof DST ? IsArray<R, '__typename' extends keyof DST ? DST[P] & {
        __typename: true;
    } : DST[P], SCLR> : IsArray<R, '__typename' extends keyof DST ? {
        __typename: true;
    } : never, SCLR> : never;
}[keyof SRC] & {
    [P in keyof Omit<Pick<SRC, {
        [P in keyof DST]: SRC[P] extends '__union' & infer R ? never : P;
    }[keyof DST]>, '__typename'>]: IsPayLoad<DST[P]> extends BaseZeusResolver ? IsScalar<SRC[P], SCLR> : IsArray<SRC[P], DST[P], SCLR>;
} : {
    [P in keyof Pick<SRC, keyof DST>]: IsPayLoad<DST[P]> extends BaseZeusResolver ? IsScalar<SRC[P], SCLR> : IsArray<SRC[P], DST[P], SCLR>;
};
export type MapType<SRC, DST, SCLR extends ScalarDefinition> = SRC extends DeepAnify<DST> ? IsInterfaced<SRC, DST, SCLR> : never;
export type InputType<SRC, DST, SCLR extends ScalarDefinition = {}> = IsPayLoad<DST> extends {
    __alias: infer R;
} ? {
    [P in keyof R]: MapType<SRC, R[P], SCLR>[keyof MapType<SRC, R[P], SCLR>];
} & MapType<SRC, Omit<IsPayLoad<DST>, '__alias'>, SCLR> : MapType<SRC, IsPayLoad<DST>, SCLR>;
export type SubscriptionToGraphQL<Z, T, SCLR extends ScalarDefinition> = {
    ws: WebSocket;
    on: (fn: (args: InputType<T, Z, SCLR>) => void) => void;
    off: (fn: (e: {
        data?: InputType<T, Z, SCLR>;
        code?: number;
        reason?: string;
        message?: string;
    }) => void) => void;
    error: (fn: (e: {
        data?: InputType<T, Z, SCLR>;
        errors?: string[];
    }) => void) => void;
    open: () => void;
};
export type FromSelector<SELECTOR, NAME extends keyof GraphQLTypes, SCLR extends ScalarDefinition = {}> = InputType<GraphQLTypes[NAME], SELECTOR, SCLR>;
export type ScalarResolver = {
    encode?: (s: unknown) => string;
    decode?: (s: unknown) => unknown;
};
export type SelectionFunction<V> = <T>(t: T | V) => T;
type BuiltInVariableTypes = {
    ['String']: string;
    ['Int']: number;
    ['Float']: number;
    ['ID']: unknown;
    ['Boolean']: boolean;
};
type AllVariableTypes = keyof BuiltInVariableTypes | keyof ZEUS_VARIABLES;
type VariableRequired<T extends string> = `${T}!` | T | `[${T}]` | `[${T}]!` | `[${T}!]` | `[${T}!]!`;
type VR<T extends string> = VariableRequired<VariableRequired<T>>;
export type GraphQLVariableType = VR<AllVariableTypes>;
type ExtractVariableTypeString<T extends string> = T extends VR<infer R1> ? R1 extends VR<infer R2> ? R2 extends VR<infer R3> ? R3 extends VR<infer R4> ? R4 extends VR<infer R5> ? R5 : R4 : R3 : R2 : R1 : T;
type DecomposeType<T, Type> = T extends `[${infer R}]` ? Array<DecomposeType<R, Type>> | undefined : T extends `${infer R}!` ? NonNullable<DecomposeType<R, Type>> : Type | undefined;
type ExtractTypeFromGraphQLType<T extends string> = T extends keyof ZEUS_VARIABLES ? ZEUS_VARIABLES[T] : T extends keyof BuiltInVariableTypes ? BuiltInVariableTypes[T] : any;
export type GetVariableType<T extends string> = DecomposeType<T, ExtractTypeFromGraphQLType<ExtractVariableTypeString<T>>>;
type UndefinedKeys<T> = {
    [K in keyof T]-?: T[K] extends NonNullable<T[K]> ? never : K;
}[keyof T];
type WithNullableKeys<T> = Pick<T, UndefinedKeys<T>>;
type WithNonNullableKeys<T> = Omit<T, UndefinedKeys<T>>;
type OptionalKeys<T> = {
    [P in keyof T]?: T[P];
};
export type WithOptionalNullables<T> = OptionalKeys<WithNullableKeys<T>> & WithNonNullableKeys<T>;
export type Variable<T extends GraphQLVariableType, Name extends string> = {
    ' __zeus_name': Name;
    ' __zeus_type': T;
};
export type ExtractVariables<Query> = Query extends Variable<infer VType, infer VName> ? {
    [key in VName]: GetVariableType<VType>;
} : Query extends [infer Inputs, infer Outputs] ? ExtractVariables<Inputs> & ExtractVariables<Outputs> : Query extends string | number | boolean ? {} : UnionToIntersection<{
    [K in keyof Query]: WithOptionalNullables<ExtractVariables<Query[K]>>;
}[keyof Query]>;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare const START_VAR_NAME = "$ZEUS_VAR";
export declare const GRAPHQL_TYPE_SEPARATOR = "__$GRAPHQL__";
export declare const $: <Type extends GraphQLVariableType, Name extends string>(name: Name, graphqlType: Type) => Variable<Type, Name>;
type ZEUS_INTERFACES = never;
export type ScalarCoders = {};
type ZEUS_UNIONS = never;
export type ValueTypes = {
    ["Query"]: AliasType<{
        me?: boolean | `@${string}`;
        findProduct?: [{
            id: string | Variable<any, string>;
        }, ValueTypes["Product"]];
        __typename?: boolean | `@${string}`;
    }>;
    ["Mutation"]: AliasType<{
        ApplyForm?: [{
            data: ValueTypes["ApplyFormInput"] | Variable<any, string>;
        }, boolean | `@${string}`];
        __typename?: boolean | `@${string}`;
    }>;
    ["ApplyFormInput"]: {
        firstName: string | Variable<any, string>;
        lastName: string | Variable<any, string>;
        birthday: string | Variable<any, string>;
        phoneNumber?: string | undefined | null | Variable<any, string>;
        email?: string | undefined | null | Variable<any, string>;
        aboutMe: string | Variable<any, string>;
    };
    ["ApplicationForm"]: AliasType<{
        firstName?: boolean | `@${string}`;
        lastName?: boolean | `@${string}`;
        birthday?: boolean | `@${string}`;
        phoneNumber?: boolean | `@${string}`;
        email?: boolean | `@${string}`;
        aboutMe?: boolean | `@${string}`;
        __typename?: boolean | `@${string}`;
    }>;
    ["Product"]: AliasType<{
        id?: boolean | `@${string}`;
        name?: boolean | `@${string}`;
        description?: boolean | `@${string}`;
        price?: boolean | `@${string}`;
        image?: boolean | `@${string}`;
        quantity?: boolean | `@${string}`;
        __typename?: boolean | `@${string}`;
    }>;
};
export type ResolverInputTypes = {
    ["Query"]: AliasType<{
        me?: boolean | `@${string}`;
        findProduct?: [{
            id: string;
        }, ResolverInputTypes["Product"]];
        __typename?: boolean | `@${string}`;
    }>;
    ["Mutation"]: AliasType<{
        ApplyForm?: [{
            data: ResolverInputTypes["ApplyFormInput"];
        }, boolean | `@${string}`];
        __typename?: boolean | `@${string}`;
    }>;
    ["ApplyFormInput"]: {
        firstName: string;
        lastName: string;
        birthday: string;
        phoneNumber?: string | undefined | null;
        email?: string | undefined | null;
        aboutMe: string;
    };
    ["ApplicationForm"]: AliasType<{
        firstName?: boolean | `@${string}`;
        lastName?: boolean | `@${string}`;
        birthday?: boolean | `@${string}`;
        phoneNumber?: boolean | `@${string}`;
        email?: boolean | `@${string}`;
        aboutMe?: boolean | `@${string}`;
        __typename?: boolean | `@${string}`;
    }>;
    ["Product"]: AliasType<{
        id?: boolean | `@${string}`;
        name?: boolean | `@${string}`;
        description?: boolean | `@${string}`;
        price?: boolean | `@${string}`;
        image?: boolean | `@${string}`;
        quantity?: boolean | `@${string}`;
        __typename?: boolean | `@${string}`;
    }>;
};
export type ModelTypes = {
    ["Query"]: {
        me: string;
        findProduct: ModelTypes["Product"];
    };
    ["Mutation"]: {
        ApplyForm: boolean;
    };
    ["ApplyFormInput"]: {
        firstName: string;
        lastName: string;
        birthday: string;
        phoneNumber?: string | undefined;
        email?: string | undefined;
        aboutMe: string;
    };
    ["ApplicationForm"]: {
        firstName: string;
        lastName: string;
        birthday: string;
        phoneNumber?: string | undefined;
        email?: string | undefined;
        aboutMe: string;
    };
    ["Product"]: {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
        quantity: number;
    };
};
export type GraphQLTypes = {
    ["Query"]: {
        __typename: "Query";
        me: string;
        findProduct: GraphQLTypes["Product"];
    };
    ["Mutation"]: {
        __typename: "Mutation";
        ApplyForm: boolean;
    };
    ["ApplyFormInput"]: {
        firstName: string;
        lastName: string;
        birthday: string;
        phoneNumber?: string | undefined;
        email?: string | undefined;
        aboutMe: string;
    };
    ["ApplicationForm"]: {
        __typename: "ApplicationForm";
        firstName: string;
        lastName: string;
        birthday: string;
        phoneNumber?: string | undefined;
        email?: string | undefined;
        aboutMe: string;
    };
    ["Product"]: {
        __typename: "Product";
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
        quantity: number;
    };
};
type ZEUS_VARIABLES = {
    ["ApplyFormInput"]: ValueTypes["ApplyFormInput"];
};
export {};
