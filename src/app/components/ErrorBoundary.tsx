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
            className="rounded-2xl border border-danger/30 bg-white px-5 py-4 text-ink"
            role="alert"
          >
            <strong className="mb-1 block font-semibold text-danger">
              The form could not load
            </strong>
            <span className="text-sm text-ink/70">
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
