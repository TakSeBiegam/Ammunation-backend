/* eslint-disable */
export const AllTypesProps = {
    Query: {
        findProduct: {}
    },
    Mutation: {
        ApplyForm: {
            data: "ApplyFormInput"
        }
    },
    ApplyFormInput: {}
};
export const ReturnTypes = {
    Query: {
        me: "String",
        findProduct: "Product"
    },
    Mutation: {
        ApplyForm: "Boolean"
    },
    ApplicationForm: {
        firstName: "String",
        lastName: "String",
        birthday: "String",
        phoneNumber: "String",
        email: "String",
        aboutMe: "String"
    },
    Product: {
        id: "String",
        name: "String",
        description: "String",
        price: "Int",
        image: "String",
        quantity: "Int"
    }
};
export const Ops = {
    query: "Query",
    mutation: "Mutation"
};
