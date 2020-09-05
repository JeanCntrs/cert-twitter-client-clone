import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import '../../assets/scss/components/pages/home.scss';

const Home = () => {
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingTweets, setLoadingTweets] = useState(false);

    return (
        <MainLayout layoutClass="home">
            <div className="home-title">
                <h2>Inicio</h2>
            </div>
            {/* {tweets && <ListTweets tweets={tweets} />} */}
            <Button /* onClick={moreData} */ className="load-more">
                {!loadingTweets
                    ? (loadingTweets !== 0 ? 'Más tweets' : 'No hay más tweets')
                    : (<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />)
                }
            </Button>
        </MainLayout>
    );
}

export default Home;