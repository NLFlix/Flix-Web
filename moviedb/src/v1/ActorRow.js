import React from 'react'

class ActorRow extends React.Component {
  render() {
    return (
      <div class="col-md-2">
        <img style={{paddingTop: "15px"}} alt="Poster" width="180" src = {this.props.actor.profile_path}/>
        <h5 style={{color:"white", fontSize:"14px", fontWeight:"900"}}>{this.props.actor.name}</h5>
      </div>
    )
  }
}

export default ActorRow