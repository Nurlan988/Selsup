import { Component } from 'react';
import ParamEditor from './components/ParamEditor';

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  numbers: number[];
}

class App extends Component {
  state = {
    params: [
      {
        id: 1,
        name: 'Назначение',
        type: 'string',
      },
      {
        id: 2,
        name: 'Длина',
        type: 'string',
      },
    ],
    model: {
      paramValues: [
        {
          paramId: 1,
          value: 'повседневное',
        },
        {
          paramId: 2,
          value: 'макси',
        },
      ],
      numbers: [42, 7], 
    },
  };

  onUpdateModel = (updatedModel: Model) => {
    this.setState({ model: updatedModel });
  };

  render() {
    const { params, model } = this.state;

    return (
      <div>
        <h1>Редактор товара</h1>
        <ParamEditor params={params} model={model} onUpdateModel={this.onUpdateModel} />
      </div>
    );
  }
}

export default App;