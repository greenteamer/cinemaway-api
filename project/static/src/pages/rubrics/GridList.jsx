import React from 'react';
import { browserHistory } from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
    {rubrics.map((rubric, i) => <GridTile
        key={rubric.id}
        title={rubric.name}
        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        actionPosition="left"
        titlePosition="top"
        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        cols={i === 0 || i % 7 === 0 ? 2 : 1}
        rows={i === 0 || i % 7 === 0 ? 2 : 1}
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
