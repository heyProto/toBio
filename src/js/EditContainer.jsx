import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import BioCard from './Container.jsx';
import JSONSchemaForm from '../../lib/js/react-jsonschema-form';

export default class EditBioCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      dataJSON: {
        card_data: {},
        configs: {}
      },
      mode: "col7",
      loading: true,
      publishing: false,
      uiSchemaJSON: {},
      schemaJSON: undefined,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined
    }
    this.toggleMode = this.toggleMode.bind(this);
  }

  exportData() {
    let data = this.state.dataJSON;
    let getDataObj = {
      step: this.state.step,
      dataJSON: data.card_data,
      schemaJSON: this.state.schemaJSON,
      uiSchemaJSON: this.state.uiSchemaJSON,
      optionalConfigJSON: this.state.dataJSON.configs,
      optionalConfigSchemaJSON: this.state.optionalConfigSchemaJSON
    }
    getDataObj["name"] = getDataObj.dataJSON.data.name.substr(0,225); // Reduces the name to ensure the slug does not get too long
    return getDataObj;
  }

  componentDidMount() {
    if (typeof this.props.dataURL === "string"){
      axios.all([
        axios.get(this.props.dataURL),
        axios.get(this.props.schemaURL),
        axios.get(this.props.optionalConfigURL),
        axios.get(this.props.optionalConfigSchemaURL),
        axios.get(this.props.uiSchemaURL)
      ]).then(axios.spread((card, schema, opt_config, opt_config_schema, uiSchema) => {
          let stateVar;
          stateVar = {
            dataJSON: {
              card_data: card.data,
              configs: opt_config.data
            },
            schemaJSON: schema.data,
            uiSchemaJSON: uiSchema.data,
            optionalConfigJSON: opt_config.data,
            optionalConfigSchemaJSON: opt_config_schema.data
          }
          this.setState(stateVar);
        }))
    }
  }

  onChangeHandler({formData}) {
    switch (this.state.step) {
      case 1:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          dataJSON.card_data = formData;
          return {
            dataJSON: dataJSON
          }
        })
        break;
    }
  }

  onSubmitHandler({formData}) {
    switch(this.state.step) {
      case 1:
        if (typeof this.props.onPublishCallback === "function") {
          this.setState({ publishing: true });
          let publishCallback = this.props.onPublishCallback();
          publishCallback.then((message) => {
            this.setState({ publishing: false });
          });
        }
        break;
    }
  }

  renderSEO() {
    let data = this.state.dataJSON.card_data.data,
      seo_blockquote;
    seo_blockquote = `<blockquote>${data.designation ? `<p>${data.designation}</p>` : ""}${data.bio ? `<p>${data.bio}</p>` : ""}<p>${data.name}</p></blockquote>`;
    return seo_blockquote;
  }


  renderSchemaJSON() {
    switch(this.state.step){
      case 1:
        return this.state.schemaJSON;
        break;
      case 2:
        return this.state.optionalConfigSchemaJSON;
        break;
    }
  }

  renderFormData() {
    switch(this.state.step) {
      case 1:
        return this.state.dataJSON.card_data;
        break;
      case 2:
        return this.state.dataJSON.configs;
        break;
    }
  }

  showLinkText() {
    switch(this.state.step) {
      case 1:
        return '';
        break;
      case 2:
        return '< Back';
        break;
    }
  }

  showButtonText() {
    switch(this.state.step) {
      case 1:
        return 'Publish';
        break;
    }
  }

  onPrevHandler() {
    let prev_step = --this.state.step;
    this.setState({
      step: prev_step
    });
  }

  toggleMode(e) {
    let element = e.target.closest('a'),
      mode = element.getAttribute('data-mode');
    this.setState((prevState, props) => {
      let newMode;
      if (mode !== prevState.mode) {
        newMode = mode;
      } else {
        newMode = prevState.mode
      }
      return {
        mode: newMode
      }
    })
  }


  render() {
    if (this.state.schemaJSON === undefined) {
      return(<div>Loading</div>)
    } else {
      return (
        <div className="proto-container">
          <div className="ui grid form-layout">
            <div className="row">
              <div className="four wide column proto-card-form protograph-scroll-form">
                <div>
                  <div className="section-title-text">Fill the form</div>
                  <div className="ui label proto-pull-right">
                    toBio
                  </div>
                </div>
                <JSONSchemaForm
                  uiSchema={this.state.uiSchemaJSON}
                  schema={this.renderSchemaJSON()}
                  onSubmit={((e) => this.onSubmitHandler(e))}
                  onChange={((e) => this.onChangeHandler(e))}
                  formData={this.renderFormData()}
                  liveValidate={true}
                  >
                  <a id="protograph-prev-link" className={`${this.state.publishing ? 'protograph-disable' : ''}`} onClick={((e) => this.onPrevHandler(e))}>{this.showLinkText()} </a>
                  <button type="submit" className={`${this.state.publishing ? 'ui primary loading disabled button' : ''} default-button protograph-primary-button`}>{this.showButtonText()}</button>
                </JSONSchemaForm>
              </div>
              <div className="twelve wide column proto-card-preview proto-share-card-div">
                <div className="protograph-menu-container">
                  <div className="ui compact menu">
                    <a className={`item ${this.state.mode === 'col7' ? 'active' : ''}`}
                      data-mode='col7'
                      onClick={this.toggleMode}
                    >
                      7c
                    </a>
                    <a className={`item ${this.state.mode === 'col4' ? 'active' : ''}`}
                      data-mode='col4'
                      onClick={this.toggleMode}
                    >
                      4c
                    </a>
                    <a className={`item ${this.state.mode === 'col3' ? 'active' : ''}`}
                      data-mode='col3'
                      onClick={this.toggleMode}
                    >
                      3c
                    </a>
                    <a className={`item ${this.state.mode === 'col2' ? 'active' : ''}`}
                      data-mode='col2'
                      onClick={this.toggleMode}
                    >
                      2c
                    </a>
                  </div>
                </div>
                  <BioCard
                    mode={this.state.mode}
                    dataJSON={this.state.dataJSON}
                    optionalConfigJSON={this.state.optionalConfigJSON}
                  />                 
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}