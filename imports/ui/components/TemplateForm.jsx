import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import RaisedButton from 'material-ui/RaisedButton';
import { Templates } from '../../api/templates.js';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';
import Create from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import {grey400, grey800} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// template component - represents a single todo item
export default class TemplateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateTitle: this.props.template.templateTitle,
      templateTableHeader: this.props.template.templateTableHeader,
      templateType: this.props.template.templateType,
      templateRows: this.props.template.templateRows,
    };
  }
  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
    template = {[event.target.id]: event.target.value};
    Meteor.call('templates.update', this.props.template._id, template);
  }
  handleChangeSelectTemplateType(event, index, value) {
    this.setState({templateType: value});
    template = {templateType: value};
    switch (value) {
      case 'Hour':
        this.setState({templateRows: 24});
        template = {templateType: value, templateRows: 24};
        break;
      case 'Weeknr':
        this.setState({templateRows: moment().isoWeeksInYear()});
        template = {templateType: value, templateRows: moment().isoWeeksInYear()};
      break;
    }
    Meteor.call('templates.update', this.props.template._id, template);
  }
  handleChangeSelectTemplateRows(event, index, value) {
    this.setState({templateRows: value});
    template = {templateRows: value};
    Meteor.call('templates.update', this.props.template._id, template);
  }
  renderTemplateRows(event){
    var menuItems = "";
    const items = [];
    switch (this.state.templateType){
      case 'Hour':
        items.push(<MenuItem key={12} value={12} primaryText="12" />);
        items.push(<MenuItem key={24} value={24} primaryText="24" />);
      break;
      case 'Weeknr':
        for(x=1; x<=moment().isoWeeksInYear(); x++){
          items.push(<MenuItem key={x} value={x} primaryText={x} />);
        }
        break;
      default:
      for(x=0; x<=50; x=x+5){
        if (x==0) {
          x = 1;
        }
        items.push(<MenuItem key={x} value={x} primaryText={x} />);
        if (x==1) {
          x = 0;
        }
      }
    }
    return items;
  }
  render() {
    return (
      <section style={{padding: '4px 15px 15px 15px'}}>
        <div>
          <TextField floatingLabelText="Template title" style={{width: '100%', fontSize: 'large'}} id={'templateTitle'} value={this.state.templateTitle} onChange={this.handleChange.bind(this)} />
        </div>
        <div>
          <TextField floatingLabelText="Table Header Title" style={{width: '100%'}} id={'templateTableHeader'} value={this.state.templateTableHeader} onChange={this.handleChange.bind(this)} />
        </div>
        <div>
          <SelectField floatingLabelText="Template Type" style={{width: '100%'}} value={this.state.templateType} id="templateType" onChange={this.handleChangeSelectTemplateType.bind(this)} >
            <MenuItem value={"Nr."} primaryText="Numeric" />
            <MenuItem value={"Hour"} primaryText="Hourly" />
            <MenuItem value={"Day"} primaryText="Daily" />
            <MenuItem value={"Weeknr"} primaryText="Weekly" />
            <MenuItem value={"Month"} primaryText="monthly" />
            <MenuItem value={"Custom"} primaryText="Custom (select amount of rows)" />
           </SelectField>
        </div>
        <div>
          <SelectField floatingLabelText="Show Rows (in example)" style={{width: '100%'}} id="templateRows" value={this.state.templateRows} onChange={this.handleChangeSelectTemplateRows.bind(this)} >
            {this.renderTemplateRows()}
          </SelectField>
        </div>
      </section>
    );
  }
}
