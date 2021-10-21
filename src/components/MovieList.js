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
  const { categories, visibleList } = useSelector(selectMovies);
  const [maxSize, setMaxSize] = useState(12);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const changePage = (num) => {
    let pageMax = Math.ceil(visibleList.length / maxSize);
    if (page + num > 0 && page + num <= pageMax) setPage((prev) => prev + num);
  };

  const updateMaxSize = (val) => {
    let num = val + maxSize
    if(num > 12 || num < 4) return
    if (visibleList.slice((page - 1) * num, num * page).length !== 0) {
      return setMaxSize(num);
    }
  };

  useEffect(() => {
    dispatch(setInitialMovies());
  }, [dispatch]);

  return (
    <div className={styles.movieListWrapper}>
      <div className={styles.optionWrapper}>
        {
          <Select
            className={styles.multiSelect}
            isMulti
            options={categories}
            onChange={(e) => dispatch(filter(e))}
          />
        }
        <button
          onClick={() => dispatch(setInitialMovies())}
          className={styles.button}
        >
          Reset movies
        </button>
        <div className={styles.pagination}>
          <i onClick={() => changePage(-1)}>{"<<"}</i>
          <p>{page}</p>
          <i onClick={() => changePage(1)}>{">>"}</i>
          <button className={styles.button} onClick={() => updateMaxSize(-4)}>-</button>
          <p className={styles.maxSize} >{maxSize}</p>
          <button className={styles.button} onClick={() => updateMaxSize(4)}>+</button>
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
