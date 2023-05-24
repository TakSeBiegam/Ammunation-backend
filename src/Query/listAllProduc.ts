import { FieldResolveInput } from "stucco-js";
import { orm } from "../utils/orm.js";
import { ProductsCollection } from "../utils/collections.js";

export const handler = async (input: FieldResolveInput) => {
  const o = await orm();
  return o(ProductsCollection).collection.find({});
};
