import { Component } from 'react';

// Composant de gestion d'erreurs pour toute l'application
// Capture les erreurs dans les composants enfants et affiche une UI de repli
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  // Méthode statique qui capture l'erreur et met à jour l'état
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Méthode de cycle de vie appelée après qu'une erreur a été levée
  // Permet de journaliser l'erreur et de stocker des informations supplémentaires
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    // Si une erreur a été détectée, affiche l'interface de secours
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>The application encountered an unexpected error. Please try refreshing the page.</p>
          <details>
            <summary>Error Details</summary>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p>Component Stack:</p>
            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
          </details>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }

    // Si tout va bien, rendre les enfants normalement
    return this.props.children;
  }
}

export default ErrorBoundary;