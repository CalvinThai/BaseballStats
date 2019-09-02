import React from "react";
import Roster from "./Roster";
import {Link} from 'react-router-dom';

const divStyle ={
    textAlign: 'left',
    fontSize: '32px'
}

class Team extends React.Component{
    constructor(props){
        super(props);
        this.state={
            teams: [],
            isLoaded: false
        }
        this.page = null;

    }

    componentDidMount(){
        fetch("https://statsapi.mlb.com/api/v1/teams?sportId=1")
        .then(res => res.json())
        .then(
            
            (team) => {
                console.log("team info", team)
                console.log("team info", team['teams']['0']['division'].name)
                let ALWest = []
                var dict = {};
                dict["American League West"] = []
                dict["American League East"] = []
                dict["American League Central"] = []
                dict["National League West"] = []
                dict["National League East"] = []
                dict["National League Central"] = []


                console.log(team['teams'][0])

                for (let i = 0; i<team['teams'].length; i++){
                    console.log(team['teams'][i]['division'].name)
                    dict[team['teams'][i]['division'].name].push(team['teams'][i]) 
                }
                console.log(Object.keys(dict))

                this.setState({
                    isLoaded:true,
                    teams: team['teams'],
                    leagueinfo: dict

                });
            }
        );
    }
    
    handleClick(e){ //e is the team id
        console.log(e);
        let teampage = null;

    }

render(){

    let items = []

    if (this.state.leagueinfo !== undefined){
        //console.log(this.state.leagueinfo)

        for (var key of Object.keys(this.state.leagueinfo)){
            let teams = []
            console.log(this.state.leagueinfo[key])
            console.log(this.state.leagueinfo[key].length)
            for (let i = 0; i<this.state.leagueinfo[key].length;i++){
                //console.log(item[0]['name'])
                console.log(this.state.leagueinfo[key][i].name)
                teams.push(this.state.leagueinfo[key][i])
            }
            console.log(teams)
            let teamss = (teams.map(team=> (
                <div key = {team.id}>
                    <Link to={{ pathname: '/team/' + team.id  }}>{team.name}</Link>
                </div>
                )))
            
            items.push(
                <div key={key}>
                    {key}
                    
                    <br></br>
                    &nbsp;
                    {teamss}
                    <br></br>

                </div>
            )
        }
    }
    return(
        items
    )
}
}


export default Team