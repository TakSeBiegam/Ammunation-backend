import { iGraphQL } from "i-graphql";
import { ObjectId } from "mongodb";
export const orm = async () => {
    return iGraphQL({
        _id: () => new ObjectId().toHexString(),
    });
};
