import { FieldResolveInput } from "stucco-js";
export declare const handler: (input: FieldResolveInput) => Promise<import("mongodb").FindCursor<import("mongodb").WithId<{
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
}>>>;
