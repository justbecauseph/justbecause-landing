import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            className="bg-rose-950/40 border border-rose-500/40 text-rose-200 px-5 py-4 rounded-xl"
            role="alert"
          >
            <strong className="font-semibold text-white block mb-1">
              Component failed to render
            </strong>
            <span className="text-sm text-rose-200/80">
              Refresh the page to reload the form, or email info@justbecause.ph directly.
            </span>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
