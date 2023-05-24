import { FieldResolveInput } from "stucco-js";
import { resolverFor } from "../zeus/index.js";
import { orm } from "../utils/orm.js";
import { ApplicationCollection } from "../utils/collections.js";

export const handler = async (input: FieldResolveInput) =>
  resolverFor(
    "Mutation",
    "ApplyForm",
    async ({
      data: { firstName, lastName, birthday, phoneNumber, email, aboutMe },
    }) => {
      if (!phoneNumber && !email)
        throw new Error("phone number and email cannot be null");
      const o = await orm();
      return o(ApplicationCollection)
        .create({
          firstName,
          lastName,
          birthday,
          aboutMe,
          phoneNumber: phoneNumber || undefined,
          email: email || undefined,
        })
        .then(
          (insertedElement) =>
            insertedElement.insertedId.toString().length !== 0
        );
    }
  )(input.arguments, input.source);
