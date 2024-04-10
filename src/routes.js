import allMovies from "./components/AllMovies.vue";
import browseMovies from "./components/BrowseMovies.vue";
import movieDetails from "./components/MovieDetails.vue";

export default [
  { path: "/", component: allMovies },
  { path: "/browse", component: browseMovies },
  { path: "/movie/:id", component: movieDetails },
];
