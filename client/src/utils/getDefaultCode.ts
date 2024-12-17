// src/utils/getDefaultCode.ts
export const getDefaultCode = (language: string): string => {
    switch (language) {
      case "javascript":
        return `// Start writing your JavaScript code here...`;
      case "python":
        return `# Start writing your Python code here...`;
      case "java":
        return `// Start writing your Java code here...`;
      case "typescript":
        return `// Start writing your TypeScript code here...`;
      case "html":
        return `<!-- Start writing your HTML code here... -->`;
      case "css":
        return `/* Start writing your CSS code here... */`;
      case "go":
        return `// Start writing your Go code here...`;
      case "ruby":
        return `# Start writing your Ruby code here...`;
      default:
        return `// Start writing your code here...`;
    }
  };
  