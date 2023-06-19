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
  DateTime: any;
};


export type LoginToken = {
  __typename?: 'LoginToken';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeAvatar: User;
  checkAuth: LoginToken;
  createPost: Post;
  createThread: Thread;
  createUser: User;
  deletePost: Scalars['Boolean'];
  deleteThread: Scalars['Boolean'];
  login: LoginToken;
  logout: Scalars['Boolean'];
};


export type MutationChangeAvatarArgs = {
  avatar: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCheckAuthArgs = {
  cookie: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationCreateThreadArgs = {
  input: ThreadInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeletePostArgs = {
  postID: Scalars['String'];
};


export type MutationDeleteThreadArgs = {
  threadID: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UserInput;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  user: User;
};

export type PostInput = {
  content: Scalars['String'];
  thread_id: Scalars['ID'];
  username: Scalars['String'];
};

export type PostOrThread = Post | Thread;

export type Posts = {
  __typename?: 'Posts';
  data: Array<Post>;
  total: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  cookie: LoginToken;
  currentUser?: Maybe<User>;
  posts: Posts;
  threadWithPosts: ThreadWithPosts;
  threads: Threads;
  userActivity: UserActivity;
  userPosts: Posts;
  userThreads: Threads;
  users: Array<User>;
};


export type QueryCurrentUserArgs = {
  username: Scalars['String'];
};


export type QueryPostsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryThreadWithPostsArgs = {
  id: Scalars['String'];
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};


export type QueryThreadsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryUserActivityArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  username: Scalars['String'];
};


export type QueryUserPostsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  username: Scalars['String'];
};


export type QueryUserThreadsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  username: Scalars['String'];
};

export type Thread = {
  __typename?: 'Thread';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  posts?: Maybe<Array<Post>>;
  title: Scalars['String'];
  user: User;
};

export type ThreadInput = {
  avatar: Scalars['String'];
  firstPostContent: Scalars['String'];
  title: Scalars['String'];
  username: Scalars['String'];
};

export type ThreadWithPosts = {
  __typename?: 'ThreadWithPosts';
  data: Thread;
  total: Scalars['Float'];
};

export type Threads = {
  __typename?: 'Threads';
  data: Array<Thread>;
  total: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  avatar: Scalars['String'];
  posts: Array<Post>;
  threads?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserActivity = {
  __typename?: 'UserActivity';
  data: Array<PostOrThread>;
  total: Scalars['Float'];
};

export type UserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )> }
);

export type PostsQueryVariables = Exact<{
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'Posts' }
    & Pick<Posts, 'total'>
    & { data: Array<(
      { __typename?: 'Post' }
      & Pick<Post, '_id' | 'content' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'avatar'>
      ) }
    )> }
  ) }
);

export type UserPostsQueryVariables = Exact<{
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  username: Scalars['String'];
}>;


export type UserPostsQuery = (
  { __typename?: 'Query' }
  & { userPosts: (
    { __typename?: 'Posts' }
    & Pick<Posts, 'total'>
    & { data: Array<(
      { __typename?: 'Post' }
      & Pick<Post, '_id' | 'content' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'avatar'>
      ) }
    )> }
  ) }
);

export type PostMutationVariables = Exact<{
  input: PostInput;
}>;


export type PostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'content' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'avatar' | 'username'>
    ) }
  ) }
);

export type DeletePostMutationVariables = Exact<{
  postID: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type RegMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'username'>
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginToken' }
    & Pick<LoginToken, 'token'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ChangeAvatarMutationVariables = Exact<{
  username: Scalars['String'];
  avatar: Scalars['String'];
}>;


export type ChangeAvatarMutation = (
  { __typename?: 'Mutation' }
  & { changeAvatar: (
    { __typename?: 'User' }
    & Pick<User, 'username' | 'avatar'>
  ) }
);

export type CurrentUserAvatarQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type CurrentUserAvatarQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'avatar'>
  )> }
);

export type AuthMutationVariables = Exact<{
  cookie: Scalars['String'];
}>;


export type AuthMutation = (
  { __typename?: 'Mutation' }
  & { checkAuth: (
    { __typename?: 'LoginToken' }
    & Pick<LoginToken, 'token'>
  ) }
);

export type CreateThreadMutationVariables = Exact<{
  input: ThreadInput;
}>;


export type CreateThreadMutation = (
  { __typename?: 'Mutation' }
  & { createThread: (
    { __typename?: 'Thread' }
    & Pick<Thread, 'title' | 'createdAt' | '_id'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  ) }
);

export type ThreadsQueryVariables = Exact<{
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type ThreadsQuery = (
  { __typename?: 'Query' }
  & { threads: (
    { __typename?: 'Threads' }
    & Pick<Threads, 'total'>
    & { data: Array<(
      { __typename?: 'Thread' }
      & Pick<Thread, '_id' | 'createdAt' | 'title'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'avatar' | 'username'>
      ) }
    )> }
  ) }
);

export type ThreadWithPostsQueryVariables = Exact<{
  threadWithPostsId: Scalars['String'];
}>;


export type ThreadWithPostsQuery = (
  { __typename?: 'Query' }
  & { threadWithPosts: (
    { __typename?: 'ThreadWithPosts' }
    & Pick<ThreadWithPosts, 'total'>
    & { data: (
      { __typename?: 'Thread' }
      & Pick<Thread, 'title' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'avatar' | 'username' | '_id'>
      ), posts?: Maybe<Array<(
        { __typename?: 'Post' }
        & Pick<Post, 'content' | 'createdAt' | '_id'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'username' | 'avatar'>
        ) }
      )>> }
    ) }
  ) }
);

export type UserActivityQueryVariables = Exact<{
  offset: Scalars['Int'];
  username: Scalars['String'];
  limit: Scalars['Int'];
}>;


export type UserActivityQuery = (
  { __typename?: 'Query' }
  & { userActivity: (
    { __typename?: 'UserActivity' }
    & Pick<UserActivity, 'total'>
    & { data: Array<(
      { __typename?: 'Post' }
      & Pick<Post, '_id' | 'content' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'avatar'>
      ) }
    ) | (
      { __typename?: 'Thread' }
      & Pick<Thread, 'title' | 'createdAt' | '_id'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'avatar' | 'username'>
      ) }
    )> }
  ) }
);


export const AllUsersDocument = gql`
    query AllUsers {
  users {
    username
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const PostsDocument = gql`
    query Posts($offset: Int!, $limit: Int!) {
  posts(offset: $offset, limit: $limit) {
    data {
      _id
      content
      createdAt
      user {
        username
        avatar
      }
    }
    total
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const UserPostsDocument = gql`
    query UserPosts($offset: Int!, $limit: Int!, $username: String!) {
  userPosts(offset: $offset, limit: $limit, username: $username) {
    data {
      _id
      content
      createdAt
      user {
        username
        avatar
      }
    }
    total
  }
}
    `;

/**
 * __useUserPostsQuery__
 *
 * To run a query within a React component, call `useUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPostsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserPostsQuery(baseOptions: Apollo.QueryHookOptions<UserPostsQuery, UserPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserPostsQuery, UserPostsQueryVariables>(UserPostsDocument, options);
      }
export function useUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserPostsQuery, UserPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserPostsQuery, UserPostsQueryVariables>(UserPostsDocument, options);
        }
export type UserPostsQueryHookResult = ReturnType<typeof useUserPostsQuery>;
export type UserPostsLazyQueryHookResult = ReturnType<typeof useUserPostsLazyQuery>;
export type UserPostsQueryResult = Apollo.QueryResult<UserPostsQuery, UserPostsQueryVariables>;
export const PostDocument = gql`
    mutation Post($input: PostInput!) {
  createPost(input: $input) {
    _id
    content
    createdAt
    user {
      avatar
      username
    }
  }
}
    `;
export type PostMutationFn = Apollo.MutationFunction<PostMutation, PostMutationVariables>;

/**
 * __usePostMutation__
 *
 * To run a mutation, you first call `usePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMutation, { data, loading, error }] = usePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostMutation(baseOptions?: Apollo.MutationHookOptions<PostMutation, PostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostMutation, PostMutationVariables>(PostDocument, options);
      }
export type PostMutationHookResult = ReturnType<typeof usePostMutation>;
export type PostMutationResult = Apollo.MutationResult<PostMutation>;
export type PostMutationOptions = Apollo.BaseMutationOptions<PostMutation, PostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postID: String!) {
  deletePost(postID: $postID)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postID: // value for 'postID'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const RegDocument = gql`
    mutation Reg($username: String!, $password: String!) {
  createUser(input: {username: $username, password: $password}) {
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
 *      username: // value for 'username'
 *      password: // value for 'password'
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
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ChangeAvatarDocument = gql`
    mutation ChangeAvatar($username: String!, $avatar: String!) {
  changeAvatar(username: $username, avatar: $avatar) {
    username
    avatar
  }
}
    `;
export type ChangeAvatarMutationFn = Apollo.MutationFunction<ChangeAvatarMutation, ChangeAvatarMutationVariables>;

/**
 * __useChangeAvatarMutation__
 *
 * To run a mutation, you first call `useChangeAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAvatarMutation, { data, loading, error }] = useChangeAvatarMutation({
 *   variables: {
 *      username: // value for 'username'
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useChangeAvatarMutation(baseOptions?: Apollo.MutationHookOptions<ChangeAvatarMutation, ChangeAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeAvatarMutation, ChangeAvatarMutationVariables>(ChangeAvatarDocument, options);
      }
export type ChangeAvatarMutationHookResult = ReturnType<typeof useChangeAvatarMutation>;
export type ChangeAvatarMutationResult = Apollo.MutationResult<ChangeAvatarMutation>;
export type ChangeAvatarMutationOptions = Apollo.BaseMutationOptions<ChangeAvatarMutation, ChangeAvatarMutationVariables>;
export const CurrentUserAvatarDocument = gql`
    query CurrentUserAvatar($username: String!) {
  currentUser(username: $username) {
    avatar
  }
}
    `;

/**
 * __useCurrentUserAvatarQuery__
 *
 * To run a query within a React component, call `useCurrentUserAvatarQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserAvatarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserAvatarQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCurrentUserAvatarQuery(baseOptions: Apollo.QueryHookOptions<CurrentUserAvatarQuery, CurrentUserAvatarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserAvatarQuery, CurrentUserAvatarQueryVariables>(CurrentUserAvatarDocument, options);
      }
export function useCurrentUserAvatarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserAvatarQuery, CurrentUserAvatarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserAvatarQuery, CurrentUserAvatarQueryVariables>(CurrentUserAvatarDocument, options);
        }
export type CurrentUserAvatarQueryHookResult = ReturnType<typeof useCurrentUserAvatarQuery>;
export type CurrentUserAvatarLazyQueryHookResult = ReturnType<typeof useCurrentUserAvatarLazyQuery>;
export type CurrentUserAvatarQueryResult = Apollo.QueryResult<CurrentUserAvatarQuery, CurrentUserAvatarQueryVariables>;
export const AuthDocument = gql`
    mutation Auth($cookie: String!) {
  checkAuth(cookie: $cookie) {
    token
  }
}
    `;
export type AuthMutationFn = Apollo.MutationFunction<AuthMutation, AuthMutationVariables>;

/**
 * __useAuthMutation__
 *
 * To run a mutation, you first call `useAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authMutation, { data, loading, error }] = useAuthMutation({
 *   variables: {
 *      cookie: // value for 'cookie'
 *   },
 * });
 */
export function useAuthMutation(baseOptions?: Apollo.MutationHookOptions<AuthMutation, AuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthMutation, AuthMutationVariables>(AuthDocument, options);
      }
export type AuthMutationHookResult = ReturnType<typeof useAuthMutation>;
export type AuthMutationResult = Apollo.MutationResult<AuthMutation>;
export type AuthMutationOptions = Apollo.BaseMutationOptions<AuthMutation, AuthMutationVariables>;
export const CreateThreadDocument = gql`
    mutation CreateThread($input: ThreadInput!) {
  createThread(input: $input) {
    title
    user {
      username
    }
    createdAt
    _id
  }
}
    `;
export type CreateThreadMutationFn = Apollo.MutationFunction<CreateThreadMutation, CreateThreadMutationVariables>;

/**
 * __useCreateThreadMutation__
 *
 * To run a mutation, you first call `useCreateThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThreadMutation, { data, loading, error }] = useCreateThreadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateThreadMutation(baseOptions?: Apollo.MutationHookOptions<CreateThreadMutation, CreateThreadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateThreadMutation, CreateThreadMutationVariables>(CreateThreadDocument, options);
      }
export type CreateThreadMutationHookResult = ReturnType<typeof useCreateThreadMutation>;
export type CreateThreadMutationResult = Apollo.MutationResult<CreateThreadMutation>;
export type CreateThreadMutationOptions = Apollo.BaseMutationOptions<CreateThreadMutation, CreateThreadMutationVariables>;
export const ThreadsDocument = gql`
    query Threads($offset: Int!, $limit: Int!) {
  threads(offset: $offset, limit: $limit) {
    total
    data {
      _id
      createdAt
      title
      user {
        avatar
        username
      }
    }
  }
}
    `;

/**
 * __useThreadsQuery__
 *
 * To run a query within a React component, call `useThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useThreadsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useThreadsQuery(baseOptions: Apollo.QueryHookOptions<ThreadsQuery, ThreadsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ThreadsQuery, ThreadsQueryVariables>(ThreadsDocument, options);
      }
export function useThreadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ThreadsQuery, ThreadsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ThreadsQuery, ThreadsQueryVariables>(ThreadsDocument, options);
        }
export type ThreadsQueryHookResult = ReturnType<typeof useThreadsQuery>;
export type ThreadsLazyQueryHookResult = ReturnType<typeof useThreadsLazyQuery>;
export type ThreadsQueryResult = Apollo.QueryResult<ThreadsQuery, ThreadsQueryVariables>;
export const ThreadWithPostsDocument = gql`
    query ThreadWithPosts($threadWithPostsId: String!) {
  threadWithPosts(id: $threadWithPostsId) {
    data {
      title
      user {
        avatar
        username
        _id
      }
      createdAt
      posts {
        user {
          username
          avatar
        }
        content
        createdAt
        _id
      }
    }
    total
  }
}
    `;

/**
 * __useThreadWithPostsQuery__
 *
 * To run a query within a React component, call `useThreadWithPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useThreadWithPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useThreadWithPostsQuery({
 *   variables: {
 *      threadWithPostsId: // value for 'threadWithPostsId'
 *   },
 * });
 */
export function useThreadWithPostsQuery(baseOptions: Apollo.QueryHookOptions<ThreadWithPostsQuery, ThreadWithPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ThreadWithPostsQuery, ThreadWithPostsQueryVariables>(ThreadWithPostsDocument, options);
      }
export function useThreadWithPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ThreadWithPostsQuery, ThreadWithPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ThreadWithPostsQuery, ThreadWithPostsQueryVariables>(ThreadWithPostsDocument, options);
        }
export type ThreadWithPostsQueryHookResult = ReturnType<typeof useThreadWithPostsQuery>;
export type ThreadWithPostsLazyQueryHookResult = ReturnType<typeof useThreadWithPostsLazyQuery>;
export type ThreadWithPostsQueryResult = Apollo.QueryResult<ThreadWithPostsQuery, ThreadWithPostsQueryVariables>;
export const UserActivityDocument = gql`
    query UserActivity($offset: Int!, $username: String!, $limit: Int!) {
  userActivity(offset: $offset, username: $username, limit: $limit) {
    total
    data {
      ... on Thread {
        title
        user {
          avatar
          username
        }
        createdAt
        _id
      }
      ... on Post {
        _id
        content
        createdAt
        user {
          username
          avatar
        }
      }
    }
  }
}
    `;

/**
 * __useUserActivityQuery__
 *
 * To run a query within a React component, call `useUserActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserActivityQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      username: // value for 'username'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUserActivityQuery(baseOptions: Apollo.QueryHookOptions<UserActivityQuery, UserActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserActivityQuery, UserActivityQueryVariables>(UserActivityDocument, options);
      }
export function useUserActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserActivityQuery, UserActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserActivityQuery, UserActivityQueryVariables>(UserActivityDocument, options);
        }
export type UserActivityQueryHookResult = ReturnType<typeof useUserActivityQuery>;
export type UserActivityLazyQueryHookResult = ReturnType<typeof useUserActivityLazyQuery>;
export type UserActivityQueryResult = Apollo.QueryResult<UserActivityQuery, UserActivityQueryVariables>;