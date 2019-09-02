import React from "react";
import {Link} from 'react-router-dom';
import Team from './Team';

const divStyle ={
    textAlign: 'left',
    fontSize: '32px'
}


class Roster extends React.Component{

    constructor(props){
        super(props);
        this.state={
            teamid: props.teamid,
            isLoaded: false,
            roster: [],
            id: props.match.params['id']
        }
        
        this.page = null;
    }

    componentDidMount(){
        console.log(this.state.id)
        let url1 = "https://statsapi.mlb.com/api/v1/teams/" + this.state.id + "/roster"
        let url2 = "https://statsapi.mlb.com/api/v1/teams/" + this.state.id

        Promise.all([fetch(url1), fetch(url2)])
            .then(([res1, res2]) =>{
                return Promise.all([res1.json(), res2.json()])
            })
            .then(([res1, res2]) => {
                let imgurl = "https://www.mlbstatic.com/team-logos/"+ res2['teams'][0].id+ ".svg"
                this.setState({
                    isLoaded:true,
                    roster: res1['roster'],
                    name: res2['teams'][0].name,
                    imgurl: imgurl
                    
                })
            });
    }


    render(){

        console.log(this.state.roster)
        let rosterpage = 
        //console.log(player['person']['fullName'])
        (this.state.roster.map(player=> (
            <div key = {player['person']['id']}>
                <Link to={{ pathname: '/team/'+ this.state.id  + '/player/' + player['person']['id']}}>{player['person']['fullName']}</Link> &nbsp;
                {player['jerseyNumber']} &nbsp;
                {player['position']['abbreviation']}
            </div>
        )));
        return(
            <div>
                <div style = {divStyle}>
                    <Link to={{ pathname: '/'}}>Go Back</Link>
                </div> 
                <h1>{this.state.name}</h1>
                <img src ={this.state.imgurl} width="128" height="128"></img>
                {rosterpage}
            </div>
        )
    }
}

export default Roster