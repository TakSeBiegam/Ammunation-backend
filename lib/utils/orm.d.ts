import { ModelTypes } from "../zeus";
export declare const orm: () => Promise<(<T extends "ApplicationCollection" | "ProductsCollection">(k: T extends string ? T : never) => {
    collection: import("mongodb").Collection<{
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[T]>;
    create: (params: import("mongodb").OptionalUnlessRequiredId<{
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[T]>) => Promise<import("mongodb").InsertOneResult<{
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[T]>>;
    createWithAutoFields: <Z extends "_id" extends infer T_1 ? T_1 extends "_id" ? T_1 extends keyof {
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[T] ? T_1 : never : never : never>(...keys: Z[]) => (params: Omit<import("mongodb").OptionalUnlessRequiredId<{
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[T]>, Z>) => Promise<import("mongodb").InsertOneResult<{
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[T]>>;
    related: <K extends keyof {
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[T], NewCollection extends "ApplicationCollection" | "ProductsCollection", NewCollectionKey extends keyof {
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[NewCollection]>(objects: {
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[T][], k: K, relatedCollection: NewCollection, nK: NewCollectionKey) => Promise<import("mongodb").WithId<{
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[NewCollection]>[]>;
    composeRelated: <K_1 extends keyof {
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[T], NewCollection_1 extends "ApplicationCollection" | "ProductsCollection", NewCollectionKey_1 extends keyof {
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[NewCollection_1]>(objects: {
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[T][], k: K_1, relatedCollection: NewCollection_1, nK: NewCollectionKey_1) => Promise<{
        ApplicationCollection: ModelTypes["ApplicationForm"];
        ProductsCollection: ModelTypes["Product"];
    }[T][]>;
})>;
