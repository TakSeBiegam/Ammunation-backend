import { resolverFor } from "../zeus";
import { orm } from "../utils/orm";
import { ApplicationCollection } from "../utils/collections.js";
export const handler = (input) => resolverFor("Mutation", "ApplyForm", async ({ data: { firstName, lastName, birthday, phoneNumber, email, AboutMe }, }) => {
    if (!phoneNumber && !email)
        throw new Error("phone number and email cannot be null");
    const o = await orm();
    await o(ApplicationCollection)
        .collection.insertOne({
        firstName,
        lastName,
        birthday,
        AboutMe,
        phoneNumber: phoneNumber || undefined,
        email: email || undefined,
    })
        .then((insertedElement) => insertedElement.insertedId.toString().length !== 0);
})(input.arguments, input.source);
