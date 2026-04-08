import './style.css';
import { frameworks } from './frameworks.js';

class PromptArchitect {
  constructor() {
    this.currentFramework = frameworks[0];
    this.formData = {};
    this.variables = {};
    
    // DOM Elements
    this.frameworkList = document.getElementById('framework-list');
    this.composerFields = document.getElementById('composer-fields');
    this.promptOutput = document.getElementById('prompt-output');
    this.frameworkName = document.getElementById('current-framework-name');
    this.copyBtn = document.getElementById('copy-btn');
    this.clearBtn = document.getElementById('clear-btn');
    this.exportBtn = document.getElementById('export-btn');
    this.importBtn = document.getElementById('import-btn');
    this.importInput = document.getElementById('import-input');
    this.variableInputs = document.getElementById('variable-inputs');
    this.variablesContainer = document.getElementById('variables-container');
    this.helpCard = document.getElementById('framework-help-card');
    this.helpText = document.getElementById('framework-help-text');
    this.helpBtn = document.getElementById('help-btn');

    this.init();
  }

  init() {
    this.renderFrameworkList();
    this.loadFromLocalStorage();
    this.renderFields();
    this.setupEventListeners();
    this.updatePrompt();
    this.initIcons();
  }

  initIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderFrameworkList() {
    this.frameworkList.innerHTML = frameworks.map(f => `
      <button class="nav-item ${f.id === this.currentFramework.id ? 'active' : ''}" data-id="${f.id}">
        <i data-lucide="${this.getFrameworkIcon(f.id)}"></i> ${f.name}
      </button>
    `).join('');
    
    this.frameworkList.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => this.switchFramework(btn.dataset.id));
    });
    this.initIcons();
  }

  getFrameworkIcon(id) {
    switch(id) {
      case 'co-star': return 'target';
      case 'risen': return 'layers';
      default: return 'settings';
    }
  }

  switchFramework(id) {
    const newFramework = frameworks.find(f => f.id === id);
    if (newFramework) {
      this.currentFramework = newFramework;
      this.renderFrameworkList();
      this.renderFields();
      this.updatePrompt();
      this.frameworkName.textContent = newFramework.name;
    }
  }

  renderFields() {
    this.composerFields.innerHTML = this.currentFramework.fields.map(field => `
      <div class="field-group">
        <label class="field-label">
          ${field.label}
          ${field.help ? `
            <div class="tooltip-container">
              <i data-lucide="help-circle" class="help-icon"></i>
              <span class="tooltip-text">${field.help}</span>
            </div>
          ` : ''}
        </label>
        <textarea 
          data-id="${field.id}" 
          placeholder="${field.placeholder}" 
          rows="3">${this.formData[field.id] || ''}</textarea>
      </div>
    `).join('');

    this.composerFields.querySelectorAll('textarea').forEach(ta => {
      ta.addEventListener('input', (e) => {
        this.formData[ta.dataset.id] = e.target.value;
        this.updatePrompt();
        this.saveToLocalStorage();
      });
    });

    // Update help text
    if (this.currentFramework.help) {
      this.helpCard.style.display = 'block';
      this.helpText.textContent = this.currentFramework.help;
    } else {
      this.helpCard.style.display = 'none';
    }

    this.initIcons();
  }

  updatePrompt() {
    let prompt = '';
    this.currentFramework.fields.forEach(field => {
      const val = this.formData[field.id];
      if (val && val.trim()) {
        prompt += `### ${field.label.toUpperCase()}\n${val.trim()}\n\n`;
      }
    });

    // Detect variables
    this.detectVariables(prompt);

    // Replace variables in preview
    let previewPrompt = prompt;
    Object.keys(this.variables).forEach(v => {
      const val = this.variables[v] || `{{${v}}}`;
      const regex = new RegExp(`{{${v}}}`, 'g');
      previewPrompt = previewPrompt.replace(regex, val);
    });

    if (previewPrompt.trim() === '') {
      this.promptOutput.innerHTML = '<span class="placeholder-text">Your structured prompt will appear here as you type...</span>';
    } else {
      this.promptOutput.textContent = previewPrompt.trim();
    }
  }

  detectVariables(text) {
    const regex = /{{(.*?)}}/g;
    const matches = [...text.matchAll(regex)];
    const newVars = {};
    matches.forEach(match => {
      const varName = match[1].trim();
      if (varName) newVars[varName] = this.variables[varName] || '';
    });

    this.variables = newVars;
    this.renderVariableInputs();
  }

  renderVariableInputs() {
    const varNames = Object.keys(this.variables);
    if (varNames.length === 0) {
      this.variablesContainer.style.display = 'none';
      return;
    }

    this.variablesContainer.style.display = 'block';
    this.variableInputs.innerHTML = varNames.map(v => `
      <div class="field-group">
        <label class="field-label">${v}</label>
        <input type="text" data-var="${v}" value="${this.variables[v]}" placeholder="Value for ${v}...">
      </div>
    `).join('');

    this.variableInputs.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', (e) => {
        this.variables[input.dataset.var] = e.target.value;
        this.updatePrompt();
        this.saveToLocalStorage();
      });
    });
  }

  setupEventListeners() {
    this.copyBtn.addEventListener('click', () => {
      const text = this.promptOutput.textContent;
      if (text && !text.includes('structured prompt will appear')) {
        navigator.clipboard.writeText(text);
        const originalHtml = this.copyBtn.innerHTML;
        this.copyBtn.innerHTML = '<i data-lucide="check"></i> Copied!';
        this.copyBtn.style.background = 'var(--success)';
        this.initIcons();
        setTimeout(() => {
          this.copyBtn.innerHTML = originalHtml;
          this.copyBtn.style.background = '';
          this.initIcons();
        }, 2000);
      }
    });

    this.clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all fields?')) {
        this.formData = {};
        this.variables = {};
        this.renderFields();
        this.updatePrompt();
        this.saveToLocalStorage();
      }
    });

    this.exportBtn.addEventListener('click', () => {
      const data = {
        framework: this.currentFramework.id,
        formData: this.formData,
        variables: this.variables
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prompt-${this.currentFramework.id}-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    });

    this.importBtn.addEventListener('click', () => this.importInput.click());
    this.importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.framework) this.switchFramework(data.framework);
            if (data.formData) this.formData = data.formData;
            if (data.variables) this.variables = data.variables;
            this.renderFields();
            this.updatePrompt();
            this.saveToLocalStorage();
          } catch (err) {
            alert('Invalid JSON file');
          }
        };
        reader.readAsText(file);
      }
    });

    this.helpBtn.addEventListener('click', () => {
      alert('PROMPT ENGINEERING TIPS:\n\n1. Be Specific: The more context, the better.\n2. Use Frameworks: Structure prevents rambling.\n3. Variables: Use {{variable_name}} to create templates.\n4. Iteration: Prompting is a conversation, not a one-off command.');
    });
  }

  saveToLocalStorage() {
    const state = {
      frameworkId: this.currentFramework.id,
      formData: this.formData,
      variables: this.variables
    };
    localStorage.setItem('prompt_architect_state', JSON.stringify(state));
  }

  loadFromLocalStorage() {
    const saved = localStorage.getItem('prompt_architect_state');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        this.formData = state.formData || {};
        this.variables = state.variables || {};
        const framework = frameworks.find(f => f.id === state.frameworkId);
        if (framework) this.currentFramework = framework;
      } catch (e) {
        console.error('Failed to load local storage', e);
      }
    }
  }
}

new PromptArchitect();
