import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { DragCategories } from '../../api/dragCategories.js';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';
import Create from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import {grey400, grey800} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
// template component - represents a single todo item
const style = {
  zIndex: '1000',
  padding: '15px 15px',
  display: 'inline-block',
  width: '350px',
  maxHeight: '258px',
  position: 'relative',
};
const deleteStyle = {
  position: 'absolute',
  right: '10px',
  top: '12px',
  cursor: 'pointer'
}
const deleteStyleView = {
  position: 'absolute',
  right: '0px',
  top: '-10px',
  cursor: 'pointer'
}
const editStyleView = {
  position: 'absolute',
  right: '25px',
  top: '-10px',
  cursor: 'pointer'
}
export default class dragCategory extends Component {
  constructor(props) {
    super(props);

  }
  deleteThisDragCategory(event) {
    event.preventDefault();
  }
  editThisDragCategory(event) {
    event.preventDefault();
  }
  renderDragCategoryItems(){

    return this.props.dragCategoryItems.map((dragCategoryItem) => (
      <li key={dragCategoryItem._id}>{dragCategoryItem.name} - ({dragCategoryItem.type})</li>
    ));
  }
  render() {
    return (
      <Paper zDepth={1} style={style}>
        <section className="view">
          <IconButton tooltip="Delete Column" style={deleteStyleView} onClick={this.deleteThisDragCategory.bind(this)}>
            <Delete color={grey400} hoverColor={grey800} />
          </IconButton>
          <IconButton tooltip="Edit Column" style={editStyleView} onClick={this.editThisDragCategory.bind(this)}>
            <Create color={grey400} hoverColor={grey800} />
          </IconButton>
          <div>{this.props.dragCategory.name}</div>
          <ul>{this.renderDragCategoryItems()}</ul>
        </section>
      </Paper>
    );
  }
}
