import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1 className="error-title">应用程序出错了</h1>
          <p className="error-message">
            {this.state.error?.message || '发生了未知错误'}
          </p>
          <button 
            className="error-button"
            onClick={() => window.location.reload()}
          >
            重新加载页面
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}