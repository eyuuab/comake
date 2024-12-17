// src/utils/codeExecutor.ts
import axios from 'axios';

// Define the structure for code execution response
export interface CodeExecutionResult {
  success: boolean;
  output: string;
  error?: string;
}

// Configuration for different language execution strategies
interface LanguageConfig {
  api?: string;
  sandbox?: 'client' | 'server';
  compilationRequired?: boolean;
}

const LANGUAGE_CONFIGS: Record<string, LanguageConfig> = {
  javascript: { 
    sandbox: 'client',
    api: '/api/execute/javascript'
  },
  typescript: { 
    compilationRequired: true,
    api: '/api/execute/typescript'
  },
  python: { 
    api: '/api/execute/python'
  },
  java: { 
    compilationRequired: true,
    api: '/api/execute/java'
  },
  cpp: { 
    compilationRequired: true,
    api: '/api/execute/cpp'
  },
  go: { 
    compilationRequired: true,
    api: '/api/execute/go'
  },
  ruby: { 
    api: '/api/execute/ruby'
  },
  rust: { 
    compilationRequired: true,
    api: '/api/execute/rust'
  }
};

// Client-side sandboxing for safe JavaScript/TypeScript execution
const clientSideExecute = (code: string, language: string): CodeExecutionResult => {
  try {
    // Create a new function context to isolate execution
    const execute = new Function('code', `
      try {
        const console = {
          log: (...args) => args.map(arg => JSON.stringify(arg)).join(' '),
          error: (...args) => args.map(arg => JSON.stringify(arg)).join(' ')
        };
        return String(eval(code));
      } catch (error) {
        return 'Error: ' + error.message;
      }
    `);

    const result = execute(code);
    return { 
      success: true, 
      output: result 
    };
  } catch (error) {
    return { 
      success: false, 
      output: '', 
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

// Server-side execution via API
const serverSideExecute = async (
  code: string, 
  language: string
): Promise<CodeExecutionResult> => {
  const config = LANGUAGE_CONFIGS[language];
  
  if (!config?.api) {
    return {
      success: false,
      output: '',
      error: `Execution not supported for ${language}`
    };
  }

  try {
    const response = await axios.post(config.api, { 
      code, 
      language 
    }, {
      timeout: 10000 // 10-second timeout
    });

    return {
      success: true,
      output: response.data.output || 'Code executed successfully'
    };
  } catch (error) {
    console.error('Execution error:', error);
    
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        output: '',
        error: error.response?.data?.error || error.message
      };
    }

    return {
      success: false,
      output: '',
      error: 'Unknown execution error'
    };
  }
};

// Main execution function
export const runCode = async (
  code: string, 
  language: string
): Promise<string> => {
  const config = LANGUAGE_CONFIGS[language] || {};

  // Validate code input
  if (!code.trim()) {
    return 'No code provided';
  }

  // Execute based on language configuration
  try {
    let result: CodeExecutionResult;

    if (config.sandbox === 'client') {
      result = clientSideExecute(code, language);
    } else {
      result = await serverSideExecute(code, language);
    }

    // Return output or error
    return result.success 
      ? result.output 
      : `Execution Error: ${result.error || 'Unknown error'}`;

  } catch (error) {
    console.error('Execution error:', error);
    return `Unexpected error: ${error instanceof Error ? error.message : String(error)}`;
  }
};

// Utility to get supported languages
export const getSupportedLanguages = () => {
  return Object.keys(LANGUAGE_CONFIGS);
};