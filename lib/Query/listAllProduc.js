import { orm } from "../utils/orm.js";
import { ProductsCollection } from "../utils/collections.js";
export const handler = async (input) => {
    const o = await orm();
    return o(ProductsCollection).collection.find({});
};
