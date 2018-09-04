import React, { Component } from 'react';
import { BarLoader } from 'react-css-loaders';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            isLoading: false,
            error: null,
        };
    }

    componentWillMount() {
        const season = 2018;
        const teamsApi = `https://data.nba.net/data/10s/prod/v1/${season}/teams.json`;

        this.setState({ isLoading: true });

        fetch(teamsApi)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong ....');
                }
            })
            .then(data => this.setState({ teams: data.league.standard, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { teams, isLoading, error } = this.state;

        if (error) return <p>{error.message}</p>;

        if (isLoading) return <BarLoader />;

        let nbaTeams = teams.filter(team => {
            return team.isNBAFranchise;
        });

        return (
            <div className="container">
                <div className="row">
                    {nbaTeams.map((team, i) =>
                        <div key={i} className="col-lg-4 col-md-4 col-sm-6">
                            <div className="card sm-top-margin">
                                <img className="card-img-top"
                                    src={`https://www.nba.com/assets/logos/teams/primary/web/${team.tricode}.svg`} alt={team.fullName} />
                                <div className="card-body">
                                    <h4 className="text-center">Division: <b>{team.divName}</b></h4>
                                    <h5 className="card-title text-center"><b>{team.nickname}</b></h5>
                                    <div className="text-center">
                                        <Link to={`/team/players/${team.teamId}`} className="btn btn-success" >{team.fullName}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Teams;