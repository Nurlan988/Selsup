import { Component } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  numbers: number[];
}

interface Props {
  params: Param[];
  model: Model;
  onUpdateModel: (updatedModel: Model) => void;
}

interface State {
  updatedModel: Model;
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);    

    this.state = {
      updatedModel: { ...props.model },
    };

  }

  updateParamValue = (paramId: number, value: string) => {
    const { updatedModel } = this.state;
    const updatedParamValues = [...updatedModel.paramValues];
    const paramIndex = updatedParamValues.findIndex(
      (param) => param.paramId === paramId
    );

    if (paramIndex !== -1) {
      updatedParamValues[paramIndex].value = value;
      this.setState({
        updatedModel: {
          ...updatedModel,
          paramValues: updatedParamValues,
        },
      });
    }
  };

  getModel = () => {
    return this.state.updatedModel;
  };

  updateNumberValue = (value: number, index: number) => {
    const { updatedModel } = this.state;
    const updatedNumbers = [...updatedModel.numbers];
    
    updatedNumbers[index] = value;
    this.setState({
      updatedModel: {
        ...updatedModel,
        numbers: updatedNumbers,
      },
    });
  };

  render() {
    const { params } = this.props;
    const { updatedModel } = this.state;
    

    return (
      <div>
        {params.map((param) => (
          <div key={param.id}>
            <label>{param.name}:</label>
            <input
              type="text"
              value={
                updatedModel.paramValues.find(
                  (paramValue) => paramValue.paramId === param.id
                )?.value || ''
              }
              onChange={(e) => this.updateParamValue(param.id, e.target.value)}
            />
          </div>
        ))}
        {updatedModel.numbers.length &&
          updatedModel.numbers.map((number, index) => (
            <div key={index}>
              <label>Number {index + 1}:</label>
              <input
                type="number"
                value={number}
                onChange={(e) =>
                  this.updateNumberValue(Number(e.target.value), index)
                }
              />
            </div>
          ))}
        <button onClick={() => this.props.onUpdateModel(this.getModel())}>
          Сохранить
        </button>
      </div>
    )
  }
}

export default ParamEditor;
