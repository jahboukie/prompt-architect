# 🏗️ Prompt Architect

A professional local browser-based tool for structuring LLM prompts in a deterministic manner. Move beyond trial-and-error prompting by using established frameworks like CO-STAR and RISEN.

![Prompt Architect Preview](https://github.com/jahboukie/prompt-architect/raw/main/src/assets/preview-screenshot.png) *(Note: Add your actual screenshot to this path if desired)*

## 🌟 Features

-   **Deterministic Structure**: Combines prompt components in a set order to ensure consistency and context.
-   **Framework Templates**:
    -   **CO-STAR**: Context, Objective, Style, Tone, Audience, Response.
    -   **RISEN**: Role, Instructions, Steps, End Goal, Narrowing.
    -   **Custom**: Simple Role/Context/Task structure.
-   **Live Preview**: See your final prompt update in real-time as you type.
-   **Smart Variable Detection**: Automatically detects `{{variable}}` syntax and generates dedicated input fields for quick replacement.
-   **Local Persistence**: Your prompts are saved to Browser Local Storage automatically.
-   **Export/Import**: Save your prompt configurations as JSON files to share or backup.
-   **Premium UI**: Glassmorphic dark-mode design for a focused, high-end experience.

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jahboukie/prompt-architect.git
   cd prompt-architect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to the URL shown in the terminal (usually `http://localhost:5173`).

## 🛠️ Built With

-   [Vite](https://vitejs.dev/) - Frontend Tooling
-   [Vanilla JS/CSS](https://developer.mozilla.org/en-US/) - core logic and styling
-   [Lucide](https://lucide.dev/) - Iconography

## 📖 How to Use

1.  **Select Framework**: Pick a methodology from the sidebar that fits your task.
2.  **Fill Fields**: Enter details into the structured fields. Use the `?` tooltips for guidance.
3.  **Template Variables**: Use `{{placeholder}}` anywhere to create dynamic templates.
4.  **Copy**: Hit "Copy Prompt" and paste it into your favorite LLM (ChatGPT, Claude, Gemini, etc.).

## 📜 License

MIT
