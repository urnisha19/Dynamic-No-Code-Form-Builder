# 🚀 Dynamic No-Code Form Builder

A modern, drag-and-drop form builder built with Next.js, TypeScript, and Tailwind CSS. This application allows users to visually construct forms, preview them in real-time, and manage their structure dynamically.

![Dynamic Form Builder Interface](https://i.imgur.com/8a6eY7t.png)

## ✨ Features

-   **Drag & Drop Interface**: Easily add and reorder form fields from the palette to the canvas using `react-dnd`.
-   **Real-Time Preview**: Instantly switch between the builder and a live preview of the form.
-   **Component Palette**: A sidebar with various pre-built form input types (Text, Email, Checkbox, etc.).
-   **Dynamic Settings Panel**: Select any field on the canvas to edit its properties (label, placeholder, required status, column width, etc.).
-   **Local Storage Persistence**: Your form schema is automatically saved to your browser's local storage, so your work is never lost.
-   **Fully Responsive**: The layout is designed to work seamlessly on all screen sizes.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Drag & Drop**: [React DnD](https://react-dnd.github.io/react-dnd/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Deployment**: [Vercel](https://vercel.com/)

## ⚙️ Setup and Installation

Follow these steps to get the project running locally.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install Next.js, React, Tailwind CSS, and the other required packages like `react-dnd` and `lucide-react`.

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Deployment

This project can be easily deployed with [Vercel](https://vercel.com/), the creators of Next.js.

1.  Push your code to a GitHub repository.
2.  Go to the Vercel dashboard and select "Add New... > Project".
3.  Import your GitHub repository.
4.  Vercel will automatically detect the Next.js framework. Click "Deploy".
5.  Your application will be live in minutes!