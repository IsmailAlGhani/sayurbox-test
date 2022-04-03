import { gql } from "@apollo/client";

export const LOAD_MEDIA_LIST = gql`
  query ($page: Int! $perPage: Int! $search: String $genre: [String]) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (search: $search, genre_in: $genre) {
        id
        title {
          romaji
        }
        genres
        episodes
        season
        seasonYear
      }
    }
  }
`;

export const LOAD_DATA_GENRE = gql`
  query {
    GenreCollection
  }
`;

export const LOAD_MEDIA_DETAIL = gql`
  query ($id: Int) {
    Media (id: $id) {
      id
      title {
        romaji
      }
      genres
      episodes
      season
      seasonYear
    }
  }
`;