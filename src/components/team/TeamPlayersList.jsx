import React, { Component } from 'react';
import { BarLoader } from 'react-css-loaders';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class TeamPlayersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teamPlayers: [],
            isLoading: false,
            error: false
        }
    }

    componentWillMount() {
        const season = 2018;
        const playersApi = `http://data.nba.net/data/10s/prod/v1/${season}/players.json`;

        this.setState({ isLoading: true });

        fetch(playersApi)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong ....');
                }
            })
            .then(data => this.setState({ teamPlayers: data.league.standard, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }
    
    render() {
        const { teamPlayers, isLoading, error } = this.state;

        const players = teamPlayers.filter(player => {
            const teamId = this.props.match.params.teamId;
            return player.teamId === teamId;
        })

        if (error) return <p>{error.message}</p>;

        if (isLoading) return <BarLoader />;

        return (

            <div className="container">
                <div className="row">
                    {players.map(player =>
                        <div key={player} className="col-lg-4 col-md-4 col-sm-6">
                            <div className="card sm-top-margin">
                                <img className="card-img-top"
                                    src={`http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`} alt=""></img>
                                <div className="card-body">
                                    <h5 className="card-title">{player.firstName} {player.lastName}</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Jersey: <b>{player.jersey}</b></li>
                                    <li className="list-group-item">Position: <b>{player.pos}</b></li>
                                    <li className="list-group-item">
                                    <Link to={`/player/${player.personId}`} className="btn btn-success">Full Profile</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        );
    }
}

export default TeamPlayersList;