import * as React from 'react'
import './Toggle.scss'
import FeatherSun from "../../assets/FeatherSun";
import FeatherMoon from "../../assets/FeatherMoon";

interface IProps {
  dark?: boolean
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

interface IState {
  hasFocus: boolean
}

export default class Toggle extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.state = {
      hasFocus: false,
    };
  }
  
  handleFocus() {
    this.setState({ hasFocus: true });
  }
  
  handleBlur() {
    this.setState({ hasFocus: false });
  }
  
  render(): React.ReactNode {
    return (
      <button role="button"
              aria-label="Toggle dark/light"
              onClick={ this.props.handleClick }
              onFocus={ this.handleFocus }
              onBlur={ this.handleBlur }
              className="toggle-theme">
        { this.props.dark ? <FeatherMoon/> : <FeatherSun/> }
      </button>
    )
  }
}
