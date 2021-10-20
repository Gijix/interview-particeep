import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMovies,
  setInitialMovies,
  remove,
  filter,
} from "../movies/moviesReducer";
import Select from "react-select";

import Movie from "./Movie";

import styles from "./MovieList.module.css";

export default function MovieList() {
  const { categories, loading, visibleList, list } = useSelector(selectMovies);
  const [maxSize, setMaxSize] = useState(12);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const changePage = (num) => {
    let pageMax = Math.ceil(list.length / maxSize);
    if (page + num > 0 && page + num <= pageMax) setPage((prev) => prev + num);
  };
  const updateMaxSize = (e) => {
    let num = Number(e.target.value);
    if (visibleList.slice((page - 1) * num, num * page).length === 0) {
      e.preventDefault()
      e.target.value = maxSize
    } else setMaxSize(num);
  };
  useEffect(() => {
    dispatch(setInitialMovies());
  }, [dispatch]);
  return (
    <div className={styles.movieListWrapper}>
      <div className={styles.optionWrapper}>
        {!loading && (
          <Select
            className={styles.multiSelect}
            isMulti
            options={categories}
            onChange={(e) => dispatch(filter(e))}
          />
        )}
        <button
          onClick={() => dispatch(setInitialMovies())}
          className={styles.remove}
        >
          Reset movies
        </button>
        <div className={styles.pagination}>
          <i onClick={() => changePage(-1)}>{"<<"}</i>
          <p>{page}</p>
          <i onClick={() => changePage(1)}>{">>"}</i>
          <input
            onKeyDown={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            onClick={(e) => e.preventDefault()}
            type="number"
            defaultValue="12"
            step="4"
            min="4"
            max="12"
            onChange={(e) => updateMaxSize(e)}
          />
        </div>
      </div>
      <div className={styles.movieWrapper}>
        {visibleList
          .slice((page - 1) * maxSize, maxSize * page)
          .map((movie) => (
            <Movie
              remove={() => dispatch(remove(movie))}
              movieInfos={movie}
              key={movie.id}
            />
          ))}
      </div>
    </div>
  );
}
