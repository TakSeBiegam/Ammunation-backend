// import { FieldResolveInput } from "stucco-js";
// import crypto from "node:crypto";
// import { ResolverInputTypes } from "../zeus";

// const getUserInformationAndCreateIfNotExists = async (
//   token: string,
//   o: Awaited<ReturnType<typeof orm>>
// ) => {
//   const authUser = await getUserInformation(token);
//   if (!authUser) {
//     throw new Error("unauthorized token");
//   }
//   const user = await o(UserCollection).collection.findOne({
//     sub: authUser.sub,
//   });
//   if (!user) {
//     await o(UserCollection).createWithAutoFields("_id")({
//       name: authUser.name || "",
//       username: authUser.nickname,
//       email: authUser.email || "",
//       about: "",
//       plants: [],
//       userAvatar:
//         "https://tuki-bucket.fra1.digitaloceanspaces.com/Mask%20group%20(2).png",
//       isTermsAndConditionsAccepted: false,
//       emailConfirmed: authUser.email_verified,
//       archived: false,
//       sub: authUser.sub,
//       lovedPlants: [],
//       lastViewedUsers: [],
//       lastViewedCategories: [],
//       followedUsers: [],
//     });
//     const createdUser = await o(UserCollection).collection.findOne({
//       sub: authUser.sub,
//     });
//     if (!createdUser) throw new Error("cannot find created user - try again");
//     return createdUser;
//   }
// };

// export const getUser = async (
//   token: string
// ): Promise<UserModel | undefined> => {
//   const parts = token.split(" ").filter((v) => v);
//   if (parts.length !== 1 && parts.length !== 2) {
//     throw new Error("Malformed token");
//   }
//   token = parts[parts.length - 1];
//   const o = await orm();
//   const decodedToken = await validateJWT(token);
//   if (decodedToken && decodedToken.sub) {
//     const user = await o(UserCollection).collection.findOne({
//       sub: decodedToken.sub,
//     });
//     if (user) {
//       return user;
//     }
//   }
//   return getUserInformationAndCreateIfNotExists(token, o);
// };

// export const getUserFromHandlerInput = async (
//   input: FieldResolveInput
// ): Promise<UserModel | undefined> => {
//   if (!input.protocol?.headers) {
//     return;
//   }
//   const { Authorization }: { Authorization?: string[] } =
//     input.protocol.headers;
//   if (!Authorization) {
//     return;
//   }
//   const findUser = await getUser(Authorization[0]);
//   if (!findUser) {
//     return;
//   }
//   return findUser;
// };

// export const getUserFromHandlerInputOrThrow = async (
//   input: FieldResolveInput
// ): Promise<UserModel> => {
//   const user = await getUserFromHandlerInput(input);
//   if (!user) {
//     throw new Error("You are not logged in");
//   }
//   await guardianForRequiredFields(user.username);
//   return user;
// };

// const isUserSource = (u: unknown): u is UserModel =>
//   isNotNullObject(u) && typeof u.username === "string";

// type Args<
//   T extends keyof ResolverInputTypes,
//   Z extends keyof ResolverInputTypes[T]
// > = Required<ResolverInputTypes[T]>[Z] extends [infer Input, unknown]
//   ? Input
//   : never;
// type UserArgs<
//   T extends keyof ResolverInputTypes,
//   Z extends keyof ResolverInputTypes[T]
// > = Args<T, Z> & {
//   user: UserModel;
// };

// export const isNotNullObject = (
//   v: unknown
// ): v is Record<string | number | symbol, unknown> =>
//   typeof v === "object" && v !== null;

// export const resolverForUser =
//   <
//     T extends keyof ResolverInputTypes,
//     Z extends keyof ResolverInputTypes[T],
//     X = unknown
//   >(
//     _1: T,
//     _2: Z,
//     fn: (args: UserArgs<T, Z>, input: FieldResolveInput) => X
//   ) =>
//   async (args: unknown, input: FieldResolveInput) => {
//     if (!input.protocol?.headers?.Authorization)
//       throw new Error("token does not exists in headers");
//     const { protocol: { headers = {} } = {} } = input || {};
//     const user = await getUser(headers.Authorization[0]);
//     if (!isUserSource(user)) throw new Error("invalid user");
//     await guardianForRequiredFields(user.username);
//     const o = isNotNullObject(args) ? args : {};
//     return fn({ ...o, user } as UserArgs<T, Z>, input);
//   };

// export const resolverForAdmin =
//   <
//     T extends keyof ResolverInputTypes,
//     Z extends keyof ResolverInputTypes[T],
//     X = unknown
//   >(
//     _1: T,
//     _2: Z,
//     fn: (args: UserArgs<T, Z>, input: FieldResolveInput) => X
//   ) =>
//   async (args: unknown, input: FieldResolveInput) => {
//     if (!input.protocol?.headers?.Authorization)
//       throw new Error("token does not exists in headers");
//     const { protocol: { headers = {} } = {} } = input || {};
//     const user = await getUser(headers.Authorization[0]);
//     if (!isUserSource(user)) throw new Error("invalid user");
//     if (!(await isAdmin(user._id))) {
//       throw new Error(
//         "Only administrator of the system can access this endpoint"
//       );
//     }
//     await guardianForRequiredFields(user.username);
//     const o = isNotNullObject(args) ? args : {};
//     return fn({ ...o, user } as UserArgs<T, Z>, input);
//   };

// export const isAdmin = async (userId: string): Promise<boolean> => {
//   const o = await orm();
//   const adminExists = await o(AdminCollection).collection.findOne({
//     userId,
//   });
//   return !!adminExists;
// };

// export const isAdminOrThrow = async (
//   input: FieldResolveInput
// ): Promise<void> => {
//   const user = await getUserFromHandlerInputOrThrow(input);
//   if (!isAdmin(user._id)) {
//     throw new Error(
//       "Only administrator of the system can access this endpoint"
//     );
//   }
// };
// /**
// throws error when user have any field undefined

// @param username - it's user username
// @param o - it's orm() object but not required because this method can self create it
// */
// export const guardianForRequiredFields = async (
//   username: string,
//   o?: Awaited<ReturnType<typeof orm>>
// ) => {
//   if (!o) {
//     o = await orm();
//   }
//   const user = await o(UserCollection).collection.findOne({ username });
//   if (!user) throw new Error("cannot find user with specific username");
//   if (
//     typeof user.isTermsAndConditionsAccepted === "undefined" ||
//     user.isTermsAndConditionsAccepted === false
//   )
//     throw new Error("terms and conditions not accepted");
//   if (user.archived)
//     throw new Error("this account is restricted - contact with support");
//   return true;
// };

// export const comparePasswords = ({
//   password,
//   hash,
//   salt,
// }: {
//   password: string;
//   hash: string;
//   salt: string;
// }) => {
//   return hash === passwordSha512(password, salt).passwordHash;
// };

// export const passwordSha512 = (password: string, salt: string) => {
//   const hash = crypto.createHmac("sha512", salt);
//   hash.update(password);
//   const passwordHash = hash.digest("hex");
//   return {
//     salt,
//     passwordHash,
//   };
// };
