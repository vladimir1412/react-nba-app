import React, { Component } from 'react';
import { BarLoader } from 'react-css-loaders';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './PlayersLists.css'

class PlayersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [],
            teams: [],
            season: "2018",
            isLoading: false,
            error: false
        };
        this.goToPlayerPage = this.goToPlayerPage.bind(this);
        this.displayTeamLogo = this.displayTeamLogo.bind(this);
        this.changeSeason = this.changeSeason.bind(this);
        this.addTeamInfoToPlayer = this.addTeamInfoToPlayer.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(nextProps, nextState) {
        if (this.state.season !== nextState.season) {
            this.setState({ players: [] });
            this.getData();
        }
    }

    getData() {
        const season = this.state.season;
        const players = fetch(`http://data.nba.net/data/10s/prod/v1/${season}/players.json`).then(response => {
            return response.json()
        });
        const teams = fetch(`http://data.nba.net/data/10s/prod/v1/${season}/teams.json`).then(response => {
            return response.json()
        });
        let combinedData = { "players": {}, "teams": {} };
        const consolidatedPromise = Promise.all([players, teams]);

        this.setState({ isLoading: true });

        consolidatedPromise.then(values => {
            combinedData["players"] = values[0].league.standard;
            combinedData["teams"] = values[1].league.standard;
            return this.setState({ players: combinedData["players"], teams: combinedData["teams"], isLoading: false });
        });
    };

    goToPlayerPage(playerId) {
        return (<Link to={`/player/${playerId}`}>Player profile</Link>)
    }

    displayTeamLogo(teamName) {
        return (
            <img src={`https://www.nba.com/assets/logos/teams/primary/web/${teamName}.svg`}
                alt={teamName}></img>
        )
    }

    displayPlayersPicture(playerId) {
        const imageSize = {
            height: '150px',
            width: '160px'
        }
        return (
            <img style={imageSize}
                src={`http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`}
                alt={playerId}></img>
        )
    }

    addTeamInfoToPlayer(teams, players) {
        return teams.filter(team => {
            return players.filter(player => {
                if (player.teamId === team.teamId) {
                    player["teamName"] = team.fullName;
                    player["tricode"] = team.tricode;
                }
                return player;
            })
        })
    }

    changeSeason(event) {
        let year = event.target.value;
        this.setState({ season: year });
    }

    render() {
        const { players, teams, isLoading, error, season } = this.state;

        if (error) return <p>{error.message}</p>;

        if (isLoading) return <BarLoader />;

        this.addTeamInfoToPlayer(teams, players);

        return (
            <div className="players-table sm-top-margin">
                <div className="season-selection col-xs-6 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                        <select className="form-control" value={season} onChange={this.changeSeason}>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                        </select>
                    </div>
                </div>

                <BootstrapTable data={players} pagination search>
                    <TableHeaderColumn dataField="personId" dataFormat={this.displayPlayersPicture}>Players Picture</TableHeaderColumn>
                    <TableHeaderColumn dataField="firstName">First Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="lastName">Last Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="teamName">Team</TableHeaderColumn>
                    <TableHeaderColumn dataField="tricode" dataFormat={this.displayTeamLogo}>Team Logo</TableHeaderColumn>
                    <TableHeaderColumn isKey dataField="personId" dataFormat={this.goToPlayerPage}>View Player</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default PlayersList;