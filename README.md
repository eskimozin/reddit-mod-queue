# Reddit Mod Queue for r/eskimozin

An unofficial, web-based tool designed to help moderators of the r/eskimozin subreddit manage their moderation queue more effectively.

## ✨ Features

*   Modern Interface: A clean and responsive user interface built with React and Tailwind CSS.
*   Efficient Moderation: Quickly approve, remove, and filter content from the mod queue.
*   Bulk Operations:
    *   `Moderate All Posts`: Apply moderation actions (e.g., approve, remove) to all visible posts at once.
    *   `Open All Posts`: Open all posts in the queue in new tabs for detailed review.
*   Routing: Uses React Router for a seamless single-page application experience.
*   CAPTCHA Protection: Includes hCaptcha to prevent automated abuse.
*   PDF Export: Ability to export data to PDF, likely for reporting or archiving (using jsPDF).

## 🚀 Tech Stack

*   Frontend: [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
*   Routing: [React Router](https://reactrouter.com/)
*   UI Components: [Headless UI](https://headlessui.com/), [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
*   Deployment: [GitHub Pages](https://pages.github.com/)

## 📦 Setup and Usage

1.  Clone the repository:
    ```bash
    git clone https://github.com/eskimozin/reddit-mod-queue.git
    cd reddit-mod-queue
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

4.  Build for production:
    ```bash
    npm run build
    ```
    The production-ready files will be in the `dist/` directory.

5.  Deploy to GitHub Pages:
    ```bash
    npm run deploy
    ```

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License.
