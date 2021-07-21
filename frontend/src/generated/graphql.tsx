import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginToken = {
  __typename?: 'LoginToken';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ctx: Scalars['String'];
  createUser: User;
  login: LoginToken;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationLoginArgs = {
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  query: User;
  checkAuth: RefreshToken;
  bye: Scalars['String'];
};

export type RefreshToken = {
  __typename?: 'RefreshToken';
  refreshToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
};

export type UserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegMutationVariables = Exact<{ [key: string]: never; }>;


export type RegMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'username'>
  ) }
);


export const RegDocument = gql`
    mutation Reg {
  createUser(input: {username: "dsad", password: "dsad"}) {
    username
  }
}
    `;
export type RegMutationFn = Apollo.MutationFunction<RegMutation, RegMutationVariables>;

/**
 * __useRegMutation__
 *
 * To run a mutation, you first call `useRegMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [regMutation, { data, loading, error }] = useRegMutation({
 *   variables: {
 *   },
 * });
 */
export function useRegMutation(baseOptions?: Apollo.MutationHookOptions<RegMutation, RegMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegMutation, RegMutationVariables>(RegDocument, options);
      }
export type RegMutationHookResult = ReturnType<typeof useRegMutation>;
export type RegMutationResult = Apollo.MutationResult<RegMutation>;
export type RegMutationOptions = Apollo.BaseMutationOptions<RegMutation, RegMutationVariables>;