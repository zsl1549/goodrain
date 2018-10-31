import React, { Component, PureComponent} from 'react';

class Index extends PureComponent {
  render() {
    const data = this.props.data || [];
    return (
      <div className="column-data">
        {data.map(item => {
          return (
            <div className="column-data-item">
              {item.title !== void 0 && <div className="column-data-item-title">{item.title}</div>}
              {item.value !== void 0 && <div className="column-data-item-value">{item.value}</div>}
              {item.bottom !== void 0 && (
                <div className="column-data-item-bottom">{item.bottom}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Index;
