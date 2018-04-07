import React from 'react';
import ReactDOM from 'react-dom';
import BioCard from './src/js/Container.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};

ProtoGraph.Card.toBio = function () {
  this.cardType = 'toBioCard';
}

ProtoGraph.Card.toBio.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toBio.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toBio.prototype.renderSevenCol= function (data) {
  this.mode = 'col7';
  this.render();
}

ProtoGraph.Card.toBio.prototype.renderFourCol= function (data) {
  this.mode = 'col4';
  this.render();
}

ProtoGraph.Card.toBio.prototype.renderThreeCol= function (data) {
  this.mode = 'col3';
  this.render();
}

ProtoGraph.Card.toBio.prototype.renderTwoCol= function (data) {
  this.mode = 'col2';
  this.render();
}

ProtoGraph.Card.toBio.prototype.render = function () {
  ReactDOM.render(
    <BioCard
      dataURL={this.options.data_url}
      selector={this.options.selector}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }} />,
    this.options.selector);
}