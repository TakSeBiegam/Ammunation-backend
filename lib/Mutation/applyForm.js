import { resolverFor } from "../zeus/index.js";
import { orm } from "../utils/orm.js";
import { ApplicationCollection } from "../utils/collections.js";
// # MONGO_URL=mongodb+srv://arkadiuszkurylo:zLPTPSiK7koTHaF2@projektstronyinternetow.iwso570.mongodb.net/test
export const handler = async (input) => resolverFor("Mutation", "ApplyForm", async ({ data: { firstName, lastName, birthday, phoneNumber, email, aboutMe }, }) => {
    console.log("mam to");
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
        .then((insertedElement) => insertedElement.insertedId.toString().length !== 0);
})(input.arguments, input.source);
