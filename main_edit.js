import React from 'react';
import ReactDOM from 'react-dom';
import EditBioCard from './src/js/EditContainer.jsx';

ProtoGraph.Card.toBio.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toBio.prototype.renderSEO = function (data) {
  this.renderMode = 'SEO';
  return this.containerInstance.renderSEO();
}

ProtoGraph.Card.toBio.prototype.renderEdit = function (onPublishCallback) {
  this.mode = 'edit';
  this.onPublishCallback = onPublishCallback;
  ReactDOM.render(
    <EditBioCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      uiSchemaURL={this.options.ui_schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}