import React from 'react';
import FullUrl from './full-url.js';

const {func, string, object} = React.PropTypes;

export default class Request extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.request.id !== nextProps.request.id ||
      this.done !== nextProps.request.done ||
      this.props.className !== nextProps.className;
  }

  _getLabels(request) {

    const {labels} = this.props.config;
    const url = request.fullUrl();

    let labelElements = [];

    if (request.mapped) {
      labelElements.push(
        <span className="label mapped" key="mapped">
          <i className="fa fa-warning"></i>
          mapped
        </span>
      );
    }

    labels.forEach(function(label, index) {
      if (label.regex.test(url)) {
        let classes = ['label'];
        classes.push(label.className);
        labelElements.push(
          <span className={classes.join(' ')} key={index}>
            {label.name}
          </span>
        );
      }
    });

    return labelElements;
  }

  render() {
    let {request, response, handleClick, className} = this.props;

    this.done = request.done;

    let took = <i className="fa fa-gear fa-spin"></i>;
    if (request.took) {
      took = request.took + 'ms';
    }

    return <div className={className + ' request'} onClick={handleClick}>
      <span className="method property">{request.method}</span>
        <span className="time property">
          {took}
        </span>
        <span className="status-code property">
          {response.statusCode}
        </span>
      <FullUrl request={request} isShortened={true}></FullUrl>

      <div className="labels">
        {this._getLabels(request)}
      </div>
    </div>;
  }
}

Request.propTypes = {
  config: object.isRequired,
  request: object.isRequired,
  response: object.isRequired,
  handleClick: func.isRequired,
  className: string.isRequired
};
