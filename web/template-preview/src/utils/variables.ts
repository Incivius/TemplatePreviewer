export function extractVariables(text: string): string[] {
    const regex = /{{\s*([^}]+)\s*}}/g;
  
    const variables: string[] = [];
    let match: RegExpExecArray | null;
  
    while ((match = regex.exec(text)) !== null) {
      variables.push(match[1].trim());
    }
  
    return variables;
  }

  