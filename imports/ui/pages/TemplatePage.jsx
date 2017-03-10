// react imports
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { ReactDOM, render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Store from '../../store/store';

import { Columns } from '../../api/columns.js';
import { Templates } from '../../api/templates.js';
import { DragCategories } from '../../api/dragCategories.js';
import { DragCategoryItems } from '../../api/dragCategoryItems.js';
// imports -> ui imports
import Column from '../components/Column';
import ColumnHeader from '../components/ColumnHeader';
import DragCategory from '../components/DragCategory';
import DragCategoryItem from '../components/DragCategoryItem';
import Loading from '../components/loading';
import TemplateForm from '../components/TemplateForm'
import TemplateTable from '../components/templateTable';

import updateTemplate from '../../actions/updateTemplate';
import updateColumn from '../../actions/addColumn';

// material-ui imports
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey50, grey400, grey800} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import Slider from 'material-ui/Slider';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

const style = {
  margin: '12px 12px 12px 0px',
};
const style2 = {
  display: 'inline-block',
};
const TabStyle = {
  padding: "15px 15px",
  display: 'inline-block',
};
const paperTableStyle = {
  minWidth: '50%',
  maxWidth: '70%',
  marginBottom: '20px'
}
const tableStyle = {
  width: '100%',

}
export default class TemplatePage extends Component {
  constructor(props) {
    super(props);

    this.props.docked= false;
    this.props.open = false;
    this.state = {
      open: false,
      tableClass: "templateTableHeader",
      editorClass: "sidebar-editor",
      openDialog: false,
      categoryTitle: '',
      autoFocus: '',
      dragCategoryItems: []
    };
    Store.dispatch({type: 'HIDE_DOCK'});
  }
  componentWillMount(){
    setTimeout(this.setState({'tableClass': 'templateTableHeader ready', 'editorClass': 'sidebar-editor ready'}), 5000);
  }
  handleClick () {
    this.setState({open: !this.state.open});
  }
  handleClose (event) {
    event.preventDefault();
    this.setState({openDialog: false});
  }
  handleChange(event, index, value) {
    this.setState({categoryTitle: event.target.value});
  }
  addColumn(event){
    event.preventDefault();
    Columns.insert({
      createdAt: new Date(), // current time
      columnTitle: '',
      columnType: 'draggable',
      columnType: '',
      templateId: this.props.templateId,
      saved: false
    });
  }
  addDragCategory(event){
    event.preventDefault();
    this.setState({openDialog: true, autoFocus: "autoFocus"});
  }
  renderDragCategories() {
    const dragCategoryItems = this.props.dragCategoryItems;
    return this.props.dragCategories.map((dragCategory) => (
      <DragCategory key={dragCategory._id} dragCategory={dragCategory} dragCategoryItems={dragCategoryItems}/>
    ));
  }
  onDelete(item) {
    const DragCategoryItem = this.state.dragCategoryItems;
    var index = DragCategoryItem.indexOf(item);
    DragCategoryItem.splice(index, 1);
    this.setState({dragCategoryItems: DragCategoryItem});
  }
  renderDragCategoryItems (){
    return this.state.dragCategoryItems.map((dragCategoryItem) => (
      <DragCategoryItem key={dragCategoryItem._id} item={dragCategoryItem} onDelete={(item) => this.onDelete(item)} />
    ));
  }
  addData(){
    const DragCategoryItem = this.state.dragCategoryItems;
    var timeInMs = Date.now();
    var order = Object.keys(DragCategoryItem).length;
    DragCategoryItem.push({_id: 'new_'+timeInMs, templateId: this.props.templateId, type:'', name:'', required:true, visible: false, order: order});
    this.setState({dragCategoryItems: DragCategoryItem});
  }
  saveCategory() {
    if(this.state.categoryTitle!=''){
      DragCategories.insert({name: this.state.categoryTitle, templateId: this.props.templateId, createdAt: new Date()});
      const category = this.state.categoryTitle;
      this.state.dragCategoryItems.map(function(dragCategory){
        dragCategory['category']= category;
        DragCategoryItems.insert(dragCategory);
      });
      this.setState({openDialog: false});
    }

  }
  renderColumns() {
    var zIndex = 1000;
    var columns = this.props.columns.map((column) => {
      zIndex = zIndex-1;
      return <Column key={column._id} zIndex={zIndex} column={column} dragCategories={this.props.dragCategories} dragCategoryItems={this.props.dragCategoryItems} />
    });
    return columns;
  }
  renderTemplateForm() {
    return this.props.templates.map((template) => (
      <TemplateForm key={template._id} template={template} />
    ));
  }
  renderTemplateTable () {
    return this.props.templates.map((template) => (
      <TemplateTable key={this.props.templateId} template={template} columns={this.props.columns} columnCounter={this.props.columnCounter} />
    ));
  }
  render() {
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose.bind(this)}
        />,
        <RaisedButton
          label="Save Category"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.saveCategory.bind(this)}
        />,
    ];
    return (
      <div className="container" style={{marginLeft:"50px"}}>
        <div className={this.state.editorClass}>
          <Paper zDepth={3} style={style2} >
              <Tabs >
                <Tab label="Table">
                  {this.renderTemplateForm()}
                </Tab>
                <Tab label="Columns" >
                  <section style={{padding: '4px 15px 15px 15px'}}>
                    <div>
                      <RaisedButton onClick={this.addColumn.bind(this)} primary={true} label="Add Column" style={style} />
                    </div>
                    <div>{this.renderColumns()}</div>
                  </section>
                </Tab>
                <Tab label="Categories" >
                  <section style={{padding: '4px 15px 15px 15px'}}>
                  <h5>Drag Categories</h5>
                    <div className="seporator">
                      <RaisedButton label="Add drag category" onClick={this.addDragCategory.bind(this)}  secondary={true}/>
                    </div>
                    {this.renderDragCategories()}
                  </section>
                </Tab>
              </Tabs>
            </Paper>
        </div>
        <div className={this.state.tableClass}>
          {this.renderTemplateTable()}
        </div>
        <Dialog title="Drag Category" actions={actions} modal={false} open={this.state.openDialog} onRequestClose={this.handleClose} autoScrollBodyContent={true}>
          <div  style={{minHeight:"500px"}}>
            <div className="formInput input-field">
              <TextField floatingLabelText="Category Title" className="catName"  id={"categoryTitle"} value={this.state.categoryTitle} onChange={this.handleChange.bind(this)} />
            </div>
            <div className="categories">
              {this.renderDragCategoryItems()}
            </div>
            <div className="formInput inline">
              <RaisedButton primary={true} label="Add data To category" onClick={this.addData.bind(this)} />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
TemplatePage.propTypes = {
  columns: PropTypes.array.isRequired,
  dragCategories:  PropTypes.array.isRequired,
  dragCategoryItems:  PropTypes.array.isRequired,
  columnCounter: PropTypes.number.isRequired,
  templateId: PropTypes.string.isRequired,
  templates: PropTypes.array.isRequired
};
