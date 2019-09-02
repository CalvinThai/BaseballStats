import React from "react";
import {Link} from 'react-router-dom';
const divStyle ={
    textAlign: 'left',
    fontSize: '32px'
}

class Player extends React.Component{
    constructor(props){
        super(props);
        this.state={
            playerid: props.match.params['playerid'],
            playerinfo: [], //name,age,height,weight,
            name: null,
            stats: [],
            fieldingstats: [],
            hittingstats:[],
            pitchingstats:[],
            teamid: props.match.params['id'],
            loaded: false
        }
        this.getHittingKeys = this.getHittingKeys.bind(this);
        //console.log(this.state.playerid)
        
    }

    getHittingKeys = function(){
        let jsxkeys = []
        jsxkeys.push(<th>Year</th>)
        jsxkeys.push(<th>Team</th>)
        //console.log(Object.keys(this.state.hittingstats.splits[0].stat))
        for (const key of Object.keys(this.state.hittingstats.splits[0].stat)){
            //console.log(key)
            jsxkeys.push(<th key={key}>{key}</th>)
        }
        return (jsxkeys)
    }

    getHittingRows(i){
        let jsxvalues =[]

        if (this.state.hittingstats.splits[i].numTeams === undefined){ //need to do this for people with multiple teams
            jsxvalues.push(<td>{this.state.hittingstats.splits[i].season}</td>)
            jsxvalues.push(<td>{this.state.hittingstats.splits[i].team.name}</td>)
            for (const value of Object.values(this.state.hittingstats.splits[i].stat)){

                jsxvalues.push(<td>{value}</td>)
            }
            return (<tr>{jsxvalues}</tr>)
        }
        //jsxvalues.push(<td>{this.state.hittingstats.splits[i].team.name}</td>)

    }

    getHittingRowsWrapper(j){
        let jsxvalues = []

        for (let i = 0; i<j; i++){
            jsxvalues.push(this.getHittingRows(i))
        }
        return jsxvalues
    }

    getPitchingKeys = function(){
        let jsxkeys = []
        jsxkeys.push(<th>Year</th>)
        jsxkeys.push(<th>Team</th>)
        //console.log(Object.keys(this.state.hittingstats.splits[0].stat))
        for (const key of Object.keys(this.state.pitchingstats.splits[0].stat)){
            //console.log(key)
            jsxkeys.push(<th key={key}>{key}</th>)
        }
        return (jsxkeys)
    }

    getPitchingRows(i){
        let jsxvalues =[]

        if (this.state.pitchingstats.splits[i].numTeams === undefined){
            jsxvalues.push(<td>{this.state.pitchingstats.splits[i].season}</td>)
            jsxvalues.push(<td>{this.state.pitchingstats.splits[i].team.name}</td>)        
            for (const value of Object.values(this.state.pitchingstats.splits[i].stat)){
                jsxvalues.push(<td>{value}</td>)
            }
            return (<tr>{jsxvalues}</tr>)
        }

    }

    getPitchingRowsWrapper(j){
        let jsxvalues = []

        for (let i = 0; i<j; i++){
            jsxvalues.push(this.getPitchingRows(i))
        }
        return jsxvalues
    }

    
    

    componentDidMount(){
        let playerinfourl = "https://statsapi.mlb.com/api/v1/people/" + this.state.playerid
        let playerstatsurl = "https://statsapi.mlb.com/api/v1/people/" + this.state.playerid + "?hydrate=stats(group=[hitting,pitching,fielding],type=[yearByYear])"

        Promise.all([fetch(playerinfourl), fetch(playerstatsurl)])

            .then(([res1, res2]) =>{
                return Promise.all([res1.json(), res2.json()])
            })
            .then(([res1, res2]) => {
                
                var count = 0;
                //console.log(res2)
                for (var prop in res2['people']['0']['stats']){
                    count++;
                }
                let hittingstats=[]
                let pitchingstats=[]

                //console.log(count)
                for(let i = 0; i<count;i++){
                    //console.log(res2['people']['0']['stats'][i].group.displayName)
                    if (res2['people']['0']['stats'][i].group.displayName === "hitting") {
                        hittingstats = res2['people']['0']['stats'][i]
                    }
                    else if (res2['people']['0']['stats'][i].group.displayName === "pitching"){
                        pitchingstats = res2['people']['0']['stats'][i]
                    }
                }
                console.log("hitting stats",hittingstats)
                console.log("pitching stats",pitchingstats)
                console.log(res1)
                console.log(res1['people'][0].id)


                this.setState({
                    isLoaded:true,
                    playerinfo: res1['people']['0']['active'],
                    name: res1['people']['0']['fullName'],
                    age: res1['people']['0']['currentAge'],
                    height: res1['people']['0']['height'],
                    weight: res1['people']['0']['weight'],
                    stats: res2['people']['0']['stats'],
                    hittingstats: hittingstats,
                    pitchingstats: pitchingstats,
                    count: count,
                    id: res1['people'][0].id,
                    loaded: true
                });
                //console.log(Object.keys(this.state.hittingstats.splits[0].stat))


            });

        
    }

    goBack() {
        window.history.back();
      }
    
    

   render() {

    
    if(!this.state.loaded){
        return <div />
    }
    //https://securea.mlb.com/mlb/images/players/head_shot/665489.jpg
    let page = (<div>
        <h1>{this.state.name} </h1> &nbsp;&nbsp;&nbsp;&nbsp;
        <img src ={"https://securea.mlb.com/mlb/images/players/head_shot/" +this.state.id+".jpg"} width="128" height="128"></img>
    </div>)


    if (this.state.hittingstats.length === undefined && this.state.pitchingstats.length === 0){
        console.log(123213213)
        page = (
            <div>
                <h1>{this.state.name} </h1> &nbsp;&nbsp;&nbsp;&nbsp;
                <img src ={"https://securea.mlb.com/mlb/images/players/head_shot/" +this.state.id+".jpg"} width="213" height="320"></img>
                <table id="stats">
                    <tbody>
                    <tr>
                        {this.getHittingKeys()}
                    </tr>
                        {this.getHittingRowsWrapper(this.state.hittingstats.splits.length)}
        
                </tbody>
                </table>
            </div>
        )
    }

    else if (this.state.hittingstats.length === undefined && this.state.pitchingstats.length === undefined){
        page = (
            <div>
                <h1>{this.state.name} </h1> &nbsp;&nbsp;&nbsp;&nbsp;
                <img src ={"https://securea.mlb.com/mlb/images/players/head_shot/" +this.state.id+".jpg"} width="213" height="320"></img>
                <hr></hr>
                <br></br>

                Hitting Stats
                <br></br>

                <table id="stats">
                    <tbody>
                    <tr>
                        {this.getHittingKeys()}
                    </tr>
                        {this.getHittingRowsWrapper(this.state.hittingstats.splits.length)}
                    
                </tbody>
                </table>
                <br></br>
                <br></br>
                Pitching Stats
                <br></br>

                <table id="stats">
                    <tbody>
                        <tr>
                            {this.getPitchingKeys()}
                        </tr>
                            {this.getPitchingRowsWrapper(this.state.pitchingstats.splits.length)}
                    </tbody>
                </table>
            </div>
        )
    }
    else if(this.state.hittingstats.length === 0 && this.state.pitchingstats.length === undefined){ //pithced but never hit
        page = (            <div>
                <h1>{this.state.name} </h1> &nbsp;&nbsp;&nbsp;&nbsp;
                <img src ={"https://securea.mlb.com/mlb/images/players/head_shot/" +this.state.id+".jpg"} width="213" height="320"></img>
            <hr></hr>
            <br></br>
            Pitching Stats
            <br></br>

            <table id="stats">
                <tbody>
                    <tr>
                        {this.getPitchingKeys()}
                    </tr>
                        {this.getPitchingRowsWrapper(this.state.pitchingstats.splits.length)}
                </tbody>
            </table>
        </div>

        )
    }

    return (
        
        <div>
            <div style = {divStyle}>
                <Link to={{ pathname: '/team/' + this.state.teamid }}>Go Back</Link>
            </div>
            {page}            
        </div>
    
    );
}

}


export default Player