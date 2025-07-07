# 🧩 Form Template Builder (Frontend Task)

This is a dynamic Form Template Builder built using **React**, **Redux**, **Redux-Saga**, and **Tailwind CSS**.  
It allows users to create, preview, and fill customizable form templates, with full support for multiple sections and input types.

---

## 🚀 Features

### 🛠 Template Builder
- Create new templates (Max 5 templates allowed)
- Each template has multiple **sections**
- Each section can have multiple **fields**
- Drag & drop fields within sections *(future scope)*
- Supported field types:
  - Short Text (Text only)
  - Number (Numeric only)
  - Paragraph (Multiline, free input)
  - Dropdown
  - Boolean (Yes/No)
  - Image & File Upload *(UI only)*
- Field options:
  - Label
  - Help Text
  - Required toggle
- Delete fields & sections
- Realtime **live preview** while building
- Save templates to `localStorage`

### 🖥️ Preview Mode
- Read-only preview of saved templates
- Accessible from HomePage → Preview Button

### 📝 Fill Template
- Fill any saved template as a form
- Dynamic rendering based on saved config
- Field-wise validation:
  - Required fields check
  - Type-based checks (e.g. Number ≠ Text)
- Submit form data
- Save filled responses to `localStorage`

### 🧹 Template Management
- Edit existing templates
- Delete saved templates
- Limit: Max 5 templates (with warning)
- Fully localStorage powered (no backend)

---

## 🧑‍💻 Tech Stack

| Tech           | Description                     |
|----------------|----------------------------------|
| React          | Frontend framework               |
| Redux + Toolkit| Global state management          |
| Redux-Saga     | Side-effect handling (optional)  |
| Tailwind CSS   | Utility-first UI framework       |
| React Router   | Page navigation                  |
| localStorage   | Persistent data saving           |
| react-hot-toast| Feedback toasts (success/errors) |

---

## 📁 Folder Structure (Simplified)



src/
│
├── components/
│ ├── Builder/
│ │ ├── SectionBlock.jsx
│ │ ├── FieldItem.jsx
│ │ └── FieldSidebar.jsx
│ ├── Preview/
│ │ └── LivePreview.jsx
│
├── pages/
│ ├── HomePage.jsx
│ ├── BuilderPage.jsx
│ ├── PreviewPage.jsx
│ └── GenerateFormPage.jsx
│
├── redux/
│ └── templates/
│ ├── slice.js
│ └── saga.js (optional)
│
├── App.jsx
└── index.js

yaml
Copy
Edit

---

## 🧪 How to Run

1. Clone the repo
```bash
git clone https://github.com/yourusername/form-template-builder.git
cd form-template-builder
Install dependencies


npm install
Run the dev server
npm start
On HomePage:

Click + Create New Template (max 5)

Use Builder:

Add sections, fields, drag/drop, configure

Live preview auto-updates

Click Save Template

On HomePage:

Click Edit → Builder

Click Fill → FillFormPage (auto loaded)

Click Preview → Read-only view

Click Delete → Remove template from localStorage

![Screenshot 2025-07-07 131104](https://github.com/user-attachments/assets/e28773fb-b87d-4a2e-8f28-d87bbeb1e6dd)




🧑 Author
👤 Nikhil Dubey

💼 B.Tech in IT, IIIT Allahabad

💻 MERN, Redux, Next.js, PenTesting, ML Enthusiast

📫 LinkedIn (https://www.linkedin.com/in/nikhil-dubey-b4b471243/)

📄 License
This project is for frontend evaluation only.
© 2025 Nikhil Dubey – All Rights Reserved.

yaml
Copy
Edit

---

# form-template-builder
A customizable Form Template Builder using React with Redux  &amp; Tailwind.
