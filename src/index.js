import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import PlayersList from './components/playersList/PlayersList';
import Teams from './components/team/Teams';
import Player from './components/team/Player';
import Header from './components/navigation/Header';
import Footer from './components/footer/Footer';
import TeamPlayersList from './components/team/TeamPlayersList';


ReactDOM.render(
    <BrowserRouter>
        <div>
            <Header />
            <Route exact path="/" component={App} />
            <Route path="/teams" component={Teams} />
            <Route path="/team/players/:teamId" component={TeamPlayersList} />
            <Route path="/player/:playerId" component={Player} />
            <Route path="/players" component={PlayersList} />
            <Footer />
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
