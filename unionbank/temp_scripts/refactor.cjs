const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'components');

const colorMap = {
  "#fff": "var(--bg-card)",
  "#ffffff": "var(--bg-card)",
  "#111": "var(--text-main)",
  "#1a1a1a": "var(--text-main)",
  "#111111": "var(--text-main)",
  "#000": "var(--text-main)",
  "#f7f7f7": "var(--bg-main)",
  "#f9f8f6": "var(--bg-main)",
  "#f5f4f0": "var(--bg-main)",
  "rgba(0,0,0,0.4)": "var(--text-muted)",
  "rgba(0,0,0,0.45)": "var(--text-muted)",
  "rgba(0,0,0,0.5)": "var(--text-muted)",
  "rgba(0,0,0,0.55)": "var(--text-muted)",
  "#666": "var(--text-muted)",
  "#888": "var(--text-muted)",
  "#999": "var(--text-muted)",
  "#aaa": "var(--text-muted)",
  "rgba(0,0,0,0.05)": "var(--border-light)",
  "rgba(0,0,0,0.06)": "var(--border-light)",
  "rgba(0,0,0,0.07)": "var(--border-light)",
  "rgba(0,0,0,0.08)": "var(--border-light)",
  "rgba(0,0,0,0.1)": "var(--border-strong)",
  "rgba(0,0,0,0.12)": "var(--border-strong)",
  "rgba(0,0,0,0.15)": "var(--border-strong)",
  "#ddd": "var(--border-strong)",
  "#ccc": "var(--border-strong)",
  "#e5e5e5": "var(--border-light)",
  "#e8e8e8": "var(--border-light)",
  "#f0ece2": "var(--bg-alt)",
};

// Replace literal color strings with variables
function replaceColors(content) {
  let mapped = content;
  
  for (const [key, value] of Object.entries(colorMap)) {
    // Matches key regardless of whether it's wrapped in single or double quotes
    const regexKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    
    // Replace if it's inside quotes (e.g. "#fff" -> "var(--bg-card)")
    const regexWithQuotes = new RegExp('([\"\'])' + regexKey + '([\"\'])', 'g');
    mapped = mapped.replace(regexWithQuotes, '$1' + value + '$2');
    
    // Replace if it's unquoted (e.g. background: #fff; -> background: var(--bg-card);) inside CSS blocks
    const regexUnquoted = new RegExp('(:\\s*)' + regexKey + '([\\s;\\n])', 'g');
    mapped = mapped.replace(regexUnquoted, '$1' + value + '$2');
  }

  return mapped;
}

// Clean comments
function cleanComments(content) {
  // Remove lines that just have decorative dashes like `// ── Header ──` -> `// Header`
  let cleaned = content.replace(/\/\/\s*──+\s*([^─\n]+?)\s*──+/g, '// $1');
  // `// ──` -> `//`
  cleaned = cleaned.replace(/\/\/\s*──+/g, '//');
  return cleaned;
}

fs.readdirSync(componentsDir).forEach(file => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = replaceColors(content);
    content = cleanComments(content);

    // Minor fix for unquoted vars in string interpolation like `border: '1px solid rgba(0,0,0,0.12)'`
    content = content.replace(/1px solid rgba\(0,0,0,0\.1[0-9]?\)/g, '1px solid var(--border-strong)');
    content = content.replace(/1px solid rgba\(0,0,0,0\.0[0-9]?\)/g, '1px solid var(--border-light)');
    content = content.replace(/0\.5px solid rgba\(0,0,0,0\.[0-9]+\)/g, '1px solid var(--border-light)');

    fs.writeFileSync(filePath, content);
  }
});
console.log("Refactoring standard component colors and comments done.");
