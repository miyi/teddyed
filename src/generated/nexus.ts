/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as Context from "../context"
import * as photon from "@prisma/photon"



declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ListingCreateManyWithoutListingsInput: { // input type
    connect?: NexusGenInputs['ListingWhereUniqueInput'][] | null; // [ListingWhereUniqueInput!]
    create?: NexusGenInputs['ListingCreateWithoutOwnerInput'][] | null; // [ListingCreateWithoutOwnerInput!]
  }
  ListingCreateWithoutOwnerInput: { // input type
    content?: string | null; // String
    createdAt?: any | null; // DateTime
    id?: string | null; // ID
    title: string; // String!
    updatedAt?: any | null; // DateTime
  }
  ListingWhereUniqueInput: { // input type
    id?: string | null; // ID
  }
  PostCreateManyWithoutPostsInput: { // input type
    connect?: NexusGenInputs['PostWhereUniqueInput'][] | null; // [PostWhereUniqueInput!]
    create?: NexusGenInputs['PostCreateWithoutAuthorInput'][] | null; // [PostCreateWithoutAuthorInput!]
  }
  PostCreateWithoutAuthorInput: { // input type
    content?: string | null; // String
    createdAt?: any | null; // DateTime
    id?: string | null; // ID
    published?: boolean | null; // Boolean
    title: string; // String!
    updatedAt?: any | null; // DateTime
  }
  PostWhereUniqueInput: { // input type
    id?: string | null; // ID
  }
  ProviderCreateInput: { // input type
    email: string; // String!
    id?: string | null; // ID
    listings?: NexusGenInputs['ListingCreateManyWithoutListingsInput'] | null; // ListingCreateManyWithoutListingsInput
    name?: string | null; // String
  }
  UserCreateInput: { // input type
    email: string; // String!
    id?: string | null; // ID
    name?: string | null; // String
    posts?: NexusGenInputs['PostCreateManyWithoutPostsInput'] | null; // PostCreateManyWithoutPostsInput
  }
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Listing: photon.Listing;
  Mutation: {};
  Post: photon.Post;
  Provider: photon.Provider;
  Query: {};
  User: photon.User;
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  ListingCreateManyWithoutListingsInput: NexusGenInputs['ListingCreateManyWithoutListingsInput'];
  ListingCreateWithoutOwnerInput: NexusGenInputs['ListingCreateWithoutOwnerInput'];
  ListingWhereUniqueInput: NexusGenInputs['ListingWhereUniqueInput'];
  PostCreateManyWithoutPostsInput: NexusGenInputs['PostCreateManyWithoutPostsInput'];
  PostCreateWithoutAuthorInput: NexusGenInputs['PostCreateWithoutAuthorInput'];
  PostWhereUniqueInput: NexusGenInputs['PostWhereUniqueInput'];
  ProviderCreateInput: NexusGenInputs['ProviderCreateInput'];
  UserCreateInput: NexusGenInputs['UserCreateInput'];
}

export interface NexusGenFieldTypes {
  Listing: { // field return type
    content: string | null; // String
    createdAt: any; // DateTime!
    id: string; // ID!
    owner: NexusGenRootTypes['Provider']; // Provider!
    title: string; // String!
    updatedAt: any; // DateTime!
  }
  Mutation: { // field return type
    createDraft: NexusGenRootTypes['Post']; // Post!
    createListing: NexusGenRootTypes['Listing']; // Listing!
    publish: NexusGenRootTypes['Post'] | null; // Post
    signupProvider: NexusGenRootTypes['Provider']; // Provider!
    signupUser: NexusGenRootTypes['User']; // User!
  }
  Post: { // field return type
    author: NexusGenRootTypes['User']; // User!
    content: string | null; // String
    createdAt: any; // DateTime!
    id: string; // ID!
    published: boolean; // Boolean!
    title: string; // String!
    updatedAt: any; // DateTime!
  }
  Provider: { // field return type
    email: string; // String!
    id: string; // ID!
    listings: NexusGenRootTypes['Listing'][]; // [Listing!]!
    name: string | null; // String
  }
  Query: { // field return type
    browse: NexusGenRootTypes['Listing'][]; // [Listing!]!
    feed: NexusGenRootTypes['Post'][]; // [Post!]!
    filterPosts: NexusGenRootTypes['Post'][]; // [Post!]!
    listing: NexusGenRootTypes['Listing'] | null; // Listing
    post: NexusGenRootTypes['Post'] | null; // Post
    search: NexusGenRootTypes['Listing'][]; // [Listing!]!
  }
  User: { // field return type
    email: string; // String!
    id: string; // ID!
    name: string | null; // String
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createDraft: { // args
      authorEmail?: string | null; // String
      content?: string | null; // String
      title: string; // String!
    }
    createListing: { // args
      ownerEmail: string; // String!
      title: string; // String!
    }
    publish: { // args
      id?: string | null; // ID
    }
    signupProvider: { // args
      data: NexusGenInputs['ProviderCreateInput']; // ProviderCreateInput!
    }
    signupUser: { // args
      data: NexusGenInputs['UserCreateInput']; // UserCreateInput!
    }
  }
  Provider: {
    listings: { // args
      after?: string | null; // ID
      before?: string | null; // ID
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  Query: {
    filterPosts: { // args
      searchString?: string | null; // String
    }
    listing: { // args
      where: NexusGenInputs['ListingWhereUniqueInput']; // ListingWhereUniqueInput!
    }
    post: { // args
      where: NexusGenInputs['PostWhereUniqueInput']; // PostWhereUniqueInput!
    }
    search: { // args
      searchString?: string | null; // String
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Listing" | "Mutation" | "Post" | "Provider" | "Query" | "User";

export type NexusGenInputNames = "ListingCreateManyWithoutListingsInput" | "ListingCreateWithoutOwnerInput" | "ListingWhereUniqueInput" | "PostCreateManyWithoutPostsInput" | "PostCreateWithoutAuthorInput" | "PostWhereUniqueInput" | "ProviderCreateInput" | "UserCreateInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}