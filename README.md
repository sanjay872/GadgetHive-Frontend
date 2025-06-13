# GadgetHive – Frontend

GadgetHive is a shopping platform focused on laptops. This is the Angular 12 frontend that supports two user roles:
- **Buyers**: Can register/login and browse available laptop products.
- **Vendors**: Can login and manage their product listings.

## 🛠 Tech Stack
- **Angular 12**
- **Bootstrap / Material UI**
- **Deployment**: AWS S3 (Static Website Hosting)

## 📦 Features
- Buyer and Vendor login/signup
- Product listing view (for buyers)
- Product creation (for vendors)
- Responsive UI

## 🔧 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/GadgetHive-Frontend.git
cd GadgetHive-Frontend
```
### 2. Install dependencies
```bash
npm install
```
### 3. Serve locally
```bash
ng serve
```
Frontend will be available at http://localhost:4200/.

###  4. Build for production
```bash
ng build --prod
```
Upload the dist/ folder to AWS S3 bucket for static hosting.

## 📂 Folder Structure Highlights
`src/app/components`: All component UIs

`src/app/services`: API services for product/vendor

`src/app/guards`: Route guards based on roles

`src/environments`: Configuration for different environments
