import React from 'react';
import { browserHistory } from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
  },
};

const handleGoto = (path) => {
  console.log('test handleGoto path: ', path);
  browserHistory.push(path);
};

const GridListComponent = ({ rubrics }) => <div style={styles.root}>
  <GridList
    cols={2}
    cellHeight={200}
    padding={1}
    style={styles.gridList}>
    {rubrics.map((rubric) => <GridTile
        key={rubric.id}
        title={rubric.name}
      >
        <img src={rubric.image} onTouchTap={() => handleGoto(rubric.url)}/>
      </GridTile>
    )}
  </GridList>
</div>;
GridListComponent.propTypes = {
  rubrics: React.PropTypes.array,
};


export default GridListComponent;
