import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class toBioCard extends React.Component {
  constructor(props) {
    super(props)
    let stateVar = {
      fetchingData: true,
      dataJSON: {
        card_data: {},
        configs: {}
      },
      optionalConfigJSON: {},
    };

    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
    }

    if (this.props.optionalConfigJSON) {
      stateVar.optionalConfigJSON = this.props.optionalConfigJSON;
    }
    this.state = stateVar;
  }

  componentDidMount() {
    if (this.state.fetchingData){
      axios.all([axios.get(this.props.dataURL)])
        .then(axios.spread((card) => {
          this.setState({
            fetchingData: false,
            dataJSON: {
              card_data: card.data
            }
          });
        }));
    }
  }

  exportData() {
    return this.props.selector.getBoundingClientRect();
  }

  renderSevenCol(){
    if(this.state.fetchingData){
      return(
        <div>Loading</div>
      )
    }else{
      let name = this.state.dataJSON.card_data.data.name,
        full_designation = this.state.dataJSON.card_data.data.designation,
        image = this.state.dataJSON.card_data.data.image_url === '' ? 'default.png' : this.state.dataJSON.card_data.data.image_url,
        bio = this.state.dataJSON.card_data.data.bio,
        lin_img = this.state.dataJSON.card_data.data.linkedin_url,
        fb_img = this.state.dataJSON.card_data.data.facebook_url,
        tw_img = this.state.dataJSON.card_data.data.twitter_url,
        designation, show_tooltip;
        if (full_designation && full_designation.length > 65){
          designation = full_designation.substring(0, 62) + "..."
          show_tooltip = true
        } else {
          designation = full_designation;
          show_tooltip = false
        }
      return(
        <div className="col-7">
          <div className="bio-card">
            <div className="profile-image"><img src={image} height="60px"/></div>
            <div className="profile-info">
              <div className="name">{name}</div>
              <div className="designation" title={show_tooltip ? full_designation : undefined }>{designation}</div>
              <div className="social-share-icons">
                {(lin_img && lin_img !== '') ? <a href={lin_img} target="_blank"><img src="https://utils.pro.to/Assets/lin.png" height="12px"/></a> : ''}
                {(tw_img && tw_img !== '') ? <a href={tw_img} target="_blank"><img src="https://utils.pro.to/Assets/tw.png" height="12px"/></a> : ''}
                {(fb_img && fb_img !== '') ? <a href={fb_img} target="_blank"><img src="https://utils.pro.to/Assets/fb.png" height="12px"/></a> : ''}
              </div>
            </div>
            {bio && bio !== '' ? <div className="bio-text">{bio}</div> : ''}
          </div>
        </div>
      )
    }
  }

  renderFourCol(){
    if(this.state.fetchingData){
      return(
        <div>Loading</div>
      )
    }else{
      let name = this.state.dataJSON.card_data.data.name,
        full_designation = this.state.dataJSON.card_data.data.designation,
        image = this.state.dataJSON.card_data.data.image_url === '' ? 'default.png' : this.state.dataJSON.card_data.data.image_url,
        bio = this.state.dataJSON.card_data.data.bio,
        lin_img = this.state.dataJSON.card_data.data.linkedin_url,
        fb_img = this.state.dataJSON.card_data.data.facebook_url,
        tw_img = this.state.dataJSON.card_data.data.twitter_url,
        designation, show_tooltip;
        if (full_designation && full_designation.length > 65){
          designation = full_designation.substring(0, 62) + "..."
          show_tooltip = true
        } else {
          designation = full_designation;
          show_tooltip = false
        }
      return(
        <div className="col-4">
          <div className="bio-card">
            <div className="profile-image"><img src={image} height="60px"/></div>
            <div className="profile-info">
              <div className="name">{name}</div>
              <div className="designation" title={show_tooltip ? full_designation : undefined }>{designation}</div>
              <div className="social-share-icons">
               {(lin_img && lin_img !== '') ? <a href={lin_img} target="_blank"><img src="https://utils.pro.to/Assets/lin.png" height="12px"/></a> : ''}
                {(tw_img && tw_img !== '') ? <a href={tw_img} target="_blank"><img src="https://utils.pro.to/Assets/tw.png" height="12px"/></a> : ''}
                {(fb_img && fb_img !== '') ? <a href={fb_img} target="_blank"><img src="https://utils.pro.to/Assets/fb.png" height="12px"/></a> : ''}
              </div>
            </div>
            {bio !== '' ? <div className="bio-text">{bio}</div> : ''}
          </div>
        </div>
      )
    }
  }

  renderThreeCol(){
    if(this.state.fetchingData){
      return(
        <div>Loading</div>
      )
    }else{
      let name = this.state.dataJSON.card_data.data.name,
        full_designation = this.state.dataJSON.card_data.data.designation,
        image = this.state.dataJSON.card_data.data.image_url === '' ? 'default.png' : this.state.dataJSON.card_data.data.image_url,
        bio = this.state.dataJSON.card_data.data.bio,
        lin_img = this.state.dataJSON.card_data.data.linkedin_url,
        fb_img = this.state.dataJSON.card_data.data.facebook_url,
        tw_img = this.state.dataJSON.card_data.data.twitter_url,
        designation, show_tooltip;
        if (full_designation && full_designation.length > 50){
          designation = full_designation.substring(0, 47) + "..."
          show_tooltip = true
        } else {
          designation = full_designation;
          show_tooltip = false
        }
      return(
        <div className="col-3">
          <div className="bio-card">
            <div className="profile-image"><img src={image} height="60px"/></div>
            <div className="profile-info">
              <div className="name">{name}</div>
              <div className="designation" title={show_tooltip ? full_designation : undefined }>{designation}</div>
              <div className="social-share-icons">
                {(lin_img && lin_img !== '') ? <a href={lin_img} target="_blank"><img src="https://utils.pro.to/Assets/lin.png" height="12px"/></a> : ''}
                {(tw_img && tw_img !== '') ? <a href={tw_img} target="_blank"><img src="https://utils.pro.to/Assets/tw.png" height="12px"/></a> : ''}
                {(fb_img && fb_img !== '') ? <a href={fb_img} target="_blank"><img src="https://utils.pro.to/Assets/fb.png" height="12px"/></a> : ''}
              </div>
            </div>
            {bio !== '' ? <div className="bio-text">{bio}</div> : ''}
          </div>
        </div>
      )

    }
  }

  renderTwoCol(){
    if(this.state.fetchingData){
      return(
        <div>Loading</div>
      )
    }else{
      let name = this.state.dataJSON.card_data.data.name,
        full_designation = this.state.dataJSON.card_data.data.designation,
        image = this.state.dataJSON.card_data.data.image_url === '' ? 'default.png' : this.state.dataJSON.card_data.data.image_url,
        bio = this.state.dataJSON.card_data.data.bio,
        lin_img = this.state.dataJSON.card_data.data.linkedin_url,
        fb_img = this.state.dataJSON.card_data.data.facebook_url,
        tw_img = this.state.dataJSON.card_data.data.twitter_url,
        designation, show_tooltip;
        if (full_designation && full_designation.length > 48){
          designation = full_designation.substring(0, 45) + "..."
          show_tooltip = true
        } else {
          designation = full_designation;
          show_tooltip = false
        }
      return(
        <div className="col-2">
          <div className="bio-card">
            <div className="profile-image"><img src={image} height="60px"/></div>
            <div className="profile-info">
              <div className="name">{name}</div>
              <div className="designation" title={show_tooltip ? full_designation : undefined }>{designation}</div>
              <div className="social-share-icons">
                {(lin_img && lin_img !== '') ? <a href={lin_img} target="_blank"><img src="https://utils.pro.to/Assets/lin.png" height="12px"/></a> : ''}
                {(tw_img && tw_img !== '') ? <a href={tw_img} target="_blank"><img src="https://utils.pro.to/Assets/tw.png" height="12px"/></a> : ''}
                {(fb_img && fb_img !== '') ? <a href={fb_img} target="_blank"><img src="https://utils.pro.to/Assets/fb.png" height="12px"/></a> : ''}
              </div>
            </div>
            {bio !== '' ? <div className="bio-text">{bio}</div> : ''}
          </div>
        </div>
      )
    }
  }

  render() {
    switch(this.props.mode) {
      case 'col7':
        return this.renderSevenCol();
      case 'col4':
        return this.renderFourCol();
      case 'col3':
        return this.renderThreeCol();
      case 'col2':
        return this.renderTwoCol();
    }
  }
}