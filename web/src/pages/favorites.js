import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
    useEffect( () => {
        document.title = 'Favorites - Notedly';
    });
    const { loading, error, data } = useQuery(GET_MY_FAVORITES);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>{`Error! ${error.message}`}</p>;

    if(data.me.favorites.length !== 0) {
        return <NoteFeed notes={data.me.favorites}/>
    } else {
        return <p >No favorites yet :( </p>;
    }
};

export default Favorites;