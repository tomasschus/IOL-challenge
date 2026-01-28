import type { ReactNode } from 'react'
import { Component } from 'react'
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-[var(--neutral-50)] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border-2 border-[var(--brand-100)]">
            <div className="flex justify-center mb-4">
              <div className="bg-[var(--error-50)] rounded-full p-4">
                <FiAlertCircle className="w-16 h-16 text-[var(--error-600)]" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[var(--neutral-900)] mb-2">
              Algo salió mal
            </h1>
            <p className="text-[var(--neutral-700)] mb-6">
              Ocurrió un error inesperado. Por favor, intenta recargar la
              página.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-[var(--neutral-500)] hover:text-[var(--neutral-700)] mb-2">
                  Detalles del error
                </summary>
                <pre className="text-xs bg-[var(--brand-50)] p-3 rounded overflow-auto max-h-40 text-[var(--error-600)] border border-[var(--brand-100)]">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--brand-500)] text-white rounded-lg hover:bg-[var(--brand-600)] transition-colors font-medium shadow-sm"
            >
              <FiRefreshCw className="w-5 h-5" />
              Intentar de nuevo
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
