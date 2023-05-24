import { iGraphQL } from "i-graphql";
import { ObjectId } from "mongodb";
import { ModelTypes } from "../zeus";

export const orm = async () => {
  return iGraphQL<
    {
      ApplicationCollection: ModelTypes["ApplicationForm"];
      ProductsCollection: ModelTypes["Product"];
    },
    {
      _id: () => string;
    }
  >({
    _id: () => new ObjectId().toHexString(),
  });
};
