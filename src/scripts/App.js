import React from 'react';
import { Input, Row, Col, Form, Select, Checkbox, Button, Icon, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import AceEditor from './components/AceEditor/AceEditor.js';
import _ from 'underscore';
import { connect } from 'react-redux';
import Model from './model.js';
import SchemaObject from './components/SchemaComponents/SchemaJson.js';
import PropTypes from 'prop-types';

class jsonSchema extends React.Component {
  constructor(props) {
    super(props);
  }

  static childContextTypes = {
    changeNameAction: PropTypes.func,
    changeValueAction: PropTypes.func,
    enableRequireAction: PropTypes.func,
    addValueAction: PropTypes.func,
    deleteItemAction: PropTypes.func
  };

  getChildContext() {
    return {
      changeNameAction: this.props.changeNameAction,
      changeValueAction: this.props.changeValueAction,
      enableRequireAction: this.props.enableRequireAction,
      addValueAction: this.props.addValueAction,
      deleteItemAction: this.props.deleteItemAction
    };
  }

  componentDidMount() {}

  onChange = (value, item, index) => {
    console.log(value, item, index);
  };

  handleSubmit = e => {};

  getValue = () => {
    console.log(this.refs.object.export());
    return this.export();
  };

  handleParams = e => {
    // 将数据map 到store中
    this.props.changeEditorSchemaAction(e.jsonData);
    // let value = JSON.parse(e.target.value)
    // this.props.changeEditorSchemaAction(value);
  };

  render() {
    return (
      <Row>
        <Col span={8}>
          <AceEditor
            className="pretty-editor"
            mode="json"
            data={JSON.stringify(this.props.p, null, 2)}
            onChange={this.handleParams}
          />
        </Col>
        <Col span={16} className="wrapper">
          
          <SchemaObject
            onChange={this.onChange}
            prefix={'properties'}
            data={this.props.p}
            onExport={this.export}
          />
          <Button onClick={this.getValue}>导出</Button>
        </Col>
      </Row>
    );
  }
}

export default connect(
  state => ({
    p: state.schema.data
  }),
  {
    changeEditorSchemaAction: Model.schema.changeEditorSchemaAction,
    changeNameAction: Model.schema.changeNameAction,
    changeValueAction: Model.schema.changeValueAction,
    enableRequireAction: Model.schema.enableRequireAction,
    addValueAction: Model.schema.addValueAction,
    deleteItemAction: Model.schema.deleteItemAction
  }
)(jsonSchema);
