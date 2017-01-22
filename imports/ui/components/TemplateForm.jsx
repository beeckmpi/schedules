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
    Meteor.call('templates.update', this.props.template._id, template);
  }
  handleChangeSelectTemplateRows(event, index, value) {
    this.setState({templateRows: value});
    template = {templateRows: value};
    Meteor.call('templates.update', this.props.template._id, template);
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
            <SelectField floatingLabelText="Show Rows" style={{width: '100%'}} id="templateRows" value={this.state.templateRows} onChange={this.handleChangeSelectTemplateRows.bind(this)} >
              <MenuItem value={5} primaryText="5" />
              <MenuItem value={10} primaryText="10" />
              <MenuItem value={15} primaryText="15" />
              <MenuItem value={20} primaryText="20" />
              <MenuItem value={40} primaryText="40" />
             </SelectField>
        </div>
      </section>
    );
  }
}
