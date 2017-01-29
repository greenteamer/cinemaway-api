import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Checkbox from 'material-ui/Checkbox';

@observer
export default class RubricsSelector extends Component {
  static propTypes = {
    rubrics: React.PropTypes.object,
    uiStore: React.PropTypes.object,
    onCheck: React.PropTypes.func,
  }

  render() {
    const { rubrics, onCheck } = this.props;
    return <div>
      {rubrics.length &&
        rubrics.map(( r, key ) =>
          <Checkbox
            key={key}
            label={r.name}
            onCheck={onCheck}
          />
        )
      }
    </div>;
  }
}

