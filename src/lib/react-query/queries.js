import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
  useInfiniteQuery,
} from "@tanstack/react-query";

import databaseservices from "../appwrite/database_api";
import authenservice from "../appwrite/auth_api";
import { QUERY_KEYS } from "./queries_key";

// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: ({ name, password, email }) =>
      authenservice.createUser({ name, password, email }),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: ({ email, password }) =>
      authenservice.usersignin({ email, password }),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: authenservice.loggingOutUser,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ creator, caption, tags, location, file }) =>
      databaseservices.createNewPost({
        creator,
        caption,
        file,
        location,
        tags,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
    },
  });
};

export const useGetRecentPost = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: () => databaseservices.getRecentPosts(),
  });
};

export const useUpdateLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ likearray, postId }) =>
      databaseservices.updateLikeArray({ likearray, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });

      queryClient.invalidateQueries([QUERY_KEYS.GET_POST_BY_ID]);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }) =>
      databaseservices.savePosts({ postId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVE_POSTS],
      });
    },
  });
};

export const useDeleteSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ savePostId, postId }) => {
      databaseservices.deleteSavePost({ savePostId: savePostId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.GET_ALL_SAVE_POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.GET_SAVE_POSTS]);
    },
  });
};

export const useGetSavePost = ({ userId }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVE_POSTS, userId],
    queryFn: () => databaseservices.getSavePost({ userId }),
    enabled: !!userId,
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: authenservice.getCurrentUser,
  });
};

export const useGetUserById = ({ userId }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => databaseservices.gettingUserById({ userId }),
  });
};

export const useGetPostById = ({ postId }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => databaseservices.gettingPostById({ postId }),
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ caption, postId, location, tags, file }) =>
      databaseservices.updatingPost({
        caption,
        postId,
        location,
        tags,
        file,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries([QUERY_KEYS.GET_POST_BY_ID]);
    },
  });
};

export const useGetAllSavePosts = (savePostIds) => {
  const ids = savePostIds ?? [];
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: [QUERY_KEYS.GET_ALL_SAVE_POSTS, id],
      queryFn: () => databaseservices.gettingPostById({ postId: id }),
      enabled: !!id,
    })),
  });
};

export const useGettingAllPostsByUserId = ({ creator }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS_BY_USER_ID, creator],
    queryFn: () => databaseservices.gettingAllPostsByUserId({ creator }),
  });
};

export const useGettingAllUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: databaseservices.getAllUsers,
  });
};

export const useGetInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: databaseservices.getInfinitePosts,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.rows.length === 0) {
        return null;
      }

      const lastId = lastPage.rows[lastPage.rows.length - 1].$id;
      return lastId;
    },
  });
};

export const useSearchPosts = (searchTerm) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SEARCH_POSTS, searchTerm],
    queryFn: () => databaseservices.getSearchPosts(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, imageId, userId }) => {
      databaseservices.deletingPost({ postId, imageId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries([QUERY_KEYS.GET_POST_BY_ID]);
      queryClient.invalidateQueries([QUERY_KEYS.GET_POSTS_BY_USER_ID]);
    },
  });
};

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, bio, userName }) =>
      databaseservices.editProfile({ userId, bio, userName }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
};
