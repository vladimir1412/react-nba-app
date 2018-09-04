import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './team.css'

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            error: false
        }
        this.goBack = this.goBack.bind(this); 
    }
    componentWillMount() {
        const year = 2018;
        const playersApi = `http://data.nba.net/data/10s/prod/v1/${year}/players.json`;
        fetch(playersApi)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong ....');
                }
            })
            .then(data => this.setState({ players: data.league.standard }))
            .catch(error => this.setState({ error }));
    }
    
    goBack() {
        this.props.history.goBack();
    }

    render() {
        const { players, error } = this.state;
        const playerIdFromUrl = this.props.match.params.playerId;

        let playerProfile = players.filter(player => {
            return player.personId === playerIdFromUrl;
        });

        if (error) return <p>{error.message}</p>;

        return (
            <div className="container sm-top-margin">
                <div className="row">
                    <div className="col-lg-3 col-md-3"></div>
                    <div className="col-lg-6 col-md-6">
                        {playerProfile.map(player =>
                            <div>
                                <div className="card">
                                    <img className="card-img-top"
                                        src={`http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`} alt=""></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{player.firstName} {player.lastName}</h5>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Jersey: <b>{player.jersey}</b></li>
                                        <li className="list-group-item">Position: <b>{player.pos}</b></li>
                                        <li className="list-group-item">Height: <b>{player.heightMeters}</b></li>
                                        <li className="list-group-item">Kilograms: <b>{player.weightKilograms}</b></li>
                                        <li className="list-group-item">Date of Birth: <b>{player.dateOfBirthUTC}</b></li>
                                        <li className="list-group-item">Nba debut year: <b>{player.nbaDebutYear}</b></li>
                                        <li className="list-group-item">Pro years: <b>{player.yearsPro}</b></li>
                                        <li className="list-group-item">Last Affiliation: <b>{player.lastAffiliation}</b></li>
                                        <li className="list-group-item">Country: <b>{player.country}</b></li>
                                        <li className="list-group-item">
                                            <button type="button" class="btn btn-info btn-sm" onClick={this.goBack}>Go Back</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="player-margin-bottom"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;