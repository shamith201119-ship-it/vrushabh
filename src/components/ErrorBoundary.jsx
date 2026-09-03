import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
          <h2 style={{ color: "#B3241F" }}>Render error</h2>
          <pre>{String(this.state.error && (this.state.error.stack || this.state.error))}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
