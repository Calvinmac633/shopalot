import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FAVORITE, LOADING, UPDATE_FAVORITES } from "../../utils/actions";

const FavoritesList = () => {
  const [state, dispatch] = useStoreContext();

  const getFavorites = () => {
    dispatch({ type: LOADING });
    dispatch({ type: UPDATE_FAVORITES });
  };

  // const removeFromFavorites = id => {
  //   dispatch({
  //     type: REMOVE_FAVORITE,
  //     _id: id
  //   });
  // };

  useEffect(() => {
    getFavorites();
  }, []);


  return (
    <div>

      {/* ------------------------------------------------------------------------- */}
      {/* Work on generating favorites list from an API call, somehow involving state and reducer */}
      {/* ------------------------------------------------------------------------- */}

      {state.favorites.length ?
        console.log("THIS IS FROM FAVORITES LIST (conditional)", state.favorites)
          (<p>its workingggg</p>) :
        <p>THIS AINT WERKIN</p>}
      {console.log("THIS IS FROM FAVORITES LIST", state.favorites)}
    </div>
  );
};

export default FavoritesList;
